// import React from "react";
import { useContext } from "react";
import CartContext from "../controllers/CartContext";
import "./Playlist.css";

function Playlist() {
  const { playList } = useContext(CartContext)

  const songs = playList.map( song => {
    const {
      id,
      name,
      title
    } = song

    return (
      <li
        key={id}
      >
        "{title}" by {name}
      </li>
    )
  })


  return (
    <div className="playback">
      <ul>
        {songs}
      </ul>
    </div>
  );
}

export default Playlist;
