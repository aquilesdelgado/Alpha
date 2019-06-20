import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageresult'
})
export class ImageresultPipe implements PipeTransform {

  urlImage = 'http://image.tmdb.org/t/p/w185/';

  transform(value: string): string {
    return this.urlImage + value;
  }


}
