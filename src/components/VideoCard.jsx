import React, { useRef, useState, useEffect } from "react";
import "./VideoCard.css";
import BottomNav from "./BottomNav";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";
import { CiVolumeMute } from "react-icons/ci";
import { GoUnmute } from "react-icons/go";

const VideoCard = ({ video, isActive, isMuted, toggleMute }) => {
  const {
    videoUrl,
    hashtag,
    creator,
    title,
    episode,
    description,
    likes,
    comments,
    shares,
    tips,
    isFollowing,
  } = video;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isActive) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive, isMuted]);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFollow = () => setFollowing((prev) => !prev);

  return (
    <div className="video-card">
      {loading && <div className="loader">Loading...</div>}
      <video
        ref={videoRef}
        src={videoUrl}
        className="video-player"
        muted={isMuted}
        loop
        playsInline
        onClick={handleVideoClick}
        onLoadedData={() => setLoading(false)}
      />

      {/* Overlay */}
      <div className="video-overlay">
        <div className="left-section">
          <p className="hashtag">{hashtag}</p>
          <div className="creator-row">
            <p className="creator-name">{creator}</p>
            <button className="follow-btn" onClick={toggleFollow}>
              {following ? "Following" : "Follow"}
            </button>
          </div>
          <p className="title">
            {title} <span className="episode">{episode}</span>
          </p>
          <p className="description">{description}</p>
        </div>

        <div className="right-section">
          <div className="icon-btn"><CiHeart /> <p>{likes}</p></div>
          <div className="icon-btn"><FaRegComment /> <p>{comments}</p></div>
          <div className="icon-btn"><BsSend /> <p>{shares}</p></div>
          <div className="icon-btn">₹ <p>{tips}</p></div>
          <div className="icon-btn">⋮</div>
          <div className="icon-btn" onClick={toggleMute}>
            {isMuted ? <CiVolumeMute /> : <GoUnmute />}
          </div>
        </div>
      </div>

      <div className="bottom-nav-wrapper">
        <BottomNav />
      </div>
    </div>
  );
};

export default VideoCard;
