export default function BlogLoading() {
  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4 animate-pulse">
      <div className="w-full h-[250px] bg-[#1F212C] rounded-[20px] mb-8"></div>

      {/* Category Buttons Skeleton */}
      <div className="flex justify-center gap-4 mb-10">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-[#1F212C] rounded-md"></div>
        ))}
      </div>

      {/* Featured Blog Skeleton */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="lg:w-1/2 h-[300px] bg-[#1F212C] rounded-xl"></div>
        <div className="lg:w-1/2 space-y-4">
          <div className="h-6 bg-[#1F212C] w-1/4 rounded-full"></div>
          <div className="h-10 bg-[#1F212C] w-full rounded"></div>
          <div className="h-20 bg-[#1F212C] w-full rounded"></div>
        </div>
      </div>

      {/* Grid Blog List Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-[#1A1F2B] rounded-2xl overflow-hidden h-[400px]"
          >
            <div className="h-[250px] bg-[#2A303C]"></div>
            <div className="p-5 space-y-3">
              <div className="h-4 bg-[#2A303C] w-1/2 rounded"></div>
              <div className="h-6 bg-[#2A303C] w-full rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
