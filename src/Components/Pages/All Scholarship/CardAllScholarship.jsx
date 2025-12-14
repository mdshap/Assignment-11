import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { Link } from "react-router";
import { motion } from "framer-motion";

const cardAnimation = {
  hidden: {
    opacity: 0.85,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const CardAllScholarship = ({ scholarship }) => {
  return (
    <motion.article
      variants={cardAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
      className="w-full max-w-[350px] bg-white rounded-xl shadow-md overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl relative">
      <div
        className="h-60 bg-center bg-cover "
        style={{ backgroundImage: `url(${scholarship?.universityImage})` }}
      />
      <p className="bg-blue-500 rounded-xl -mt-8 ml-62 text-white px-3 text-center text-sm absolute">
        {scholarship.degree}
      </p>

      <div className="p-4 ">
        <h3 className="text-xl flex gap-1 items-center font-semibold text-black line-clamp-2 min-h-12">
          <MdLocationCity className="text-green-700" />
          <span className="font-semibold">
            <p>{scholarship?.scholarshipName}</p>
          </span>
        </h3>

        <div className="flex mt-2 items-center justify-between">
          <p className="flex items-center gap-1 text-sm text-gray-500">
            <FaLocationArrow />{" "}
            <p className="text-[12px] text-gray-500">
              {scholarship?.universityCity}, {scholarship.universityCountry}
            </p>
          </p>
          <p className="text-[12px] text-red-500">
            {scholarship?.universityName}
          </p>
        </div>

        <div className="mt-3 mx-2 flex items-center justify-between">
          <div className="text-blue-500 text-xl font-semibold">
            ${scholarship?.applicationFees}
          </div>
          <div className="text-sm px-2 py-1 rounded-xl bg-yellow-300 font-medium text-green-900">
            {scholarship?.subjectCategory}
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <Link
            to={`/details/${scholarship?._id}`}
            className="flex-1 inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-green-500 text-white hover:bg-indigo-700 transition">
            Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default CardAllScholarship;
