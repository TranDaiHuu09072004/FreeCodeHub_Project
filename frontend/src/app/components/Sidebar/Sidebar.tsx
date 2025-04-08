const Sidebar = () => {
  return (
    <div className="w-[287px] h-screen bg-[#1a1f2b] fixed top-0 left-0 z-50 backdrop-blur-md border-r border-white/10">
      <div className="header_logo relative pb-[2px] text-center">
        <h1 className="text-3xl mx-[20px] font-bold bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text drop-shadow leading-[60px] after:content-[''] after:absolute after:left-[-20px] after:right-[-20px] after:bottom-0 after:h-[2px] after:bg-gradient-to-b after:from-[#eaafc8] after:to-[#654ea3]">
          FreeCodeHub
        </h1>
      </div>

      <ul className="list_sidebar mt-[20px] text-white px-[30px]">
        <li className="bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-2 px-4 rounded-[3px] mb-[10px]">
          <a href="#">
            <i className="fa-solid fa-house text-[18px] mx-[10px]"></i> Trang
            Chủ
          </a>
        </li>
        <li className="py-2 px-4 rounded-[3px] mb-[10px]">
          <a href="#">
            <i className="fa-solid fa-graduation-cap text-[18px] mx-[10px]"></i>{" "}
            Khóa học
          </a>
        </li>
        <li className="py-2 px-4 rounded-[3px] mb-[10px]">
          <a href="#">
            <i className="fa-solid fa-note-sticky text-[18px] mx-[10px] pr-[5px]"></i>{" "}
            Blog
          </a>
        </li>
        <li className="py-2 px-4 rounded-[3px] mb-[10px]">
          <a href="#">
            <i className="fa-solid fa-user text-[18px] ml-[10px] mr-[15px]"></i>{" "}
            Về Chúng Tôi
          </a>
        </li>
        <li className=" py-2 px-4 rounded-[3px] mb-[10px]">
          <a href="#">
            <i className="fa-solid fa-gear text-[18px] ml-[10px] mr-[15px]"></i>{" "}
            Cài đặt
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
