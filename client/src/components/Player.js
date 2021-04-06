import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward, 
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  setTrackInfo,
  trackInfo,
  currentTrack,
  isPlaying, 
  setIsPlaying,
  setCurrentTrack,
  tracks,
  setTracks,
}) => {
  useEffect(() => {
    const newTracks = tracks.map((track) => {
      if (track.id === currentTrack.id) { 
        return {
          ...track,
          active: true,
        };
      } else {
        return { ...track, active: false };
      }
    }); 
    setTracks(newTracks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]); 

  const playTrackHandler = () => {
    if (isPlaying) {
      audioRef.current.pause(); 
      setIsPlaying(!isPlaying);
    } else { 
      audioRef.current.play(); 
      setIsPlaying(!isPlaying);
    }
  }; 

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setTrackInfo({ ...trackInfo, currentTime: e.target.value });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = tracks.findIndex((track) => track.id === currentTrack.id);
    if (direction === "skip-forward") {
      await setCurrentTrack(tracks[(currentIndex + 1) % tracks.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % tracks.length === -1) { 
        await setCurrentTrack(tracks[tracks.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentTrack(tracks[(currentIndex - 1) % tracks.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  const trackAnim = {
    transform: `translateX(${trackInfo.animationPercentage}%`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(trackInfo.currentTime)}</p>
        <div className="track">
          <input
            min={0}
            max={trackInfo.duration || 0}
            value={trackInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{trackInfo.duration ? getTime(trackInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => skipTrackHandler("skip-back")}
          icon={faStepBackward}
          size="2x"
        />
        <FontAwesomeIcon
          className="play"
          onClick={playTrackHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          onClick={() => skipTrackHandler("skip-forward")}
          size="2x"
          icon={faStepForward}
        />
      </div>
    </div>
  );
};

export default Player;
