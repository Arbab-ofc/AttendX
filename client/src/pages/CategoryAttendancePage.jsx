import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";
import ActivityCalendar from "react-activity-calendar";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";

const AttendanceVotePage = () => {
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [recordId, setRecordId] = useState(null);

  // NEW: stats state
  const [stats, setStats] = useState(null);
  const loadStats = async () => {
    try {
      const res = await axiosInstance.get("attendance-record/stats", {
        params: { categoryId, month: selectedMonth, year: selectedYear },
      });
      if (res.data.success) setStats(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!categoryId) {
      toast.error("No categoryId provided ❌");
      return;
    }
    const fetchCategory = async () => {
      try {
        const res = await axiosInstance.get(`attendance-category/${categoryId}`);
        setCategory(res.data.category);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch category ❌");
      }
    };
    fetchCategory();
  }, [categoryId]);

  const fetchAttendance = async () => {
    if (!categoryId) return;
    try {
      const res = await axiosInstance.get(
        `attendance-record/month/${categoryId}?month=${selectedMonth}&year=${selectedYear}`
      );
      const records = res.data.data || [];

      const startOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
      const endOfMonth = new Date(selectedYear, selectedMonth, 0);
      const data = [];
      for (
        let d = new Date(startOfMonth);
        d <= endOfMonth;
        d.setDate(d.getDate() + 1)
      ) {
        const dayRecord = records.find(
          (r) => r.date.split("T")[0] === d.toISOString().split("T")[0]
        );
        let level = 0;
        if (dayRecord) {
          if (dayRecord.status === "present") level = 3;
          if (dayRecord.status === "absent") level = 2;
          if (dayRecord.status === "leave") level = 1;
        }
        data.push({
          date: d.toISOString().split("T")[0],
          count: 1,
          level,
          status: dayRecord?.status || null,
        });
      }
      setActivityData(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch attendance ❌");
    }
  };

  useEffect(() => {
    fetchAttendance();
    loadStats(); 
  }, [categoryId, selectedMonth, selectedYear]);

  const handleSubmit = async () => {
    if (!status) {
      toast.error("Please select a status!");
      return;
    }

    const selectedStr = selectedDate.toISOString().split("T")[0];

    try {
      const res = await axiosInstance.post(
        `/attendance-record/mark/${categoryId}`,
        {
          date: selectedStr,
          status,
        }
      );
      if (res.data.success) {
        toast.success("Attendance recorded successfully ✅");
        
        setActivityData((prev) =>
          prev.map((day) => {
            if (day.date === selectedStr) {
              let level = 0;
              if (status === "present") level = 3;
              if (status === "absent") level = 2;
              if (status === "leave") level = 1;
              return { ...day, level, status };
            }
            return day;
          })
        );
        
        loadStats();
      } else {
        toast.error(res.data.message || "Something went wrong ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to record attendance ❌");
    }
  };

  const fetchRecordId = async (date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const res = await axiosInstance.post(
        `/attendance-record/date?date=${formattedDate}`,
        { categoryId: categoryId }
      );
      if (res.data.success && res.data.data) {
        setRecordId(res.data.recordId);
        setStatus(res.data.data.status);
      } else {
        setRecordId(null);
        setStatus(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch record ❌");
    }
  };

  const handleUpdate = async () => {
    if (!recordId || !status) {
      toast.error("Select date & status first ❌");
      return;
    }
    try {
      const res = await axiosInstance.put(
        `/attendance-record/month/${categoryId}/${recordId}`,
        { status }
      );
      if (res.data.success) {
        toast.success("Attendance updated ✅");
        fetchAttendance();
        loadStats(); // NEW
        fetchRecordId(selectedDate);
      } else {
        toast.error(res.data.message || "Update failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating attendance ❌");
    }
  };

  const handleDelete = async () => {
    if (!recordId) {
      toast.error("No attendance found for this date ❌");
      return;
    }
    try {
      const res = await axiosInstance.delete(
        `/attendance-record/${categoryId}/${recordId}`
      );
      if (res.data.success) {
        toast.success("Attendance deleted ✅");
        setRecordId(null);
        setStatus(null);
        fetchAttendance();
        loadStats(); // NEW
      } else {
        toast.error(res.data.message || "Delete failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting attendance ❌");
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading category...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative text-white flex flex-col items-center justify-start p-6 overflow-hidden">
      <div className="absolute inset-0 z-0 animate-scan bg-[repeating-linear-gradient(90deg,#ff0080,#7928ca,#2af598,#009efd,#f6d365,#f093fb)] bg-[length:200%_100%] opacity-20"></div>

      <div className="relative z-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-2xl rounded-2xl p-6 w-full max-w-5xl text-center border border-gray-700">
        <h1 className="text-3xl font-extrabold tracking-wider mb-2 text-purple-400">
          {category.title}
        </h1>
        <p className="text-gray-300 italic mb-4">{category.description}</p>
        <p className="text-sm text-gray-500 mb-6">
          Created at: {new Date(category.createdAt).toDateString()}
        </p>

        {/* NEW: Compact stats row */}
        {stats && (
          <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="bg-gray-800/70 rounded-lg px-3 py-2">
              <div className="text-gray-400">Present</div>
              <div className="text-green-400 font-semibold">{stats.present}</div>
            </div>
            <div className="bg-gray-800/70 rounded-lg px-3 py-2">
              <div className="text-gray-400">Absent</div>
              <div className="text-red-400 font-semibold">{stats.absent}</div>
            </div>
            <div className="bg-gray-800/70 rounded-lg px-3 py-2">
              <div className="text-gray-400">Leave</div>
              <div className="text-yellow-400 font-semibold">{stats.leave}</div>
            </div>
            <div className="bg-gray-800/70 rounded-lg px-3 py-2">
              <div className="text-gray-400">Attendance %</div>
              <div className="text-blue-400 font-semibold">
                {stats.attendancePercent}%
              </div>
            </div>
          </div>
        )}

        {/* Month Picker */}
        <div className="mb-6">
          <input
            type="month"
            value={`${selectedYear}-${String(selectedMonth).padStart(2, "0")}`}
            onChange={(e) => {
              const [y, m] = e.target.value.split("-");
              setSelectedYear(Number(y));
              setSelectedMonth(Number(m));
            }}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
            max={`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`}
          />
        </div>

        {/* Attendance Calendar */}
        <div className="my-8 flex justify-center">
          {activityData.length > 0 && (
            <ActivityCalendar
              data={activityData}
              blockSize={30}
              blockMargin={6}
              showWeekdayLabels={true}
              hideColorLegend={true}
              hideTotalCount={true}
              weekStart={1}
              theme={{
                light: ["#ffffff", "#FFA500", "#FF0000", "#00FF00"],
                dark: ["#ffffff", "#FFA500", "#FF0000", "#00FF00"],
              }}
              maxLevel={3}
              onClick={(day) => {
                if (day.date === todayStr) {
                  setStatus(day.status || "present");
                } else {
                  toast.info("You can only mark attendance for today.");
                }
              }}
              tooltipDataAttrs={(day) => ({
                "data-tip": `${new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}`,
              })}
            />
          )}
        </div>

        {/* Status Toggle */}
        <div className="mb-6">
          <ToggleGroup.Root
            type="single"
            className="flex bg-gray-800 rounded-lg overflow-hidden w-full max-w-md mx-auto"
            value={status}
            onValueChange={setStatus}
          >
            <ToggleGroup.Item
              value="present"
              className={`flex-1 px-4 py-2 font-semibold ${
                status === "present" ? "bg-green-600" : "hover:bg-green-700"
              }`}
            >
              Present
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="absent"
              className={`flex-1 px-4 py-2 font-semibold ${
                status === "absent" ? "bg-red-600" : "hover:bg-red-700"
              }`}
            >
              Absent
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="leave"
              className={`flex-1 px-4 py-2 font-semibold ${
                status === "leave" ? "bg-yellow-600" : "hover:bg-yellow-700"
              }`}
            >
              Leave
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>

        {/* Buttons + Mini Calendar */}
        <div className="mt-6 flex flex-col items-center space-y-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              fetchRecordId(date);
            }}
            dateFormat="yyyy-MM-dd"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-center"
          />

          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 transition text-white font-bold px-6 py-2 rounded-lg shadow-lg"
            >
              Submit
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 transition text-white font-bold px-6 py-2 rounded-lg shadow-lg"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 transition text-white font-bold px-6 py-2 rounded-lg shadow-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" />
      <ReactTooltip place="top" type="dark" effect="solid" />

      <style>
        {`
          @keyframes scan {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          .animate-scan {
            animation: scan 10s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default AttendanceVotePage;
