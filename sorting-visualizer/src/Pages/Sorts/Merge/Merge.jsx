import React, { useEffect } from "react";
import "./Merge.css";
import TopPart from "../../../Parts/TopPart/TopPart";
import BottomPart from "../../../Parts/BottomPart/BottomPart";

function Merge({
  setSidebar,
  sortName,
  setSortName,
  play,
  setPlay,
  playRef,
  mainBox,
}) {
  // small delay for animation
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Helper function to clean up colors
  const cleanupColors = (bars) => {
    for (let i = 0; i < bars.length; i++) {
      bars[i].classList.remove("redBar", "blueBar");
    }
  };

  // Merge two subarrays l..m and m+1..r
  async function merge(arr, l, m, r) {
    if (!playRef.current) {
      cleanupColors(arr);
      return false; // Return false to indicate interruption
    }

    const n1 = m - l + 1;
    const n2 = r - m;

    const left = [];
    const right = [];

    // copy left subarray
    for (let i = 0; i < n1; i++) {
      left[i] = parseInt(arr[l + i].style.height);
      arr[l + i].classList.add("redBar"); // highlight left
    }

    // copy right subarray
    for (let j = 0; j < n2; j++) {
      right[j] = parseInt(arr[m + 1 + j].style.height);
      arr[m + 1 + j].classList.add("blueBar"); // highlight right
    }

    await wait(50);

    // Merge back to original array
    let i = 0,
      j = 0,
      k = l;
    while (i < n1 && j < n2) {
      if (!playRef.current) {
        cleanupColors(arr);
        return false;
      }

      if (left[i] <= right[j]) {
        arr[k].style.height = `${left[i]}px`;
        i++;
      } else {
        arr[k].style.height = `${right[j]}px`;
        j++;
      }
      k++;
      await wait(20);
    }

    // Copy remaining elements
    while (i < n1) {
      if (!playRef.current) {
        cleanupColors(arr);
        return false;
      }
      arr[k].style.height = `${left[i]}px`;
      i++;
      k++;
      await wait(20);
    }

    while (j < n2) {
      if (!playRef.current) {
        cleanupColors(arr);
        return false;
      }
      arr[k].style.height = `${right[j]}px`;
      j++;
      k++;
      await wait(20);
    }

    // Remove highlights
    for (let x = l; x <= r; x++) {
      arr[x].classList.remove("redBar");
      arr[x].classList.remove("blueBar");
    }

    return true; // Return true to indicate successful completion
  }

  // Recursive Merge Sort
  async function mergeSort(arr, l, r) {
    if (!playRef.current) return false;
    if (l >= r) return true;

    const m = Math.floor((l + r) / 2);
    const leftResult = await mergeSort(arr, l, m);
    if (!leftResult) return false;

    const rightResult = await mergeSort(arr, m + 1, r);
    if (!rightResult) return false;

    const mergeResult = await merge(arr, l, m, r);
    return mergeResult;
  }

  // After sorting, mark all bars green
  async function markSorted(bars) {
    // Don't check playRef here - we want to show the completion animation
    for (let i = 0; i < bars.length; i++) {
      bars[i].classList.add("greenBar");
      await wait(20);
    }
  }

  // Set sort name on mount
  useEffect(() => {
    setSortName("Merge Sort");
  }, []);

  // Run Merge Sort when play starts
  useEffect(() => {
    playRef.current = play;

    if (play && sortName === "Merge Sort") {
      const bars = mainBox.current.children;

      (async () => {
        await mergeSort(bars, 0, bars.length - 1);

        // Only show green animation if sorting completed successfully

        await markSorted(bars);

        setPlay(false);
      })();
    }
  }, [play]);

  return (
    <div className="merge" onClick={() => setSidebar((prev) => false)}>
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

export default Merge;
