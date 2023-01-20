import { Area } from "./area.interface";
import { Cargo } from './cargo.interface';
import { Rol } from './rol.interface';

export class Usuario
{
    idUsuario?: number;
    nombre?: string;
    apellido?: string;
    dni?: string;
    correo?: string;
    contacto?: string;
    direccion?: string;
    tarifa?: any;
    fechaNacimiento?: Date;
    fechaRegistro?: Date;
    estado?: string;
    area?: Area;
    cargo?: Cargo;
    usuario?: string;
    contrasena?: string;
    roles?: Rol;
}
