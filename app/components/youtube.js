"use client";

import { useRef} from "react";

export default function YoutubeSection() {
    const scrollRef = useRef(null);

 const videos = [
  {
    id: "bAulddz4q94",
    title: "How I leveled up as a Full Stack Developer | Paras Kumar | IREED India",
    views: "9.8K views",
  },
  {
    id: "xA7AWhLQXKQ",
    title: "From Beginner to Developer | Web Development Journey | IREED India",
     views: "7.6K views",
  },
  {
    id: "SHmN2dyX7u4",
    title: "How to Stay Motivated While Learning New Skills",
    views: "6.4K views",
  },
  {
    id: "-l7OA49TzDQ",
    title: "Top Productivity Tips to Boost Your Daily Performance",
    views: "12K views",
  }
];
    const featured = videos[0];

    const scroll = (dir) => {
        scrollRef.current?.scrollBy({
            left: dir === "left" ? -250 : 250,
            behavior: "smooth",
        });
    };

    return (
        <section className="px-20 py-10 bg-gray-100">

            {/* Header */}
            <h2 className="text-3xl font-bold mb-6">
                Learn from Real YouTube Content
            </h2>

            {/* Main Layout */}
            <div className="flex gap-6 items-center">

                {/* 🎬 Featured Video */}
                <div className="w-[50%] h-[450px] rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${featured.id}`}
                        title={featured.title}
                        allowFullScreen
                        className="rounded-xl"
                    ></iframe>
                </div>

                {/* 👉 Right Side Vertical Carousel */}
                <div className="relative w-[50%] flex items-center">


                    {/* Videos */}
         <div
  ref={scrollRef}
  className="flex gap-4 overflow-x-auto no-scrollbar px-8"
>
                        {videos.map((video, i) => (
                            <div
                                key={i}
                                className="min-w-200px] cursor-pointer hover:scale-105 transition"
                            >
                                {/* 🎬 Portrait Video */}
                                <div className="w-[200px] h-[300px] rounded-xl overflow-hidden shadow-md">

                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${video.id}`}
                                        title={video.title}
                                        allowFullScreen
                                        className="w-full h-full rounded-xl"
                                    ></iframe>
                                </div>

                                {/* Title */}
                                <div>
    <p className="text-sm font-semibold leading-tight py-3 line-clamp-3">
      {video.title}
    </p>
    <p className="text-xs text-gray-500">
      {video.views}
    </p>
  </div>
  
                            </div>
                            
                            
                            
                        ))}
                        
                        
                    </div>
                    
                </div>
  
            </div>

        </section>
    );
}