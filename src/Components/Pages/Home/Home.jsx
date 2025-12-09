import React from "react";
import Banner from "./Banner";
import BestScholarships from "./BestScholarships";

const Home = () => {
  return (
    <div>
      <Banner />

      <div className="`w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 bg-transparent my-20">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Best <span className="text-green-500 ">Scholarships</span>
        </h3>
        <BestScholarships/>
      </div>
    </div>
  );
};

export default Home;
