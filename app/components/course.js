import Image from "next/image";

export default function PopularCourses() {
    const data = [
        {
            title: "Popular in Sales",
            items: [
                {
                    name: "Rahul Sharma",
                    skill: "Digital Marketing & Sales",
                    rating: "4.9",
                    image: "/Images/trainee1.png",
                },
                {
                    name: "Anjali Verma",
                    skill: "B2B Sales Masterclass",
                    rating: "4.8",
                    image: "/Images/trainee2.png",
                },
                {
                    name: "Aman Gupta",
                    skill: "Cold Calling & Lead Generation",
                    rating: "4.7",
                    image: "/Images/trainee3.png",
                },
                {
                    name: "Arjun Malhotra",
                    skill: "Sales Strategist & Negotiation Expert",
                    rating: "4.8",
                    image: "/Images/trainee3.png",
                },
                {
                    name: "Simran Kaur",
                    skill: "Inside Sales Specialist",
                    rating: "4.7",
                    image: "/Images/trainee2.png",
                },
                {
                    name: "Rajat Khanna",
                    skill: "Lead Generation & CRM Expert",
                    rating: "4.6",
                    image: "/Images/trainee3.png",
                }
            ],
        },
        {
            title: "Popular in Tech",
            items: [
                {
                    name: "Rohit Mehta",
                    skill: "Full Stack Developer",
                    rating: "4.8",
                    image: "/Images/trainee3.png",
                },
                {
                    name: "Sneha Kapoor",
                    skill: "Data Scientist",
                    rating: "4.9",
                    image: "/Images/trainee2.png",
                },
                {
                    name: "Karan Singh",
                    skill: "AI/ML Trainer",
                    rating: "4.7",
                    image: "/Images/trainee1.png",
                },
                {
                    name: "Aditya Verma",
                    skill: "Frontend Developer (React.js)",
                    rating: "4.8",
                    image: "/Images/trainee3.png",
                },
                {
                    name: "Priya Nair",
                    skill: "Cloud Computing Engineer (AWS)",
                    rating: "4.7",
                    image: "/Images/trainee2.png",
                },
                {
                    name: "Nikhil Joshi",
                    skill: "Cybersecurity Specialist",
                    rating: "4.6",
                    image: "/Images/trainee3.png",
                }
            ],
        },
        {
            title: "Popular in Business",
            items: [
                {
                    name: "Neha Arora",
                    skill: "Business Coach",
                    rating: "4.8",
                    image: "/Images/trainee2.png",
                },
                {
                    name: "Vikas Jain",
                    skill: "Marketing Expert",
                    rating: "4.7",
                    image: "/Images/trainee1.png",
                },
                {
                    name: "Pooja Bansal",
                    skill: "Communication Trainer",
                    rating: "4.9",
                    image: "/Images/trainee3.png",
                },
                {
                    name: "Ritika Sinha",
                    skill: "Startup & Growth Consultant",
                    rating: "4.9",
                    image: "/Images/trainee2.png",
                },
                {
                    name: "Manish Agarwal",
                    skill: "Financial Planning Expert",
                    rating: "4.7",
                    image: "/Images/trainee3.png",
                },
                {
                    name: "Kavita Mehra",
                    skill: "HR & Leadership Coach",
                    rating: "4.8",
                    image: "/Images/trainee2.png",
                }
            ],
        },
        
    ];

    return (
        <section className="bg-gray-100 py-10 px-20">
            <h2 className="text-3xl font-semibold mb-6">
                Explore <span className="text-blue-600">Trainers <span className="text-black">by Expertise</span></span> 
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                {data.map((category, idx) => (
                    <div
                        key={idx}
                        className="bg-blue-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                    >
                        <h3 className="font-semibold text-xl mb-4 flex justify-between">
                            {category.title} 
                        </h3>

                        <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2 no-scrollbar">
                            {category.items.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition"
                                >
                                    <div className="relative w-12 h-12">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>


                                    {/* Content */}
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {item.skill}
                                        </p>
                                        <p className="text-xs text-blue-600">
                                            ⭐ {item.rating}
                                        </p>
                                    </div>

                                    {/* Button */}
                                    <button className="text-xs text-blue-600 font-semibold hover:underline">
                                        View
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}