import {NgModule} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';
import {Dropdown2Directive} from './dropdown2.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    Dropdown2Directive
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    Dropdown2Directive
  ]
})
export class SharedModule {}
