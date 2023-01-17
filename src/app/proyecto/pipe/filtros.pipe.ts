import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interface/usuario.interface';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform
{

  transform(value: Usuario[], page: number = 0, search: string = ''): Usuario[]
  {
    if (search.length === 0)
      return value.slice(page, page + 10);
    const filterEmpleado = value.filter(usuario => usuario.nombre?.includes(search))
    return filterEmpleado.slice(page, page + 10);



  }

}
