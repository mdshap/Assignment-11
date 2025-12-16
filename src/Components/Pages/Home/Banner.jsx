import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.7, ease: "easeIn" }}
    >
      <div
        className="hero min-h-90 md:min-h-screen"
        style={{
          backgroundImage: "url(hero.png)",
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content text-neutral-content text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-md"
          >
            <h1 className="mb-5 text-3xl sm:text-5xl text-green-500 font-bold">
              Hello Scholars!
            </h1>

            <p className="mb-5 text-md">
              Discover scholarship opportunities from top universities, track
              your applications, and manage everything in one place. Start your
              journey toward academic success with tools designed to guide and
              support you.
            </p>

            <Link
              to="/all-scholarships"
              className="btn bg-green-600 text-white border-0 shadow-none sm:px-8"
            >
              Search Scholarships
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
