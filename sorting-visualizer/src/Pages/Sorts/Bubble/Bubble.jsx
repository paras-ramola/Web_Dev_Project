import React, { useEffect, useState } from "react";
import "./Bubble.css";
import TopPart from "../../../Parts/TopPart/TopPart";
import BottomPart from "../../../Parts/BottomPart/BottomPart";

function Bubble({
  setSidebar,
  sortName,
  setSortName,
  play,
  setPlay,
  playRef,
  mainBox,
}) {
  // Helper function to create a delay (used for animation)
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Bubble Sort Algorithm (with animation)
  async function bubbleSort() {
    let bars = mainBox.current.children; // All bars inside the sorting box
    for (let i = 0; i < bars.length - 1; i++) {
      for (let j = 0; j < bars.length - i - 1; j++) {
        // Stop sorting if play button is paused
        if (!playRef.current) {
          return;
        }

        // Get height values of two bars
        let val1 = parseInt(bars[j].style.height);
        let val2 = parseInt(bars[j + 1].style.height);

        // Highlight the current bar being compared
        bars[j].classList.add("redBar");

        // Small delay for visual effect
        await wait(10);

        // Swap bars if the left one is bigger
        if (val1 > val2) {
          bars[j].style.height = `${val2}px`;
          bars[j + 1].style.height = `${val1}px`;
        }

        // Remove highlight after comparison
        bars[j].classList.remove("redBar");
      }
    }
    // After sorting is done, stop the play state
    setPlay((prevPlay) => false);
  }

  // Runs only once when component mounts → sets the sorting name
  useEffect(() => {
    setSortName("Bubble Sort");
  }, []);

  // Runs whenever play changes
  useEffect(() => {
    playRef.current = play; // Keep play state in ref (for pause/resume)
    if (play === true && sortName === "Bubble Sort") {
      bubbleSort(); // Start sorting when play is true
    }
  }, [play]);

  return (
    <div className="bubble" onClick={() => setSidebar((prev) => false)}>
      {/* Top section with controls (play, pause, randomize) */}
      <TopPart
        sortName={sortName}
        play={play}
        setPlay={setPlay}
        playRef={playRef}
        mainBox={mainBox}
      />

      {/* Bottom section with details/info about Bubble Sort */}
      <BottomPart sortName={sortName} />
    </div>
  );
}

export default Bubble;
