import Link from "next/link";
// type ItemBlog = {
//   name: string;
//   image: string;
//   author: string;
//   description: string;
//   created_post: string;
//   category_blog: string;
//   read_more: string;
// };

const List_Blog = [
  {
    id: 1,
    image: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
    created_post: "01/03/2025",
    author: "Lê Hải",
    name: "Xây dựng Website với ReactJS",
    description:
      "Hướng dẫn chi tiết lộ trình học Front-end dành cho người mới, từ HTML/CSS cơ bản đến các framework hiện tại như React,Vue.",
    category_blog: "FrontEnd",
  },
  {
    id: 2,
    image: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
    created_post: "01/03/2025",
    author: "Lê Hải",
    name: "Xây dựng Website với ReactJS",
    description:
      "Hướng dẫn chi tiết lộ trình học Front-end dành cho người mới, từ HTML/CSS cơ bản đến các framework hiện tại như React,Vue.",
    category_blog: "BackEnd",
  },
  {
    id: 3,
    image: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
    created_post: "01/03/2025",
    author: "Lê Hải",
    name: "Xây dựng Website với ReactJS",
    description:
      "Hướng dẫn chi tiết lộ trình học Front-end dành cho người mới, từ HTML/CSS cơ bản đến các framework hiện tại như React,Vue.",
    category_blog: "FrontEnd",
  },
  {
    id: 4,
    image: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
    created_post: "01/03/2025",
    author: "Lê Hải",
    name: "Xây dựng Website với ReactJS",
    description:
      "Hướng dẫn chi tiết lộ trình học Front-end dành cho người mới, từ HTML/CSS cơ bản đến các framework hiện tại như React,Vue.",
    category_blog: "BackEnd",
  },
  {
    id: 5,
    image: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
    created_post: "01/03/2025",
    author: "Lê Hải",
    name: "Xây dựng Website với ReactJS",
    description:
      "Hướng dẫn chi tiết lộ trình học Front-end dành cho người mới, từ HTML/CSS cơ bản đến các framework hiện tại như React,Vue.",
    category_blog: "FrontEnd",
  },
  {
    id: 6,
    image: "https://files.fullstack.edu.vn/f8-prod/courses/13/13.png",
    created_post: "01/03/2025",
    author: "Lê Hải",
    name: "Xây dựng Website với ReactJS",
    description:
      "Hướng dẫn chi tiết lộ trình học Front-end dành cho người mới, từ HTML/CSS cơ bản đến các framework hiện tại như React,Vue.",
    category_blog: "BackEnd",
  },
];
const ItemBlog = () => {
  return (
    <>
      {List_Blog.map((blog) => (
        <div
          key={blog.id}
          className="item_blog bg-[#1A1F2B] rounded-t-[10px] rounded-b-[10px] hover:translate-y-[-10px] transition-all duration-300"
        >
          <Link href="#" className="text-decoration-none">
            <div className="img_blog ">
              <img
                src={blog.image}
                alt=""
                className="w-[100%] h-[100%] rounded-t-[10px] object-cover "
              />
            </div>
            <div className="content_blog p-[25px]">
              <div className="flex items-center mb-[10px] justify-between">
                {" "}
                <div className="create_post">
                  <i className="fa-solid fa-calendar text-[18px] text-white mr-[10px]"></i>
                  <span className="text-white">{blog.created_post}</span>
                </div>
                <div className="author">
                  <i className="fa-solid fa-user text-[18px] text-white mr-[10px]"></i>
                  <span className="text-white">{blog.author}</span>
                </div>
              </div>
              <h1 className="text-[20px] font-bold text-white mb-[10px] line-clamp-2 overflow-hidden text-ellipsis">
                {blog.name}
              </h1>
              <p className="text-[#798595] mb-[10px]">{blog.description}</p>
              <div className="category&readmore flex items-center justify-between relative">
                <h3 className="bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white px-2 py-1 rounded-[10px]">
                  {blog.category_blog}
                </h3>
                <Link
                  href="#"
                  className="font-bold bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text"
                >
                  Đọc Thêm{" "}
                  <i className="fa-solid fa-arrow-right bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text"></i>
                </Link>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ItemBlog;
