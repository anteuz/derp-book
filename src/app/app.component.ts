import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipe';

  constructor(private authService: AuthService) {}

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCwpBUJFvzKrxyKzm2OGmP4SFLxjrBqUIg',
      authDomain: 'derp-kitchen-erp.firebaseapp.com'
    });
    this.authService.setToken();
  }
}
