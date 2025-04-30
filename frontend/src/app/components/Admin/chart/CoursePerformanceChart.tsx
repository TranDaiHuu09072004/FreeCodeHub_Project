"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

interface CoursePerformanceChartProps {
  data: Array<{ name: string; completions: number; views: number }>;
}

const CoursePerformanceChart = ({ data }: CoursePerformanceChartProps) => {
  const { theme } = useTheme();

  return (
    <div className="bg-[#1a1f2b] p-[24px] rounded-[10px]">
      <div className="title_active--users mb-5">
        <h3 className="text-white text-[30px] font-bold">Hiệu suất khóa học</h3>
        <p className="text-[#94a3b8] text-[14px]">Lượt xem và hoàn thành</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === "dark" ? "#444" : "#eee"}
          />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#333" : "#fff",
            }}
          />
          <Legend />
          <Bar dataKey="views" name="Lượt xem" fill="#9b87f5" />
          <Bar dataKey="completions" name="Hoàn thành" fill="#7E69AB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoursePerformanceChart;
