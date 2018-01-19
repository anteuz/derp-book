export enum ColorPalette {
  COLOR7 = '#26B0C7',
  COLOR6 = '#75B35A',
  COLOR5 = '#FF5699',
  COLOR4 = '#E57542',
  COLOR3 = '#BA2E38',
  COLOR2 = '#864F9E',
  COLOR1 = '#524DCF',
  COLOR0 = '#b4bec6'
}

export class Ingredient {
  isCollected: boolean = false;

  constructor(public ingredientName: string, public ingredientColor: string) {}

}
