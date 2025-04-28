"use client";
import Button from "@/app/components/User/Button";
import Footer from "@/app/layout/Footer";
import { useState } from "react";
import { useTheme } from "next-themes";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [profileData, setProfileData] = useState({
    fullName: "Trần Đại Hữu",
    email: "trandaihuu4764@gmail.com",
    bio: "Sinh viên năm cuối Fpoly",
  });

  const handleProfileUpdate = () => {
    // Handle profile update logic here
    console.log("Profile updated:", profileData);
  };

  const tabs = [
    {
      id: "profile",
      label: "Hồ sơ",
      icon: "fa-solid fa-user",
    },
    {
      id: "password",
      label: "Mật khẩu",
      icon: "fa-solid fa-lock",
    },
    {
      id: "theme",
      label: "Giao diện",
      icon: "fa-solid fa-moon",
    },
  ];

  const themeDarkMode = [
    {
      id: "light",
      label: "light",
    },
    {
      id: "dark",
      label: "dark",
    },
  ];
  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <section className="setting_page bg-[#1F212C] rounded-[10px] xl:p-[35px] max-sm:p-5 mb-[35px]">
        <h1 className="text-white text-[25px] font-bold mb-[10px]">
          Cài đặt tài khoản
        </h1>
        <p className="text-[#8795A8] mb-[35px]">
          Quản lý cài đặt tài khoản và tùy chỉnh trải nghiệm của bạn.
        </p>
        <div className="toggle_btn flex gap-4 mb-[35px]">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              children={tab.label}
              icon={tab.icon}
              onClick={() => setActiveTab(tab.id)}
              className={`xl:px-4 xl:py-2 max-sm:py-2 max-sm:px-1 transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white rounded-[10px] font-bold"
                  : "bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent rounded-[10px] font-bold"
              }`}
            />
          ))}
        </div>

        <div className="content">
          {activeTab === "profile" && (
            <div className="profile-section">
              <div className="flex max-sm:flex-col items-start gap-8">
                <div className="xl:w-[120px] max-sm:w-full">
                  <img
                    src="https://github.com/shadcn.png"
                    alt="Profile"
                    className="rounded-full w-[120px] h-[120px] object-cover max-sm:mx-auto"
                  />
                  <Button
                    children="Thay đổi"
                    className="text-white mt-4 bg-gradient-to-r from-[#eaafc8] to-[#654ea3] px-4 py-2 rounded-[10px] w-full"
                  />
                </div>
                <div className="xl:flex-1 max-sm:w-full">
                  <div className="mb-5">
                    <label className="block text-white mb-2">Họ tên</label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          fullName: e.target.value,
                        })
                      }
                      className="xl:w-[554px] max-sm:w-full bg-[#141625] text-white p-4 rounded-[5px] border border-[#8795A8] focus:outline-none focus:border-[#eaafc8] h-[40px]"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      className="xl:w-[554px] max-sm:w-full bg-[#141625] text-white p-4 rounded-[5px] border border-[#8795A8] focus:outline-none focus:border-[#eaafc8] h-[40px]"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-white mb-2">Giới thiệu</label>
                    <input
                      type="text"
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      className="xl:w-[554px] max-sm:w-full bg-[#141625] text-white p-4 rounded-[5px] border border-[#8795A8] focus:outline-none focus:border-[#eaafc8] h-[40px]"
                    />
                  </div>
                  <Button
                    children="Cập nhật hồ sơ"
                    onClick={handleProfileUpdate}
                    className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] px-4 py-2 rounded-[10px] xl:w-[150px] max-sm:w-full"
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "password" && (
            <div className="change_password max-sm:w-full">
              <h1 className="text-white text-[25px] font-bold mb-[10px]">
                Đổi mật khẩu
              </h1>
              <p className="text-[#8795A8] mb-[25px]">
                Cập nhật mật khẩu đăng nhập của bạn
              </p>
              <div className="flex-1">
                <div className="mb-5 xl:w-[554px] ">
                  <label className="block text-white mb-2">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="text"
                    placeholder="Enter password"
                    className="w-full bg-[#141625] text-white p-4 rounded-[5px] border border-[#8795A8] focus:outline-none focus:border-[#eaafc8] h-[40px]"
                  />
                </div>
                <div className="mb-5 xl:w-[554px] ">
                  <label className="block text-white mb-2">Mật khẩu mới</label>
                  <input
                    type="email"
                    placeholder="Enter new password"
                    className="w-full bg-[#141625] text-white p-4 rounded-[5px] border border-[#8795A8] focus:outline-none focus:border-[#eaafc8] h-[40px]"
                  />
                </div>
                <div className="mb-5 xl:w-[554px] ">
                  <label className="block text-white mb-2">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="text"
                    placeholder="Enter re-password"
                    className="w-full bg-[#141625] text-white p-4 rounded-[5px] border border-[#8795A8] focus:outline-none focus:border-[#eaafc8] h-[40px]"
                  />
                </div>
                <Button
                  children="Cập nhật mật khẩu"
                  onClick={handleProfileUpdate}
                  className="xl:w-[200px] max-sm:w-full text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] px-2 py-2 rounded-[10px] "
                />
              </div>
            </div>
          )}
          {activeTab === "theme" && (
            <div className="change-theme">
              <h1 className="text-white text-[25px] font-bold mb-[10px]">
                Giao diện
              </h1>
              <p className="text-[#8795A8] mb-[25px]">
                Tùy chỉnh giao diện người dùng theo sở thích của bạn
              </p>
              <h1 className="text-white text-[18px] font-bold mb-[10px]">
                Chế độ sáng/tối
              </h1>
              <p className="text-[#8795A8] mb-[25px]">
                Chọn chế độ sáng/tối theo hệ thống
              </p>
              <div className="active_darkmode flex gap-4 ">
                {themeDarkMode.map((item) => (
                  <Button
                    key={item.id}
                    children={item.label}
                    onClick={() =>
                      setTheme(resolvedTheme === "light" ? "dark" : "light")
                    }
                    className={`px-4 py-2 transition-all ${
                      theme === item.id
                        ? "bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white rounded-[10px] font-bold"
                        : "bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent rounded-[10px] font-bold"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Setting;
