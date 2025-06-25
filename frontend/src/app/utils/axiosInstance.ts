import axios from "axios";
import Swal from "sweetalert2";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Nếu bạn cần cookie, giữ lại dòng này
});

// ✅ Request Interceptor – tự động gắn token vào headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor – xử lý khi token hết hạn
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (
        status === 401 &&
        message === "Token đã hết hạn. Vui lòng đăng nhập lại."
      ) {
        Swal.fire({
          title: "Token đã hết hạn?",
          text: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
          icon: "question",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
