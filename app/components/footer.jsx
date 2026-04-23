"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
} from "lucide-react";



export default function Footer() {
  const [checked, setChecked] = useState(false);
  const companies = [
    "Web Development",
    "Full Stack Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cyber Security",
    "Cloud Computing",
    "DevOps",
    "UI/UX Design",
    "Digital Marketing",
    "Business Analytics",
    "Entrepreneurship",
    "Soft Skills",
    "Communication Skills",
    "Leadership Training",
    "Public Speaking",
    "Interview Preparation",
    "Career Guidance",
    "Corporate Training",
    "Technical Skills",];
  return (
    <footer className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">

        {/* COLUMN 1 */}
        <div>
          {/* Logo */}
          <h2 className="text-3xl font-bold tracking-wide mb-6">Trainer Hub</h2>

          {/* Address */}
          <p className="text-[15px] leading-7 text-gray-200">
            <span className="font-semibold text-white">Address:</span> Office
            Suite 8 & 9, 3rd Floor, Ninex City Mart, Sohna Road, Near Radisson
            Hotel, Sector 49, Gurugram, Haryana 122018
          </p>

          {/* Map */}
          <div className="mt-6 w-[260px] h-[150px] rounded overflow-hidden">
            <iframe
              title="Trainer Hub Location Map"
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.0894627894086!2d77.03865790919117!3d28.416557275682326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d233cdeec2d81%3A0xaf6144fd2d8f2f4f!2sIREED%20Academy%20India%20Private%20Limited!5e0!3m2!1sen!2sin"
            />
          </div>
        </div>

        {/* COLUMN 2 */}
        {/* COLUMN 2 + 3 (Mobile Grid Fix) */}
        <div className="col-span-1 sm:col-span-2 grid grid-cols-2 gap-8">

          {/* COMPANY */}
          <div>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6">Company</h4>
            <ul className="space-y-2 sm:space-y-3 text-[14px] sm:text-[15px] text-gray-200">
              {[
                "About",
                "Courses",
                "Mentors",
                "SiteMap",
                "Privacy Policy",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-white hover:font-bold hover:underline transition-all duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-lg font-semibold mb-4 sm:mb-6">Links</h4>
            <ul className="space-y-2 sm:space-y-3 text-[14px] sm:text-[15px] text-gray-200">
              {[
                "Contact Us",
                "FAQ's",
                "Terms and Conditions",
                "Student Review",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-white hover:font-bold hover:underline transition-all duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* COLUMN 4 */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Contacts</h4>

          <p className="text-[15px] text-gray-200 mb-4">
            Enter your email address to register
          </p>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-md">

            {/* Input */}
            <input type="email" placeholder="Enter your email" className=" border border-white rounded-md px-2 py-2 " />

            {/* Button */}
            <button
              className="
              bg-black 
              rounded-md
              px-4 py-2
              text-sm sm:text-base
              font-semibold
              whitespace-nowrap
              hover:bg-blue-400
              transition            
              "
            >
              Subscribe →
            </button>

          </div>



          {/* Social Icons */}
          <div className="flex gap-4 mt-6 mb-8">
            {[Facebook, Twitter, Linkedin, Youtube, Instagram].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="
          w-11 h-10
          flex items-center justify-center
          rounded-full
          bg-white text-[#114FA3]
          shadow-md
          cursor-pointer

          transition-all duration-300 ease-in-out
          hover:bg-[#072043]
          hover:text-white
          hover:scale-110
          hover:shadow-xl
        "
                >
                  <Icon size={18} />
                </div>
              )
            )}
          </div>

          {/* Checkbox */}

          <div
            onClick={() => setChecked(!checked)}
            className="
    flex items-center justify-between
    bg-white text-black
    px-3 sm:px-4 py-3
    rounded-md
    border border-gray-300
    shadow-sm
    w-full sm:w-[300px]
    cursor-pointer
    hover:shadow-md transition
  "
          >
            {/* Left side */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`
        w-4 h-4 sm:w-5 sm:h-5 
        border-2 rounded 
        flex items-center justify-center
        ${checked ? "bg-green-500 border-green-500" : "border-gray-400"}
      `}
              >
                {checked && <span className="text-white text-[10px] sm:text-xs">✓</span>}
              </div>

              <p className="text-xs sm:text-sm">I’m not a robot</p>
            </div>

            {/* Right side */}
            <div className="text-[9px] sm:text-[10px] text-gray-500 text-right leading-tight">
              reCAPTCHA
              <br />
              <span className="underline cursor-pointer">Privacy</span> ·{" "}
              <span className="underline cursor-pointer">Terms</span>
            </div>
          </div>


        </div>

      </div>



      <div className="border-t border-white/20">
        <div
          className="
            max-w-7xl
            mx-auto
            px-6 lg:px-16
            py-10
          "
        >
          <h4
            className="
              text-[16px] sm:text-[18px]
              font-semibold
              mb-6
            "
          >
            Popular Skills & Training Categories
          </h4>

          <p
            className="
              text-[14px] sm:text-[15px]
              text-gray-200
              leading-7 sm:leading-8
              flex flex-wrap
            "
          >
            {companies.map((item, i) => (
              <span
                key={i}
                className="whitespace-nowrap mb-2"
              >
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  {item}
                </a>

                {i !== companies.length - 1 && (
                  <span className="mx-2 text-white/70">|</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>

    </footer>
  );
}