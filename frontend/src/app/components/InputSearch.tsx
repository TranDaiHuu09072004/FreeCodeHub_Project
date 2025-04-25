type InputSearch = {
  placeholder?: string;
  w: string;
  h: string;
};
const InputSearch = ({ placeholder, w, h }: InputSearch) => {
  return (
    <>
      <div className="search_courses flex justify-center">
        <input
          type="text"
          className="bg-[#333647] rounded-[5px] px-[10px] text-[#b3b7c7] outline-none"
          style={{ height: h, width: w }}
          placeholder={placeholder}
        />
        <button className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[5px] px-[10px] rounded-[5px] ml-[10px] cursor-pointer">
          <i className="fa-solid fa-magnifying-glass text-[18px] text-white"></i>{" "}
        </button>
      </div>
    </>
  );
};

export default InputSearch;
