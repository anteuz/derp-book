import {NgModule} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {CommonModule} from '@angular/common';
import { KeysPipe } from './keys.pipe';
import { IsCollectedPipe } from './iscollected.pipe';

@NgModule({
  declarations: [
    DropdownDirective,
    KeysPipe,
    IsCollectedPipe
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    KeysPipe,
    IsCollectedPipe
  ]
})
export class SharedModule {}
