import {Action} from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const TRY_LOGOUT = 'TRY_LOGOUT';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const TRY_SET_API_TOKEN = 'TRY_SET_API_TOKEN';
export const SET_API_TOKEN = 'SET_API_TOKEN';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: {username: string, password: string}) {}
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: {username: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class TryLogout implements Action {
  readonly type = TRY_LOGOUT;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export class SetApiToken implements Action {
  readonly type = SET_API_TOKEN;

  constructor(public payload: string) {}
}

export class TrySetApiToken implements Action {
  readonly type = TRY_SET_API_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions = TrySignup | Signin | Signup | Logout | SetToken | SetApiToken | TrySetApiToken;

