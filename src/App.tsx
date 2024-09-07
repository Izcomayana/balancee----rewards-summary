import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages"
import HistoryPage from "@/pages/History";
import Header from "./components/Header";
import CashoutPage from "@/pages/Cashout";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/History" element={<HistoryPage />} />
        <Route path="/Cashout" element={<CashoutPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <div className="">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;