import {NgModule} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';
import { KeysPipe } from './keys.pipe';

@NgModule({
  declarations: [
    DropdownDirective,
    KeysPipe
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    KeysPipe
  ]
})
export class SharedModule {}
