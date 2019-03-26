export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

export interface LoginSuccess {
  access_token: string;
  // token_type: string;
  // expires_in: string;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccess;
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export interface AuthState {
  token: string;
}

export type AuthActionTypes = LoginSuccessAction | LogoutSuccessAction;