import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../services/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  /**
   * PROPERTIES
   */
  @ViewChild("form", { static: false }) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number = 0;
  editedItem: Ingredient;

  /**
   * CONSTRUCTOR
   */
  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * GETTERS
   */
  getShoppingListForm() {
    return this.shoppingListForm;
  }

  getSubscription() {
    return this.subscription;
  }

  getEditMode() {
    return this.editMode;
  }

  getEditedItemIndex() {
    return this.editedItemIndex;
  }

  getEditedItem() {
    return this.editedItem;
  }

  getShoppingListService() {
    return this.shoppingListService;
  }

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.subscription = this.getShoppingListService()
      .getStartedEditing()
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.getShoppingListService().getIngredient(index);
        this.getShoppingListForm().setValue({
          name: this.getEditedItem().name,
          amount: this.getEditedItem().amount
        });
      });
  }

  ngOnDestroy() {
    this.getSubscription().unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    /* CHECKING IF WE ARE IN EDIT MODE OR NOT */
    this.getEditMode()
      ? this.getShoppingListService().updateIngredient(
          this.getEditedItemIndex(),
          newIngredient
        )
      : this.getShoppingListService().addIngredient(newIngredient);
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.getShoppingListForm().reset();
    this.editMode = false;
  }

  onDelete() {
    this.getShoppingListService().deleteIngredient(this.getEditedItemIndex());
    this.onClear();
  }
}
