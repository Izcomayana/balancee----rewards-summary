import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="lg:hidden bg-gray-400">
      <div>
        <button
          className="p-2 bg-blue-500 text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          Toggle Menu
        </button>

        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Off-Canvas Menu */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <ul className="mt-4">
              <li className="mb-2">
                <a href="#" className="text-gray-700">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-700">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-700">
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-700">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
