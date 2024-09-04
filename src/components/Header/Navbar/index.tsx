import { useState } from "react";
import balancee from "../../../../public/balancee-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <img src={balancee} alt="balancee-logo" />
          </div>
          
          <button
          className="text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </button>
        </div>

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>
        <div
          className={`fixed top-0 left-0 w-[70%] h-full bg-white shadow-lg transform transition-transform duration-300 md:w-[55%] ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-8">
          <div className="flex justify-between items-center">
          <div>
            <img src={balancee} alt="balancee-logo" className="w-28" />
          </div>
          
          <button
          className="text-black"
          onClick={() => setIsOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

        </button>
        </div>
            <ul className="mt-24">
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
