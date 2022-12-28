import { Area } from "./area.interface";
import { Cargo } from './cargo.interface';

export interface Empleado {
    idEmpleado?:     number;
    nombre:          string;
    apellido:        string;
    dni:             string;
    correo:          string;
    contacto:        string;
    direccion:       string;
    tarifa_hora:     number;
    fechaNacimiento: Date;
    fechaRegistro?:   Date;
    area:            Area;
    cargo:           Cargo;
    estado?:          number;
}
