import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Home = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <motion.div exit={{ opacity: 0 }}>
      <main>
        <div className="container mx-auto px-4 pt-4 pb-20 md:h-screen lg:pt-10 xl:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-800 text-xl montserrat font-bold md:text-2xl">
              Earnings Overview
            </h1>

            <Link to="/history" className="underline text-sm md:text-lg">
              View full history➭
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 my-8">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="p-6 bg-white rounded-lg shadow-md w-full overflow-hidden hover:shadow-lg transition-shadow md:w-80"
            >
              <p className="font-medium">Total Earnings</p>
              <p className="mt-10 text-2xl text-gray-800 font-bold">₦45,670</p>
              <span className="text-xs text-gray-700">
                +17.1% from last month
              </span>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              className="p-6 bg-white rounded-lg shadow-md w-full overflow-hidden hover:shadow-lg transition-shadow md:w-80"
            >
              <p className="font-medium">Current Balance</p>
              <p className="mt-10 text-2xl text-gray-800 font-bold">₦21,200</p>
              <span className="text-xs text-gray-700">
                +27.5% from last month
              </span>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              className="p-6 bg-white rounded-lg shadow-md w-full overflow-hidden hover:shadow-lg transition-shadow md:w-80"
            >
              <p className="font-medium">Total Bookings</p>
              <p className="mt-10 text-2xl text-gray-800 font-bold">123+</p>
              <span className="text-xs text-gray-700">
                +10.1% from last month
              </span>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Home;
