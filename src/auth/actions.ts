import { LOGIN_SUCCESS, LoginSuccess, LOGOUT_SUCCESS } from "./types";

export function loginSuccess(response: LoginSuccess) {
  return (dispatch: Function)  => dispatch({ type: LOGIN_SUCCESS, payload: response });
}

export function logoutSuccess() {
  return (dispatch: Function) => dispatch({ type: LOGOUT_SUCCESS });
}