export default function Loading() {
  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4 animate-pulse">
      <div className="w-full h-[300px] bg-[#1F212C] rounded-[20px] mb-10"></div>

      <div className="h-8 bg-[#1F212C] w-48 mb-8 rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-[#1A1F2B] rounded-[10px] overflow-hidden">
            <div className="w-full h-[200px] bg-[#2A303C]"></div>
            <div className="p-6">
              <div className="h-6 bg-[#2A303C] w-3/4 mb-4 rounded"></div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#2A303C]"></div>
                  <div className="h-4 bg-[#2A303C] w-20 rounded"></div>
                </div>
                <div className="h-4 bg-[#2A303C] w-12 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
