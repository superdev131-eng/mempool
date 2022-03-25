import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountShortener'
})
export class AmountShortenerPipe implements PipeTransform {
  transform(num: number, ...args: number[]): unknown {
    const digits = args[0] || 1;

    if (num < 1000) {
      return num.toFixed(digits);
    }

    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find((item) => num >= item.value);
    return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
  }
}