import { FormGroup } from '@angular/forms';
//TODO: EXPRESIONES REGULARES
export const nombreApellidoPattern:string = '[a-zA-ZñáéíóúüÁÉÍÓÚÜ ]{3,40}';
export const  dniPattern:string = '[0-9]{3,8}';
export const  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
export const  datePattern: string = "^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|0[1-2])\0\d{4}$";
