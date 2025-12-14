import React from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <section className="w-full  py-10 bg-linear-to-br from-green-300 to-green-200">
      <div className="max-w-5xl flex flex-col md:flex-row justify-between items-center md:gap-20 mx-auto px-4">
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-6">
            Contact <span className="text-green-600">Us</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-600 mb-12">
            Have questions or need guidance? Send us a message.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-600 mb-12">
            Scholar Stream is a centralized platform designed to help students
            discover, apply for, and manage scholarship opportunities with ease.
            We connect students with scholarships from top universities
            worldwide, streamline the application process, and provide
            transparent tracking, reviews, and feedback—all in one place. Our
            goal is to make higher education more accessible by simplifying
            scholarship discovery and empowering students to make informed
            academic decisions.
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-green-50 rounded-2xl shadow-xl p-8 grid gap-6 min-w-90 sm:min-w-110">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full bg-base-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="textarea textarea-bordered w-full bg-base-100"></textarea>
          </div>

          <button
            type="button"
            className="btn  bg-green-600 hover:bg-green-700 text-white w-full  mx-auto">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactUs;
