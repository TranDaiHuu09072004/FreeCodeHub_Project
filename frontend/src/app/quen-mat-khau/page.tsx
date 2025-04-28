import Button from "@/app/components/User/Button";
import Link from "next/link";
const ChangePassWord = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121826]">
      <div className="form_register bg-[#1A1F2B] w-[433px] p-8 rounded-[10px]">
        <h1 className="text-white text-[25px] text-center font-medium mb-2">
          Quên mật khẩu
        </h1>
        <span className="text-[#7B8798] text-center block mb-8">
          Nhập Email của bạn tôi sẽ cung cấp mã để cập nhật mật khẩu mới
        </span>
        <form action="">
          <div className="mb-5">
            <h3 className="text-white text-[16px] mb-2">Email</h3>
            <input
              type="text"
              placeholder="Vui lòng nhập email"
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px]"
            />
          </div>
          <Button
            children="Gửi"
            className="w-full text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-3 px-4 rounded-[5px] cursor-pointer font-medium"
          />
          <p className="text-center mt-4 text-[#7B8798]">
            <Link
              href="/login"
              className="bg-gradient-to-r font-bold from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent hover:underline"
            >
              Quay lại trang đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChangePassWord;
