import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import History from "./pages/History";
import Header from "./components/Header";
import Cashout from "./pages/Cashout";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/cashout" element={<Cashout />} />
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