import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import {Observable} from 'rxjs/Observable';
import * as AuthActions from '../../auth/store/auth.actions';
import {Router} from '@angular/router';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = false;

  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetch() {
    this.store.dispatch(new RecipeActions.FetchRecipes());

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
