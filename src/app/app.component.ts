import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducers';
import * as AuthActions from './auth/store/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipe';

  constructor(private store: Store<fromApp.AppState>) {}

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCwpBUJFvzKrxyKzm2OGmP4SFLxjrBqUIg',
      authDomain: 'derp-kitchen-erp.firebaseapp.com'
    });

    // const tokenKey = Object.keys(window.localStorage)
    //   .filter(it => it.startsWith('firebase:authUser'))[0];
    // const authToken = JSON.parse(localStorage.getItem(tokenKey));
    // if (authToken != null) {
    //   const accessToken = authToken.stsTokenManager.accessToken;
    //   this.store.dispatch(new AuthActions.Signin());
    //   this.store.dispatch(new AuthActions.SetToken(accessToken));
    //}
  }
}
