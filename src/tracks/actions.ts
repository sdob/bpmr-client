import axios from 'axios';
import { TRACKS_FETCHING, TRACKS_RECEIVED } from "./types";
import { AppState } from "../App";

export function fetchTracks() {
  return async (dispatch: Function, getState: () => AppState) => {
    const { auth: { token } } = getState();
    dispatch({ type: TRACKS_FETCHING });
    const response: any = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks',
      { headers: { Authorization: `Bearer ${token}` } },
    );
    dispatch({ type: TRACKS_RECEIVED, payload: response.data.items });
  };
}