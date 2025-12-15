import React, { useEffect, useState } from "react";
import { AuthContext } from "../../../Authentication/AuthContext";
import Loader from "../Loader/Loader";
import { FaCaretDown, FaCaretUp, FaFilter } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CardAllScholarship from "./CardAllScholarship";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axiosProvider from "../../../API/axiosProvider";

const AllScholarship = () => {
  const [scholarships, setScholarships] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [open, setOpen] = useState(false);
  const [feeAscending, setFeeAscending] = useState(true);

  const items = [
    { id: "all", label: "All" },
    { id: "full", label: "Full Fund" },
    { id: "partial", label: "Partial" },
    { id: "self", label: "Self Fund" },
  ];

  useEffect(() => {
    axiosProvider
      .get("/scholarships", {
        params: {
          search: searchText || undefined,
          category: selectedCategory !== "All" ? selectedCategory : undefined,
          order: feeAscending ? "ascending" : "descending",
        },
      })
      .then((res) => {
        setScholarships(res.data);
      })
      .catch((error) => console.log(error.message));
  }, [searchText, selectedCategory, feeAscending]);

  const handleCategoryClick = (label) => {
    setSelectedCategory(label);
    setOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end items-center mt-4 mx-8">
        <div className="flex gap-3 w-full sm:w-75">
          <button
            className="btn flex gap-2 w-1/2 sm:w-40"
            onClick={() => setFeeAscending(!feeAscending)}>
            {feeAscending ? (
              <FaCaretUp className="text-xl" />
            ) : (
              <FaCaretDown className="text-xl" />
            )}
            Application Fee
          </button>

          <div
            className={`dropdown w-1/2 dropdown-left ${
              open ? "dropdown-open" : ""
            }`}>
            <button
              className="btn flex w-full sm:w-30  gap-2"
              onClick={() => setOpen(!open)}>
              <FaFilter /> Category
            </button>

            <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow">
              {items.map((it) => (
                <li key={it.id}>
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(it.label);
                    }}
                    className={`hover:bg-gray-100 ${
                      selectedCategory === it.label
                        ? "bg-green-100 text-green-600 font-semibold"
                        : ""
                    }`}>
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
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

      <div className="relative min-h-[90vh] mt-10 max-w-7xl mx-auto px-6">
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
          {scholarships.map((scholarship) => (
            <SwiperSlide key={scholarship._id} className="flex justify-center">
              <CardAllScholarship scholarship={scholarship} />
            </SwiperSlide>
          ))}
        </Swiper>

        {scholarships.length === 0 && (
          <p className="text-center flex justify-center items-center h-[80vh] -mt-10 text-gray-500">
            <span className="text-3xl">No scholarships found</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AllScholarship;
