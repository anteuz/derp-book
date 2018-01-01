import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/'])
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(
        error => console.log(error)
    );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
     firebase.auth().currentUser.getIdToken()
       .then(
         (token: string) => this.token = token
       );
     return this.token;
  }
  isAuthenticated() {
    return this.token != null;
  }

  setToken() {
    const tokenKey = Object.keys(window.localStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0];
    const authToken = JSON.parse(localStorage.getItem(tokenKey));

     if (authToken != null) {
      this.token = authToken.stsTokenManager.accessToken;
    }
  }
}
