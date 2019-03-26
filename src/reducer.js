import { combineReducers } from 'redux';
import auth from './auth/reducer';
import tracks from './tracks/reducer';

export default combineReducers({ auth, tracks });

/*
export const INITIAL_STATE = {
  accessToken: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
  */