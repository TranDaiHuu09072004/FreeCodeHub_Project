"use client";
import { useTheme } from "next-themes";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
interface UserActivityChartProps {
  data: Array<{ name: string; users: number }>;
}

const UserActivityChart = ({ data }: UserActivityChartProps) => {
  const { theme } = useTheme();
  return (
    <div className="bg-[#1a1f2b] p-[24px] rounded-[10px]">
      <div className="title_active--users mb-5">
        <h3 className="text-white text-[30px] font-bold">
          Hoạt động người dùng
        </h3>
        <p className="text-[#94a3b8] text-[14px]">
          Người dùng hoạt động theo tháng
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
          <Line
            type="monotone"
            dataKey="users"
            stroke="#9b87f5"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
