import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../../service/empleado.service';
import { Empleado } from '../../../interface/empelado.interface';
import Swal from 'sweetalert2';
import { Cargo } from '../../../interface/cargo.interface';
import { Area } from '../../../interface/area.interface';
import { UtilService } from '../../../service/util.service';

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
  constructor(private utilsService: UtilService ,
            private empleadoService:EmpleadoService, 
            private router:Router, 
            private activateRouter: ActivatedRoute){
  this.utilsService.getCargo().subscribe((res) => this.cargos = res );

  this.utilsService.getArea().subscribe((res)=>{this.areas = res});
}
  ngOnInit(): void{
   this.id = this.activateRouter.snapshot.params[ 'id' ];
   this.empleadoService.getEmpleadoById(this.id).subscribe((res)=>{
     this.objEmpleado = res;
   },(error)=>{console.log(error)});
  }
  putEmpleado(){
    this.empleadoService.putEmpleado(this.id,this.objEmpleado).subscribe((res )=>{
      Swal.fire({title:'Actualización',text: res.errores, icon:'info'}).then(() =>{
        this.router.navigate(['/dashboard/listar-empleado']);
      });
    });

    //LIMPIAR CAMPOS
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
      fechaRegistro : new Date(),
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
