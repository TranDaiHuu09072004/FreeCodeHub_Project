import Button from "@/components/User/Button";
const ChangePassWord = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121826]">
      <div className="form_register bg-[#1A1F2B] w-[433px] p-8 rounded-[10px]">
        <h1 className="text-white text-[25px] text-center font-medium mb-2">
          Thay đổi mật khẩu
        </h1>
        <span className="text-[#7B8798] text-center block mb-8">
          Nhập mật khẩu mới để thay đổi mật khẩu
        </span>
        <form action="">
          <div className="mb-5">
            <h3 className="text-white text-[16px] mb-2">Mật khẩu mới:</h3>
            <input
              type="password"
              placeholder="Vui lòng nhập mật khẩu mới"
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px]"
            />
          </div>
          <div className="mb-5">
            <h3 className="text-white text-[16px] mb-2">Nhập mật khẩu mới:</h3>
            <input
              type="password"
              placeholder="Vui lòng nhập lại mật khẩu mới"
              className="h-[40px] border-none outline-none bg-[#101013] text-[#90A3B8] px-4 w-full rounded-[5px]"
            />
          </div>
          <Button className="w-full text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-3 px-4 rounded-[5px] cursor-pointer font-medium">
            Cập nhật mật khẩu{" "}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassWord;
