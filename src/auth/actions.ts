import { LOGIN_SUCCESS, LoginSuccess } from "./types";

export function loginSuccess(response: LoginSuccess) {
  return (dispatch: Function)  => dispatch({ type: LOGIN_SUCCESS, payload: response });
}