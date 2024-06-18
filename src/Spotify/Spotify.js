// spotify authentication endpoint
export const authEndpoint = "https://accounts.spotify.com/authorize";
// if logged in successfully redirects to this address
const redirectUri = "http://localhost:3000/";
// our client id provided by spotify
const clientId = "45b42b32603c4520a5a6aac0019cd977";

// spotify scopes we allow to use 
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

// parses url to get access token
export const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };

// does the autentication process
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;