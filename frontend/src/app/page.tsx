import Sidebar from "@/app/components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div>
      <div className="wrapper_app flex">
        <Sidebar />
        <main className="ml-[287px] bg-[#121826] p-[56px]">
          <section className="banner_home flex justify-between items-center bg-gradient-to-l from-[#eaafc8] to-[#654ea3] rounded-[10px] p-[20px] py-[30px] px-[80px]">
            <div className="content_banner w-[50%]">
              <h1 className="text-[32px] text-white font-bold leading-10 mb-[10px]">
                Học lập trình miễn phí từ các chuyên gia
              </h1>
              <p className="text-[14px] text-white font-normal mb-[10px]">
                Khám phá kho tàng kiến thức lập trình web từ các kênh Youtube
                hàng đầu Việt Nam, tất cả đều miễn phí và chất lượng
              </p>
              <a
                href="#"
                className="bg-[#E7E3E3] rounded-[30px] py-2 px-4 text-[#121826] inline-block cursor-pointer"
              >
                Xem ngay
              </a>
            </div>
            <div className="img_banner w-[50%]">
              <img
                src="assets/img/banner_img.png"
                alt=""
                className="object-cover ml-[207px]"
              />
            </div>
          </section>
          <section className="course_popular mt-[35px]">
            <div className="relative pl-4">
              <div className="absolute top-0 left-0 h-full w-[10px] bg-gradient-to-b from-[#eaafc8] to-[#654ea3] rounded"></div>
              <h1 className="text-[25px] font-bold text-white">
                Khóa học nổi bật
              </h1>
            </div>
            <div className="wrapper_course mt-[35px] grid grid-cols-3 gap-[20px]">
              <div className="item_course bg-[#1A1F2B] rounded-b-[10px] hover:translate-y-[-10px] transition-all duration-300">
                <a href="#" className="text-decoration-none">
                  {" "}
                  <div className="img_course ">
                    <img
                      src="https://ninedev.net/backend/1730391899406-334418435.webp"
                      alt=""
                      className="w-[100%] h-[100%] rounded-t-[10px] object-cover "
                    />
                  </div>
                  <div className="content_course p-[25px]">
                    <h1 className="text-[20px] font-bold text-white mb-[10px]">
                      Xây dựng Website với ReactJS
                    </h1>
                    <div className="author flex items-center justify-between relative">
                      <div>
                        <img
                          src="https://yt3.googleusercontent.com/Pa8wyxqTOkhu5DW_RvkiQIS7Bsa7OW7gSen-2WpaQsC2EqUAkgubAg1_QPc951pzpN2F2Q4_TA=s160-c-k-c0x00ffffff-no-rj"
                          alt=""
                          className="author_img rounded-full w-[30px] h-[30px] inline-block mr-[10px]"
                        />
                        <span>
                          <strong className="text-white absolute">
                            F8 Offical
                          </strong>
                        </span>
                      </div>
                      <i className="text-[#E5E4E4] text-[14px] absolute top-[40%] right-0 translate-y-[-50%]">
                        Khóa học miễn phí
                      </i>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
