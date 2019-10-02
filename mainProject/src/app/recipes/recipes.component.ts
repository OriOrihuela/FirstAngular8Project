import { Component, OnInit } from "@angular/core";
import { fadeIn } from "../shared/animations/animations";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.scss"],
  animations: [fadeIn]
})
export class RecipesComponent implements OnInit {
  /**
   * PROPERTIES
   */

  /**
   * CONSTRUCTOR
   */

  /**
   * BEHAVIOURS
   */
  ngOnInit() {}
}
