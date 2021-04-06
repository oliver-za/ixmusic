import React from "react";

const PlaylistTrack = ({
  track,
  audioRef,
  isPlaying,
  tracks,
  setCurrentTrack,
  id,
  setTracks,
}) => {
  const trackSelectHandler = async () => {
    const selectedTrack = tracks.filter((state) => state.id === id);
    await setCurrentTrack(selectedTrack[0]);

    const newTracks = tracks.map((track) => {
      if (track.id === id) {
        return {
          ...track,
          active: true,
        };
      } else {
        return { ...track, active: false };
      }
    });
    setTracks(newTracks);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      className={`playlist-track ${track.active ? "selected" : ""}`}
      onClick={trackSelectHandler}
    > 
      <img src={track.imageUrl} alt={track.name}></img> 
      <div className="track-description">
        <h3>{track.name}</h3> 
        <h4>{track.year}</h4>  
        <h4>{track.artist}</h4>
      </div>   
    </div> 
  );
};

export default PlaylistTrack;
