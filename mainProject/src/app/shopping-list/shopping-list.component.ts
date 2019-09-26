import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from "../store/app.reducer";

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
  constructor(private store: Store<fromApp.AppState>) {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
