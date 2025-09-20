import React, { useEffect } from "react";
import "./Insertion.css";
import TopPart from "../../../Parts/TopPart/TopPart";
import BottomPart from "../../../Parts/BottomPart/BottomPart";

function Insertion({
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

 async function insertionSort() {
  let bars = mainBox.current.children;

  for (let i = 1; i < bars.length; i++) {
    if (!playRef.current) return; // stop if paused

    const keyHeight = parseInt(bars[i].style.height);
    let j = i - 1;

    // Highlight the key bar
    bars[i].classList.add("blueBar");

    while (j >= 0 && parseInt(bars[j].style.height) > keyHeight) {
      if (!playRef.current) {
        bars[i].classList.remove("blueBar");
        return; // stop if paused
      }

      // Highlight the bar being compared
      bars[j].classList.add("redBar");
      await wait(10);

      // Move bar one step ahead
      bars[j + 1].style.height = bars[j].style.height;

      // Remove highlight
      bars[j].classList.remove("redBar");

      j--;
    }

    // Place the key in its correct position
    bars[j + 1].style.height = `${keyHeight}px`;

    // Remove highlight from the key bar
    bars[i].classList.remove("blueBar");
  }
}

  useEffect(() => {
    setSortName("Insertion Sort");
  }, []);

  useEffect(() => {
    // keep ref in sync
    playRef.current = play;

    if (play === true && sortName === "Insertion Sort") {
      //NOTE:**wraping heapsort in async IIFE->lets us await an async func
      //without this (await func) will not work  and setPlay will be called immedialty, before sorting even starts.**

      (async () => {
        // start sorting and ensure we stop play when done or aborted
        await insertionSort();

        setPlay(false);
      })();
    }
  }, [play]);

  return (
    <div className="insertion" onClick={() => setSidebar((prev) => false)}>
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

export default Insertion;
