"use client";
import Button from "@/components/User/Button";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "@/app/utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
const Registerschema = yup.object().shape({
  name: yup.string().required("Họ và tên không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải ít nhất 6 kí tự")
    .required("Mật khẩu không được để trống"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
});

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Registerschema) });
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await axios.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Đăng ký thành công");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      toast.error("Đăng ký thất bại");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121826] lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <ToastContainer />
      <div className="form_register bg-[#1A1F2B] w-[433px] p-8 rounded-[10px]">
        <h1 className="text-white text-[25px] text-center font-medium mb-2">
          Tạo tài khoản
        </h1>
        <span className="text-[#7B8798] text-center block mb-8">
          Nhập thông tin của bạn để tạo tài khoản mới
        </span>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <h3 className="text-white text-[16px] mb-2">Họ và tên</h3>
            <input
              type="text"
              placeholder="Vui lòng nhập họ và tên"
              {...register("name")}
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px] mb-2"
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>
          <div className="mb-2">
            <h3 className="text-white text-[16px] mb-2">Email đăng ký</h3>
            <input
              type="text"
              {...register("email")}
              placeholder="Vui lòng nhập email đăng ký"
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px] mb-2"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div className="mb-2">
            <h3 className="text-white text-[16px] mb-2">Mật khẩu</h3>
            <input
              type="password"
              {...register("password")}
              placeholder="Vui lòng nhập mật khẩu"
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px] mb-2"
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <div className="mb-8">
            <h3 className="text-white text-[16px] mb-2">Nhập lại mật khẩu</h3>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Vui lòng nhập lại mật khẩu"
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px] mb-2"
            />
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          </div>
          <Button
            type="submit"
            children="Đăng ký"
            className="w-full text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-3 px-4 rounded-[5px] cursor-pointer font-medium"
          />
          <p className="text-center mt-4 text-[#7B8798]">
            Đã có tài khoản?{" "}
            <Link
              href="/login"
              className="bg-gradient-to-r font-bold from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent hover:underline ml-1"
            >
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
