import Banner from "@/app/components/User/Banner";
import Button from "@/app/components/User/Button";
import Accordion from "@/app/components/User/Accordion";
import Footer from "@/app/layout/Footer";

const DetailCourses = () => {
  const courseSections = [
    {
      id: 1,
      title: "1. Giới thiệu",
      lessons: [
        {
          id: 1,
          title: "1.1 ReactJS là gì? Tại sao nên học ReactJS?",
          duration: "10:41",
        },
        {
          id: 2,
          title: "1.2 SPA/MPA là gì?",
          duration: "22:20",
        },
        {
          id: 3,
          title: "1.2 Ưu điểm của SPA",
          duration: "00:14",
        },
      ],
    },
    {
      id: 2,
      title: "2. Ôn lại ES6+",
      lessons: [
        {
          id: 4,
          title: "2.1 Arrow function",
          duration: "15:00",
        },
        {
          id: 5,
          title: "2.2 Enhanced object literals",
          duration: "12:30",
        },
      ],
    },
    {
      id: 3,
      title: "3. React, ReactDOM",
      lessons: [
        {
          id: 6,
          title: "3.1 React.createElement()",
          duration: "18:20",
        },
        {
          id: 7,
          title: "3.2 React DOM",
          duration: "08:45",
        },
      ],
    },
  ];

  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <Banner
        name="Chi tiết khóa học"
        description="Chọn khóa học chi tiết của bạn"
        image="assets/img/banne_detail-course.png"
      />
      <section className="detail_course bg-[#1F212C] rounded-[10px] p-[35px] my-[35px] ">
        <div className="item-detail_course flex max-2xl:flex-col">
          <div className="img_detail 2xl:w-[50%] max-2xl:w-full bg-[#121826] p-[10px] rounded-[10px]">
            <img
              src="https://files.fullstack.edu.vn/f8-prod/courses/13/13.png"
              alt=""
              className="rounded-[10px] max-2xl:w-full"
            />
          </div>
          <div className="content_detail 2xl:pl-[37px] 2xl:w-[50%] max-2xl:w-full">
            <h3 className="text-[20px] text-white font-bold mt-[15px] mb-[30px]">
              Xây dựng Website với ReactJS
            </h3>
            <div className="author flex justify-between">
              <span className="text-white">
                <i className="fa-solid fa-user"></i> Tác giả:{" "}
                <i className="text-[#9D9DA3]">F8 Offical</i>
              </span>
              <span>
                <i className="text-[#9D9DA3]">Khóa học miễn phí</i>
              </span>
            </div>
            <p className="text-[#9d9da3] my-[20px] text-[14px]">
              ​Khóa học "Xây Dựng Website với ReactJS" của F8 là một chương
              trình đào tạo miễn phí, được thiết kế để giúp học viên nắm vững từ
              cơ bản đến nâng cao về ReactJS, một thư viện JavaScript phổ biến
              trong việc xây dựng giao diện người dùng.
            </p>
            <Button
              children="Học ngay"
              className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer"
            />
          </div>
        </div>
      </section>
      <section className="description_detail--courses my-[35px] bg-[#1F212C] rounded-[10px] px-[35px]">
        <h1 className="title text-white text-[30px] font-bold text-center py-[35px]">
          Mô tả chi tiết khóa học
        </h1>
        <ul className="list_des--detail-course grid grid-cols-2 max-sm:grid-cols-1 gap-[20px] pb-[35px]">
          <li className="flex items-center gap-[10px]">
            <i className="fa-solid fa-circle-check bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent text-[30px]"></i>{" "}
            <span className=" text-[#E5E4E4]">
              Giới thiệu về ReactJS và lý do nên học ReactJS
            </span>
          </li>
          <li className="flex items-center gap-[10px]">
            <i className="fa-solid fa-circle-check bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent text-[30px]"></i>{" "}
            <span className=" text-[#E5E4E4]">
              Làm việc với RESTful API và quản lý trạng thái ứng dụng.
            </span>
          </li>
          <li className="flex items-center gap-[10px]">
            <i className="fa-solid fa-circle-check bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent text-[30px]"></i>{" "}
            <span className=" text-[#E5E4E4]">
              Tìm hiểu về SPA (Single-page application) và MPA (Multi-page
              application).
            </span>
          </li>
          <li className="flex items-center gap-[10px]">
            <i className="fa-solid fa-circle-check bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent text-[30px]"></i>{" "}
            <span className=" text-[#E5E4E4]">
              Xây dựng dự án thực tế như clone Tiktok và triển khai dự án lên
              Internet.
            </span>
          </li>
          <li className="flex items-center gap-[10px]">
            <i className="fa-solid fa-circle-check bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent text-[30px]"></i>{" "}
            <span className=" text-[#E5E4E4]">
              Các khái niệm cơ bản như function/class component, hooks, và cách
              ReactJS hoạt động.
            </span>
          </li>
        </ul>
        <div className="list_content-course py-[35px]">
          <Accordion sections={courseSections} />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DetailCourses;
