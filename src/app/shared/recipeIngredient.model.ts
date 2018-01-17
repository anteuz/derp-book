import {Ingredient} from './ingredient.model';

export enum IngredientAmountType {
  LITRE = 'l',
  DECILITRE = 'dl',
  MILLILITRE = 'ml',
  TEASPOON = 'tl',
  TABLESPOON = 'rl',
  GRAM = 'g',
  KILOGRAM = 'kg',
  PACKET = 'pkt',
  BAG = 'pss',
  JAR = 'tlk',
  TIN = 'prk',
  PCT = 'kpl'
}

export class RecipeIngredient {

  constructor(public ingredient: Ingredient, public amount: number, public amountType: string) { }
}
