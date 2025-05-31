"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export interface Author {
  name: string;
  channel: string;
  description: string;
  avatar: string;
  numCourses: number;
  numSubscribers: number;
}

function formatSubscribers(n: number | undefined | null): string {
  if (n === undefined || n === null || typeof n !== "number") return "0"; // Handle undefined, null, or non-number input
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return n.toString();
}

const ChannelAuthor = () => {
  const [listAuthor, setListAuthor] = useState<Author[]>([]);
  const URL_API_COURSES = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    axios
      .get(`${URL_API_COURSES}/authors`)
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
              <img
                src={listau.avatar}
                alt=""
                className="img_logo--chanel w-[84px] h-[84px] rounded-[20px]"
              />
            </div>
            <div className="name_chanel ">
              <h1 className="text-[25px] text-white"> {listau.name}</h1>
            </div>
            <div className="des text-center">
              <p className=" text-white"> {listau.description}</p>
            </div>
            <div className="sub_chanel text-white text-xl">
              {formatSubscribers(listau.numSubscribers)} Subscribers
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChannelAuthor;
