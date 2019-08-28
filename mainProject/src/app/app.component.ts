import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  /**
   * PROPERTIES
   */
  title: string = "mainProject";
  loadedFeature: string = "recipe";

  /**
   * BEHAVIOURS
   */
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
