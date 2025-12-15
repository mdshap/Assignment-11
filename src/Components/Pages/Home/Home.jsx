import React from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import BestScholarships from "./BestScholarships";
import HomeReviews from "./HomeReviews";
import ContactUs from "./ContactUs";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <motion.div
        initial={{ y: 60 }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <Banner />
      </motion.div>

      <motion.section
        initial={{ y: 80 }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 my-20">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Best <span className="text-green-500">Scholarships</span>
        </h3>
        <BestScholarships />
      </motion.section>

      <HomeReviews />

      <ContactUs />
    </div>
  );
};

export default Home;
