"use client";

import axios from "@/app/utils/axiosInstance";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface Author {
  name: string;
  channel: string;
  description: string;
  avatar: string;
  numCourses: number;
  numSubscribers: number;
}

const ChannelAuthor = () => {
  const [listAuthor, setListAuthor] = useState<Author[]>([]);

  useEffect(() => {
    axios
      .get("/authors")
      .then((res) => setListAuthor(res.data))
      .catch((err) => console.log("Fetch Data Fail", err));
  }, []);
  return (
    <>
      {listAuthor.map((listau, index) => {
        return (
          <div
            key={index}
            className="item_partner--chanel bg-gradient-to-l from-[#eaafc8] to-[#654ea3] w-[324px] h-[220px] p-5 place-items-center rounded-[10px]"
          >
            <div className="logo_chanel">
              <Image
                src={listau.avatar}
                alt=""
                width={84}
                height={84}
                className="img_logo--chanel w-[84px] h-[84px] rounded-[20px]"
              />
            </div>
            <div className="name_chanel ">
              <h1 className="text-[25px] text-white"> {listau.name}</h1>
            </div>
            <div className="des text-center">
              <p className=" text-white"> {listau.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChannelAuthor;
