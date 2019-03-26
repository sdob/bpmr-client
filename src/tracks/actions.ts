import axios from 'axios';
import { Answer, START_NEXT_TRACK, TRACKS_FETCHING, TRACKS_RECEIVED } from "./types";
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

export function submitAnswer(answer: Answer) {
  return async () => {
    console.info('submitting');
    const { data } = await axios.post(
      'http://localhost:8000/songs/check/',
      answer,
    );
    // await new Promise(resolve => setTimeout(resolve, 2000));
    console.info('finished');
    return data;
  };
}

export function startNextTrack() {
  return (dispatch: Function) => dispatch({ type: START_NEXT_TRACK });
}