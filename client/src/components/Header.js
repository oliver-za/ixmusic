import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ setPlaylistStatus, playlistStatus }) => {
  return (
    <nav>
      <h1> IX. </h1>
      <button onClick={() => setPlaylistStatus(!playlistStatus)}>
        <FontAwesomeIcon icon={faBars} />
      </button>   
    </nav>  
  ); 
}; 
   
export default Nav;
