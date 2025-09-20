import "./Navbar.css";
import { Link } from "react-router-dom";
import menu_icon from "../../assets/orange-menu.png";

// Navbar Component
// ----------------
// Displays the top navigation bar with a menu button and a title.
// The menu button opens the sidebar, and the title links back to the home page.
function Navbar({ setSidebar }) {
  return (
    <div>
      <nav className="Navbar">
        {/* Menu icon - when clicked, opens the sidebar */}
        <img
          className="menu-icon"
          src={menu_icon}
          onClick={() => setSidebar((prev) => true)} // set sidebar to true (open)
        />

        {/* Title text (acts as a link to Home page) */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2>Sorting Visualizer</h2>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
