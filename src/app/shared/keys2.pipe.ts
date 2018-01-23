import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys2'})
export class Keys2Pipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];

    for (const enumMember in value) {
      if (value != null) {
        for (const enumMember2 in value[enumMember]) {
         if ( enumMember2 != null) {
           keys.push({key: enumMember2, value: value[enumMember][enumMember2]});
         }
        }
      }
    }
    return keys;
  }
}
