import Image from "next/image";
import Link from "next/link";

type Banner = {
  name: string;
  description: string;
  showButton?: boolean;
  image?: string;
  isBlog?: boolean;
  isSearch?: boolean;
  placeholder?: string;
};
const Banner = ({ name, description, showButton, image }: Banner) => {
  return (
    <>
      <section className="banner_home w-[100%] flex justify-between items-center rounded-[10px] max-[1080px]:h-[16rem] max-[1080px]:p-5 max-sm:h-full max-sm:p-[2rem] min-[1080px]:p-[32px] 2xl:p-[20px] 2xl:py-[30px] 2xl:px-[80px] bg-gradient-to-l from-[#eaafc8] to-[#654ea3]">
        <div className="content_banner min-[1046px]:w-[50%] max-lg:w-full">
          <h1 className="text-[32px] text-white font-bold leading-10 mb-[10px] ">
            {name}
          </h1>
          <p className="text-[14px] text-white font-normal mb-[10px]">
            {description}
          </p>
          {/* {isSearch && (
            <InputSearch
              placeholder={placeholder}
              w="470px"
              h="40px"
              onResults=""
              className="search_courses flex justify-center items-center mx-auto w-[250px] max-xl:mb-[10px]"
            />
          )} */}
          {showButton && (
            <Link
              href="/courses"
              className="bg-[#E7E3E3] rounded-[30px] py-2 px-4 text-[#121826] inline-block cursor-pointer"
            >
              Xem ngay
            </Link>
          )}
        </div>
        <div className="img_banner relative h-[50%]  min-[1046px]:w-[50%] min-[1046px]:block max-[1080px]:hidden">
          <Image
            src={
              image && (image.startsWith("/") || image.startsWith("http"))
                ? image
                : "/assets/img/banner_img.png"
            }
            fill
            alt=""
            className="object-cover 2xl:ml-[207px] max-2xl:ml-auto max-lg:hidden"
          />
        </div>
      </section>
    </>
  );
};

export default Banner;
