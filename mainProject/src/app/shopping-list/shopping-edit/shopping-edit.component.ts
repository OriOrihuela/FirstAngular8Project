import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../services/shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"]
})
export class ShoppingEditComponent implements OnInit {
  /**
   * PROPERTIES
   */
  @ViewChild("nameInput", { static: false }) nameInputRef: ElementRef;
  @ViewChild("amountInput", { static: false }) amountInputRef: ElementRef;

  /**
   * CONSTRUCTOR
   */
  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * BEHAVIOURS
   */
  ngOnInit() {}

  onAddItem() {
    const ingredientName = this.nameInputRef.nativeElement.value;
    const amountName = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, amountName);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
