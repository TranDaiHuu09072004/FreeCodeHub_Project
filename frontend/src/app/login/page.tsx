import Button from "@/app/components/Button";
import Link from "next/link";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121826]">
      <div className="form_register bg-[#1A1F2B] w-[433px] p-8 rounded-[10px]">
        <h1 className="text-white text-[25px] text-center font-medium mb-2">
          Đăng Nhập
        </h1>
        <span className="text-[#7B8798] text-center block mb-8">
          Nhập tài khoản và mật khẩu để đăng nhập
        </span>
        <form action="">
          <div className="mb-5">
            <h3 className="text-white text-[16px] mb-2">Tên đăng nhập</h3>
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
          <Button
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
              className="bg-gradient-to-r font-bold from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent hover:underline"
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
