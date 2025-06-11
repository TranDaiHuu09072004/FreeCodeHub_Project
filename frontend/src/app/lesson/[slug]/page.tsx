"use client";
import Footer from "@/app/layout/Footer";
import { useState, useEffect } from "react";
import axios from "@/app/utils/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { Lesson } from "@/components/User/ItemProduct";
import { useAuth } from "@/app/Context/AuthContext";
import Swal from "sweetalert2";

const Learning = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentVideoId, setCurrentVideoId] = useState<string>("");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      Swal.fire({
        title: "Bạn chưa đăng nhập",
        text: "Vui lòng đăng nhập để học khóa học này.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#654ea3",
        cancelButtonColor: "#1a1f2b",
        confirmButtonText: "Đăng nhập ngay",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        } else {
          router.push("/"); // Nếu hủy thì quay về trang chủ
        }
      });
      return; // Không tiếp tục load dữ liệu nữa
    }

    if (slug) {
      axios
        .get(`/courses/${slug}/lessons`)
        .then((res) => {
          setLessons(res.data);
          if (res.data.length > 0) {
            setCurrentLesson(res.data[0]);
            setCurrentVideoId(res.data[0]._id);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch lessons:", err);
        });
    }
  }, [slug, user, router]);

  const handleLessonClick = (lessonId: string) => {
    const selected = lessons.find((lesson) => lesson._id === lessonId);
    if (selected) {
      setCurrentLesson(selected);
      setCurrentVideoId(selected._id || "");
    }
  };

  // Nếu chưa có user, không render nội dung
  if (!user) return null;

  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <section className="learning_course mb-[35px]">
        <div className="content_learning 2xl:flex max-xl:flex-col gap-x-[20px]">
          {/* Video */}
          <div className="video_player 2xl:w-[50%] max-xl:w-full bg-[#141625] rounded-[10px] overflow-hidden">
            <div className="flex items-center gap-x-[10px] play_video bg-gradient-to-r from-[#eaafc8] to-[#654ea3] w-full rounded-[10px] py-[10px] px-[20px] mb-[20px]">
              <i className="fa-solid fa-circle-play text-[25px] text-white"></i>
              <h1 className="text-white text-[25px]">Video khóa học</h1>
            </div>
            <div className="aspect-video">
              {currentLesson?.videoUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={currentLesson.videoUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  Video not available.
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-white text-xl font-medium">
                {currentLesson?.title || "Chọn bài học"}
              </h2>
              <p className="text-[#9d9da3] mt-2 text-[14px]">
                {currentLesson?.description}
              </p>
            </div>
          </div>

          {/* Danh sách bài học */}
          <div className="lesson_list 2xl:w-[50%] max-xl:w-full bg-[#141625] rounded-[10px] max-h-[600px] overflow-y-auto">
            <div className="title_course mb-[20px]">
              <div className="play_video bg-gradient-to-r from-[#eaafc8] to-[#654ea3] w-full rounded-[10px] py-[10px] px-[20px]">
                <h1 className="text-white text-[25px]">
                  Danh sách các bài học
                </h1>
              </div>
            </div>
            {lessons.length > 0 ? (
              lessons.map((lesson) => (
                <div
                  key={lesson._id}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    currentVideoId === lesson._id
                      ? "bg-gradient-to-r from-[#eaafc8] to-[#654ea3]"
                      : "hover:bg-[#2A2C3B]"
                  }`}
                  onClick={() => lesson._id && handleLessonClick(lesson._id)}
                >
                  <div className="flex items-center gap-3">
                    <i
                      className={`fa-solid fa-circle-play ${
                        currentVideoId === lesson._id
                          ? "text-white"
                          : "bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent"
                      } text-[20px]`}
                    ></i>
                    <span
                      className={`${
                        currentVideoId === lesson._id
                          ? "text-white"
                          : "text-[#E5E4E4]"
                      }`}
                    >
                      {lesson.title}
                    </span>
                  </div>
                  <span
                    className={`text-sm ${
                      currentVideoId === lesson._id
                        ? "text-white"
                        : "text-[#9D9DA3]"
                    }`}
                  >
                    {lesson.duration}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 text-white">
                Loading lessons or no lessons found.
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Learning;
