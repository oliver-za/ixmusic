import React from "react";
import PlaylistTrack from "./PlaylistTrack";

const Playlist = ({
  tracks,
  audioRef,
  isPlaying,
  setCurrentTrack,
  setTracks,
  playlistStatus,
}) => { 
  return (
    <div className={`playlist ${playlistStatus ? "active-playlist" : ""}`}>
      <h2 className="playlist-title">Playlist</h2>
      <div className="playlist-tracks">
        {tracks.map((track) => (
          <PlaylistTrack
            track={track}
            setCurrentTrack={setCurrentTrack}
            tracks={tracks}
            id={track.id}
            key={track.id}
            audioRef={audioRef}
            isPlaying={isPlaying} 
            setTracks={setTracks} 
          />
        ))}
      </div> 
    </div>
  );
};

export default Playlist;
