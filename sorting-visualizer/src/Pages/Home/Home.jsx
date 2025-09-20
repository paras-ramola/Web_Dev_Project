import { useEffect, useRef } from "react";
import "./Home.css"; // Import your CSS file
import bgImg from "../../assets/bg_1.jpg";

function Home({ setSidebar }) {
  const animationRan = useRef(false);


  //*Animation at start
  useEffect(() => {
    // Prevent animation from running multiple times
    if (animationRan.current) return;

    // Load anime.js from CDN to avoid import issues
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js";
    script.onload = () => {
      // Mark animation as ran
      animationRan.current = true;

      // Now anime is available globally on window
      if (window.anime && typeof window.anime.timeline === "function") {
        window.anime.timeline({ loop: false }).add({
          targets: ".ml15 .word",
          scale: [14, 1],
          opacity: [0, 1],
          easing: "easeOutCirc",
          duration: 800,
          delay: (el, i) => 800 * i,
        });
        // Removed the fade-out animation so text stays visible
      }
    };

    // Only add script if it doesn't already exist
    if (!document.querySelector('script[src*="anime.min.js"]')) {
      document.head.appendChild(script);
    } else {
      // Script already exists, just run the animation
      if (window.anime && !animationRan.current) {
        animationRan.current = true;
        script.onload();
      }
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    // style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }}
    <div className="home" onClick={() => setSidebar((prev) => false)}>
      <div className="title">
        <h1 className="ml15">
          <span className="word">Sorting</span>
          <br />
          <span className="word">Visualizer</span>
        </h1>
      </div>
      <div className="description-box">
        <h2>Sorting Algorithms</h2>

        <div className="content">
          <ul>
            <li>
              Sorting algorithms are used to sort a data structure according to
              a specific order relationship, such as numerical order or
              lexicographical order.
            </li>

            <li>
              This operation is one of the most important and widespread in
              computer science. For a long time, new methods have been developed
              to make this procedure faster and faster.
            </li>

            <li>
              There are currently hundreds of different sorting algorithms, each
              with its own specific characteristics. They are classified
              according to two metrics: space complexity and time complexity.
            </li>

            <li>
              Those two kinds of complexity are represented with asymptotic
              notations, mainly with the symbols O, Θ, Ω, representing
              respectively the upper bound, the tight bound, and the lower bound
              of the algorithm's complexity, specifying in brackets an
              expression in terms of n, the number of the elements of the data
              structure.
            </li>

            <li>
              Most of them fall into two categories:
              <ul style={{listStyle:"circle"}}>
                <li>
                  Logarithmic
                  <br />
                  The complexity is proportional to the binary logarithm (i.e to
                  the base 2) of n. An example of a logarithmic sorting
                  algorithm is Quick sort, with space and time complexity O(n ×
                  log n).
                </li>
                <li>
                  Quadratic
                  <br />
                  The complexity is proportional to the square of n. An example
                  of a quadratic sorting algorithm is Bubble sort, with a time
                  complexity of O(n2).
                </li>
              </ul>
            </li>
            <li>
              Space and time complexity can also be further subdivided into 3
              different cases: best case, average case and worst case.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
