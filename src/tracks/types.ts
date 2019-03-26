export const TRACKS_FETCHING = 'tracks/TRACKS_FETCHING';
export const TRACKS_RECEIVED = 'tracks/TRACKS_RECEIVED';

export interface Track {
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

export type TrackActionTypes = TracksReceivedAction | TracksFetchingAction;
