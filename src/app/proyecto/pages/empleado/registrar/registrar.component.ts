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
    idEmpleado: 0,
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
  form: FormGroup = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9ñáéíóúüÁÉÍÓÚÜ ]{3,40}')]],
      apellido: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9ñáéíóúüÁÉÍÓÚÜ ]{3,40}')]],
      dni: ['',[Validators.required, Validators.pattern('[0-9]{8}')]],
      correo: ['',[Validators.required, Validators.email]],
      contacto: ['',[Validators.required, Validators.pattern('[0-9]{9}')]],
      direccion: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9ñáéíóúüÁÉÍÓÚÜ ]{3,60}')]],
      tarifa:[0,[Validators.required,Validators.min(0)]],
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
    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value =>{
      console.log(value);
    });
  }
  isValid(campo:string){
    return this.form.controls[campo].hasError('required');
  }
  isValidPattern(campo:string){
    return this.form.controls[campo].hasError('pattern');
  }
  
  postEmpleado(e:Event){
    e.preventDefault();
      this.empleadoService.postEmpleado(this.objEmpleado).subscribe((res) =>{
        Swal.fire(
          {title:'Registro guardado', text: res.errores, icon:'info'}).then(() =>{
            this.router.navigate(['/dashboard/listar-empleado']);
          });
        },(err) =>{
          Swal.fire({title:'Error', text: err.errores, icon:'error'})
        });
        //LIMPIAR CAMPOS
        this.cargos = [];
        this.areas = [];
        // this.form.reset();
        this.objEmpleado={
          idEmpleado: 0,
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
  }
  cancelar(){
    this.router.navigate(['/dashboard/listar-empleado'])
  }
}