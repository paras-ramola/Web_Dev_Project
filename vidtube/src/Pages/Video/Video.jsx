import React from "react";
import "./Video.css";
import PlayVideo from "../../Componenets/PlayVideo/PlayVideo";
import Recommended from "../../Componenets/Recommended/Recommended";
// Import useParams from React Router (lets us read values from the URL)
import { useParams } from "react-router-dom";

function Video() {
  // useParams() lets us get URL parts defined as :videoId and :categoryId
  // Example: if the URL is /video/20/4521
  //   categoryId = "20"
  //   videoId = "4521"
  const { videoId, categoryId } = useParams();

  return (
    <div className="play-container">
      {/* Pass the videoId down to PlayVideo so it knows which video to load */}
      <PlayVideo videoId={videoId} />

      {/* Show recommended videos (likely based on categoryId) */}
      <Recommended categoryId={categoryId}/>
    </div>
  );
}

export default Video;


/*
useParams() does
It’s a React Router hook.
Its job is to read values from the URL when your route has placeholders (:something).
It returns an object where keys = placeholder names, values = what’s in the URL.
*/