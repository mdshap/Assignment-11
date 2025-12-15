import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Aisha Rahman",
    email: "aisha@mail.com",
    rating: 5,
    review: "This platform made scholarship tracking extremely easy.",
    photo: "https://i.pravatar.cc/150?img=1",
    date: "2025-02-10",
  },
  {
    id: 2,
    name: "Rafi Ahmed",
    email: "rafi@mail.com",
    rating: 4,
    review: "Very smooth UI and helpful insights.",
    photo: "https://i.pravatar.cc/150?img=3",
    date: "2025-01-22",
  },
  {
    id: 3,
    name: "Sadia Khan",
    email: "sadia@mail.com",
    rating: 5,
    review: "A must-have platform for scholarship seekers.",
    photo: "https://i.pravatar.cc/150?img=5",
    date: "2025-03-05",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const card = {
  hidden: { y: 50, scale: 0.95, opacity: 0.9 },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HomeReviews = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 my-20">
      <motion.h3
        initial={{ y: 30 }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.35 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12">
        Student <span className="text-green-500">Reviews</span>
      </motion.h3>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <motion.div
            key={r.id}
            variants={card}
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
            <div className="flex items-center gap-4">
              <img
                src={r.photo}
                alt={r.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold">{r.name}</h4>
                <p className="text-xs text-gray-500">{r.email}</p>
              </div>
            </div>

            <p className="mt-4 text-gray-600">{r.review}</p>

            <div className="mt-4 flex gap-1 text-yellow-400">
              {Array.from({ length: r.rating }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="mt-2 text-xs text-gray-400">{r.date}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeReviews;
