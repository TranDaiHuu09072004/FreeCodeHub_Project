import Button from "@/app/components/Button";
import InputSearch from "@/app/components/InputSearch";
import Link from "next/link";
type BannerBlog = {
  name: string;
  description: string;
  placeholder?: string;
  isSearch?: boolean;
  isButton?: boolean;
};
const Banner_Blog = ({
  name,
  description,
  placeholder,
  isSearch,
  isButton,
}: BannerBlog) => {
  return (
    <>
      <section className="banner_home flex justify-center items-center rounded-[10px] p-[20px] py-[50px] px-[80px] bg-[#1A1F2B]">
        <div className="content_banner text-center">
          <h1 className="text-[32px] text-white font-bold leading-10 mb-[10px] ">
            {name}
          </h1>
          <p className="max-w-[600px] text-[14px] text-[#798595] font-normal mb-[10px]">
            {description}
          </p>
          {isSearch && (
            <InputSearch placeholder={placeholder} w="470px" h="37px" />
          )}
          {isButton && (
            <div className="flex justify-center gap-x-[10px]">
              <Link href="/courses">
                {" "}
                <Button className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer">
                  Khám phá khóa học
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-[#798595] bg-[#101013] py-[10px] px-[30px] rounded-[5px] cursor-pointer">
                  Đăng ký tài khoản
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Banner_Blog;
