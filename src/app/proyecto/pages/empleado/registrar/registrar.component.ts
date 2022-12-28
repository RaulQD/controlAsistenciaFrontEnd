import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../service/util.service';
import { EmpleadoService } from '../../../service/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../../interface/empelado.interface';
import { Cargo } from '../../../interface/cargo.interface';
import { Area } from '../../../interface/area.interface';
import Swal from 'sweetalert2';
import { debounceTime} from 'rxjs/operators';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { dniPattern, emailPattern, nombreApellidoPattern } from 'src/app/shared/validators/validator';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  
   //VARIABLES
  empleados: Empleado[] =[];
  cargos:Cargo[] =[];
  areas: Area[] =[];
  objEmpleado: Empleado = {
    nombre: '',
    apellido: '',
    dni: '',
    correo: '',
    contacto: '',
    direccion: '',
    tarifa_hora: 0,
    fechaNacimiento: new Date(),
    area: {
      idArea: -1,
  },
    cargo: {
      idCargo: -1,
    }
  }

  //VALIDAR FORMULARIO FORMGROUP
  form: FormGroup = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.pattern(nombreApellidoPattern)]],
      apellido: ['',[Validators.required, Validators.pattern(nombreApellidoPattern)]],
      dni: ['',[Validators.required, Validators.pattern(dniPattern)]],
      correo: ['',[Validators.required, Validators.pattern(emailPattern)]],
      contacto: ['',[Validators.required, Validators.pattern('[0-9]{9}')]],
      direccion: ['',[Validators.required]],
      tarifa:[0,[Validators.required,Validators.min(0),Validators.pattern('[0-9]{1,9}')]],
      nacimiento: ['',[Validators.required]],
      area: ['',[Validators.required, Validators.min(1)]],
      cargo: ['',[Validators.required, Validators.min(1)]]
    });
  
   
  constructor(private utilsService:UtilService, 
              private empleadoService: EmpleadoService, 
              private router:Router,
              private formBuilder: FormBuilder) {

    this.utilsService.getCargo().subscribe((res) => this.cargos = res );

    this.utilsService.getArea().subscribe((res)=>{this.areas = res});
  }
  ngOnInit(){
    //CAMBIAR REACTIVAMENTE EL VALOR DEL FORMULARIO
    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value =>{
      console.log(value);
    });
  }
  //SI ES REQUERIDO
  isValid(campo:string){
    return this.form.controls[campo].hasError('required');
  }
  //SI TIENE UN PATRON ESPECIFICO
  isValidPattern(campo:string){
    return this.form.controls[campo].hasError('pattern');
  }
  //REGISTRAR EMPLEADO
  postEmpleado(e:Event){
    e.preventDefault();
    //VALIDAR BOTON ACTIVO Y ACTIVAR LAS VALIDACIONES
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
      this.empleadoService.postEmpleado(this.objEmpleado).subscribe((res) =>{
        Swal.fire(
          {title:'Registro guardado', text: res.errores, icon:'info'}).then(() =>{
            this.router.navigate(['/dashboard/listar-empleado']);
          });
        },(err) =>{
          Swal.fire({title:'Error', text: err.errores, icon:'error'})
        });
        this.form.reset();
  }
  cancelar(){
    this.router.navigate(['/dashboard/listar-empleado'])
  }
}