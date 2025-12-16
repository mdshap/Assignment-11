import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Loader from "../Loader/Loader";
import axiosProvider from "../../../API/axiosProvider";
import ScholarshipReview from "./ScholarshipReview";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    axiosProvider
      .get(`/scholarships/${id}`)
      .then((res) => {
        setScholarship(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!scholarship) return <Loader />;

  const feeCard = (
    <div className="space-y-5">
      <div className="rounded-xl p-5 bg-linear-to-r from-green-200 to-emerald-100 text-green-700 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Application Fees</h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Application Fee</span>
            <span>${scholarship?.applicationFees}</span>
          </div>

          <div className="flex justify-between">
            <span>Service Charge</span>
            <span>${scholarship.serviceCharge}</span>
          </div>

          <div className="border-t border-green-800 pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>
              $
              {Number(scholarship.applicationFees) +
                Number(scholarship.serviceCharge)}
            </span>
          </div>
        </div>

        <Link
          to="/payment"
          state={{ scholarship }}
          rel="noreferrer"
          className="block mt-5 w-full bg-green-600 text-white font-semibold py-3 rounded-md text-center hover:bg-green-800 transition">
          Apply For Scholarship
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-transparent">
          <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
            <div className="w-full lg:w-5/12 xl:w-6/12">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={scholarship.universityImage}
                  alt={scholarship.scholarshipName}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                />
              </div>
              <div className="hidden mt-4 lg:block">{feeCard}</div>
            </div>

            <div className="w-full lg:w-7/12 xl:w-6/12 flex flex-col justify-between gap-10">
              <div className="text-center sm:text-left">
                <h1 className="text-[27px] sm:text-4xl font-bold">
                  {scholarship.scholarshipName}
                </h1>

                <p className="mt-2 text-gray-500">
                  by{" "}
                  <span className="font-medium text-green-600">
                    {scholarship.universityName}
                  </span>
                  <span className="ml-2 text-pink-500">
                    (Rank: {scholarship.universityWorldRank})
                  </span>
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {scholarship.universityCity}, {scholarship.universityCountry}
                </p>

                <div className="flex justify-center sm:justify-start gap-2 mt-3">
                  <span className="px-3 py-1 bg-primary text-white text-xs rounded-full">
                    {scholarship.degree || "Bachelor"}
                  </span>
                  <span className="px-3 py-1 bg-green-600 text-white text-xs rounded-full">
                    {scholarship.subjectCategory}
                  </span>
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
                    {scholarship.scholarshipCategory}
                  </span>
                </div>
              </div>

              <div className="rounded-xl p-6 h-full bg-gray-100 text-gray-800 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Scholarship Details
                </h3>

                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  <span className="font-semibold text-gray-900">
                    {scholarship.universityName || "University Name"}
                  </span>{" "}
                  is a globally recognized institution located in{" "}
                  <span className="font-medium">
                    {scholarship.universityCity || "City"},{" "}
                    {scholarship.universityCountry || "Country"}
                  </span>
                  , known for its academic excellence and research-driven
                  environment. The university is offering a{" "}
                  <span className="font-medium">
                    {scholarship.degree || "Bachelor"}
                  </span>{" "}
                  degree scholarship for eligible domestic and international
                  students across selected subjects and academic disciplines.
                  <br />
                  <br />
                  This scholarship is categorized as a{" "}
                  <span className="font-semibold text-green-700">
                    Full Fund
                  </span>{" "}
                  opportunity, which significantly reduces the financial burden
                  of higher education by covering major academic expenses such
                  as tuition fees and essential university-related costs.
                  <br />
                  <br />
                </p>

                <div className="flex justify-between gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Deadline</p>
                    <p className="font-medium text-red-600">
                      {scholarship.applicationDeadline}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Posted On</p>
                    <p className="font-medium">
                      {scholarship.scholarshipPostDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:hidden">{feeCard}</div>
            </div>
          </div>
        </div>

        <ScholarshipReview id={id}/>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
