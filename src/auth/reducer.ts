import { AuthActionTypes, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './types';

const INITIAL_STATE = {
  token: undefined,
};

export default function reducer(state = INITIAL_STATE, action: AuthActionTypes) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { token: action.payload.access_token };
    case LOGOUT_SUCCESS:
      return { token: undefined };
    default:
      return state;
  }
}