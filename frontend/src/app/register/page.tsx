import Button from "@/app/components/User/Button";
import Link from "next/link";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121826] lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <div className="form_register bg-[#1A1F2B] w-[433px] p-8 rounded-[10px]">
        <h1 className="text-white text-[25px] text-center font-medium mb-2">
          Tạo tài khoản
        </h1>
        <span className="text-[#7B8798] text-center block mb-8">
          Nhập thông tin của bạn để tạo tài khoản mới
        </span>
        <form action="">
          <div className="mb-5">
            <h3 className="text-white text-[16px] mb-2">Họ tên</h3>
            <input
              type="text"
              placeholder="Vui lòng nhập họ và tên"
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px]"
            />
          </div>
          <div className="mb-5">
            <h3 className="text-white text-[16px] mb-2">Mật khẩu</h3>
            <input
              type="password"
              placeholder="Vui lòng nhập mật khẩu"
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px]"
            />
          </div>
          <div className="mb-8">
            <h3 className="text-white text-[16px] mb-2">Nhập lại mật khẩu</h3>
            <input
              type="password"
              placeholder="Vui lòng nhập lại mật khẩu"
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px]"
            />
          </div>
          <Button
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
