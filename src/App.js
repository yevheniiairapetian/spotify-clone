import './App.css';
import Login from './Login-Component/Login';
import React, { useEffect, useState } from "react";
import { getTokenFromUrl } from "./Spotify/Spotify";

// app component
function App() {
  // setting users access token to access the app with useState
  const [token, setToken] = useState();

  // get access token from url and hide it. Is done when the app loads
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      // setting the token to useState
      setToken(_token);
    }

    console.log("token", token);
  }, []);
  return (
    <div className="App">
    {/* if user is logged in, show player. otherwise, show login page */}
      {token ? <h1>Logged in</h1> : <Login />}
    </div>
  );
}

export default App;
