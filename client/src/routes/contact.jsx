import React, { useState } from "react";
import emailjs from "@emailjs/browser"; // Ensure emailjs is imported
import icon from "../assets/KitaabKosh_logo.svg";
import Header from "../components/Header/Header.jsx"
import Footer from "../components/Footer/Footer.jsx"


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");  // status can be "sending", "success", or "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");  // Display "sending" initially

    // Sending the email using EmailJS
    emailjs
      .send(
        "service_kr1tvos", // Your EmailJS service ID
        "template_1sf9dqs", // Your EmailJS template ID
        {
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          message: formData.message,
        },
        "1KU3xjmjuIC5uOI0n" // Your EmailJS public key
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setStatus("success");  // Update status to success on successful email send
          setFormData({ name: "", email: "", phone: "", message: "" });  // Clear form fields
        },
        (error) => {
          console.error("Error sending email:", error);
          setStatus("error");  // Update status to error on failure
        }
      );
  };

  return (
    <>
    <Header />
    <div className="flex items-center justify-center min-h-screen bg-blue-100 p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-lg p-8 transition duration-300">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={icon} alt="Logo" className="h-16" />
        </div>

        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-8">
          We would love to hear from you! Feel free to reach out for any inquiries.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
              placeholder="Your name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
              placeholder="Your email"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
              placeholder="Your phone number"
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md resize-none"
              placeholder="Your message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg"
          >
            Send Message
          </button>
        </form>

        {/* Popup/Notification */}
        {status && (
          <div className="mt-4 text-center">
            <p
              className={`text-sm font-semibold p-2 rounded-lg ${
                status === "sending"
                  ? "text-blue-600 bg-blue-100"
                  : status === "success"
                  ? "text-green-600 bg-green-100"
                  : status === "error"
                  ? "text-red-600 bg-red-100"
                  : ""
              }`}
            >
              {status === "sending"
                ? "Sending..."
                : status === "success"
                ? "Message sent successfully!"
                : "Failed to send message. Please try again."}
            </p>
          </div>
        )}
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default ContactUs;
