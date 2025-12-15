import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import axiosProvider from "../../../../API/axiosProvider";

const Analytics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFeesCollected, setTotalFeesCollected] = useState(0);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [uniData, setUniData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const COLORS = ["#22c55e", "#3B82F6", "#EC4899", "#15803d"];

  useEffect(() => {
    const loadAnalytics = async () => {
      const [usersRes, appsRes, scholarshipsRes] = await Promise.all([
        axiosProvider.get("/users"),
        axiosProvider.get("/applications"),
        axiosProvider.get("/scholarships"),
      ]);

      const users = usersRes.data || [];
      const applications = appsRes.data || [];
      const scholarships = scholarshipsRes.data || [];

      setTotalUsers(users.length);
      setTotalScholarships(scholarships.length);

      const fees = applications
        .filter((a) => a.paymentStatus === "PAID")
        .reduce(
          (sum, a) =>
            sum + Number(a.applicationFees || 0) + Number(a.serviceCharge || 0),
          0
        );
      setTotalFeesCollected(fees);

      const uniMap = {};
      applications.forEach((a) => {
        uniMap[a.universityName] = (uniMap[a.universityName] || 0) + 1;
      });

      setUniData(
        Object.entries(uniMap).map(([university, applications]) => ({
          university,
          applications,
        }))
      );

      const categoryMap = {};
      applications.forEach((a) => {
        categoryMap[a.scholarshipCategory] =
          (categoryMap[a.scholarshipCategory] || 0) + 1;
      });

      setCategoryData(
        Object.entries(categoryMap).map(([name, value]) => ({
          name,
          value,
        }))
      );
    };

    loadAnalytics();
  }, []);

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="grid grid-cols-1 text-center md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-green-200 rounded-xl shadow border border-base-300">
          <h3 className="text-gray-600 text-sm">Total Users</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{totalUsers}</p>
        </div>

        <div className="p-6 bg-green-200 rounded-xl shadow border border-base-300">
          <h3 className="text-gray-600 text-sm">Total Fees Collected</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${totalFeesCollected.toLocaleString()}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-green-200 shadow border border-base-300">
          <h3 className="text-gray-600 text-sm">Total Scholarships</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {totalScholarships}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="py-6 pr-6 bg-base-100 rounded-xl shadow border border-base-300">
          <h3 className="text-lg px-6 font-semibold mb-4">
            Applications per University
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={uniData}>
              <XAxis dataKey="university" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="applications"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="px-5 pb-1 pt-6 bg-base-100 rounded-xl shadow border border-base-300 h-110">
          <h3 className="text-lg font-semibold mb-4">
            Applications by Scholarship Category
          </h3>
          <ResponsiveContainer width="100%" height={330}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label>
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
