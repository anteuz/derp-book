import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = false;

  constructor(private dataStore: DataStorageService
  , public authService: AuthService) { }

  ngOnInit() {
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
    this.authService.logout();
  }
}
