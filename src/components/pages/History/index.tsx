import { Link } from "react-router-dom";

const History = () => {
  return (
    <main>
      <div className="container mx-auto px-4 my-4 lg:my-10 xl:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-800 text-xl montserrat font-bold md:text-2xl">Cashback History</h1>

          <Link to="/history" className="underline text-sm md:text-lg">View full history➭</Link>
        </div>
      
        <div className="flex flex-col gap-8 my-8">
          <div className="p-6 bg-white rounded-lg shadow-md w-full overflow-hidden hover:shadow-lg transition-shadow md:w-80">
            <p className="font-medium">Balance</p>
            <p className="mt-10 text-2xl text-gray-800 font-bold">₦21, 200</p>
            <span className="text-xs text-gray-700">+27.5% from last month</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default History;
