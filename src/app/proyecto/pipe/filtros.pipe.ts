import { Pipe, PipeTransform } from '@angular/core';
import { Empleado } from '../interface/empelado.interface';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  transform(value: Empleado[],page:number = 0, search:string =''): Empleado[] {
    if(search.length === 0)
    return value.slice(page,page + 5);
    const filterEmpleado = value.filter( empleado => empleado.nombre?.includes(search))
    return filterEmpleado.slice(page,page + 5);
    
    
    
  } 
 
}
