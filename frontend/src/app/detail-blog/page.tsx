import Button from "@/app/components/User/Button";
import ItemBlog from "@/app/components/User/ItemBlog";
import Footer from "@/app/layout/Footer";
import Link from "next/link";

const DetailBlog = () => {
  return (
    <div className="lg:px-[32px] lg:pt-[32px]  max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <div className="wrapper_detail-blog max-w-4xl mx-auto">
        <div className="turnback_blog cursor-pointer">
          <Link href="/blog" className="flex items-center gap-[10px]">
            <i className="fa-solid fa-arrow-left text-[#677d9b]"></i>
            <h3 className="text-[#677d9b]">Quay lại danh sách bài viết</h3>
          </Link>
        </div>
        <section className="detail_blog my-[15px]">
          <h1 className="title_blog text-[35px] text-white font-bold">
            Typescript cho người mới bắt đầu
          </h1>
          <div className="author_post flex items-center gap-6">
            <div className="author flex items-center gap-[10px] my-[15px]">
              <img
                src="https://github.com/shadcn.png"
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <div className="name_author">
                <h3 className="text-white font-bold">Nguyễn Văn A</h3>
                <p className="text-[#677d9b] text-[13px]">Tác giả</p>
              </div>
            </div>
            <div className="day_post flex gap-[5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#677d9b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar h-5 w-5"
                data-lov-id="src/pages/BlogDetail.tsx:50:14"
                data-lov-name="Calendar"
                data-component-path="src/pages/BlogDetail.tsx"
                data-component-line="50"
                data-component-file="BlogDetail.tsx"
                data-component-name="Calendar"
                data-component-content="%7B%22className%22%3A%22h-4%20w-4%22%7D"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <span className="text-[#677d9b] text-[14px]">2025-30-4</span>
            </div>
          </div>
          <div className="content_blog">
            <img
              src="https://placehold.co/600x400"
              alt=""
              className="blog w-full rounded-[10px]"
            />
            <p className="my-5">
              Giới thiệu TypeScript cho Người Mới Bắt Đầu ❓
            </p>
            <p className="my-5">
              TypeScript là gì? TypeScript là một ngôn ngữ lập trình dựa trên
              JavaScript, bổ sung kiểu tĩnh (static typing) và các tính năng lập
              trình hướng đối tượng. Nó được phát triển bởi Microsoft. Nói đơn
              giản: TypeScript = JavaScript + Kiểu dữ liệu tĩnh
            </p>
          </div>
          <div className=" my-5 border-b border-[#1F2937]"></div>
          <div className="comment">
            <h3 className="text-2xl font-bold">
              Bình luận <span>(3)</span>
            </h3>
            <div className="form_comment bg-[#1a1f2b] p-[16px] mt-[24px] rounded-[5px]">
              <form action="" className="">
                <div className="flex gap-[10px]">
                  <img
                    src="https://github.com/shadcn.png"
                    alt=""
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  <div className="form_post w-full bg-[#121826] rounded-[5px] ">
                    <textarea
                      name=""
                      id=""
                      className="w-full p-[10px] text-[15px] h-[80px]"
                      placeholder="Viết bình luận của bạn..."
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end mt-[15px]">
                  <Button
                    children="Gửi bình luận"
                    icon="fa-regular fa-paper-plane"
                    className="text-white text-[13px] bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[16px] rounded-[5px] cursor-pointer "
                  />
                </div>
              </form>
            </div>
            <div className="show_comment bg-[#1a1f2b] p-[16px] mt-[24px] rounded-[5px]">
              <div className="flex gap-[10px]">
                <img
                  src="https://github.com/shadcn.png"
                  alt=""
                  className="w-[30px] h-[30px] rounded-full"
                />
                <div className="name_post">
                  <h3 className="text-white font-bold">Nguyễn Văn A</h3>
                  <span className="text-[#677d9b] text-[13px]">
                    2 giờ trước
                  </span>
                  <p>Bài viết này rất hữu ích</p>
                </div>
              </div>
              <div className="Show_favourite-hearts ml-10 flex items-center gap-[3px] cursor-pointer py-2">
                <i className="fa-regular fa-heart text-[#677d9b]"></i>
                <span className="text-[15px] text-[#677d9b]">3</span>
              </div>
            </div>
          </div>
        </section>
        <section className="blog_related">
          <h3 className="text-2xl font-bold">Bài viết liên quan</h3>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 my-5">
            <ItemBlog/>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DetailBlog;
