import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../../service/empleado.service';
import { Empleado } from '../../../interface/empelado.interface';
import Swal from 'sweetalert2';
import { Cargo } from '../../../interface/cargo.interface';
import { Area } from '../../../interface/area.interface';
import { UtilService } from '../../../service/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  debounceTime } from 'rxjs';
import { nombreApellidoPattern, dniPattern, emailPattern } from '../../../../shared/validators/validator';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit{



  cargos:Cargo[] =[];
  areas: Area[] =[];

  id:string ="";
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
    nombre: ['',[Validators.required, Validators.pattern(nombreApellidoPattern)]],
    apellido: ['',[Validators.required, Validators.pattern(nombreApellidoPattern)]],
    dni: ['',[Validators.required, Validators.pattern(dniPattern)]],
    correo: ['',[Validators.required, Validators.pattern(emailPattern)]],
    contacto: ['',[Validators.required, Validators.pattern('[0-9]{9}')]],
    direccion: ['',[Validators.required]],
    tarifa:[0,[Validators.required,Validators.min(0),Validators.pattern('[0-9]{1,9}')]],
    nacimiento: ['',[Validators.required]],
    registro:['',[Validators.required]],
    area: ['',[Validators.required, Validators.min(1)]],
    cargo: ['',[Validators.required, Validators.min(1)]],
    estado:[1,[Validators.required]]
  });
  constructor(private utilsService: UtilService ,
            private empleadoService:EmpleadoService, 
            private router:Router, 
            private activateRouter: ActivatedRoute,
            private formBuilder: FormBuilder){
  this.utilsService.getCargo().subscribe((res) => this.cargos = res );

  this.utilsService.getArea().subscribe((res)=>{this.areas = res});
}
  ngOnInit(): void{
    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value =>{
      console.log(value);
    });

   this.id = this.activateRouter.snapshot.params[ 'id' ];
   this.empleadoService.getEmpleadoById(this.id).subscribe((res)=>{
     this.objEmpleado = res;
   },(error)=>{console.log(error)});
  }
  isValid(campo:string){
    return this.form.controls[campo].hasError('required');
  }
  isValidPattern(campo:string){
    return this.form.controls[campo].hasError('pattern');
  }
  putEmpleado(e:Event){
    e.preventDefault();
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.empleadoService.putEmpleado(this.id,this.objEmpleado).subscribe((res )=>{
      Swal.fire({title:'Actualización',text: res.errores, icon:'info'}).then(() =>{
        this.router.navigate(['/dashboard/listar-empleado']);
      });
    });
    this.form.reset();
  }
  
  cancelar(){
    this.router.navigate(['/dashboard/listar-empleado'])
  }
}
