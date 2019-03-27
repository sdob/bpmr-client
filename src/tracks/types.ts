export const TRACKS_FETCHING = 'tracks/TRACKS_FETCHING';
export const TRACKS_RECEIVED = 'tracks/TRACKS_RECEIVED';
export const START_NEXT_TRACK = 'tracks/START_NEXT_TRACK';

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Album {
  images: Image[];
  name: string;
}

export interface Answer {
  bpm: number;
  id: string;
}

export interface Artist {
  name: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  id: string;
  name: string;
}

export interface TrackState {
  loading: boolean;
  tracks: Track[];
}

export interface TracksReceivedAction {
  type: typeof TRACKS_RECEIVED;
  payload: Track[];
}

export interface TracksFetchingAction {
  type: typeof TRACKS_FETCHING;
}

export interface StartNextTrackAction {
  type: typeof START_NEXT_TRACK;
}

export type TrackActionTypes = TracksReceivedAction | TracksFetchingAction | StartNextTrackAction;

export enum Step {
  Challenge = 1,
  Sending,
  Result,
}
