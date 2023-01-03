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
  //DECOARADORES
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  
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
  buscar(){
    const texto: string = this.txtBuscar.nativeElement.value;
    this.empleadoService.getEmpledoByParams(texto).subscribe((res) =>{
      this.empleados = res;
    });
    this.txtBuscar.nativeElement.value = '';
  }
  getEmpleado(){
    this.empleadoService.getEmpleadoPage(this.page,this.size,this.order,this.asc).subscribe((res) => {
      this.empleados = res.content;
      this.isFirst = res.first;
      this.isLast = res.last;
    }); 
  }
  getEmpleadoByParams(){
    this.empleadoService.getEmpledoByParams(this.nombre).subscribe((res) =>{
      this.empleados = res;
    })
  }
  exportExcel(){
    this.empleadoService.downloadExcel().subscribe((res) =>{
      console.log(res);
    })
  }
}
