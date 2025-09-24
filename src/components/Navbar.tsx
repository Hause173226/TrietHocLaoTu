import React, { useState, useEffect } from "react";
import { Menu, X, Pin as Yin, Tangent as Yang } from "lucide-react";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "home", label: "Trang chủ" },
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
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Yin className="w-6 h-6 text-teal-600" />
              <Yang className="w-4 h-4 text-yellow-500 absolute -bottom-1 -right-1" />
            </div>
            <span className="text-xl font-serif font-bold text-gray-900">
              Triết học Lão Tử
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                duration={500}
                className="px-2 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 cursor-pointer transition-colors duration-200 rounded-md hover:bg-teal-50"
                activeClass="text-teal-600 bg-teal-50"
              >
                {item.label}
              </Link>
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
            {navItems.map((item) => (
              <Link
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
