export default function BlogDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto lg:pt-10 px-4 animate-pulse">
      <div className="h-6 bg-[#1F212C] w-48 mb-6 rounded"></div>
      <div className="h-16 bg-[#1F212C] w-full mb-8 rounded"></div>

      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-full bg-[#1F212C]"></div>
        <div className="space-y-2">
          <div className="h-4 bg-[#1F212C] w-32 rounded"></div>
          <div className="h-3 bg-[#1F212C] w-20 rounded"></div>
        </div>
      </div>

      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-[#1F212C] rounded ${i % 3 === 0 ? "w-full" : "w-5/6"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
