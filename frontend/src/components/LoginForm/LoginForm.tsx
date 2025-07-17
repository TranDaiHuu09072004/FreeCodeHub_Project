// src/components/Auth/LoginForm.tsx
"use client";

import Button from "@/components/User/Button";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "@/app/utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";

type Props = {
  roleScope: "admin" | "client"; // xác định login admin hay user
};

type LoginFormData = {
  email: string;
  password: string;
};

const LoginSchema = yup.object().shape({
  email: yup.string().required("Vui lòng nhập email"),
  password: yup.string().min(6).required("Vui lòng nhập mật khẩu"),
});

const LoginForm = ({ roleScope }: Props) => {
  const router = useRouter();
  const { login, logout } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const res = await axios.post("/login", data);
      const { token, role } = res.data;

      // ✅ Lưu token & user trước
      localStorage.setItem("token", token);
      login(res.data);
      console.log("Login res:", res.data);

      // ✅ Sau đó mới kiểm tra roleScope
      if (
        (roleScope === "admin" && role === "user") ||
        (roleScope === "client" && role !== "client")
      ) {
        toast.error("Không có quyền đăng nhập ở khu vực này!");
        // ✅ Xóa token + clear context nếu sai quyền
        localStorage.removeItem("token");
        logout(); // tùy cách Hữu thiết kế context
        return;
      }

      toast.success("Đăng nhập thành công");

      setTimeout(() => {
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else if (role === "author") {
          router.push("/admin/author");
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (error) {
      toast.error("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121826]">
      <ToastContainer />
      <div className="form_register bg-[#1A1F2B] w-[433px] p-8 rounded-[10px]">
        <h1 className="text-white text-[25px] text-center font-medium mb-2">
          Đăng Nhập
        </h1>
        <span className="text-[#7B8798] text-center block mb-8">
          Nhập tài khoản và mật khẩu để đăng nhập
        </span>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <h3 className="text-white text-[16px] mb-2">Tên đăng nhập</h3>
            <input
              type="text"
              placeholder="Vui lòng nhập họ và tên"
              {...register("email")}
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px]"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="mb-2">
            <h3 className="text-white text-[16px] mb-2">Mật khẩu</h3>
            <input
              type="password"
              {...register("password")}
              placeholder="Vui lòng nhập mật khẩu"
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px]"
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <Button
            type="submit"
            children="Đăng nhập"
            className="w-full text-white bg-gradient-to-r mt-2 from-[#eaafc8] to-[#654ea3] py-3 px-4 rounded-[5px] cursor-pointer font-medium mb-2"
          />
          <p className="text-center text-[#90a3b8] text-[14px]">
            <Link href="/forgot-password" className="">
              Quên mật khẩu
            </Link>
          </p>
          <p className="text-center mt-1 text-[#7B8798]">
            Chưa có tài khoản?
            <Link
              href="/register"
              className="bg-gradient-to-r font-bold from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent hover:underline ml-1"
            >
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
