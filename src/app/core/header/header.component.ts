import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import {Observable} from 'rxjs/Observable';
import * as AuthActions from '../../auth/store/auth.actions';
import {Router} from '@angular/router';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = false;

  authState: Observable<fromAuth.State>;

  constructor(private dataStore: DataStorageService,
              private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.dataStore.saveRecipeData().subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  onFetch() {
    this.dataStore.fetchRecipeData();
  }
  onLogout() {
    this.store.dispatch(new AuthActions.TryLogout());
  }

  onCollapse() {
    if (this.isCollapsed) {
      this.isCollapsed = false;
    } else {
      this.isCollapsed = true;
    }
    console.log(this.isCollapsed);
  }
  getCollapseIn() {
    return this.isCollapsed ? 'in' : '';
  }
}
