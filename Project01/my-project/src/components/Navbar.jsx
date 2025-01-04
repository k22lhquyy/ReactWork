import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-scroll";
import { FaXmark, FaBars } from "react-icons/fa6";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handelScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handelScroll);

    return () => {
      window.addEventListener("scroll", handelScroll);
    };
  });

  const navIteams = [
    { link: "Home", path: "home" },
    { link: "Service", path: "service" },
    { link: "About", path: "about" },
    { link: "Product", path: "Product" },
    { link: "Testimonial", path: "testimonial" },
    { link: "FAQ", path: "FAQ" },
  ];

  return (
    
    <header className="fixed top-0 left-0 right-0 w-full bg-white md:bg-transparent">
      <nav className="py-4 px-4 lg:px-12 ${sticky ? }">
        <div className="flex justify-between items-center text-base gap-8">
          <a
            href=""
            className="flex items-center space-x-3 text-2xl font-semibold"
          >
            <img
              src={logo}
              alt=""
              className="items-center inline-block w-10"
            />
            <span className="text-[#263238]">NEXCENT</span>
          </a>

          <ul className="hidden space-x-12 md:flex">
            {
              navIteams.map(({link, path}) => <Link to={path} spy={true} smooth={true} offset={-100} key={path} 
              className="block text-base text-gray-900 hover:text-green-300 first:font-medium">{link}</Link>)
            }
          </ul>

          <div className="space-x-12 hidden lg:flex items-center">
            <a href="" className="hidden lg:flex items-center text-green-500 hover:text-gray-900">Login</a>
            <button className="bg-green-400 text-white py-2 px-4 transition-all duration-300 rounded hover:bg-gray-700">Sign up</button>
          </div>


          <div className="md:hidden">
            <button className="focus:outline-none focus:text-gray-400 text-neutral-600" onClick={toggleMenu}>
              {isMenuOpen ? <FaXmark className="h-6 w-6 " /> : <FaBars className="h-6 w-6 " />}
            </button>
          </div>
        </div>
        <div>
          <ul className={`${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"} md:hidden px-4 mt-16 py-7 bg-green-400`}>
            {
              navIteams.map(({link, path}) => <Link to={path} spy={true} smooth={true} offset={-100} key={path} 
              className="block text-base text-gray-900 hover:text-green-300 first:font-medium">{link}</Link>)
            }
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
