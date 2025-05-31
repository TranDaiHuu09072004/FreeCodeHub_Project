"use client";
import Footer from "@/app/layout/Footer";
import { useState } from "react";

const Learning = () => {
  const [currentVideo, setCurrentVideo] = useState(1);

  const courseSections = [
    {
      id: 1,
      title: "1. Giới thiệu",
      lessons: [
        {
          id: 1,
          title:
            "ReactJS là gì? Tại sao nên học ReactJS | Khóa học ReactJS tại F8",
          duration: "10:41",
          videoUrl: "",
        },
        {
          id: 2,
          title: "SPA/MPA là gì? | Khái niệm SPA | ReactJS",
          duration: "22:20",
          videoUrl: "https://www.youtube.com/embed/x1",
        },
        {
          id: 3,
          title: "Arrow Function Trong Javascript ES6 | Khái niệm",
          duration: "15:14",
          videoUrl: "https://www.youtube.com/embed/x2",
        },
        {
          id: 4,
          title: "Module trong Javascript ES6",
          duration: "18:30",
          videoUrl: "https://www.youtube.com/embed/x3",
        },
        {
          id: 5,
          title: "Enhanced object literals trong javascript ES6",
          duration: "12:45",
          videoUrl: "https://www.youtube.com/embed/x4",
        },
        {
          id: 6,
          title: "Spread trong Javascript ES6",
          duration: "20:10",
          videoUrl: "https://www.youtube.com/embed/x5",
        },
      ],
    },
  ];

  const allLessons = courseSections.flatMap((section) => section.lessons);
  const currentLesson = allLessons.find((lesson) => lesson.id === currentVideo);

  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <section className="learning_course mb-[35px]">
        <div className="content_learning 2xl:flex max-xl:flex-col gap-x-[20px]">
          <div className="video_player 2xl:w-[50%] max-xl:w-full bg-[#141625] rounded-[10px] overflow-hidden">
            <div className="flex items-center gap-x-[10px] play_video bg-gradient-to-r from-[#eaafc8] to-[#654ea3] w-full rounded-[10px] py-[10px] px-[20px]">
              <i className="fa-solid fa-circle-play text-[25px] text-white"></i>
              <h1 className="text-white text-[25px]">Video khóa học</h1>
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={currentLesson?.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4">
              <h2 className="text-white text-xl font-medium">
                {currentLesson?.title}
              </h2>
            </div>
          </div>

          {/* Lesson List */}

          <div className="lesson_list 2xl:w-[50%] max-xl:w-full bg-[#141625] rounded-[10px] max-h-[600px] overflow-y-auto">
            <div className="title_course flex max-xl:flex-col gap-x-[20px] mb-[20px]">
              <div className="play_video bg-gradient-to-r from-[#eaafc8] to-[#654ea3] w-full rounded-[10px] py-[10px] px-[20px]">
                <h1 className="text-white text-[25px]">
                  Danh sách các bài học
                </h1>
              </div>
            </div>
            {allLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                  currentVideo === lesson.id
                    ? "bg-gradient-to-r from-[#eaafc8] to-[#654ea3]"
                    : "hover:bg-[#2A2C3B]"
                }`}
                onClick={() => setCurrentVideo(lesson.id)}
              >
                <div className="flex items-center gap-3">
                  <i
                    className={`fa-solid fa-circle-play ${
                      currentVideo === lesson.id
                        ? "text-white"
                        : "bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent"
                    } text-[20px]`}
                  ></i>
                  <span
                    className={`${
                      currentVideo === lesson.id
                        ? "text-white"
                        : "text-[#E5E4E4]"
                    }`}
                  >
                    {lesson.title}
                  </span>
                </div>
                <span
                  className={`text-sm ${
                    currentVideo === lesson.id ? "text-white" : "text-[#9D9DA3]"
                  }`}
                >
                  {lesson.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Learning;
