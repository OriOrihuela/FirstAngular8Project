import { Component, OnInit } from "@angular/core";
import { AuthService } from './auth/auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  /**
   * PROPERTIES
   */

   /**
    * CONSTRUCTOR
    */
   constructor(private authService: AuthService) {
   }

   /**
    * GETTERS
    */
   getAuthService() {
     return this.authService;
   }

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.getAuthService().autoLogin();
  }
}
