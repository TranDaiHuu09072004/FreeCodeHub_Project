"use client";
import Button from "@/app/components/User/Button";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "@/app/utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginData = yup.object().shape({
  email: yup.string().required("Vui lòng nhập email"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải ít nhất 6 kí tự")
    .required("Mật khẩu không được để trống"),
});

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginData) });
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const res = await axios.post("/login", {
        email: data.email,
        password: data.password,
      });

      const token = res.data.token;
      const user = res.data;
      localStorage.setItem("token", token);
      login(user);
      toast.success("Đăng nhập thành công");
      setTimeout(() => {
        if (user.role === "admin") {
          router.push("/admin/dashboard");
        } else if (user.role === "author") {
          router.push("/admin/authors");
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (error) {
      toast.error("Tài khoản hoặc mật khẩu sai!!!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121826] lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4 ">
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
            className="w-full text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-3 px-4 rounded-[5px] cursor-pointer font-medium mb-2"
          />
          <p className="text-center text-[#90a3b8] text-[14px]">
            <Link href="/quen-mat-khau" className="">
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

export default Login;
