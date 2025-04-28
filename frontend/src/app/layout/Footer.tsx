import Link from "next/link";
const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="wrapper_footer grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-1">
          <div className="footer_main">
            <div className="footer_main--logo">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text drop-shadow leading-[60px]">
                <Link href="/">FreeCodeHub</Link>
              </h1>
              <p className="text-[#BEBDBD] text-[12px]">
                Nền tảng tổng hợp các khóa học lập trình web miễn phí chất lượng
                cao từ các kênh Youtube hàng đầu Việt Nam{" "}
              </p>
              <div className="linkind mt-[15px] flex">
                <span>
                  <Link href="#">
                    <i className="fa-brands fa-facebook-f text-[18px] text-[#BEBDBD] hover:text-white mx-[10px]"></i>
                  </Link>
                </span>
                <span>
                  <Link href="#">
                    <i className="fa-brands fa-twitter text-[18px] text-[#BEBDBD] hover:text-white mx-[10px]"></i>
                  </Link>
                </span>
                <span>
                  <Link href="#">
                    <i className="fa-brands fa-youtube text-[18px] text-[#BEBDBD] hover:text-white mx-[10px]"></i>
                  </Link>
                </span>
                <span>
                  <Link href="#">
                    <i className="fa-brands fa-instagram text-[18px] text-[#BEBDBD] hover:text-white mx-[10px]"></i>
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="list_footer--item max-xl:pl-5 max-sm:pl-0">
            <h1 className="text-white text-xl font-bold my-[15px]">
              Liên kết nhanh
            </h1>
            <ul>
              <li className="mb-[10px]">
                <Link href="/" className="text-[#BEBDBD] hover:text-white">
                  Trang Chủ
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link
                  href="/courses"
                  className="text-[#BEBDBD] hover:text-white"
                >
                  Khóa học
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="/blog" className="text-[#BEBDBD] hover:text-white">
                  Blog
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link
                  href="/about-us"
                  className="text-[#BEBDBD] hover:text-white"
                >
                  Về chúng tôi
                </Link>
              </li>
            </ul>
          </div>
          <div className="list_footer--item">
            <h1 className="text-white text-xl font-bold my-[15px]">
              Kênh đối tác
            </h1>
            <ul>
              <li className="mb-[10px]">
                <Link href="#" className="text-[#BEBDBD] hover:text-white">
                  F8 Offical
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="#" className="text-[#BEBDBD] hover:text-white">
                  Hỏi dân IT
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="#" className="text-[#BEBDBD] hover:text-white">
                  Evondev
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="#" className="text-[#BEBDBD] hover:text-white">
                  Được Dev
                </Link>
              </li>
            </ul>
          </div>
          <div className="list_footer--item">
            <h1 className="text-white text-xl font-bold my-[15px]">
              Danh mục khóa học
            </h1>
            <ul>
              <li className="mb-[10px]">
                <Link href="#" className="text-[#BEBDBD] hover:text-white">
                  Khóa học FrontEnd
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="#" className="text-[#BEBDBD] hover:text-white">
                  Khóa học BackEnd
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="#" className="text-[#BEBDBD] hover:text-white">
                  Khóa học FullStack
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="#" className="text-[#BEBDBD] hover:text-white">
                  Khóa học Mobile
                </Link>
              </li>
            </ul>
          </div>
          <div className="list_footer--item">
            <h1 className="text-white text-xl font-bold my-[15px]">Liên Hệ</h1>
            <ul className="-mb-[15px]">
              <li className="mb-[10px]">
                <Link href="#" className="text-[#BEBDBD] hover:text-white">
                  <i className="fa-solid fa-location-dot"></i> Hồ Chí Minh, Việt
                  Nam
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="#" className="text-[#BEBDBD] hover:text-white">
                  <i className="fa-solid fa-envelope"></i>{" "}
                  trandaihuu4766@gmail.com
                </Link>
              </li>
              <li className="mb-[10px]">
                <Link href="#" className="text-[#BEBDBD] hover:text-white">
                  <i className="fa-solid fa-phone"></i> 0392706777
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-[10px] border-b border-[#1F2937]"></div>
        <h1 className="text-center max-sm:text-[15px] my-[10px] text-[#BEBDBD] hover:text-white">
          © 2025 FreeCodeHub Project from Huudev with love{" "}
          <span className="max-sm:hidden">
            <i className="fa-solid fa-heart text-red-600 text-[20px] "></i>
          </span>
        </h1>
      </section>
    </>
  );
};

export default Footer;
