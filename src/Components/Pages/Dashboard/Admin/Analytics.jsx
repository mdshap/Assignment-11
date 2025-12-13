import React from "react";
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

const Analytics = () => {
  // Dummy Summary Data
  const totalUsers = 1250;
  const totalFeesCollected = 45200;
  const totalScholarships = 320;

  const uniData = [
    { university: "Harvard", applications: 120 },
    { university: "Toronto", applications: 95 },
    { university: "Tokyo", applications: 80 },
    { university: "Oxford", applications: 110 },
    { university: "Melbourne", applications: 70 },
  ];

  const categoryData = [
    { name: "Full Funded", value: 150 },
    { name: "Semi Funded", value: 90 },
    { name: "Merit-based", value: 55 },
    { name: "Need-based", value: 40 },
  ];

  const COLORS = ["#22c55e", "#86efac", "#4ade80", "#15803d"];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 rounded-xl bg-base-100 shadow border border-base-300">
          <h3 className="text-gray-600 text-sm">Total Users</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{totalUsers}</p>
        </div>

        <div className="p-6 rounded-xl bg-base-100 shadow border border-base-300">
          <h3 className="text-gray-600 text-sm">Total Fees Collected</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${totalFeesCollected.toLocaleString()}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-base-100 shadow border border-base-300">
          <h3 className="text-gray-600 text-sm">Total Scholarships</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {totalScholarships}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className="p-6 bg-base-100 rounded-xl shadow border border-base-300">
          <h3 className="text-lg font-semibold mb-4">
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

        {/* Pie Chart */}
        <div className="px-3 py-2 bg-base-100 rounded-xl shadow border border-base-300 h-110">
          <h3 className="text-lg font-semibold mb-4">
            Applications by Scholarship Category
          </h3>
          <ResponsiveContainer width="100%" height={330}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#22c55e"
                dataKey="value"
                label>
                {categoryData.map((entry, index) => (
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
