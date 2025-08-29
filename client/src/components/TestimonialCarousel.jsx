import React, { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Arjun Sharma",
    feedback:
      "AttendX is amazing! The platform helped me organize events efficiently without any hassle.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name: "Priya Singh",
    feedback:
      "I loved using AttendX! It saved me so much time and my events looked super professional.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Rohan Mehta",
    feedback:
      "AttendX ki help se mera event smooth chala. Highly recommend to everyone!",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    name: "Sneha Kapoor",
    feedback:
      "Superb experience! AttendX ne mere liye sab kuch easy kar diya.",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    name: "Vikram Patel",
    feedback:
      "Efficient, easy to use and very intuitive. AttendX rocks for event management!",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    name: "Neha Verma",
    feedback:
      "I had an incredible experience managing my college fest using AttendX. Highly efficient!",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    name: "Amit Khanna",
    feedback:
      "The interface is super clean and easy to navigate. Loved every bit of it.",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    name: "Simran Bedi",
    feedback:
      "AttendX really helped me with last-minute event changes. So smooth and stress-free!",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    name: "Rahul Nair",
    feedback:
      "I’ve used many tools before but AttendX is by far the most convenient and user-friendly.",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    name: "Kavya Iyer",
    feedback:
      "Loved how intuitive the system is. Setting up events has never been this easy.",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    name: "Saurabh Gupta",
    feedback:
      "The automation features in AttendX are a game changer. Saved me hours of work.",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    name: "Meera Desai",
    feedback:
      "The design is sleek and professional. My clients were impressed with the event setup.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Karan Malhotra",
    feedback:
      "This platform is a must-have for anyone managing multiple events. Truly a lifesaver.",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    name: "Ayesha Khan",
    feedback:
      "It’s fast, reliable, and packed with amazing features. Can’t imagine going back!",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    name: "Deepak Joshi",
    feedback:
      "Best decision to use AttendX. My event ran smoother than ever before.",
    image: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    name: "Ritika Sharma",
    feedback:
      "I was nervous about hosting my first event but AttendX made it effortless.",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    name: "Ankit Verma",
    feedback:
      "Everything was seamless—from registrations to final reporting. Just awesome.",
    image: "https://randomuser.me/api/portraits/men/27.jpg",
  },
  {
    name: "Shweta Rao",
    feedback:
      "Super helpful tool! It really makes me look professional in front of my clients.",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    name: "Nikhil Saxena",
    feedback:
      "Reliable, simple, and very efficient. Highly recommended to all event organizers.",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    name: "Ishita Roy",
    feedback:
      "With AttendX, I don’t have to worry about small details. It just works!",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    name: "Manish Kapoor",
    feedback:
      "Excellent tool! My corporate event was a huge success thanks to AttendX.",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    name: "Tanvi Deshmukh",
    feedback:
      "The customer support was fantastic. Helped me quickly whenever I was stuck.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    name: "Rajat Bansal",
    feedback:
      "Very easy to customize events. The flexibility of this platform is top-notch.",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Pooja Chawla",
    feedback:
      "Perfect platform for students and professionals alike. Absolutely love it!",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    name: "Harsh Vardhan",
    feedback:
      "From start to finish, AttendX exceeded all my expectations. Brilliant tool.",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
];


const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const delay = 3000; 

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => resetTimeout();
  }, [currentIndex]);

  return (
    <div className="w-full max-w-4xl mx-auto relative overflow-hidden bg-gray-900 rounded-xl p-4">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="flex-none w-full md:w-1/1 px-4 text-white"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">{t.name}</h3>
                <p className="mt-2 text-gray-200">{t.feedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setCurrentIndex(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
