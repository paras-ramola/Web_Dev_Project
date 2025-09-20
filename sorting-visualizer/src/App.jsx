import { useRef, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Quick from "./Pages/Sorts/Quick/Quick";
import Bubble from "./Pages/Sorts/Bubble/Bubble";
import Heap from "./Pages/Sorts/Heap/Heap";
import Insertion from "./Pages/Sorts/Insertion/Insertion";
import Selection from "./Pages/Sorts/Selection/Selection";
import Footer from "./Components/Footer/Footer";
import Merge from "./Pages/Sorts/Merge/Merge";
import "./App.css";

function App() {
  // Sidebar state → true/false to show or hide the sidebar
  const [sidebar, setSidebar] = useState(false);

  // Stores the current sorting algorithm’s name (e.g. "Bubble Sort")
  const [sortName, setSortName] = useState("");

  // Play state → true = sorting is running, false = stopped/paused
  const [play, setPlay] = useState(false);

  // Ref version of play → lets us keep track of play value
  // without causing re-renders (useful for pause/resume)
  const playRef = useRef(false);

  // Ref for the main container that holds all bars (the array)
  const mainBox = useRef(null);

  return (
    <div>
      {/* Navigation bar */}
      <Navbar setSidebar={setSidebar} />

      {/* Sidebar menu (toggleable) */}
      <Sidebar sidebar={sidebar} />

      {/* Different pages/routes for each sorting algorithm */}
      <Routes>
        {/* Home page */}
        <Route
          path="/"
          element={
            <Home
              setSidebar={setSidebar}
              sortName={sortName}
              setSortName={setSortName}
              play={play}
              setPlay={setPlay}
              playRef={playRef}
              mainBox={mainBox}
            />
          }
        />

        {/* Quick Sort page */}
        <Route
          path="/quicksort"
          element={
            <Quick
              setSidebar={setSidebar}
              sortName={sortName}
              setSortName={setSortName}
              play={play}
              setPlay={setPlay}
              playRef={playRef}
              mainBox={mainBox}
            />
          }
        />

        {/* Merge Sort page */}
        <Route
          path="/mergesort"
          element={
            <Merge
              setSidebar={setSidebar}
              sortName={sortName}
              setSortName={setSortName}
              play={play}
              setPlay={setPlay}
              playRef={playRef}
              mainBox={mainBox}
            />
          }
        />

        {/* Heap Sort page */}
        <Route
          path="/heapsort"
          element={
            <Heap
              setSidebar={setSidebar}
              sortName={sortName}
              setSortName={setSortName}
              play={play}
              setPlay={setPlay}
              playRef={playRef}
              mainBox={mainBox}
            />
          }
        />

        {/* Bubble Sort page */}
        <Route
          path="/bubblesort"
          element={
            <Bubble
              setSidebar={setSidebar}
              sortName={sortName}
              setSortName={setSortName}
              play={play}
              setPlay={setPlay}
              playRef={playRef}
              mainBox={mainBox}
            />
          }
        />

        {/* Selection Sort page */}
        <Route
          path="/selectionsort"
          element={
            <Selection
              setSidebar={setSidebar}
              sortName={sortName}
              setSortName={setSortName}
              play={play}
              setPlay={setPlay}
              playRef={playRef}
              mainBox={mainBox}
            />
          }
        />

        {/* Insertion Sort page */}
        <Route
          path="/insertionsort"
          element={
            <Insertion
              setSidebar={setSidebar}
              sortName={sortName}
              setSortName={setSortName}
              play={play}
              setPlay={setPlay}
              playRef={playRef}
              mainBox={mainBox}
            />
          }
        />
      </Routes>

      {/* Footer at the bottom of every page */}
      <Footer></Footer>
    </div>
  );
}

export default App;
