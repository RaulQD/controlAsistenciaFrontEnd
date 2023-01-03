import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../service/empleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Empleado } from '../../../interface/empelado.interface';

@Component({
  selector: 'app-details-profile',
  templateUrl: './details-profile.component.html',
  styleUrls: ['./details-profile.component.css']
})
export class DetailsProfileComponent implements OnInit {

  titulo:string = "Detalle de Empleado";

  id:number =0;
  objEmpleado:Empleado = {
    idEmpleado: 0,
    nombre:'',
    apellido:'',
    dni:'',
    correo:'',
    contacto:'',
    direccion:'',
    tarifa_hora:0,
    fechaNacimiento:new Date(),
    fechaRegistro:new Date(),
    area:{
      idArea:-1,
  },
    cargo:{
      idCargo:-1,
  },
    estado:0,

  }
  constructor(private empleadoService:EmpleadoService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void
  {
    this.id = this.activatedRoute.snapshot.params[ 'id' ];
    this.empleadoService.getEmpleadoById(this.id).subscribe((res)=>{
      this.objEmpleado = res;
    },(error)=>{console.log(error)});
  }

  cancelar(){
    this.router.navigate(['/dashboard/listar-empleado'])
  }

}

