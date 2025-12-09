import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Loader from "../Loader/Loader";

const ScholarshipDetails = () => {

  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`https://assignment-10-serverside-gyny.onrender.com/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.log(err));
  }, [id]);


  if (!book) return <Loader />;




  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8">
        <div className="bg-transparent md:rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 place-content-center md:grid-cols-3 gap-6 p-6 md:p-8">
            <div className="md:col-span-1 flex items-start">
              <div className="w-full">
                <div className="rounded-xl overflow-hidden shadow-2xl transform transition hover:scale-[1.01]">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-auto object-cover aspect-2/3"
                  />
                 
                </div>
                
                
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-center ">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-secondary leading-tight">
                {book.title}
              </h1>

              <p className="mt-2 text-sm lg:text-lg text-gray-500">
                by{" "}
                <span className="font-medium text-lg text-green-600">
                  University of Rajshahi <span className=" text-pink-500">(Rank: 200th)</span>
                </span>
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-primary px-3 py-1 rounded-full text-sm lg:text-md text-gray-100">
                  <span className="font-medium">Category</span>
                </div>

                <div className="inline-flex items-center gap-1 text-sm">
                  <div className="text-sm lg:text-md text-gray-700 ml-2">
                    Location
                  </div>
                </div>
              </div>

              <div className="mt-6 text-gray-900 leading-relaxed text-base lg:text-lg">
                {book.summary}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <div className="text-xs text-center text-gray-300 ">
                    Application Fee
                  </div>
                  <div className="mt-1 font-medium text-green-500 md:text-2xl lg:text-3xl text-center">
                    $600
                  </div>
                </div>

                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="text-xs text-center text-gray-300">
                    Application Deadline
                  </div>
                  <div className="mt-1 text-center font-medium text-red-400 md:text-xl lg:text-2xl">
                    10 December 2025
                  </div>
                </div>
                
              </div>
              <div className="col-span-full mt-4">
                  <a
                    href={book?.downloadLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-6 py-4 bg-green-600 text-white rounded-md w-full text-center">
                    Apply For Scholarship
                  </a>
                </div>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
