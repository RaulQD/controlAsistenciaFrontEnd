import { Component, Input, OnInit } from '@angular/core';
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

  constructor( private empleadoService: EmpleadoService, private router:Router){
   
  }
  ngOnInit(): void {
    this.getEmpleado();
  }
  sort(){
    this.asc = !this.asc;
    this.getEmpleado();
  }
  rewind(){
    if(!this.isFirst){
      this.page--;
      this.getEmpleado();
    }
  }
  forward(){
    if(!this.isLast){
      this.page++;
      this.getEmpleado();
    }
  }
  getEmpleado(){
    this.empleadoService.getEmpleadoPage(this.page,this.size,this.order,this.asc).subscribe((res) => {
      this.empleados = res.content;
      this.isFirst = res.first;
      this.isLast = res.last;
    }); 
  }
  exportExcel(){
    this.empleadoService.downloadExcel().subscribe((res) =>{
      console.log(res);
    })
  }
}
