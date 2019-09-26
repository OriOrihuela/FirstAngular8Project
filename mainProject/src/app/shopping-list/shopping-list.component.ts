import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./services/shopping-list.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit {
  /**
   * PROPERTIES
   */
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  /**
   * CONSTRUCTOR
   */
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
  }

  onEditItem(index: number) {
    this.shoppingListService.getStartedEditing().next(index);
  }
}
