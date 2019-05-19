import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgenDetalles'
})
export class ImgenDetallesPipe implements PipeTransform {

  urlImage = 'http://image.tmdb.org/t/p/w342/';

  transform(value: string): string {
    return this.urlImage + value;
  }

}
