import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {resetFakeAsyncZone} from '@angular/core/testing';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddIngredient(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(newIngredient, this.editedItemIndex)
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.resetForm();
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
