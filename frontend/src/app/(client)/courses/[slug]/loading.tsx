export default function CourseDetailLoading() {
  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4 animate-pulse">
      <div className="w-full h-[200px] bg-[#1F212C] rounded-[20px] mb-8"></div>

      <div className="bg-[#1F212C] rounded-[10px] p-[35px] flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 aspect-video bg-[#121826] rounded-xl"></div>
        <div className="lg:w-1/2 space-y-6">
          <div className="h-10 bg-[#121826] w-3/4 rounded"></div>
          <div className="h-6 bg-[#121826] w-1/2 rounded"></div>
          <div className="h-24 bg-[#121826] w-full rounded"></div>
          <div className="h-12 bg-[#121826] w-40 rounded"></div>
        </div>
      </div>
    </div>
  );
}
