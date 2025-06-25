import Button from "@/components/User/Button";

const Comment = () => {
  return (
    <>
      <div className="comment">
        <h3 className="text-2xl font-bold text-white">
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
                  className="w-full text-white p-[10px] text-[15px] h-[80px]"
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
              <span className="text-[#677d9b] text-[13px]">2 giờ trước</span>
              <p className="text-white">Bài viết này rất hữu ích</p>
            </div>
          </div>
          <div className="Show_favourite-hearts ml-10 flex items-center gap-[3px] cursor-pointer py-2">
            <i className="fa-regular fa-heart text-[#677d9b]"></i>
            <span className="text-[15px] text-[#677d9b]">3</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
