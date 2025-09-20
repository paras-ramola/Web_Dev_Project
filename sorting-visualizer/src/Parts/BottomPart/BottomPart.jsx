import { useEffect, useState } from "react";
import { details } from "../../details";
import "./BottomPart.css";

// Language icons
import cpp_icon from "../../../src/assets/cpp_icon.png";
import c_icon from "../../../src/assets/c_icon.png";
import js_icon from "../../../src/assets/js_icon.png";
import py_icon from "../../../src/assets/py_icon.png";

// Syntax highlighter
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function BottomPart({ sortName }) {
  // Stores algorithm key (e.g., "QuickSort", "MergeSort")
  const [algoName, setAlgoName] = useState();

  // Stores selected language for implementation code
  const [lang, setLang] = useState("c");

  // Update algoName whenever sortName changes
  useEffect(() => {
    setAlgoName(sortName.replace(/\s+/g, "")); // Remove spaces
  }, [sortName]);

  return (
    <div className="bottomContainer">
      
      {/* Left Section: Description + Complexity Table */}
      <div className="infoSort">
        <div className="description">
          <h2>DESCRIPTION</h2>
          {algoName && details[algoName]
            ? details[algoName].description
            : "Loading..."}
        </div>

        <div className="timeTable">
          <h2>COMPLEXITY</h2>
          {algoName && details[algoName] && (
            <table>
              <tbody>
                <tr>
                  <td>Average Complexity</td>
                  <td>{details[algoName].complexity.avg}</td>
                </tr>
                <tr>
                  <td>Best Complexity</td>
                  <td>{details[algoName].complexity.best}</td>
                </tr>
                <tr>
                  <td>Worst Complexity</td>
                  <td>{details[algoName].complexity.worst}</td>
                </tr>
                <tr>
                  <td>Space Complexity</td>
                  <td>{details[algoName].complexity.space}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Right Section: Implementations */}
      <div className="impBox">
        <h2>IMPLEMENTATIONS</h2>
        <div className="impContainer">

          {/* Language selector buttons */}
          <div className="codeBtns">
            <button
              className={`leftBtn ${lang === "c" ? "active" : ""}`}
              onClick={() => setLang("c")}
            >
              <img src={c_icon} alt="C" />
            </button>
            <button
              className={lang === "cpp" ? "active" : ""}
              onClick={() => setLang("cpp")}
            >
              <img src={cpp_icon} alt="C++" />
            </button>
            <button
              className={lang === "js" ? "active" : ""}
              onClick={() => setLang("js")}
            >
              <img src={js_icon} alt="JavaScript" />
            </button>
            <button
              className={lang === "py" ? "active" : ""}
              onClick={() => setLang("py")}
            >
              <img src={py_icon} alt="Python" />
            </button>
          </div>

          {/* Code display */}
          <div className="codeContent">
            <SyntaxHighlighter
              language={lang}                 // Highlights according to chosen language
              style={vscDarkPlus}             // Dark theme
              showLineNumbers={false}         // Hide line numbers
              customStyle={{ background: "transparent" }}
              codeTagProps={{
                style: { fontSize: "22px", fontFamily: "monospace" },
              }}
            >
              {algoName && details[algoName] && details[algoName].implementation[lang]
                ? details[algoName].implementation[lang]
                : "// Implementation not available"}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomPart;
