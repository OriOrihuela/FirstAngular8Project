import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**
   * PROPERTIES
   */

  /**
   * CONSTRUCTOR
   */
  constructor(private dataStorageService: DataStorageService) { }

  /**
   * GETTERS
   */
  getDataStorageService() {
    return this.dataStorageService;
  }  

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
  }

  onSaveData() {
    this.getDataStorageService().storeRecipes();
  }

  onFetchData() {
    this.getDataStorageService().fetchRecipes();
  }
}
