"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

interface UserDistributionChartProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
}

const UserDistributionChart = ({
  data,
  colors,
}: UserDistributionChartProps) => {
  const { theme } = useTheme();

  return (
    <div className="bg-[#1a1f2b] p-[24px] rounded-[10px]">
      <div className="title_active--users mb-5">
        <h3 className="text-white text-[30px] font-bold">Phân bố người dùng</h3>
        <p className="text-[#94a3b8] text-[14px]">Theo lĩnh vực học tập</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#333" : "#fff",
            }}
            formatter={(value) => [`${value}%`, "Tỉ lệ"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDistributionChart;
