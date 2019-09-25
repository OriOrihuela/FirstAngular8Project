import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   * PROPERTIES
   */
  userSubscription = new Subscription;
  isAuthenticated: boolean = false;

  /**
   * CONSTRUCTOR
   */
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  /**
   * GETTERS
   */
  getDataStorageService() {
    return this.dataStorageService;
  }
  
  getAuthService() {
    return this.authService;
  }

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.getDataStorageService().storeRecipes();
  }

  onFetchData() {
    this.getDataStorageService().fetchRecipes().subscribe();
  }

  onLogout() {
    this.getAuthService().logout();
  }
}
