import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Componenets/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";

function App() {
  // State to control the sidebar
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>

      <Navbar setSidebar={setSidebar} />
               {/* Routes define which component to show for each URL */}
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        {/* Route says: whenever URL looks like /video/:categoryId/:videoId → show <Video /> */}
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
}

export default App;
