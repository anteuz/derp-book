import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {Store} from '@ngrx/store';
import * as fromAuth from './auth/store/auth.reducers';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipe';

  constructor(private store: Store<fromAuth.State>) {}

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCwpBUJFvzKrxyKzm2OGmP4SFLxjrBqUIg',
      authDomain: 'derp-kitchen-erp.firebaseapp.com'
    });
    this.store.dispatch(new AuthActions.TryAutoSigning());
  }
}
