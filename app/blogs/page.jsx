"use client";
import { useState } from "react";

import {
  Building2,
  Grip,
  User,
  Presentation,
  Signature,
  PersonStanding,
  ChartLine,
  UsersRound,
  Cpu,
  MailOpen,
  Search,
  ChevronDown,
} from "lucide-react";

// ---------------- DATA -------------------

const CATEGORIES_DATA = [
  { icon: Grip, name: "All Categories" },
  { icon: Building2, name: "Coorporate Training" },
  { icon: PersonStanding, name: "Trainer Development" },
  { icon: Presentation, name: "L&D Strategies" },
  { icon: Signature, name: "Soft Skills" },
  { icon: User, name: "Leadership" },
  { icon: ChartLine, name: "Sales Training" },
  { icon: UsersRound, name: "Workplace Culture" },
  { icon: Cpu, name: "Technology in Training" },
];

const FEED_DATA = [
  {
    tag: "Corporate Training",
    title: "How to Choose the Right Corporate Trainer for Your Organization",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop",
    subtext: "Key factors to consider when selecting a trainer who can deliver real impact.",
    authorImage: "https://ui-avatars.com/api/?name=Priya+Mehta&background=random",
    authorName: "Priya Mehta",
    date: "May 20, 2024",
    time: "6 min read",
  },

  {
    tag: "L&D Strategies",
    title: "7 L&D Strategies to Build a Future-Ready Workforce",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop",
    subtext: "Practical strategies to align learning initiatives with business goals.",
    authorImage: "https://ui-avatars.com/api/?name=Rahul+Desai&background=random",
    authorName: "Rahul Desai",
    date: "May 18, 2024",
    time: "5 min read",
  },

  {
    tag: "Soft Skills",
    title: "The Most In-Demand Soft Skills in 2024",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop",
    subtext: "Skills that professionals need to thrive in the modern workplace.",
    authorImage: "https://ui-avatars.com/api/?name=Anjali+Shah&background=random",
    authorName: "Anjali Shah",
    date: "May 15, 2024",
    time: "4 min read",
  },
  {
    tag: "Technology in Training",
    title: "How Technology is Transforming Corporate Training",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&auto=format&fit=crop",
    subtext: "Explore the latest tools and trends shaping the future of learning.",
    authorImage: "https://ui-avatars.com/api/?name=Karan+Malhotra&background=random",
    authorName: "Karan Malhotra",
    date: "May 12, 2024",
    time: "6 min read",
  },
];

// ------------Hero Section-----------------------

export const HeroSection = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto flex justify-between bg-[#fafcfd] rounded-md">
        <div className="p-8">
          <h1 className="font-extrabold lg:text-6xl mb-4">Blog</h1>
          <p>
            Insights, tips and trends help you build a <br />
            stronger learning culture and drive performance.
          </p>
        </div>

        <div>
          <img
            src="/blogs/hero.jpg"
            alt="Blog hero"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

// ------------------- Categories--------------------

const Categories = () => {
  return (
    <div className="rounded p-8 border-gray-200 border-2">
      <p className="font-bold lg:text-xl p-2">Categories</p>
      <div className="flex flex-col gap-2">
        {CATEGORIES_DATA.map((category) => {
          const Icons = category.icon;
          return (
            <div
              className="flex gap-3 items-center p-2 hover:bg-blue-100 cursor-pointer rounded-md"
              key={category.name}
            >
              <Icons size={18} />
              <span>{category.name}</span>
            </div>
          );
        })}
      </div>

      <CTA />
    </div>
  );
};

// -------------------- CTA ---------------------------

const CTA = () => {
  return (
    <div className=" p-6 bg-gray-200">
      <div className="flex  gap-2">
        <MailOpen />
        <div>
          <p>Stay Ahead in L&D</p>
          <p>
            Subscribe to get the latest <br />
            insights delivered to your inbox
          </p>
        </div>
      </div>
      <button className="bg-[#0e4b8c] px-4 py-2 text-xl rounded-lg w-full text-white">
        Subscribe
      </button>
    </div>
  );
};

// ---------------Blog Feed----------------------------

const BlogFeed = () => {
  return (
    <div className="p-8 flex-col w-full justify-between items-center">
      <div className="flex items-center">
        <SearchBar />
        <Filter />
      </div>
      
      <div className="flex flex-1">
        <FeedCards/>
      </div>
    </div>
  );
};

// ---------------filter-------------------------------

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="w-full ">
      <div className="flex justify-end">
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border-[#ececec] border-2 px-4 py-2"
        >
          <option value="Most Recent">Most Recent</option>
          <option value="Popular">Popular</option>
        </select>
      </div>
    </div>
  );
};

// ---------------- Search Bar--------------------------

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="flex border-2 border-[#ececec] p-2 w-full justify-between">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Articles"
        className=""
      />
      <Search className="text-[#ececec]" />
    </div>
  );
};

const FeedCards = ()=>{


    return(
        
        <div className="">
            {FEED_DATA.map(data=> (
                <div className="flex" key={data.title}>
                    <img src={data.image} alt="blogImage.png" />
                    <div className="flex flex-col">
                        <div>{data.tag}</div>
                        <p>{data.title}</p>
                        <p>{data.subtext}</p>

                        <div className="flex">
                            <div className="flex">
                                <img src={data.authorImage} alt="" />
                                <p>{data.authorName}</p>
                            </div>
                            <p>{data.date}</p>
                            <p>{data.time}</p>
                        </div>

                    </div>
                </div>
            ))}
            
        </div>
        

    )
}



// --------------------Main Section-----------------------

const MainSection = () => {
  return (
    <div className="flex max-w-7xl mx-auto rounded shadow-2xl bg-white ">
      <Categories />
      <BlogFeed />
    </div>
  );
};

export default function blogs() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <div>
      <HeroSection />
      <MainSection />
    </div>
  );
}
