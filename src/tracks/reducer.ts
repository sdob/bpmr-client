import { TrackActionTypes, TRACKS_FETCHING, TRACKS_RECEIVED, TrackState } from "./types";

const INITIAL_STATE: TrackState = {
  loading: false,
  tracks: [],
};

export default function reducer(state = INITIAL_STATE, action: TrackActionTypes) {
  switch (action.type) {
    case TRACKS_FETCHING:
      return { ...state, loading: true };
    case TRACKS_RECEIVED:
      return { ...state, tracks: action.payload, loading: false };
    default:
      return state;
  }
}