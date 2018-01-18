import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';

import * as AuthActions from './auth.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {fromPromise} from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';
import 'rxjs/add/operator/mergeMap';
import {Router} from '@angular/router';
import * as fromAuth from './auth.reducers';
import {Store} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {ApiToken} from '../apitoken.model';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: { username: string, password: string }) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect()
  authApiToken = this.actions$
    .ofType(AuthActions.TRY_SET_API_TOKEN)
    .map((action: AuthActions.TrySetApiToken) => {
      return action.payload;
    })
    .switchMap((authToken: string) => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      return this.http.post<ApiToken>(
        environment.loginApi,
        { token: authToken },{ headers: headers }
      );
    })
    .map((apiToken: ApiToken) => {
      console.log(apiToken);
      return {
        type: AuthActions.SET_API_TOKEN,
        payload: apiToken.access_token
      };
    });

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignin) => {
      return action.payload;
    })
    .switchMap((authData: { username: string, password: string }) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
        // ,
        // {
        //   type: AuthActions.TRY_SET_API_TOKEN,
        //   payload: token
        // }
      ];
    });

  @Effect()
  authAutoSignin = this.actions$
    .ofType(AuthActions.TRY_AUTO_SIGNIN)
    .map((action: AuthActions.TryAutoSigning) => {
        return action;
    })
    .map(() => {
      let token;
      const tokenKey = Object.keys(window.localStorage)
        .filter(it => it.startsWith('firebase:authUser'))[0];
      const authToken = JSON.parse(localStorage.getItem(tokenKey));

      if (authToken != null) {
        token = authToken.stsTokenManager.accessToken;
      }
      return token;
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
        // ,
        // {
        //   type: AuthActions.TRY_SET_API_TOKEN,
        //   payload: token
        // }
      ];
    });

  @Effect()
  authLogout = this.actions$
    .ofType(AuthActions.TRY_LOGOUT)
    .map((action: AuthActions.TryLogout) => {
      return action;
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().signOut());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.LOGOUT
        }
      ];
    });

  constructor(private actions$: Actions, private router: Router, private store: Store<fromAuth.State>, private http: HttpClient) {}
}
