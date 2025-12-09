import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { Link } from "react-router";

const ScholarshipCard = ({ book }) => {




  return (
    <article className="w-full max-w-[350px] bg-white rounded-xl shadow-md overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl">
      <div
        className="h-140 bg-center bg-cover"
        style={{ backgroundImage: `url(${book?.coverImage})` }}
      />

      <div className="p-4">
        <h3 className="text-xl flex gap-1 items-center font-semibold text-black  line-clamp-2 min-h-12">
            <MdLocationCity className="text-green-700" />
         <span className="font-semibold">{book.title}</span> 
        </h3>

        <p className="mt-1 flex items-center gap-1 text-sm text-gray-500"><FaLocationArrow /> <span>Location</span></p>

        <div className="mt-3 mx-2 flex items-center justify-between">
         <div className="text-blue-500 text-xl font-semibold">$500</div>

          <div className="text-sm px-2 py-1 rounded-xl bg-yellow-300 font-medium text-green-900">Category</div>
        </div>

        <div className="mt-4 flex gap-3">

          <Link to={`/details/${book?._id}`} className="flex-1 inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-green-500 text-white hover:bg-indigo-700 transition"  >Details</Link>

        </div>
      </div>
    </article>
  );
};

export default ScholarshipCard;
