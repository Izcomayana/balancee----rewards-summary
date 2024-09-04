import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/components/pages/Home";
import History from "./components/pages/History";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
