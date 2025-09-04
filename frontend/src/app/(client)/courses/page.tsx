"use client";
import Banner from "@/components/User/Banner";
import InputSearch from "@/components/User/InputSearch";
import ListCourses from "@/components/User/ListCourses";
import Footer from "@/app/layout/Footer";
import React, { useEffect, useMemo, useState } from "react";
import axios from "@/app/utils/axiosInstance";
import type { Course } from "@/components/User/ItemProduct";

const CoursesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [coursesRes, authorsRes, categoriesRes] = await Promise.all([
          axios.get<Course[]>("/courses"),
          axios.get<{ name: string }[]>("/authors"),
          axios.get<{ name: string }[]>("/categories"),
        ]);

        setAllCourses(coursesRes.data || []);
        setAuthors((authorsRes.data || []).map((a) => a.name).filter(Boolean));
        setCategories(
          (categoriesRes.data || []).map((c) => c.name).filter(Boolean)
        );
      } catch (error) {
        console.error("Failed to load initial data", error);
      }
    };
    fetchInitialData();
  }, []);

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
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <Banner
        name="Khóa học miễn phí - Học mọi lúc mọi nơi"
        description="Học lập trình miễn phí, mọi lúc mọi nơi với nội dung chất lượng từ các chuyên gia. Nắm vững HTML, CSS, JavaScript, ReactJS và hơn thế nữa – bắt đầu ngay hôm nay! 🚀"
        showButton={false}
        image="assets/img/banner_img_courses.png"
        isBlog={false}
      />
      <section className="Filter_course my-[35px] max-xl:flex-col max-xl:justify-center max-xl:items-center bg-[#1F212C] py-[10px] px-[30px] rounded-[10px] flex justify-between ">
        <h1 className="title_course text-white text-[25px] max-xl:mb-[10px] font-bold">
          Bộ lọc tìm kiếm
        </h1>
        <select
          name="author"
          id="author"
          className="select_author bg-[#333647] rounded-[5px] text-white px-[4px] border-none outline-none xl:w-[172px] h-[40px] max-xl:mb-[10px] max-xl:w-[250px]"
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
        <select
          name="category"
          id="category"
          className="select_author bg-[#333647] rounded-[5px] text-white px-[4px] border-none outline-none xl:w-[172px] h-[40px] max-xl:mb-[10px] max-xl:w-[250px]"
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
        <InputSearch
          placeholder="Tìm kiếm theo khóa học..."
          h={"40px"}
          w={"250px"}
          apiEndpoint="/courses/search"
          onResults={(data) => {
            setSearchResults(data as Course[]);
            setCurrentPage(1);
          }}
          className="search_courses flex justify-center items-center w-[250px] max-xl:mb-[10px]"
        />
      </section>
      <section className="listCourses bg-[#1F212C] py-[10px] px-[20px] rounded-[10px] h-auto">
        {filteredCourses.length === 0 ? (
          <h3 className="text-[#E5E4E4] text-center">
            Không tìm thấy khóa học nào!
          </h3>
        ) : (
          <ListCourses courses={paginatedCourses} />
        )}
      </section>
      <section className="flex items-center justify-center gap-2 my-8">
        <button
          className="w-9 h-9 flex items-center justify-center rounded border border-[#6C6C6C] hover:bg-gradient-to-r from-[#eaafc8] to-[#654ea3] hover:border-transparent hover:text-white transition-colors"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-chevron-left text-[#E5E4E4]"></i>
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`w-9 h-9 flex items-center justify-center rounded border border-[#6C6C6C] transition-colors ${
              currentPage === page
                ? "bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white"
                : "text-[#E5E4E4] hover:bg-gradient-to-r hover:from-[#eaafc8] hover:to-[#654ea3] hover:border-transparent hover:text-white"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="w-9 h-9 flex items-center justify-center rounded border border-[#6C6C6C] hover:bg-gradient-to-r from-[#eaafc8] to-[#654ea3] hover:border-transparent hover:text-white transition-colors"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-chevron-right text-[#E5E4E4]"></i>
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default CoursesPage;
