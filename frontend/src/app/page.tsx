import React from "react";
import Banner from "@/app/components/User/Banner";
import ItemProduct from "@/app/components/User/ItemProduct";
import Footer from "@/app/layout/Footer";
import ChannelAuthor from "@/app/components/User/ChanelAuthors";

const Home = () => {
  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <Banner
        name="Học lập trình miễn phí từ các chuyên gia"
        description="Khám phá kho tàng kiến thức lập trình web từ các kênh Youtube hàng
            đầu Việt Nam, tất cả đều miễn phí và chất lượng"
        showButton={true}
        image="../assets/img/banner_img.png"
      />
      <section className="course_popular my-[35px]">
        <div className="relative pl-4">
          <div className="absolute top-0 left-0 h-full w-[10px] bg-gradient-to-b from-[#eaafc8] to-[#654ea3] rounded"></div>
          <h1 className="text-[25px] font-bold text-white">Khóa học nổi bật</h1>
        </div>
        <div className="wrapper_course my-[35px] grid grid-cols-3 max-xl:grid-cols-1 gap-[20px]">
          <ItemProduct />
        </div>
      </section>
      <section className="max-sm:-mx-[16px] my-[35px] quantity bg-gradient-to-l from-[#eaafc8] to-[#654ea3] grid grid-cols-3 max-xl:grid-cols-1 max-lg:overflow-x-hidden">
        <div className="item_quantity flex flex-col items-center m-[30px] p-[30px] bg-[#CFDBE9] rounded-[10px]">
          <div className="icon_quantity">
            <i className="fa-solid fa-book-open text-[45px] text-white"></i>
          </div>
          <div className="content_quantity">
            <h1 className="text-white text-[50px] font-bold">200+</h1>
          </div>
          <div className="description_quantity">
            <p className="text-white font-bold">Khóa học chất lượng cao</p>
          </div>
        </div>
        <div className="item_quantity flex flex-col items-center m-[30px] p-[30px] bg-[#CFDBE9] rounded-[10px]">
          <div className="icon_quantity">
            <i className="fa-solid fa-tv text-[45px] text-white"></i>
          </div>
          <div className="content_quantity">
            <h1 className="text-white text-[50px] font-bold">500+</h1>
          </div>
          <div className="description_quantity">
            <p className="text-white font-bold">Video bài giảng lập trình</p>
          </div>
        </div>
        <div className="item_quantity flex flex-col items-center m-[30px] p-[30px] bg-[#CFDBE9] rounded-[10px]">
          <div className="icon_quantity">
            <i className="fa-solid fa-users text-[45px] text-white"></i>
          </div>
          <div className="content_quantity">
            <h1 className="text-white text-[50px] font-bold">200+</h1>
          </div>
          <div className="description_quantity">
            <p className="text-white font-bold">Học viên đã tham gia</p>
          </div>
        </div>
      </section>
      <section className="partner_channel my-[35px]">
        <div className="title_partner--channel text-center">
          <h1 className="text-[25px] text-white font-bold mb-[10px]">
            Kênh đối tác
          </h1>
          <p className="text-[#E5E4E4]">
            Chúng tôi tổng hợp nội dung từ các kênh Youtube hàng đầu tại Việt
            Nam
          </p>
        </div>
        <div className="wrapper_partner--channel grid grid-cols-2 max-md:grid-cols-1 gap-x-[10px] mt-[50px] place-items-center max-w-[700px] mx-auto gap-[30px]">
          <ChannelAuthor />
        </div>
      </section>
      <section className="student_say--about_us my-[35px]">
        <div className="title_say--about_us text-center">
          <h1 className="text-[25px] text-white font-bold mb-[10px]">
            Người học nói gì về chúng tôi
          </h1>
          <p className="text-[#E5E4E4]">
            Hàng ngàn người đã thay đổi sự nghiệp nhờ các khóa học miễn phí từ
            FreeCodeHub
          </p>
        </div>
        <div className="grid grid-cols-3 max-md:grid-cols-1 mt-[35px] gap-[20px]">
          <div className="item_say--about_us p-7 max-xl:p-5 bg-[#1A1F2B] rounded-[10px]">
            <div className="info_say--about_us flex">
              <img
                src="https://cdnphoto.dantri.com.vn/prM-l0fz5Z5GghgEnW_2D0mn_XU=/thumb_w/990/2024/11/11/giap-hoang-anh-phong-vandocx-1731317640857.jpeg"
                alt=""
                className="rounded-full w-[48px] h-[48px] object-cover"
              />
              <div className="name_info ml-5 max-lg:ml-2">
                <h5 className="text-white text-[18px] font-bold">
                  Nguyễn Văn Anh Minh
                </h5>
                <span className="text-[#E5E4E4]">Học viên tại FreeCodeHub</span>
              </div>
            </div>
            <div className="rating my-[5px] flex gap-x-[5px]">
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
            </div>
            <div className="content">
              <p className="text-[#E5E4E4] text-[14px]">
                Tôi đã học được rất nhiều kỹ năng lập trình web thông qua các
                khóa học miễn phí từ FreeCodeHub. Đây là nguồn tài nguyên tuyệt
                vời cho bất kỳ ai muốn bắt đầu sự nghiệp lập trình.
              </p>
            </div>
          </div>
          <div className="item_say--about_us p-7 max-xl:p-5 bg-[#1A1F2B] rounded-[10px]">
            <div className="info_say--about_us flex">
              <img
                src="https://cdnphoto.dantri.com.vn/prM-l0fz5Z5GghgEnW_2D0mn_XU=/thumb_w/990/2024/11/11/giap-hoang-anh-phong-vandocx-1731317640857.jpeg"
                alt=""
                className="rounded-full w-[48px] h-[48px] object-cover"
              />
              <div className="name_info ml-5 max-lg:ml-2">
                <h5 className="text-white text-[18px] font-bold">
                  Nguyễn Văn Anh Minh
                </h5>
                <span className="text-[#E5E4E4]">Học viên tại FreeCodeHub</span>
              </div>
            </div>
            <div className="rating my-[5px] flex gap-x-[5px]">
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
            </div>
            <div className="content">
              <p className="text-[#E5E4E4] text-[14px]">
                Tôi đã học được rất nhiều kỹ năng lập trình web thông qua các
                khóa học miễn phí từ FreeCodeHub. Đây là nguồn tài nguyên tuyệt
                vời cho bất kỳ ai muốn bắt đầu sự nghiệp lập trình.
              </p>
            </div>
          </div>
          <div className="item_say--about_us p-7 max-xl:p-5 bg-[#1A1F2B] rounded-[10px]">
            <div className="info_say--about_us flex">
              <img
                src="https://cdnphoto.dantri.com.vn/prM-l0fz5Z5GghgEnW_2D0mn_XU=/thumb_w/990/2024/11/11/giap-hoang-anh-phong-vandocx-1731317640857.jpeg"
                alt=""
                className="rounded-full w-[48px] h-[48px] object-cover"
              />
              <div className="name_info ml-5 max-lg:ml-2">
                <h5 className="text-white text-[18px] font-bold">
                  Nguyễn Văn Anh Minh
                </h5>
                <span className="text-[#E5E4E4]">Học viên tại FreeCodeHub</span>
              </div>
            </div>
            <div className="rating my-[5px] flex gap-x-[5px]">
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
              <span>
                <i className="fa-solid fa-star text-[#facc15]"></i>
              </span>
            </div>
            <div className="content">
              <p className="text-[#E5E4E4] text-[14px]">
                Tôi đã học được rất nhiều kỹ năng lập trình web thông qua các
                khóa học miễn phí từ FreeCodeHub. Đây là nguồn tài nguyên tuyệt
                vời cho bất kỳ ai muốn bắt đầu sự nghiệp lập trình.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
