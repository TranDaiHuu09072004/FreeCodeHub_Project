export default function Loading() {
  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4 animate-pulse">
      <section className="learning_course mb-[35px]">
        <div className="content_learning 2xl:flex max-xl:flex-col gap-x-[20px]">
          {/* 1. Video Player Skeleton (Bên trái) */}
          <div className="video_player 2xl:w-[50%] max-xl:w-full bg-[#141625] rounded-[10px] overflow-hidden">
            {/* Header Video */}
            <div className="h-[60px] bg-[#1F212C] w-full mb-[20px]"></div>

            {/* Main Video Area */}
            <div className="aspect-video bg-[#1F212C] w-full rounded-[10px]"></div>

            {/* Title Below Video */}
            <div className="p-5">
              <div className="h-8 bg-[#1F212C] w-3/4 rounded mb-4"></div>
              <div className="h-4 bg-[#1F212C] w-1/2 rounded"></div>
            </div>
          </div>

          {/* 2. Lessons List Skeleton (Bên phải) */}
          <div className="lessons_list 2xl:w-[50%] max-xl:w-full max-xl:mt-[20px] bg-[#141625] rounded-[10px] overflow-hidden border border-[#1F2937]">
            {/* Header List */}
            <div className="p-[20px] border-b border-[#1F2937]">
              <div className="h-7 bg-[#1F212C] w-40 rounded"></div>
            </div>

            {/* List Items */}
            <div className="max-h-[600px] overflow-y-auto">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 flex items-center justify-between border-b border-[#1F212C]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#1F212C]"></div>
                    <div className="h-4 bg-[#1F212C] w-48 rounded"></div>
                  </div>
                  <div className="h-4 bg-[#1F212C] w-12 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Comment Skeleton (Phía dưới) */}
      <div className="my-5 border-b border-[#1F2937]"></div>
      <section className="comments_skeleton space-y-6">
        <div className="h-7 bg-[#1F212C] w-32 rounded mb-6"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1F212C]"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[#1F212C] w-24 rounded"></div>
              <div className="h-16 bg-[#1F212C] w-full rounded"></div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
