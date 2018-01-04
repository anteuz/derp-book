import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown2]'
})
export class Dropdown2Directive {
  @HostBinding('class.collapsed') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen; // Toggles CSS Property
  }
}
