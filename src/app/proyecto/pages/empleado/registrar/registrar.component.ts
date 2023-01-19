import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../service/util.service';
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../interface/usuario.interface';
import { Cargo } from '../../../interface/cargo.interface';
import { Area } from '../../../interface/area.interface';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { dniPattern, emailPattern, nombreApellidoPattern } from 'src/app/shared/validators/validator';
import { Rol } from '../../../interface/rol.interface';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: [ './registrar.component.css' ]
})
export class RegistrarComponent implements OnInit
{

  fotoSeleccionada!: File;

  //VARIABLES
  empleados: Usuario[] = [];
  cargos: Cargo[] = [];
  areas: Area[] = [];
  roles: Rol[] = [];
  objEmpleado: Usuario = {
    idUsuario: 0,
    nombre: '',
    apellido: '',
    dni: '',
    correo: '',
    contacto: '',
    direccion: '',
    tarifa: '',
    fechaNacimiento: new Date(),
    area: {
      idArea: -1,
    },
    cargo: {
      idCargo: -1,
    },
    usuario: '',
    contrasena: '',
    roles: {
      idRol: -1,
    }
  }

  //VALIDAR FORMULARIO FORMGROUP
  form: FormGroup = this.formBuilder.group({
    nombre: [ '', [ Validators.required, Validators.pattern(nombreApellidoPattern) ] ],
    apellido: [ '', [ Validators.required, Validators.pattern(nombreApellidoPattern) ] ],
    dni: [ '', [ Validators.required, Validators.pattern(dniPattern) ] ],
    correo: [ '', [ Validators.required, Validators.pattern(emailPattern) ] ],
    contacto: [ '', [ Validators.required, Validators.pattern('[0-9]{9}') ] ],
    direccion: [ '', [ Validators.required ] ],
    tarifa: [ '', [ Validators.required, Validators.min(0), Validators.pattern('[0-9]{1,9}') ] ],
    nacimiento: [ '', [ Validators.required ] ],
    area: [ -1, [ Validators.required, Validators.min(1) ] ],
    cargo: [ -1, [ Validators.required, Validators.min(1) ] ],
    roles: [ -1, [ Validators.required, Validators.min(1) ] ],
    usuario: [ '', [ Validators.required ] ],
    contrasena: [ '', [ Validators.required ] ],

  });


  constructor(private utilsService: UtilService,
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder)
  {
    this.utilsService.listarRoles().subscribe((res) => this.roles = res);

    this.utilsService.getCargo().subscribe((res) => this.cargos = res);

    this.utilsService.getArea().subscribe((res) => { this.areas = res });
  }
  ngOnInit()
  {
    //CAMBIAR REACTIVAMENTE EL VALOR DEL FORMULARIO
    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value =>
    {
      console.log(value);
    });

  }
  //SI ES REQUERIDO
  isValid(campo: string)
  {
    return this.form.controls[ campo ].hasError('required');
  }
  //SI TIENE UN PATRON ESPECIFICO
  isValidPattern(campo: string)
  {
    return this.form.controls[ campo ].hasError('pattern');
  }
  //REGISTRAR EMPLEADO
  postEmpleado(e: Event)
  {
    e.preventDefault();
    //VALIDAR BOTON ACTIVO Y ACTIVAR LAS VALIDACIONES
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.usuarioService.postEmpleado(this.objEmpleado).subscribe((res) =>
    {
      this.form.reset();
      this.router.navigate([ '/dashboard/listar-empleado' ])
      Swal.fire({
        title: 'Mensaje',
        text: res.mensaje,
        icon: 'info'
      });
    });
  }
  // selectPhoto(event:any){
  //   this.fotoSeleccionada = event.target.files[0];
  //   console.log(this.fotoSeleccionada);

  // }
  //CANCELAR
  cancelar()
  {
    this.router.navigate([ '/dashboard/listar-empleado' ])
  }

}