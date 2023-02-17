import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from '../../../interface/usuario.interface';
import Swal from 'sweetalert2';
import { Cargo } from '../../../interface/cargo.interface';
import { Area } from '../../../interface/area.interface';
import { UtilService } from '../../../service/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { nombreApellidoPattern, dniPattern, emailPattern } from '../../../../shared/validators/validator';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: [ './editar.component.css' ]
})
export class EditarComponent implements OnInit
{
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
    fechaRegistro: new Date(),
    area: {
      idArea: -1,
      area: '',
    },
    cargo: {
      idCargo: -1,
      cargo: '',
    },
    estado: ''
  }

  /* Creating a form group with the name of the form and the validators. */
  form: FormGroup = this.formBuilder.group({
    nombre: [ '', [ Validators.required, Validators.pattern(nombreApellidoPattern) ] ],
    apellido: [ '', [ Validators.required, Validators.pattern(nombreApellidoPattern) ] ],
    dni: [ '', [ Validators.required, Validators.pattern(dniPattern) ] ],
    correo: [ '', [ Validators.required, Validators.pattern(emailPattern) ] ],
    contacto: [ '', [ Validators.required, Validators.pattern('[0-9]{9}') ] ],
    direccion: [ '', [ Validators.required ] ],
    tarifa: [ '', [ Validators.required, Validators.min(0), Validators.pattern('[0-9]{1,9}') ] ],
    nacimiento: [ '', [ Validators.required ] ],
    registro: [ '', [ Validators.required ] ],
    area: [ -1, [ Validators.required, Validators.min(1) ] ],
    cargo: [ -1, [ Validators.required, Validators.min(1) ] ],
    estado: [ '', [ Validators.required ] ]
  });

  constructor(private utilsService: UtilService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private formBuilder: FormBuilder)
  {
    this.utilsService.getCargo().subscribe((cargos) =>
    { this.cargos = cargos });

    this.utilsService.getArea().subscribe((areas) =>
    {
      this.areas = areas;
    });
  }
  ngOnInit(): void
  {
    /* A way to get the value of the form. */
    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value =>
    {
      console.log(value);
    });
    /* Getting the id from the url and then it is getting the employee with that id. */
    this.activateRouter.params.subscribe((params) =>
    {
      let id = params[ 'id' ];
      this.usuarioService.getEmpleadoById(id).subscribe((res) =>
      {
        this.objUsuario = res;
      })
    })
  }
  /**
  * It returns true if the field has the error 'required'
  * @param {string} campo - string
  * @returns A boolean value.
  */
  isValid(campo: string)
  {
    return this.form.controls[ campo ].hasError('required');
  }
  /**
   * It returns true if the field has an error of type pattern
   * @param {string} campo - string
   * @returns A boolean value.
   */
  isValidPattern(campo: string)
  {
    return this.form.controls[ campo ].hasError('pattern');
  }
  putEmpleado(e: Event)
  {
    e.preventDefault();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.usuarioService.putEmpleado(this.id, this.objUsuario).subscribe((res) =>
    {
      Swal.fire({ title: 'Actualización', text: res.mensaje, icon: 'info' });
      this.form.reset();
      this.router.navigate([ '/dashboard/listar-empleado' ]);
    });
  }

  cancelar()
  {
    this.router.navigate([ '/dashboard/listar-empleado' ])
  }
}
