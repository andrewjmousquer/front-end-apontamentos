import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(value: any): any {
    if (value != undefined) {
      return value.replace(/(\d{2})(\d{5})(\d{4})/g, "(\$1\) \$2-\$3")
    }
  }
}
