import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router";

import "swiper/css";
import "swiper/css/pagination";

const TopUniversities = ({ data = [] }) => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 mb-16">
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Top <span className="text-green-500">Universities</span>
      </h3>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={3}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {data.slice(0, 4).map((item) => (
          <SwiperSlide key={item._id}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">

              <div
                className="h-40 max-h-40 overflow-hidden bg-center bg-cover"
                style={{ backgroundImage: `url(${item.coverImage})` }}
              />

              <div className="p-4 flex flex-col h-[200px]">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.university || "Top University"}
                  </p>
                </div>

                <Link
                  to={`/details/${item._id}`}
                  className="mt-4 inline-block w-full text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopUniversities;
