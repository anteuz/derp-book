import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeForDetailedView = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Yummu stuff', 'Dummy recipe', 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/73536_445913437265_1694896_n.jpg?oh=c5416ff7447f12b0380cbeaf8de7f287&oe=5A6BC2CB'),
    new Recipe('Yummu stuff', 'Dummy recipe', 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/73536_445913437265_1694896_n.jpg?oh=c5416ff7447f12b0380cbeaf8de7f287&oe=5A6BC2CB')
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeForDetailedView.emit(recipe);
  }
}
