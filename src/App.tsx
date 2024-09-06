import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import History from "./pages/History";
import Header from "./components/Header";
import Cashout from "./pages/Cashout";

function App() {
  return (
    <Router>
      <div className="">
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
