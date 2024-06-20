import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultProducts = [];
    for (const product of value) {
      if (product.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultProducts.push(product);
      }
      console.log(product);
    }
    return resultProducts;

  }

}
