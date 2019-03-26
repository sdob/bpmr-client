import { AuthActionTypes, LOGIN_SUCCESS } from './types';

const INITIAL_STATE = {
  token: undefined,
};

export default function reducer(state = INITIAL_STATE, action: AuthActionTypes) {
  const { type } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return { token: action.payload.access_token };
    default:
      return state;
  }
}