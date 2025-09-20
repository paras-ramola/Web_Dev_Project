import React, { useEffect } from "react";
import "./Quick.css";
import TopPart from "../../../Parts/TopPart/TopPart";
import BottomPart from "../../../Parts/BottomPart/BottomPart";

function Quick({
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

  // Partition: returns partition index or -1 if aborted
  async function partition(arr, low, high) {
    // abort quickly if paused
    if (!playRef.current) return -1;

    const pivotHeight = parseInt(arr[high].style.height, 10);
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      // abort if paused
      if (!playRef.current) return -1;

      // highlight comparison (optional)
      arr[j].classList.add("qredBar");
      arr[high].classList.add("pivot");

      // numeric current height
      const currentHeight = parseInt(arr[j].style.height, 10);

      // short wait for visual effect
      await wait(10);

      if (currentHeight < pivotHeight) {
        i++;
        // swap heights (visual swap)
        [arr[i].style.height, arr[j].style.height] = [
          arr[j].style.height,
          arr[i].style.height,
        ];
      }

      // clean up highlights
      arr[j].classList.remove("qredBar");
      arr[high].classList.remove("pivot");
    }

    // final swap of pivot into place (check abort)
    if (!playRef.current) return -1;

    // place pivot at i+1
    [arr[i + 1].style.height, arr[high].style.height] = [
      arr[high].style.height,
      arr[i + 1].style.height,
    ];

    // small delay so UI shows pivot swap
    await wait(20);

    return i + 1;
  }

  // Recursive QuickSort with awaits and cancellation checks
  async function quickSort(arr, low, high) {
    if (!playRef.current) return; // aborted
    if (low < high) {
      const pi = await partition(arr, low, high);

      // partition returned -1 when aborted
      if (pi === -1) return;

      // await left then right to keep operations sequential
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  }

  useEffect(() => {
    setSortName("Quick Sort");
  }, []);

  useEffect(() => {
    // keep ref in sync
    playRef.current = play;

    if (play === true && sortName === "Quick Sort") {
      const bars = mainBox.current?.children;

      //NOTE:**wraping heapsort in async IIFE->lets us await an async func
      //without this (await func) will not work  and setPlay will be called immedialty, before sorting even starts.**

      (async () => {
        // start sorting and ensure we stop play when done or aborted
        await quickSort(bars, 0, bars.length - 1);

        setPlay(false);
      })();
    }
  }, [play]);

  return (
    <div className="quick" onClick={() => setSidebar((prev) => false)}>
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

export default Quick;
