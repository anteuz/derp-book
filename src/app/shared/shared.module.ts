import {NgModule} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';
import { KeysPipe } from './keys.pipe';
import { IsCollectedPipe } from './iscollected.pipe';
import { Keys2Pipe } from './keys2.pipe';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

@NgModule({
  declarations: [
    DropdownDirective,
    KeysPipe,
    IsCollectedPipe,
    Keys2Pipe,
    RecipeCardComponent
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    KeysPipe,
    Keys2Pipe,
    IsCollectedPipe,
    RecipeCardComponent
  ]
})
export class SharedModule {}
