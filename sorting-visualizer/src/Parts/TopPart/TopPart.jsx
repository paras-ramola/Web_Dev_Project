import React, { useEffect, useRef, useState } from "react";
import bgImg from "../../assets/bg_1.jpg";
import randomize_icon from "../../assets/random.png";
import play_icon from "../../assets/play.webp";
import pause_icon from "../../assets/pause.png";
import "./TopPart.css";

function TopPart({ sortName, play, setPlay, mainBox }) {
  //count of no.  of elments ->slider
  const [element, setElement] = useState(100);

  // useRef flag → tells us if bar generation should stop
  const canGenrateRef = useRef(true);

  // Helper function: pause for some time
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //  Function to generate new bars
  async function generate_bars() {
    await wait(10); // small delay so old generation can stop first
    //first prev canGenrate=true->stop, then curr canGenrate=>false inside loop ->(delay) so they dont happen simultaneously
    canGenrateRef.current = false; // means: "currently generating, don’t interrupt"

    // disable play button while generating
    let playBtn = document.getElementsByClassName("play-icon")[0];
    playBtn.classList.add("disable");

    // stop sorting if  currently running
    setPlay(false);

    // main container where bars go
    const sort_box = mainBox.current;
    sort_box.innerHTML = ""; // clear previous bars

    let sort_box_width = sort_box.offsetWidth;
    const maxBar = parseInt(element); // number of bars

    // loop to create bars
    for (let i = 0; i < maxBar; i++) {
      //  if user clicked randomize or changed element, stop genrating
      if (canGenrateRef.current) {
        return;
      }

      let height = Math.ceil(Math.random() * 550);

      // make a new bar
      const bar = document.createElement("div");
      bar.classList.add("bar", "redBar");

      // set bar size
      let bar_width = parseInt(sort_box_width) / maxBar;
      bar.style.width = `${bar_width}px`;
      bar.style.height = `${height}px`;
      bar.style.backgroundColor = "red";

      // add bar into container
      sort_box.appendChild(bar);

      // small delay for animation
      await wait(10);

      // remove red highlight once added
      bar.classList.remove("redBar");
    }

    // enable play button again
    playBtn.classList.remove("disable");

    //  done generating → allow new generations
   canGenrateRef.current = true;
  }

  //  Run when "element" (slider value) changes
  useEffect(() => {
    setPlay(false); // stop sorting
   canGenrateRef.current = true; // reset flag->all genration of new bars
    if (canGenrateRef.current) {
      //if we can genrate
      generate_bars(); // generate new bars
    }

    // cleanup when component unmounts
    return () => {
    canGenrateRef.current = true; // stop ongoing generation
    };
  }, [element]);

  return (
    <div className="top-part" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="top-box">
        <h1>{sortName}</h1>
        <div className="features">
          {/*  Randomize button */}
          <div>
            <img
              className="ran-icon"
              src={randomize_icon}
              onClick={() => {
                canGenrateRef.current = true; // cancel old generation,genrate new bars
                generate_bars(); // start new one
              }}
            />
          </div>

          {/*  Play button */}
          <div>
            <img
              className="play-icon"
              src={play ? pause_icon : play_icon}
              onClick={() => {
                setPlay((prevPlay) => !prevPlay); // toggle play/pause
              }}
            />
          </div>

          {/*  Slider for number of bars */}
          <div className="sliderContainer">
            <p>Elements: {element}</p>
            <input
              className="slider"
              type="range"
              min="10"
              max="1000"
              value={element}
              onChange={(e) => setElement(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Sorting bars will go here */}
      <div className="sort_box" ref={mainBox}></div>
    </div>
  );
}

export default TopPart;
