import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgenFondo'
})
export class ImgenFondoPipe implements PipeTransform {

  urlImage = 'http://image.tmdb.org/t/original/';

  transform(value: string): string {
    return this.urlImage + value;
  }

}
