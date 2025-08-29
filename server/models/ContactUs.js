import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    minlength: [5, "Message must be at least 5 characters long"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
