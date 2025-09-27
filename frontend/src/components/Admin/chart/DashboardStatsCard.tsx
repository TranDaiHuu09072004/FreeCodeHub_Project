import React from "react";

interface DashboardStatsCardProps {
  title: string;
  value: string;
  icon: string;
  change: string;
  color: string;
}

const DashboardStatsCard = ({
  title,
  value,
  icon,
  change,
}: DashboardStatsCardProps) => {
  const isPositive = !change.includes("-") && !change.includes("down");
  return (
    <div className="bg-[#1a1f2b] flex items-center justify-between p-[24px] rounded-[10px] w-[280px]">
      <div className="content">
        <div className="title">
          <h3 className="text-[#94a3b8] text-[14px] font-medium">{title}</h3>
        </div>
        <div className="value">
          <p className="text-white text-[30px] font-bold">{value}</p>
        </div>
        <div className="change flex items-center gap-[10px] text-[13px]">
          <span
            className={
              isPositive
                ? "text-green-500 flex items-center"
                : "text-red-500 flex items-center"
            }
          >
            {" "}
            {isPositive ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
            {change}
          </span>
          <span className="text-[#94a3b8]">So với tháng trước</span>
        </div>
      </div>
      <div className="icon p-[16px] bg-[#7c3aed1a] rounded-full">
        <i className={icon}></i>
      </div>
    </div>
  );
};

export default DashboardStatsCard;
