import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-scroll";


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
      <nav>
        <div>
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
              navIteams.map(({link, path}) => <Link to={path} spy={true} smooth={true} offset={-100} key={path}>{link}</Link>)
            }
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
