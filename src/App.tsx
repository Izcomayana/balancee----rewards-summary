import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/components/pages/Home";
import History from "./components/pages/History";
import Header from "./components/Header";
import Cashout from "./components/pages/Cashout";

function App() {
  return (
    <Router>
      <div className="bg-[#E6F1F6]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/cashout" element={<Cashout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
