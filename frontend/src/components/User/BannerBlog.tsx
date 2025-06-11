import Button from "@/components/User/Button";
import InputSearch from "@/components/User/InputSearch";
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
      <section className="banner_home flex justify-center items-center rounded-[10px] max-[1080px]:h-[16rem] max-[1080px]:p-5 max-sm:h-full max-sm:p-[2rem] min-[1080px]:p-[32px] 2xl:p-[20px] 2xl:py-[30px] 2xl:px-[80px] bg-[#1A1F2B]">
        <div className="content_banner text-center">
          <h1 className="text-[32px] text-white font-bold leading-10 mb-[10px] ">
            {name}
          </h1>
          <p className="max-w-[600px] text-[14px] text-[#798595] font-normal mb-[10px]">
            {description}
          </p>
          {isSearch && (
            <InputSearch placeholder={placeholder} w="470px" h="37px"  className="search_courses flex justify-center items-center mx-auto w-[250px] max-xl:mb-[10px]" />
          )}
          {isButton && (
            <div className="flex max-xl:flex-col xl:justify-center max-xl:justify-between gap-[20px]">
              <Link href="/courses">
                {" "}
                <Button className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[25px] rounded-[5px] cursor-pointer">
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
