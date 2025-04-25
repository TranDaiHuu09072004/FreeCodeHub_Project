import InputSearch from "@/app/components/InputSearch";

type Banner = {
  name: string;
  description: string;
  showButton?: boolean;
  image?: string;
  isBlog?: boolean;
  isSearch?: boolean;
  placeholder?: string;
};
const Banner = ({
  name,
  description,
  showButton,
  image,
  isBlog,
  isSearch,
  placeholder = "Tìm kiếm...",
}: Banner) => {
  return (
    <>
      <section
        className={`banner_home flex justify-between items-center rounded-[10px] p-[20px] py-[30px] px-[80px] ${
          isBlog
            ? "bg-[#1A1F2B]"
            : "bg-gradient-to-l from-[#eaafc8] to-[#654ea3]"
        }`}
      >
        <div className="content_banner w-[50%]">
          <h1 className="text-[32px] text-white font-bold leading-10 mb-[10px] ">
            {name}
          </h1>
          <p className="text-[14px] text-white font-normal mb-[10px]">
            {description}
          </p>
          {isSearch && (
            <InputSearch placeholder={placeholder} w="470px" h="40px" />
          )}
          {showButton && (
            <a
              href="#"
              className="bg-[#E7E3E3] rounded-[30px] py-2 px-4 text-[#121826] inline-block cursor-pointer"
            >
              Xem ngay
            </a>
          )}
        </div>
        <div className="img_banner w-[50%]">
          <img src={image} alt="" className="object-cover ml-[207px]" />
        </div>
      </section>
    </>
  );
};

export default Banner;
