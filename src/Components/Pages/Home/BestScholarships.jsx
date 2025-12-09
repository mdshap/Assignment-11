import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { AuthContext } from "../../../Authentication/AuthContext";
import Loader from "../Loader/Loader";
import ScholarshipCard from "./ScholarshipCard";

const BestScholarships = () => {

  const [books, setBooks] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true)
  const [showAll, setShowAll] = useState(false);

  const {loading } =use(AuthContext)

  useEffect(() => {
    axios
      .get(`https://assignment-10-serverside-gyny.onrender.com/${showAll ? "books" : "popular-books"}`)
      .then((res) => {
        setBooks(res.data);
        setBooksLoading(false)
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showAll]);


  const handleShowAll = () =>{
    setShowAll(!showAll)
  }

  if(loading || booksLoading){
    return(
      <Loader></Loader>
    )
  }

  return (
    <div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {books.map((book) => (
          <ScholarshipCard key={book._id} book={book}></ScholarshipCard>
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
