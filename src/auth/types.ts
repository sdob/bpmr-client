export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';

export interface LoginSuccess {
  access_token: string;
  // token_type: string;
  // expires_in: string;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccess;
}

export interface AuthState {
  token: string;
}

export type AuthActionTypes = LoginSuccessAction;