import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../../recipe.model";

@Component({
  selector: "app-recipes-item",
  templateUrl: "./recipes-item.component.html",
  styleUrls: ["./recipes-item.component.scss"]
})
export class RecipesItemComponent implements OnInit {
  /**
   * PROPERTIES
   */
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  /**
   * CONSTRUCTOR
   */
  constructor() {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {}

  onSelected() {
    this.recipeSelected.emit();
  }
}
