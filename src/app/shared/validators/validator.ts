import { FormGroup } from '@angular/forms';
//TODO: EXPRESIONES REGULARES
export const nombreApellidoPattern:string = '[a-zA-ZñáéíóúüÁÉÍÓÚÜ ]{3,40}';
export const  dniPattern:string = '[0-9]{3,8}';
export const  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
