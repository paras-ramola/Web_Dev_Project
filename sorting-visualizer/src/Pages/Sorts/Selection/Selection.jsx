import React, { useEffect } from "react";
import "./Selection.css";
import TopPart from "../../../Parts/TopPart/TopPart";
import BottomPart from "../../../Parts/BottomPart/BottomPart";

function Selection({
  setSidebar,
  sortName,
  setSortName,
  play,
  setPlay,
  playRef,
  mainBox,
}) {
  // small delay for animation (adjust ms as you like)
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function selectionSort() {
    const bars = mainBox.current.children;
    const n = bars.length;

    // Helper function to clean up all colors
    const cleanupColors = () => {
      for (let k = 0; k < n; k++) {
        bars[k].classList.remove("blueBar", "redBar");
      }
    };

    for (let i = 0; i < n - 1; i++) {
      if (!playRef.current) {
        cleanupColors();
        return;
      }

      let minIndex = i;
      bars[minIndex].classList.add("blueBar"); // highlight current min

      for (let j = i + 1; j < n; j++) {
        if (!playRef.current) {
          cleanupColors();
          return;
        }

        bars[j].classList.add("redBar"); // comparing
        await wait(50);

        const valJ = parseInt(bars[j].style.height);
        const valMin = parseInt(bars[minIndex].style.height);

        if (valJ < valMin) {
          // Remove old min highlight
          bars[minIndex].classList.remove("blueBar");
          minIndex = j;
          bars[minIndex].classList.add("blueBar");
        }

        // Always remove red highlight from current comparison bar
        bars[j].classList.remove("redBar");
      }

      // Swap i and minIndex if needed
      if (minIndex !== i) {
        [bars[i].style.height, bars[minIndex].style.height] = [
          bars[minIndex].style.height,
          bars[i].style.height,
        ];
      }

      // Clean up highlights before marking as sorted
      bars[minIndex].classList.remove("blueBar");
      if (minIndex !== i) {
        bars[i].classList.remove("blueBar");
      }

    }
  }

  useEffect(() => {
    setSortName("Selection Sort");
  }, []);

  useEffect(() => {
    // keep ref in sync
    playRef.current = play;

    if (play === true && sortName === "Selection Sort") {
      //NOTE:**wraping heapsort in async IIFE->lets us await an async func
      //without this (await func) will not work  and setPlay will be called immedialty, before sorting even starts.**

      (async () => {
        // start sorting and ensure we stop play when done or aborted
        await selectionSort();

        setPlay(false);
      })();
    }
  }, [play]);

  return (
    <div className="selection" onClick={() => setSidebar((prev) => false)}>
      <TopPart
        sortName={sortName}
        play={play}
        setPlay={setPlay}
        playRef={playRef}
        mainBox={mainBox}
      />
      <BottomPart sortName={sortName} />
    </div>
  );
}

export default Selection;
