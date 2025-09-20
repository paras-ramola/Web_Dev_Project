import React, { useEffect, useState } from "react";
import "./Heap.css";
import TopPart from "../../../Parts/TopPart/TopPart";
import BottomPart from "../../../Parts/BottomPart/BottomPart";

function Heap({
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

  // Swap utility
  function swap(arr, i, j) {
    [arr[i].style.height, arr[j].style.height] = [
      arr[j].style.height,
      arr[i].style.height,
    ];
  }

  // Heapify subtree rooted at index i
  async function heapify(arr, n, i) {
    if (!playRef.current) return; // stop if paused

    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // Highlight current node
    arr[i].classList.add("heapCheck");

    if (left < n) arr[left].classList.add("blueCheck");
    if (right < n) arr[right].classList.add("blueCheck");

    await wait(30);

    // Compare left child
    if (
      left < n &&
      parseInt(arr[left].style.height) > parseInt(arr[largest].style.height)
    ) {
      largest = left;
    }

    // Compare right child
    if (
      right < n &&
      parseInt(arr[right].style.height) > parseInt(arr[largest].style.height)
    ) {
      largest = right;
    }

    if (largest !== i) {
      swap(arr, i, largest);
      arr[i].classList.remove("blueCheck");
      arr[largest].classList.remove("bluCheck");
      await heapify(arr, n, largest);
    }

    // Remove highlights
    if (left < n) arr[left].classList.remove("blueCheck");
    if (right < n) arr[right].classList.remove("blueCheck");
    arr[i].classList.remove("heapCheck");
  }

  // Main HeapSort function
  async function heapSort(arr) {
    let n = arr.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (!playRef.current) return;
      await heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      if (!playRef.current) return;
      swap(arr, 0, i);
      await wait(10);
      await heapify(arr, i, 0);
    }
  }

  // Runs only once when component mounts → sets the sorting name
  useEffect(() => {
    setSortName("Heap Sort");
  }, []);

  // Runs whenever play changes
  useEffect(() => {
    playRef.current = play; // Keep play state in ref (for pause/resume)

    if (play === true && sortName === "Heap Sort") {
      let bars = mainBox.current.children;

      //NOTE:**wraping heapsort in async IIFE->lets us await an async func
      //without this (await func) will not work  and setPlay will be called immedialty, before sorting even starts.**
      (async () => {
        // await can only be used inside an async function`.
        await heapSort(bars); // wait until sorting finishes
        setPlay(false); // only stop play when done
      })();
    }
  }, [play]);

  return (
    <div className="heap" onClick={() => setSidebar((prev) => false)}>
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

export default Heap;
