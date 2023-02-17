import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../service/util.service';
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../interface/usuario.interface';
import { Cargo } from '../../../interface/cargo.interface';
import { Area } from '../../../interface/area.interface';
import Swal from 'sweetalert2';
import { debounceTime, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { dniPattern, emailPattern, nombreApellidoPattern } from 'src/app/shared/validators/validator';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: [ './registrar.component.css' ]
})
export class RegistrarComponent implements OnInit
{

  //VARIABLES

  cargos: Cargo[] = [];
  areas: Area[] = [];
  id: number = 0;

  objUsuario: Usuario = {
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
      area: '',
    },
    cargo: {
      idCargo: -1,
      cargo: '',
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
    area: [ '', [ Validators.required, Validators.min(1) ] ],
    cargo: [ '', [ Validators.required, Validators.min(1) ] ],
  });


  constructor(private utilsService: UtilService,
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute) { }


  ngOnInit(): void
  {

    this.utilsService.getCargo().subscribe((cargo) => { this.cargos = cargo; });

    this.utilsService.getArea().subscribe((area) => { this.areas = area; });

    //CAMBIAR REACTIVAMENTE EL VALOR DEL FORMULARIO
    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => { console.log(value) });
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
    //VALIDAR BOTON GUARDAR Y ACTIVAR LAS VALIDACIONES
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    //REGISTRAR
    this.usuarioService.postEmpleado(this.objUsuario).subscribe(res =>
    {
      this.form.reset();
      Swal.fire({
        title: 'Mensaje',
        text: res.mensaje,
        icon: 'info'
      });
      this.router.navigate([ '/dashboard/listar-empleado' ])
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
