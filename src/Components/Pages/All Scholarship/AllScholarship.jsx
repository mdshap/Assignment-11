import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Authentication/AuthContext";
import Loader from "../Loader/Loader";
import ScholarshipCard from "../Home/ScholarshipCard";
import { FaFilter } from "react-icons/fa";

const AllScholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [scholarshipsLoading, setScholarshipsLoading] = useState(true);
  const { loading } = use(AuthContext);

  const [selected, setSelected] = useState(new Set());

  const items = [
    { id: "full", label: "Full Funded" },
    { id: "semi", label: "Semi Funded" },
  ];

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  //Searching
  const [searchText, setSearchText] = useState("");
  const filteredScholarships = scholarships.filter((sch) =>
    sch.title.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("https://assignment-10-serverside-gyny.onrender.com/books")
      .then((res) => {
        setScholarships(res.data);
        setScholarshipsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading || scholarshipsLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:justify-between  justify-center mt-4 mx-8 items-center">
        <h3 className="text-2xl w-70 md:w-full font-semibold text-green-500"></h3>
        <div className="flex items-center w-70 md:w-150 gap-2">
          <div className="dropdown dropdown-left dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 flex items-center gap-2">
              <FaFilter className="" /> Category
            </div>

            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
              {items.map((it) => (
                <li className="" key={it.id}>
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                      toggle(it.id);
                    }}
                    className={`block px-4 py-2 text-center rounded cursor-pointer transition mb-1 ${
                      selected.has(it.id)
                        ? "bg-green-100 border border-green-700 text-green-700 font-medium"
                        : "hover:bg-gray-100"
                    }`}>
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              placeholder="Search by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>
        </div>
      </div>

      {searchText ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10">
            {filteredScholarships.map((book) => (
            <ScholarshipCard key={book._id} book={book}></ScholarshipCard>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10">
          {scholarships.map((book) => (
            <ScholarshipCard key={book._id} book={book}></ScholarshipCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarship;
