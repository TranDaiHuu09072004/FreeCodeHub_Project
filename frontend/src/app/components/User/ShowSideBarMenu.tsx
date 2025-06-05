"use client";
import SidebarMobile from "@/app/components/Sidebar/SidebarMobile";
import { useState } from "react";
import { useAuth } from "@/app/Context/AuthContext"; // thêm dòng này

const ShowSideBarMenu = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useAuth(); // lấy user từ context

  // Xác định type sidebar dựa trên role
  let type = "client";
  if (user?.role === "admin") type = "admin";
  else if (user?.role === "author") type = "author"; // nếu Hữu muốn có sidebar riêng cho author

  return (
    <>
      {showSidebar && (
        <div className="max-[1364px]:block hidden w-1/2">
          <div
            className="fixed inset-0 bg-black/40 z-[999998]"
            onClick={() => setShowSidebar(false)}
          ></div>
          <div className="fixed top-0 left-0 h-full w-1/2 bg-[#1a1f2b] z-[999999] transition-all duration-300">
            <SidebarMobile
              className="w-1/2 h-full max-[1364px]:block 2xl:hidden"
              type={type}
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl z-[1000000]"
              onClick={() => setShowSidebar(false)}
            >
              <i className="fa-solid fa-xmark cursor-pointer"></i>
            </button>
          </div>
        </div>
      )}
      <div className="bar w-[50px] max-[1364px]:block min-[1364px]:hidden fixed right-[33px] max-lg:right-[16px] bottom-[40px] bg-gradient-to-l from-[#eaafc8] to-[#654ea3] py-[5px] px-[10px] rounded-[3px] text-center z-[999999]">
        <i
          className="fa-solid fa-bars text-white text-[30px] cursor-pointer"
          onClick={() => setShowSidebar(true)}
        ></i>
      </div>
    </>
  );
};

export default ShowSideBarMenu;
