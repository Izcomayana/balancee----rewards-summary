import Navbar from "./Navbar";
import Offcanvas from "./Offcanvas";

const Header = () => {
  return (
    <header>
      <div className="py-4">
        <Navbar />
        <Offcanvas />
      </div>
    </header>
  );
};

export default Header;
