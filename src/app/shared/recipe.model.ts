import {RecipeIngredient} from './recipeIngredient.model';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: RecipeIngredient[];

  constructor(name: string, description: string, imagePath: string, ingredients: RecipeIngredient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
