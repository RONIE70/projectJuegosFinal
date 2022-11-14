import { Pipe, PipeTransform } from '@angular/core';
import { Mensaje } from '../models/mensaje';

@Pipe({
  name: 'filtrado'
})
export class FiltroPipe implements PipeTransform {

  transform(value: Mensaje[], arg: string): Mensaje[] {

    var filtrado =value.filter(x => (x.usuario??"").includes(arg))

    return filtrado;
  }
}
