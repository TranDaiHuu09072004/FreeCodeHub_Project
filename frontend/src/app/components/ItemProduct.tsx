// type ItemProduct = {
//   name: string;
//   image: string;
//   author: string;
//   image_author: string;
//   description: string;
//   created_post: string;
//   category_blog: string;
//   read_more: string;
// };

const ListCourse_Popular = [
  {
    id: 1,
    image: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
    name: "Xây dựng Website với ReactJS",
    image_author:
      "https://yt3.googleusercontent.com/Pa8wyxqTOkhu5DW_RvkiQIS7Bsa7OW7gSen-2WpaQsC2EqUAkgubAg1_QPc951pzpN2F2Q4_TA=s160-c-k-c0x00ffffff-no-rj",
    author: "F8 Offical",
    description: "Khóa học miễn phí",
  },
  {
    id: 2,
    image:
      "https://hoidanit.vn/_next/image?url=https%3A%2F%2Fhoidanit.vn%2Fimages%2F2610799786e82f64a8aea3b0ecd23b55c.png&w=1920&q=75",
    name: "  Tự học FullStack NextJS/NestJS",
    image_author:
      "https://yt3.googleusercontent.com/Pa8wyxqTOkhu5DW_RvkiQIS7Bsa7OW7gSen-2WpaQsC2EqUAkgubAg1_QPc951pzpN2F2Q4_TA=s160-c-k-c0x00ffffff-no-rj",
    author: "Hỏi dân IT",
    description: "Khóa học miễn phí",
  },
  {
    id: 3,
    image:
      "https://i.ytimg.com/vi/ucdjfU_XKpw/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDWuqXv8ZP3ahTmwzTKafCMUzdqtQ",
    name: "[2024] Học Nextjs 14 miễn phí | Khóa học Nextjs...",
    image_author:
      "https://yt3.googleusercontent.com/Pa8wyxqTOkhu5DW_RvkiQIS7Bsa7OW7gSen-2WpaQsC2EqUAkgubAg1_QPc951pzpN2F2Q4_TA=s160-c-k-c0x00ffffff-no-rj",
    author: "Được Dev",
    description: "Khóa học miễn phí",
  },
];
const ItemProduct = () => {
  return (
    <>
      {ListCourse_Popular.map((item) => (
        <div
          key={item.id}
          className="item_course bg-[#1A1F2B] rounded-t-[10px] rounded-b-[10px] hover:translate-y-[-10px] transition-all duration-300"
        >
          <a href="#" className="text-decoration-none">
            <div className="img_course ">
              <img
                src={item.image}
                alt=""
                className="w-[100%] h-[100%] rounded-t-[10px] object-cover "
              />
            </div>
            <div className="content_course p-[25px]">
              <h1 className="text-[20px] font-bold text-white mb-[10px] line-clamp-2 overflow-hidden text-ellipsis">
                {item.name}
              </h1>
              <div className="author flex items-center justify-between relative">
                <div>
                  <img
                    src={item.image_author}
                    alt=""
                    className="author_img rounded-full w-[30px] h-[30px] inline-block mr-[10px]"
                  />
                  <span>
                    <strong className="text-white absolute">
                      {item.author}
                    </strong>
                  </span>
                </div>
                <i className="text-[#E5E4E4] text-[14px] absolute top-[40%] right-0 translate-y-[-50%]">
                  {item.description}
                </i>
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};

export default ItemProduct;
