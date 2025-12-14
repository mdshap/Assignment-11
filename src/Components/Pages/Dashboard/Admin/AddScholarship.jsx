import React, { useState, useRef, use } from "react";
import { FaImage, FaPlus } from "react-icons/fa";
import { AuthContext } from "../../../../Authentication/AuthContext";
import axiosProvider from "../../../../API/axiosProvider";
import axios from "axios";
import toast from "react-hot-toast";

const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY;


const AddScholarship = () => {
  const { userFromDb } = use(AuthContext);

  const [imageUrl, setImageUrl] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const fileRef = useRef(null);
    const formRef = useRef(null)

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImgUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!res.data.success) {
        throw new Error("ImgBB upload failed");
      }

      setImageUrl(res.data.data.url); //
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setImgUploading(false);
    }
  };

  const addScholarship = async (e) => {
    e.preventDefault();

    const scholarshipInfo = {
      scholarshipName: e.target.scholarshipName.value,
      universityName: e.target.universityName.value,
      // universityImage: imageUrl,
      universityImage: e.target.image.value,
      universityCountry: e.target.universityCountry.value,
      universityCity: e.target.universityCity.value,
      universityWorldRank: e.target.universityWorldRank.value,
      subjectCategory: e.target.subjectCategory.value,
      scholarshipCategory: e.target.scholarshipCategory.value,
      degree: e.target.degree.value,
      applicationFees: e.target.applicationFees.value,
      serviceCharge: e.target.serviceCharge.value,
      applicationDeadline: e.target.applicationDeadline.value,
      scholarshipPostDate: e.target.scholarshipPostDate.value,
      postedUserEmail: e.target.postedUserEmail.value,
    };
    
    console.log(scholarshipInfo);
    
      await axiosProvider.post("/scholarships", scholarshipInfo)
    .then((res) => {
      if (res.data?.insertedId || res.status === 201) {
        resetForm();
        toast.success('Successfully Added')
        
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to add scholarship");
    });
  };

  const resetForm = () => {
    formRef.current.reset();
    setImageUrl(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <div className=" mx-3 sm:max-w-[500px] md:max-w-[510px] lg:max-w-[800px] xl:max-w-[1200px] sm:mx-auto my-4 w-full  bg-base-100 shadow rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Add Scholarship</h3>

      <form 
      ref={formRef}
      onSubmit={addScholarship}>
        <div className="w-full mx-auto">
          <label className="text-sm text-base-content/70">Image</label>
          <div className="flex w-full items-center gap-3">
            <input
              ref={fileRef}
              id="sch-image"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden md:block"
            />

<input
              name="image"
              className="w-full px-3 py-2 rounded border bg-base-200"
              placeholder="e.g. Global Merit Scholarship"
              required
            />
            <label
              htmlFor="sch-image"
              className="inline-flex items-center gap-2 px-3 py-2 rounded bg-base-200 cursor-pointer">
              <FaImage /> {imgUploading ? "Loading..." : "Upload Image"}
            </label>

          </div>
        </div>
        <br />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-base-content/70">
              Scholarship Name
            </label>
            <input
              name="scholarshipName"
              className="w-full px-3 py-2 rounded border bg-base-200"
              placeholder="e.g. Global Merit Scholarship"
              required
            />
          </div>

          <div>
            <label className="text-sm text-base-content/70">
              University Name
            </label>
            <input
              name="universityName"
              className="w-full px-3 py-2 rounded border bg-base-200"
              placeholder="e.g. University of Example"
              required
            />
          </div>

          <div>
            <label className="text-sm text-base-content/70">Country</label>
            <input
              name="universityCountry"
              className="w-full px-3 py-2 rounded border bg-base-200"
            />
          </div>

          <div>
            <label className="text-sm text-base-content/70">City</label>
            <input
              name="universityCity"
              className="w-full px-3 py-2 rounded border bg-base-200"
            />
          </div>

          <div>
            <label className="text-sm text-base-content/70">World Rank</label>
            <input
              name="universityWorldRank"
              className="w-full px-3 py-2 rounded border bg-base-200"
            />
          </div>

          <div>
            <label className="text-sm text-base-content/70">
              Subject Category
            </label>
            <input
              name="subjectCategory"
              className="w-full px-3 py-2 rounded border bg-base-200"
            />
          </div>

          <div>
            <label className="text-sm text-base-content/70">
              Scholarship Category
            </label>
            <select
              name="scholarshipCategory"
              className="w-full px-3 py-2 rounded border bg-base-200">
              <option value="">Select</option>
              <option>Full Fund</option>
              <option>Partial</option>
              <option>Self Fund</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-base-content/70">Degree</label>
            <select
              name="degree"
              className="w-full px-3 py-2 rounded border bg-base-200">
              <option value="">Select</option>
              <option>Bachelor</option>
              <option>Masters</option>
              <option>PhD</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-base-content/70">
              Application Fees
            </label>
            <input
              name="applicationFees"
              className="w-full px-3 py-2 rounded border bg-base-200"
            />
          </div>

          <div>
            <label className="text-sm text-base-content/70">
              Service Charge
            </label>
            <input
              name="serviceCharge"
              className="w-full px-3 py-2 rounded border bg-base-200"
            />
          </div>

          <div>
            <label className="text-sm text-base-content/70">Deadline</label>
            <input
              name="applicationDeadline"
              type="date"
              className="w-full px-3 py-2 rounded border bg-base-200"
            />
          </div>

          <div>
            <label className="text-sm text-base-content/70">Post Date</label>
            <input
              name="scholarshipPostDate"
              type="date"
              className="w-full px-3 py-2 rounded border bg-base-200"
            />
          </div>

          <div>
            <label className="text-sm text-base-content/70">User Email</label>
            <input
              name="postedUserEmail"
              disabled
              defaultValue={userFromDb.email}
              className="w-full px-3 py-2 rounded border bg-base-200"
            />
          </div>
        </div>

        <div className="col-span-1 mt-5 md:col-span-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded bg-base-200">
            Reset
          </button>
          <button
            type="submit"
            disabled={imgUploading}
            className="px-4 py-2 rounded bg-green-500 text-white flex items-center gap-2">
            <FaPlus /> Add Scholarship
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
