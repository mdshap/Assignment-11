import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Authentication/AuthContext";
import Loader from "../Loader/Loader";
import { FaFilter } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import CardAllScholarship from "./CardAllScholarship";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AllScholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [scholarshipsLoading, setScholarshipsLoading] = useState(true);
  const { loading } = use(AuthContext);
  const [searchText, setSearchText] = useState("");

  const items = [
    { id: "full", label: "Full Funded" },
    { id: "semi", label: "Semi Funded" },
  ];

  useEffect(() => {
    axios
      .get("https://assignment-10-serverside-gyny.onrender.com/books")
      .then((res) => {
        setScholarships(res.data);
        setScholarshipsLoading(false);
      })
      .catch(console.log);
  }, []);

  if (loading || scholarshipsLoading) return <Loader />;

  const filteredScholarships = scholarships.filter((sch) =>
    sch.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex gap-3 justify-end items-center mt-4 mx-8">
        <div className="dropdown dropdown-left dropdown-hover">
          <button className="btn flex gap-2">
            <FaFilter /> Category
          </button>

          <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow">
            {items.map((it) => (
              <li key={it.id}>
                <a href="#!" className="hover:bg-gray-100">
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <label className="input w-full md:w-80">
          <input
            type="search"
            placeholder="Search scholarships..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>
      </div>

      <div className="relative mt-10 max-w-7xl mx-auto px-6">
        <button
          className="swiper-prev btn-xl absolute left-0 top-1/2 -translate-y-1/2 z-20 
                     bg-green-500 shadow-md rounded-full w-10 h-10 flex items-center justify-center 
                     hover:bg-green-700 text-white transition">
          <IoIosArrowBack />
        </button>

        <button
          className="swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-20 
                     bg-green-500 shadow-md rounded-full w-10 h-10 flex items-center justify-center 
                     hover:bg-green-700 text-white transition">
          <IoIosArrowForward />
        </button>

        <Swiper
          modules={[Pagination, Navigation]}
          navigation={{
            prevEl: ".swiper-prev",
            nextEl: ".swiper-next",
          }}
          pagination={{ clickable: true }}
          spaceBetween={40}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}>
          {filteredScholarships.map((book) => (
            <SwiperSlide key={book._id} className="flex justify-center">
              <CardAllScholarship book={book} />
            </SwiperSlide>
          ))}
        </Swiper>

        {filteredScholarships.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No scholarships found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllScholarship;
