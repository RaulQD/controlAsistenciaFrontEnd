import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/proyecto/service/util.service';
import { Cargo } from '../../../interface/cargo.interface';
import { Area } from '../../../interface/area.interface';
import { Empleado } from 'src/app/proyecto/interface/empelado.interface';
import { EmpleadoService } from '../../../service/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit{
  
  //Pagination
  page:number = 0;
  size:number = 6;
  order:string = 'idEmpleado';
  asc:boolean = true;

  isFirst =false;
  isLast = false;
  totalPages = Array<number>()
  //VARIABLES
  empleados: Empleado[] =[];
  cargos:Cargo[] =[];
  areas: Area[] =[];
  nombre: string = '';

  constructor( private empleadoService: EmpleadoService, private router:Router){
   
  }
  ngOnInit(): void {
    // this.getEmpleado();
    // this.getEmpleadoByParams();
  }
  // sort(){
  //   this.asc = !this.asc;
  //   this.getEmpleado();
  // }
  // rewind(name?:string){
  //   if(!this.isFirst){
  //     this.page--;
  //     this.getEmpleado();
  //   }
  // }
  // forward(name?:string){
  //   if(!this.isLast){
  //     this.page++;
  //     this.getEmpleado();
  //   }
  // }
  
  // getEmpleado(){
  //   this.empleadoService.getEmpleadoPage(this.page,this.size,this.order).subscribe((res) => {
  //     this.empleados = res.content;
  //     this.isFirst = res.first;
  //     this.isLast = res.last;
  //   }); 
  // }
  getEmpleadoByParams(){
    console.log(this.nombre);
    this.empleadoService.getEmpledoByParams(this.nombre).subscribe(empleados => {
      console.log(empleados);
      alert(empleados.mensaje);
      this.empleados = empleados.lista;
    },(err) => {
      console.log(err);
    });
  }
  exportExcel(){
    this.empleadoService.downloadExcel().subscribe((res) =>{
      console.log(res);
    })
  }
}
