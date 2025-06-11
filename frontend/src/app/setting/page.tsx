"use client";
import Button from "@/components/User/Button";
import Footer from "@/app/layout/Footer";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";

const Setting = () => {
  // State variables for profile data
  const router = useRouter();
  const { user, loading } = useAuth();
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileDateOfBirth, setProfileDateOfBirth] = useState("");
  const [profileAvatar, setProfileAvatar] = useState("");
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("profile");
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userParse = JSON.parse(user);
      setProfileName(userParse.name || "");
      setProfileEmail(userParse.email || "");
      setProfileDateOfBirth(
        userParse.date_of_birth
          ? new Date(userParse.date_of_birth).toISOString().split("T")[0]
          : ""
      );
      setProfileAvatar(userParse.avatar || "");
    }
  }, []);

  const handleChangePassWord = async () => {
    try {
      if (newPassword != confirmPassword) {
        toast.error("Mật khẩu mới và xác nhận không khớp");
      }

      const token = localStorage.getItem("token");

      await axiosInstance.post(
        "/change-password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Mật khẩu đã được thay đổi thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đổi mật khẩu");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      Swal.fire({
        title: "Bạn chưa đăng nhập",
        text: "Vui lòng đăng nhập để xem thông tin của bạn!.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#654ea3",
        cancelButtonColor: "#1a1f2b",
        confirmButtonText: "Đăng nhập ngay",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        } else {
          router.push("/");
        }
      });
      return;
    }
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedAvatarFile(null);
    }
  };

  const handleProfileUpdate = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast.error("User not found!");
      return;
    }

    const userParse = JSON.parse(user);
    const token = userParse.token;
    console.log(token);
    if (!token) {
      toast.error("Authentication token not found!");
      return;
    }

    const formData = new FormData();
    formData.append("name", profileName);
    formData.append("email", profileEmail);
    formData.append("date_of_birth", profileDateOfBirth);

    if (selectedAvatarFile) {
      formData.append("avatar", selectedAvatarFile);
    }

    try {
      const response = await axiosInstance.put("/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.user) {
        const updatedUser = { ...userParse, ...response.data.user };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setProfileAvatar(response.data.user.avatar || profileAvatar); // Cập nhật avatar mới ngay

        toast.success("Cập nhật thông tin thành công!");
      } else {
        toast.error("Cập nhật thông tin thất bại!");
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(
          `Lỗi: ${error.response.data.message || "Cập nhật thất bại!"}`
        );
      } else if (error instanceof Error) {
        toast.error("Lỗi: " + error.message);
      } else {
        toast.error("Đã xảy ra lỗi không xác định.");
      }
    }
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
      <ToastContainer />
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
                  {/* Use profileAvatar state for img src */}
                  <img
                    src={profileAvatar || "/default-avatar.png"} // Fallback avatar
                    alt="Profile"
                    className="rounded-full w-[120px] h-[120px] object-cover max-sm:mx-auto"
                  />
                  <input
                    type="file"
                    accept="image/*" // Accept only image files
                    onChange={handleAvatarChange} // Add onChange handler
                    className="text-white mt-4 bg-gradient-to-r from-[#eaafc8] to-[#654ea3] px-4 py-2 rounded-[10px] w-full"
                  />
                </div>
                <div className="xl:flex-1 max-sm:w-full">
                  <div className="mb-5">
                    <label className="block text-white mb-2">Họ tên</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="xl:w-[554px] max-sm:w-full bg-[#141625] text-white p-4 rounded-[5px] border border-[#8795A8] focus:outline-none focus:border-[#eaafc8] h-[40px]"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="xl:w-[554px] max-sm:w-full bg-[#141625] text-white p-4 rounded-[5px] border border-[#8795A8] focus:outline-none focus:border-[#eaafc8] h-[40px]"
                    />
                  </div>
                  <div className="mb-5">
                    <label className="block text-white mb-2">
                      Ngày tháng năm sinh
                    </label>
                    <input
                      type="date"
                      value={profileDateOfBirth}
                      onChange={(e) => setProfileDateOfBirth(e.target.value)}
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
                    type="password"
                    placeholder="Enter password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-[#141625] text-white p-4 rounded-[5px] border border-[#8795A8] focus:outline-none focus:border-[#eaafc8] h-[40px]"
                  />
                </div>
                <div className="mb-5 xl:w-[554px] ">
                  <label className="block text-white mb-2">Mật khẩu mới</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-[#141625] text-white p-4 rounded-[5px] border border-[#8795A8] focus:outline-none focus:border-[#eaafc8] h-[40px]"
                  />
                </div>
                <div className="mb-5 xl:w-[554px] ">
                  <label className="block text-white mb-2">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter re-password"
                    className="w-full bg-[#141625] text-white p-4 rounded-[5px] border border-[#8795A8] focus:outline-none focus:border-[#eaafc8] h-[40px]"
                  />
                </div>
                <Button
                  children="Cập nhật mật khẩu"
                  onClick={handleChangePassWord}
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
