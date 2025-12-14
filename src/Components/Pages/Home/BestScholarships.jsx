import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../Authentication/AuthContext";
import Loader from "../Loader/Loader";
import ScholarshipCard from "./ScholarshipCard";
import axiosProvider from "../../../API/axiosProvider";

const BestScholarships = () => {

  const [scholarships, setScholarships] = useState([]);
  const [scholarshipsLoading, setScholarshipsLoading] = useState(true)
  const [showAll, setShowAll] = useState(false);

  const {loading } =use(AuthContext)

  useEffect(() => {
    axiosProvider.get('/scholarships')
      .then((res) => {
        setScholarships(res.data);
        setScholarshipsLoading(false)
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showAll]);


  const handleShowAll = () =>{
    setShowAll(!showAll)
  }

  if(loading || scholarshipsLoading){
    return(
      <Loader></Loader>
    )
  }

  return (
    <div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {scholarships.map((scholarship) => (
          <ScholarshipCard  scholarship={scholarship}></ScholarshipCard>
        ))}
      </div>
      
      <div className="w-full flex justify-center mt-5">
        <button 
        onClick={handleShowAll}
        className="btn btn-ghost mx-auto">{ showAll ? 'Show Less' : 'Show All'}</button>
      </div>
    </div>
  );
};

export default BestScholarships;
