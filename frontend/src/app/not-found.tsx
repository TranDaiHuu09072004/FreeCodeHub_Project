// src/app/not-found.tsx

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[120px] font-extrabold bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text leading-[100px]">
        404
      </h1>
      <h2 className="text-[28px] font-bold text-white mt-4">
        Không tìm thấy trang
      </h2>
      <p className="text-gray-400 mt-2 max-w-[500px]">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-3 font-extrabold bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white rounded-lg transition hover:opacity-90"
      >
        Quay lại trang chủ
      </a>
    </div>
  );
}
