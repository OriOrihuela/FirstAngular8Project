import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromApp from "../../store/app.reducer";

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
  editedItem: Ingredient;

  /**
   * CONSTRUCTOR
   */
  constructor(private store: Store<fromApp.AppState>) {}

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

  getEditedItem() {
    return this.editedItem;
  }

  /**
   * BEHAVIOURS
   */
  ngOnInit() {
    this.subscription = this.store
      .select("shoppingList")
      .subscribe(stateData => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.getShoppingListForm().setValue({
            name: this.getEditedItem().name,
            amount: this.getEditedItem().amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy() {
    this.getSubscription().unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.getEditMode()
      ? this.store.dispatch(
          new ShoppingListActions.UpdateIngredient(newIngredient)
        )
      : this.store.dispatch(
          new ShoppingListActions.AddIngredient(newIngredient)
        );
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.getShoppingListForm().reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
