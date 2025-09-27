import React, { useState, useEffect } from "react";
import { Menu, X, Pin as Yin, Tangent as Yang } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "section1", label: "Biện chứng khách quan" },
    { to: "section2", label: "Giá trị lịch sử" },
    { to: "section3", label: "Phát triển tư duy" },
    { to: "section4", label: "Vận dụng thực tiễn" },
    { to: "section5", label: "Vai trò phương pháp luận" },
    { to: "section6", label: "Giá trị đạo đức" },
    { to: "section7", label: "Tư duy phản biện" },
    { to: "conclusion", label: "Kết luận" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-8xl mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-1">
          {/* Logo + Nút trò chơi nổi bật */}
          <div className="flex items-center space-x-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Yin className="w-6 h-6 text-teal-600" />
                <Yang className="w-4 h-4 text-yellow-500 absolute -bottom-1 -right-1" />
              </div>
              <span className="text-xl font-serif font-bold text-gray-900">
                Triết học Lão Tử
              </span>
            </Link>
            <Link
              to="/tro-choi"
              className={`ml-4 px-4 py-2 text-center rounded-full font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-teal-900 shadow-lg border-2 border-teal-500 hover:scale-105 hover:shadow-xl transition
                ${
                  location.pathname === "/tro-choi"
                    ? "ring-2 ring-teal-500"
                    : ""
                }
              `}
              style={{ marginLeft: "1rem" }}
            >
              🧩 Trò chơi ô chữ
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {isHomePage &&
              navItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 cursor-pointer transition-colors duration-200 rounded-md hover:bg-teal-50"
                  activeClass="text-teal-600 bg-teal-50"
                >
                  {item.label}
                </ScrollLink>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4 space-y-2">
            <Link
              to="/tro-choi"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 text-base font-bold rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-teal-900 shadow-lg border-2 border-teal-500 hover:scale-105 hover:shadow-xl transition
                ${
                  location.pathname === "/tro-choi"
                    ? "ring-2 ring-teal-500"
                    : ""
                }
              `}
            >
              🧩 Trò chơi ô chữ
            </Link>
            {isHomePage &&
              navItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 cursor-pointer transition-colors duration-200 rounded-md hover:bg-teal-50"
                  activeClass="text-teal-600 bg-teal-50"
                >
                  {item.label}
                </ScrollLink>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
