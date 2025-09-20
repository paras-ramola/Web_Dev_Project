import home_icon from "../../assets/home.png";
import menu_icon from "../../assets/orange-menu.png";
import "./Sidebar.css";
import { Link } from "react-router-dom";

// Sidebar Component
// -----------------
// Displays the navigation sidebar with links to Home and different sorting algorithms.
// The sidebar can expand/collapse based on the "sidebar" state passed from App.jsx.
function Sidebar({ sidebar }) {
  return (
    // Toggle sidebar class:
    // if sidebar = true → normal sidebar
    // if sidebar = false → add "reduce-sidebar" class (collapsed version)
    <div className={`sidebar ${sidebar ? "" : "reduce-sidebar"}`}>
      <div className="options">
        <Link to="/" className="home-option option">
          <img className="home-icon" src={home_icon} />
          <h3>Home</h3>
        </Link>

        <hr />
        <div className="sort-title option">
          <img className="menu-icon" src={menu_icon} />
          <h3>Sorts</h3>
        </div>
        <div className="log-sort-options option">
          <div>
            <h5>LOGARITHMIC</h5>
          </div>

          <Link to="/quicksort" className="option">
            <p>Quick Sort</p>
          </Link>
          <Link to="/mergesort" className="option">
            <p>Merge Sort</p>
          </Link>
          <Link to="/heapsort" className="option">
            <p>Heap Sort</p>
          </Link>
          <div>
            <h5>QUADRATIC</h5>
          </div>
          <Link to="/bubblesort" className="option">
            <p>Bubble Sort</p>
          </Link>
          <Link to="/selectionsort" className="option">
            <p>Selection Sort</p>
          </Link>
          <Link to="/insertionsort" className="option">
            <p>Insertion Sort</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
