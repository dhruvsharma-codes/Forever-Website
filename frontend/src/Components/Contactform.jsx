import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

const ContactForm = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "9cabbf2b-8e43-4017-86e1-0d49f4c6b811");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      setResult("Error");
    }
  };

  return (
    <>
      <style>{`
        .cf-card {
          background: #F7EFE6;
          border: 1.5px solid #EDD8C4;
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
          margin: 50px auto;
          box-shadow: 0 4px 20px rgba(61,35,24,0.08);
        }
        .cf-title {
          font-size: 1.5rem;
          color: #3D2318;
          margin-bottom: 10px;
        }
        .cf-input, .cf-textarea {
          width: 100%;
          border: 1.5px solid #EDD8C4;
          border-radius: 10px;
          padding: 10px;
          margin-bottom: 12px;
          outline: none;
        }
        .cf-input:focus, .cf-textarea:focus {
          border-color: #C96A42;
        }
        .cf-submit {
          width: 100%;
          background: #C96A42;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 50px;
          cursor: pointer;
        }
      `}</style>

      <motion.div
        className="cf-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="cf-title">Contact Us</h2>

        <form onSubmit={onSubmit}>
          <motion.input
            type="text"
            required
            name="name"
            placeholder="Your Name"
            className="cf-input"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="email"
            required
            name="email"
            placeholder="Your Email"
            className="cf-input"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.textarea
            name="message"
            placeholder="Your Message"
            required
            rows={4}
            className="cf-textarea"
            whileFocus={{ scale: 1.01 }}
          />

          <motion.button
            type="submit"
            className="cf-submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Send Message
          </motion.button>
          <span>{result}</span>
        </form>
      </motion.div>
    </>
  );
};

export default ContactForm;
