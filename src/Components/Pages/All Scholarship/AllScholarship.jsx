import React, { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp, FaFilter } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CardAllScholarship from "./CardAllScholarship";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axiosProvider from "../../../API/axiosProvider";
import Loader from "../Loader/Loader";

const AllScholarship = () => {
  const [scholarships, setScholarships] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [open, setOpen] = useState(false);
  const [feeAscending, setFeeAscending] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const items = [
    { id: "all", label: "All" },
    { id: "full", label: "Full Fund" },
    { id: "partial", label: "Partial" },
    { id: "self", label: "Self Fund" },
  ];

  useEffect(() => {
    setIsLoading(true);

    axiosProvider
      .get("/scholarships", {
        params: {
          search: searchText || undefined,
          category: selectedCategory !== "All" ? selectedCategory : undefined,
          order: feeAscending ? "ascending" : "descending",
          page: currentPage,
          limit: 3,
        },
      })
      .then((res) => {
        setScholarships(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchText, selectedCategory, feeAscending, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, selectedCategory, feeAscending]);

  const handleCategoryClick = (label) => {
    setSelectedCategory(label);
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [currentPage]);

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
              className="btn flex w-full sm:w-30 gap-2"
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
        {isLoading ? (
          <div className="flex justify-center items-center ">
            <Loader />
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            {scholarships.map((scholarship) => (
              <CardAllScholarship
                key={scholarship._id}
                scholarship={scholarship}
              />
            ))}
          </div>
        )}

        {scholarships.length === 0 && (
          <p className="text-center flex justify-center items-center h-[80vh] -mt-10 text-gray-500">
            <span className="text-3xl">No scholarships found</span>
          </p>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              className="btn btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}>
              <IoIosArrowBack /> Prev
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num + 1)}
                className={`btn btn-sm ${
                  currentPage === num + 1
                    ? "btn-active bg-green-600 text-white"
                    : ""
                }`}>
                {num + 1}
              </button>
            ))}

            <button
              className="btn btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}>
              Next <IoIosArrowForward />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllScholarship;
