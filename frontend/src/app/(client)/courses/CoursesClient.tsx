"use client";
import Banner from "@/components/User/Banner";
import InputSearch from "@/components/User/InputSearch";
import ListCourses from "@/components/User/ListCourses";
import Footer from "@/app/layout/Footer";
import React, { useEffect, useMemo, useState } from "react";
import type { Course } from "@/components/User/ItemProduct";
import { Author, Categories } from "@/app/types/type";

interface CoursesClientProps {
  initialCourses: Course[];
  initialAuthor: Author[];
  initialCategories: Categories[];
}
const CoursesClientPage = ({
  initialCourses,
  initialAuthor,
  initialCategories,
}: CoursesClientProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allCourses] = useState(initialCourses);
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [authors] = useState<string[]>(
    (initialAuthor || []).map((a) => a.name).filter(Boolean),
  );
  const [categories] = useState<string[]>(
    (initialCategories || []).map((c) => c.name).filter(Boolean),
  );
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const ITEMS_PER_PAGE = 5;

  const baseCourses = useMemo<Course[]>(() => {
    return searchResults.length > 0 ? searchResults : allCourses;
  }, [searchResults, allCourses]);

  const filteredCourses = useMemo<Course[]>(() => {
    return baseCourses.filter((course) => {
      const authorOk = selectedAuthor ? course.author === selectedAuthor : true;
      const categoryOk = selectedCategory
        ? course.category === selectedCategory
        : true;
      return authorOk && categoryOk;
    });
  }, [baseCourses, selectedAuthor, selectedCategory]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredCourses.length / ITEMS_PER_PAGE));
  }, [filteredCourses.length]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedCourses = useMemo<Course[]>(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full min-h-screen bg-[#0f1218]">
      <div className="px-4 py-6 lg:px-8 lg:py-10 max-w-[1440px] mx-auto">
        <Banner
          name="Khóa học miễn phí - Học mọi lúc mọi nơi"
          description="Học lập trình miễn phí, mọi lúc mọi nơi với nội dung chất lượng từ các chuyên gia. Nắm vững HTML, CSS, JavaScript, ReactJS và hơn thế nữa – bắt đầu ngay hôm nay! 🚀"
          showButton={false}
          image="assets/img/banner_img_courses.png"
          isBlog={false}
        />

        <section className="my-8 bg-[#1F212C] rounded-[12px] p-4 lg:p-6">
          {/* Flex col trên mobile, Row trên XL */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <h1 className="text-white text-[20px] lg:text-[24px] font-bold shrink-0 mb-2 xl:mb-0">
              Bộ lọc tìm kiếm
            </h1>

            <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
              {/* Select Author */}
              <select
                name="author"
                id="author"
                // w-full trên mobile để nó dài ra hết màn hình -> Đẹp hơn
                className="bg-[#333647] rounded-[8px] text-white px-3 border-none outline-none h-[44px] w-full md:w-[200px] cursor-pointer hover:bg-[#3d4052] transition-colors"
                style={{ colorScheme: "dark" }}
                value={selectedAuthor}
                onChange={(e) => {
                  setSelectedAuthor(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Tất cả tác giả</option>
                {authors.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>

              {/* Select Category */}
              <select
                name="category"
                id="category"
                className="bg-[#333647] rounded-[8px] text-white px-3 border-none outline-none h-[44px] w-full md:w-[200px] cursor-pointer hover:bg-[#3d4052] transition-colors"
                style={{ colorScheme: "dark" }}
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {/* Input Search */}
              <div className="w-full md:flex-1">
                <InputSearch
                  placeholder="Tìm kiếm theo khóa học..."
                  h={"44px"}
                  w={"100%"}
                  apiEndpoint="/courses/search"
                  onResults={(data) => {
                    setSearchResults(data as Course[]);
                    setCurrentPage(1);
                  }}
                  className="search_courses flex items-center w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1F212C] rounded-[12px] p-4 lg:p-6 min-h-[300px]">
          {filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <i className="fa-solid fa-box-open text-gray-600 text-4xl mb-3"></i>
              <h3 className="text-[#E5E4E4] text-lg">
                Không tìm thấy khóa học nào!
              </h3>
            </div>
          ) : (
            <ListCourses courses={paginatedCourses} />
          )}
        </section>

        {totalPages > 1 && (
          <section className="flex items-center justify-center gap-2 mt-8">
            {/* Nút Prev */}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#333647] hover:border-[#654ea3] hover:text-[#654ea3] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fa-solid fa-chevron-left text-gray-400"></i>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${
                  currentPage === page
                    ? "bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white shadow-lg shadow-purple-500/20 border-none"
                    : "bg-[#1F212C] text-gray-400 border border-[#333647] hover:border-gray-500 hover:text-white"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#333647] hover:border-[#654ea3] hover:text-[#654ea3] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fa-solid fa-chevron-right text-gray-400"></i>
            </button>
          </section>
        )}

        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CoursesClientPage;
