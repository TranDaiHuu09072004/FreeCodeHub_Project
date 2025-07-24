"use client";
import { useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
export interface InputSearch {
  placeholder?: string;
  w: string;
  h: string;
  className: string;
  apiEndpoint: string;
  queryParam?: string;
  onResults: (data: any[]) => void;
}
import { toast, ToastContainer } from "react-toastify";
const InputSearch = ({
  placeholder,
  w,
  h,
  className,
  apiEndpoint,
  queryParam = "q",
  onResults,
}: InputSearch) => {
  const [input, setInput] = useState("");
  const handleSearch = async () => {
    try {
      const API = process.env.NEXT_PUBLIC_API_URL;
      const url = `${API}${apiEndpoint}?${queryParam}=${input}`;
      const res = await axiosInstance.get(url);

      onResults(res.data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        window.location.href = "/not-found";
        return;
      }
      onResults([]);
      toast.error("Tìm kiếm không hợp lệ");
    }
  };
  return (
    <>
      <div className={className}>
        <ToastContainer />
        <input
          type="text"
          className="bg-[#333647] rounded-[5px] px-[10px] text-[#b3b7c7] outline-none"
          style={{ height: h, width: w }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
        />
        <button
          onClick={handleSearch}
          className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[5px] px-[10px] rounded-[5px] ml-[10px] cursor-pointer"
        >
          <i className="fa-solid fa-magnifying-glass text-[18px] text-white"></i>{" "}
        </button>
      </div>
    </>
  );
};

export default InputSearch;
