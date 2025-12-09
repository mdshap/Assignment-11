import React from "react";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-90 md:min-h-screen"
        style={{
          backgroundImage:
            "url(hero.png)",
        }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
  <h1 className="mb-5 text-3xl sm:text-5xl text-green-500 font-bold">Hello Scholars!</h1>
  <p className="mb-5 text-md">
    Discover scholarship opportunities from top universities, track your applications, 
    and manage everything in one place. Start your journey toward academic success 
    with tools designed to guide and support you.
  </p>
  <button className="btn bg-green-600 text-white border-0 shadow-none sm:px-8">Search Scholarships</button>
</div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
