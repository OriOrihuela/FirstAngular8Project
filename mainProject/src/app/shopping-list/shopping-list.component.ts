import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./services/shopping-list.service";
import { Subscription } from "rxjs";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { fadeIn } from "../shared/animations/animations";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"],
  animations: [
    trigger("list", [
      state("in", style({ opacity: 1, transform: "translateX(0)" })),
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(-100px)"
        }),
        animate(300)
      ]),
      transition("* => void", [
        animate(
          300,
          style({
            opacity: 0,
            transform: "translateX(100px)"
          })
        )
      ])
    ]),
    fadeIn
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  /**
   * PROPERTIES
   */
  ingredients: Ingredient[];
  private subscription: Subscription;

  /**
   * CONSTRUCTOR
   */
  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService
      .getIngredientsChanged()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.getStartedEditing().next(index);
  }
}
