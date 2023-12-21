import './App.css';
import Login from './Login-Component/Login';
import React, { useEffect, useState } from "react";
import { getTokenFromUrl } from "./Spotify/Spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";
const spotify = new SpotifyWebApi();
// app component
function App() {
 
  // setting users access token to access the app with useState
  const [{ user, token }, dispatch] = useDataLayerValue();

  // get access token from url and hide it. Is done when the app loads
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      // setting the token
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
    }

    console.log("[token]", token);
    spotify.setAccessToken(_token);
    spotify.getMe().then((user) => {
      dispatch({
        type: "SET_USER",
        user,
      });
    });
    spotify.getUserPlaylists().then((playlists) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists,
      });
    });
    spotify.getPlaylist("37i9dQZF1E34Ucml4HHx1w").then((playlist) => {
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: playlist,
      });
    });
  }
, []);
  return (
    <div className="App">
    {/* if user is logged in, show player. otherwise, show login page */}
      {token ? <h1>Logged in</h1> : <Login />}
    </div>
  );
}

export default App;
