import { Pipe, PipeTransform } from '@angular/core';
import {RecipeIngredient} from './recipeIngredient.model';

@Pipe({
  name: 'isCollected',
  pure: false
})
export class IsCollectedPipe implements PipeTransform {
  transform(items: RecipeIngredient[], filter: boolean): any {

    if (!items) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.ingredient.isCollected === filter);
  }
}
