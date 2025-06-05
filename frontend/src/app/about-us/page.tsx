"use client";
import Banner_Blog from "@/app/components/User/BannerBlog";
import Footer from "@/app/layout/Footer";
import axios from "@/app/utils/axiosInstance";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Authors {
  name: string;
  channel: string;
  description: string;
  avatar: string;
  numCourses: number;
  numSubcribers: number;
}

const About_Us = () => {
  useEffect(() => {
    axios.get("/authors").then((res) => setPartners(res.data));
  }, []);
  const [partners, setPartners] = useState<Authors[]>([]);
  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <Banner_Blog
        name="Về FreeCodeHub"
        isButton={true}
        description="FreeCodeHub ra đời từ sự tận tâm của tôi - Hữu - với mong muốn mang lại cơ hội học tập và phát triển cho cộng đồng giới trẻ Việt Nam trong lĩnh vực lập trình"
      />
      <section className="author_create flex max-xl:flex-col items-center justify-between my-[35px]">
        <div className="content_author xl:w-[50%] max-xl:w-full">
          <h3 className="text-white text-[25px] mb-[15px] font-bold">
            Người sáng lập
          </h3>
          <p className="mb-[20px] text-[#798595]">
            Xin chào, tôi là Hữu - người sáng lập FreeCodeHub. Với niềm đam mê
            lập trình và giáo dục, tôi đã quyết định xây dựng một nền tảng giúp
            các bạn trẻ Việt Nam có thể tiếp cận với kiến thức lập trình miễn
            phí nhưng vẫn đảm bảo chất lượng
          </p>
          <p className="mb-[20px] text-[#798595]">
            Trong suốt 6 tháng qua, tôi đã dành toàn bộ thời gian và tâm huyết
            để nghiên cứu, xem và đánh giá hàng trăm video từ các kênh Youtube
            lập trình tiếng việt hàng đầu. nhằm chọn lọc ra những nguồn học tập
            tốt nhất cho cộng đồng.
          </p>
          <p className="mb-[20px] text-[#798595]">
            Mục tiêu của tôi là giúp các bạn trẻ không bị lạc trong ma trận
            thông tin, tiết kiệm thời gian tìm kiếm, và tập trung vào việc học
            tập hiệu quả.
          </p>
          <p className="mb-[20px] text-[#798595]">
            Tôi tin rằng, với sự đồng hành của FreeCodeHub, các bạn trẻ sẽ có
            thêm động lực và nguồn tài nguyên để chinh phục con đường lập trình
            đầy thử thách nhưng cũng thú vị này
          </p>
        </div>
        <div className="image_author xl:w-[50%] max-xl:w-full">
          <img
            src="assets/img/name_author.png"
            alt=""
            className="xl:w-[400px] max-xl:w-full h-auto object-cover rounded-[10px] xl:ml-[165px]"
          />
        </div>
      </section>
      <section className="mission">
        <div className="title_misson text-center">
          <h1 className="text-[25px] text-white font-bold mb-[20px]">
            Sứ mệnh của chúng tôi
          </h1>
          <p className="text-[#798595] text-[18px] xl:px-[150px]">
            Sứ mệnh của FreeCodeHub là giúp mọi người dễ dàng tiếp cận với kiến
            thức lập trình chất lượng cao một cách miễn phí và có tổ chức
          </p>
        </div>
        <div className="wrapper_misson grid grid-cols-2 max-xl:grid-cols-1 gap-[20px] my-[35px]">
          <div className="item_misson bg-[#1a1f2b] p-5 flex items-center gap-x-[20px]  rounded-[5px]">
            <div className="icon_misson">
              <i className="fa-solid fa-book-open text-[20px] text-white p-3 bg-[#302F3E] rounded-full"></i>
            </div>
            <div className="content_misson ">
              <h3 className="text-white text-[20px] mb-[10px] font-bold">
                Cung cấp nội dung chất lượng
              </h3>
              <p className="text-[#798595]">
                Sàng lọc và tổng hợp những khóa học chất lượng cao từ các kênh
                Youtube uy tín
              </p>
            </div>
          </div>
          <div className="item_misson bg-[#1a1f2b] p-5 flex items-center gap-x-[20px] rounded-[5px]">
            <div className="icon_misson">
              <i className="fa-solid fa-users text-[20px] text-white p-3 bg-[#302F3E] rounded-full"></i>
            </div>
            <div className="content_misson ">
              <h3 className="text-white text-[20px] mb-[10px] font-bold">
                Xây dựng cộng đồng
              </h3>
              <p className="text-[#798595]">
                Tạo môi trường để người học có thể kết nối và hỗ trợ nhau trong
                quá trình học tập
              </p>
            </div>
          </div>
          <div className="item_misson bg-[#1a1f2b] p-5 flex items-center gap-x-[20px]  rounded-[5px]">
            <div className="icon_misson">
              <i className="fa-solid fa-globe text-[20px] text-white p-3 bg-[#302F3E] rounded-full"></i>
            </div>
            <div className="content_misson ">
              <h3 className="text-white text-[20px] mb-[10px] font-bold">
                Tiếp cận miễn phí
              </h3>
              <p className="text-[#798595]">
                Đảm bảo mọi người đều có thể tiếp cận kiến thức lập trình mà
                không mất phí
              </p>
            </div>
          </div>
          <div className="item_misson bg-[#1a1f2b] p-5 flex items-center gap-x-[20px]  rounded-[5px]">
            <div className="icon_misson">
              <i className="fa-solid fa-circle-info text-[20px] text-white p-3 bg-[#302F3E] rounded-full"></i>
            </div>
            <div className="content_misson ">
              <h3 className="text-white text-[20px] mb-[10px] font-bold">
                Hỗ trợ nhà sáng tạo
              </h3>
              <p className="text-[#798595]">
                Giới thiệu và quảng bá các kênh Youtube chất lượng tới đông đảo
                người học
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="6_month_journey">
        <div className="title_6_month_journey text-center mb-6">
          <h1 className="text-[25px] text-white font-bold mb-[20px]">
            Hành trình 6 tháng của tôi
          </h1>
          <p className="text-[#798595] text-[18px] xl:px-[150px]">
            Đây là quá trình tôi đã trải qua để xây dựng FreeCodeHub từ ý tưởng
            ban đầu đến một cộng đồng học tập phát triển.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-[3px] bg-[#3ecfff] -translate-x-1/2 z-0"></div>
            {/* Timeline items */}
            <div className="relative z-10 flex flex-col gap-10 py-4">
              {/* Item 1 */}
              <div className="flex items-center gap-6">
                <div className="w-5 flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-[#3ecfff] border-4 border-[#19213a] block"></span>
                </div>
                <div className="bg-[#1a1f2b] rounded-lg px-6 py-4 min-w-[340px] max-w-[400px] shadow-lg">
                  <span className="inline-block bg-[#3ecfff] text-[#19213a] font-bold px-3 py-1 rounded mb-2 text-[15px]">
                    Tháng 5, 2023
                  </span>
                  <h3 className="text-white font-bold text-lg mb-1">
                    Khởi đầu ý tưởng
                  </h3>
                  <p className="text-[#b2c2e0] text-[15px]">
                    Tôi bắt đầu hình thành ý tưởng về FreeCodeHub - một nền tảng
                    giúp giới trẻ tiếp cận với lập trình miễn phí và chất lượng.
                  </p>
                </div>
              </div>
              {/* Item 2 */}
              <div className="flex items-center gap-6">
                <div className="w-5 flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-[#3ecfff] border-4 border-[#19213a] block"></span>
                </div>
                <div className="bg-[#1a1f2b] rounded-lg px-6 py-4 min-w-[340px] max-w-[400px] shadow-lg">
                  <span className="inline-block bg-[#3ecfff] text-[#19213a] font-bold px-3 py-1 rounded mb-2 text-[15px]">
                    Tháng 6, 2023
                  </span>
                  <h3 className="text-white font-bold text-lg mb-1">
                    Nghiên cứu và tìm hiểu
                  </h3>
                  <p className="text-[#b2c2e0] text-[15px]">
                    Tôi dành thời gian nghiên cứu các khóa học lập trình miễn
                    phí trên YouTube và tìm hiểu nhu cầu của các bạn trẻ muốn
                    học lập trình.
                  </p>
                </div>
              </div>
              {/* Item 3 */}
              <div className="flex items-center gap-6">
                <div className="w-5 flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-[#3ecfff] border-4 border-[#19213a] block"></span>
                </div>
                <div className="bg-[#1a1f2b] rounded-lg px-6 py-4 min-w-[340px] max-w-[400px] shadow-lg">
                  <span className="inline-block bg-[#3ecfff] text-[#19213a] font-bold px-3 py-1 rounded mb-2 text-[15px]">
                    Tháng 7, 2023
                  </span>
                  <h3 className="text-white font-bold text-lg mb-1">
                    Xây dựng nền tảng
                  </h3>
                  <p className="text-[#b2c2e0] text-[15px]">
                    Bắt đầu phát triển nền tảng FreeCodeHub, tập hợp và đánh giá
                    các nguồn học tập chất lượng.
                  </p>
                </div>
              </div>
              {/* Item 4 */}
              <div className="flex items-center gap-6">
                <div className="w-5 flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-[#3ecfff] border-4 border-[#19213a] block"></span>
                </div>
                <div className="bg-[#1a1f2b] rounded-lg px-6 py-4 min-w-[340px] max-w-[400px] shadow-lg">
                  <span className="inline-block bg-[#3ecfff] text-[#19213a] font-bold px-3 py-1 rounded mb-2 text-[15px]">
                    Tháng 8, 2023
                  </span>
                  <h3 className="text-white font-bold text-lg mb-1">
                    Kết nối cộng đồng
                  </h3>
                  <p className="text-[#b2c2e0] text-[15px]">
                    Tôi bắt đầu kết nối với các học viên đầu tiên và nhận được
                    những phản hồi tích cực về nền tảng.
                  </p>
                </div>
              </div>
              {/* Item 5 */}
              <div className="flex items-center gap-6">
                <div className="w-5 flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-[#3ecfff] border-4 border-[#19213a] block"></span>
                </div>
                <div className="bg-[#1a1f2b] rounded-lg px-6 py-4 min-w-[340px] max-w-[400px] shadow-lg">
                  <span className="inline-block bg-[#3ecfff] text-[#19213a] font-bold px-3 py-1 rounded mb-2 text-[15px]">
                    Tháng 9, 2023
                  </span>
                  <h3 className="text-white font-bold text-lg mb-1">
                    Mở rộng nội dung
                  </h3>
                  <p className="text-[#b2c2e0] text-[15px]">
                    Tăng cường thêm nhiều khóa học và tài liệu, đồng thời xây
                    dựng các nhóm học tập để học viên có thể hỗ trợ nhau.
                  </p>
                </div>
              </div>
              {/* Item 6 */}
              <div className="flex items-center gap-6">
                <div className="w-5 flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-[#3ecfff] border-4 border-[#19213a] block"></span>
                </div>
                <div className="bg-[#1a1f2b] rounded-lg px-6 py-4 min-w-[340px] max-w-[400px] shadow-lg">
                  <span className="inline-block bg-[#3ecfff] text-[#19213a] font-bold px-3 py-1 rounded mb-2 text-[15px]">
                    Tháng 10, 2023
                  </span>
                  <h3 className="text-white font-bold text-lg mb-1">
                    Kết quả đầu tiên
                  </h3>
                  <p className="text-[#b2c2e0] text-[15px]">
                    Chứng kiến những thành công đầu tiên từ các học viên, nhiều
                    bạn đã tìm được việc làm sau khi hoàn thành các khóa học.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="partner my-[35px]">
        <div className="title_partner text-center mb-6">
          <h1 className="text-[25px] text-white font-bold mb-[20px]">
            Đối tác của chúng tôi
          </h1>
          <p className="text-[#798595] text-[18px] xl:px-[150px]">
            Chúng tôi hợp tác với các kênh Youtube lập trình hàng đầu để mang
            đến nội dung chất lượng cao cho người học.
          </p>
        </div>
        <div className="wrapper_partner grid grid-cols-5 max-xl:grid-cols-2 gap-5">
          {partners.map((p, index) => (
            <div
              key={index}
              className="item_partner bg-[#1a1f2b] p-5 flex items-center justify-center gap-x-[10px]"
            >
              <div className="img">
                <img
                  src={p.avatar}
                  alt=""
                  className="w-[32px] h-[32px] rounded-full"
                />
              </div>
              <Link href="#">
                {" "}
                <h3 className="text-white font-bold">{p.channel}</h3>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Banner_Blog
        name="Tham gia FreeCodeHub ngay hôm nay"
        isButton={true}
        description="Bắt đầu hành trình học lập trình miễn phí với những khóa học chất lượng cao, được chọn lọc kĩ lưỡng bởi Hữu và đội ngũ FreeCodeHub "
      />
      <Footer />
    </div>
  );
};

export default About_Us;
