import React, { useEffect, useState } from "react";
import "./Feed.css";
// For routing (so we can click and go to video page)
import { Link } from "react-router-dom";

import { API_KEY } from "../../data";
// A custom function  that converts big numbers like 1000000 -> "1M"
import { value_converter } from "../../data";
// Import moment library (for time formatting)
import moment from "moment";

function Feed({ category }) {
  // STEP 1: React State
  // "data" = where we will store the list of videos
  // "setData" = function to update that list
  const [data, setData] = useState([]);

  // STEP 2: Function to fetch videos
  // Define an async function to fetch data from an API
  const fetchData = async () => {
    // You want to fetch from "videoList_url"
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    // Make a GET request to videoList_url
    // fetch() returns a "Promise", so we wait for the response
    await fetch(videoList_url)
      // Convert the raw response (bytes) into JSON
      .then((response) => response.json())
      // Once we have the JSON, take the "items" field and store it in state
      .then((data) => setData(data.items));
  };

  // STEP 3: useEffect
  // This runs automatically when the component first loads
  // Also runs again whenever "category" changes
  useEffect(() => {
    fetchData(); // Call the function above to fetch new videos
  }, [category]);

  // STEP 4: Render (what shows up on screen)
  return (
    <div className="Feed">
      {/* Loop over each video in "data" */}
      {data && data.map((items, index) => {
        return (
          // Link = makes the whole card clickable and goes to /video/categoryId/id
          <Link
            to={`video/${items.snippet.categoryId}/${items.id}`}
            className="card"
            key={index} // React needs a unique key for lists
          >
            {/* Video thumbnail (medium size) */}
            <img src={items.snippet.thumbnails.medium.url} alt="" />

            {/* Video title */}
            <h2>{items.snippet.title}</h2>

            {/* Channel name */}
            <h3>{items.snippet.channelTitle}</h3>

            {/* Views + Time since uploaded */}
            <p>
              {value_converter(items.statistics.viewCount)} views &bull;{" "}
              {moment(items.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export default Feed;
