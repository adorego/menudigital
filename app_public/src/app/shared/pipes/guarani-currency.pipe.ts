import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guaraniCurrency'
})
export class GuaraniCurrencyPipe implements PipeTransform {

  transform(val: number): string {
    // Format the output to display any way you want here.
    // For instance:
    if (val !== undefined && val !== null) {
      return val.toLocaleString('es-PY', { style: 'currency', currency: 'PYG' });
    } else {
      return '';
    }
  }

}
