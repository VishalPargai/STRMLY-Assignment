import React, { useEffect, useRef, useState } from "react";
import videos from "./data/videos";
import VideoCard from "./components/VideoCard";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import "./App.css";

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const containerRef = useRef(null);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleMute = () => setIsMuted((prev) => !prev);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setCurrentVideoIndex(index);
        }
      });
    }, options);

    const children = containerRef.current?.children || [];
    Array.from(children).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`} ref={containerRef}>
      <button className="toggle-btn" onClick={toggleDarkMode}>
        {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
      </button>

      {videos.map((video, index) => (
        <div key={video.id} data-index={index}>
          <VideoCard
            video={video}
            isActive={index === currentVideoIndex}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
