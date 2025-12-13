import React, { useState, useRef } from "react";
import { FaImage, FaPlus } from "react-icons/fa";


const AddScholarship = ({
  userEmail = "aisha.rahman@example.com",
}) => {
  const initial = {
    name: "",
    university: "",
    image: null,
    country: "",
    city: "",
    worldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    deadline: "",
    postDate: new Date().toISOString().slice(0, 10),
    userEmail: userEmail,
  };

  const [form, setForm] = useState(initial);
  const [imgUploading, setImgUploading] = useState(false); 
  const fileRef = useRef(null);

  const handleImageSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImgUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setForm((p) => ({ ...p, image: reader.result }));
      setImgUploading(false);
    };
    reader.onerror = () => {
      alert("Failed to read image");
      setImgUploading(false);
    };
    reader.readAsDataURL(f);
  };

  const validate = () => {
    if (!form.name.trim()) return "Scholarship name is required";
    if (!form.university.trim()) return "University name is required";
    return null;
  };

  const addScholarship = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    setForm({ ...initial, userEmail: userEmail });
    if (fileRef.current) fileRef.current.value = "";

    alert("Scholarship added locally — integrate backend later.");
  };

  const resetForm = () => {
    setForm({ ...initial, userEmail });
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className=" mx-3 sm:max-w-[500px] md:max-w-[510px] lg:max-w-[800px] xl:max-w-[1200px] sm:mx-auto my-4 w-full  bg-base-100 shadow rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Add Scholarship</h3>

      <form
        onSubmit={addScholarship}
        >
       

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
            
            <label
              htmlFor="sch-image"
              className="inline-flex items-center gap-2 px-3 py-2 rounded bg-base-200 cursor-pointer">
              <FaImage /> {imgUploading ? "Loading..." : "Upload Image"}
            </label>
            {form.image ? (
              <img
                src={form.image}
                alt="preview"
                className="w-20 h-12 object-cover rounded"
              />
            ) : (
              <div className="w-20 h-12 bg-base-200 flex items-center justify-center rounded text-sm text-base-content/50">
                No image
              </div>
            )}
          </div>
        </div>
        <br />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div >
          <label className="text-sm text-base-content/70">
            Scholarship Name
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
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
            value={form.university}
            onChange={(e) =>
              setForm((p) => ({ ...p, university: e.target.value }))
            }
            className="w-full px-3 py-2 rounded border bg-base-200"
            placeholder="e.g. University of Example"
            required
          />
        </div>


        <div>
          <label className="text-sm text-base-content/70">Country</label>
          <input
            value={form.country}
            onChange={(e) =>
              setForm((p) => ({ ...p, country: e.target.value }))
            }
            className="w-full px-3 py-2 rounded border bg-base-200"
          />
        </div>


        <div>
          <label className="text-sm text-base-content/70">City</label>
          <input
            value={form.city}
            onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            className="w-full px-3 py-2 rounded border bg-base-200"
          />
        </div>

    
        <div>
          <label className="text-sm text-base-content/70">World Rank</label>
          <input
            value={form.worldRank}
            onChange={(e) =>
              setForm((p) => ({ ...p, worldRank: e.target.value }))
            }
            className="w-full px-3 py-2 rounded border bg-base-200"
          />
        </div>

    
        <div>
          <label className="text-sm text-base-content/70">
            Subject Category
          </label>
          <input
            value={form.subjectCategory}
            onChange={(e) =>
              setForm((p) => ({ ...p, subjectCategory: e.target.value }))
            }
            className="w-full px-3 py-2 rounded border bg-base-200"
          />
        </div>

    
        <div>
          <label className="text-sm text-base-content/70">
            Scholarship Category
          </label>
          <select
            value={form.scholarshipCategory}
            onChange={(e) =>
              setForm((p) => ({ ...p, scholarshipCategory: e.target.value }))
            }
            className="w-full px-3 py-2 rounded border bg-base-200">
            <option value="">Select</option>
            <option>Full Funded</option>
            <option>Semi Funded</option>
            <option>Merit-based</option>
            <option>Need-based</option>
          </select>
        </div>

      
        <div>
          <label className="text-sm text-base-content/70">Degree</label>
          <select
            value={form.degree}
            onChange={(e) => setForm((p) => ({ ...p, degree: e.target.value }))}
            className="w-full px-3 py-2 rounded border bg-base-200">
            <option value="">Select</option>
            <option>Bachelors</option>
            <option>Masters</option>
            <option>PhD</option>
          </select>
        </div>

     
        <div>
          <label className="text-sm text-base-content/70">
            Tuition Fees (optional)
          </label>
          <input
            value={form.tuitionFees}
            onChange={(e) =>
              setForm((p) => ({ ...p, tuitionFees: e.target.value }))
            }
            className="w-full px-3 py-2 rounded border bg-base-200"
          />
        </div>

     
        <div>
          <label className="text-sm text-base-content/70">
            Application Fees
          </label>
          <input
            value={form.applicationFees}
            onChange={(e) =>
              setForm((p) => ({ ...p, applicationFees: e.target.value }))
            }
            className="w-full px-3 py-2 rounded border bg-base-200"
          />
        </div>

    
        <div>
          <label className="text-sm text-base-content/70">Service Charge</label>
          <input
            value={form.serviceCharge}
            onChange={(e) =>
              setForm((p) => ({ ...p, serviceCharge: e.target.value }))
            }
            className="w-full px-3 py-2 rounded border bg-base-200"
          />
        </div>

   
        <div>
          <label className="text-sm text-base-content/70">Deadline</label>
          <input
            type="date"
            value={form.deadline}
            onChange={(e) =>
              setForm((p) => ({ ...p, deadline: e.target.value }))
            }
            className="w-full px-3 py-2 rounded border bg-base-200"
          />
        </div>

      
        <div>
          <label className="text-sm text-base-content/70">Post Date</label>
          <input
            type="date"
            value={form.postDate}
            onChange={(e) =>
              setForm((p) => ({ ...p, postDate: e.target.value }))
            }
            className="w-full px-3 py-2 rounded border bg-base-200"
          />
        </div>

      
        <div>
          <label className="text-sm text-base-content/70">User Email</label>
          <input
            value={form.userEmail}
            disabled
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
            className="px-4 py-2 rounded bg-green-500 text-white flex items-center gap-2">
            <FaPlus /> Add Scholarship
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddScholarship;