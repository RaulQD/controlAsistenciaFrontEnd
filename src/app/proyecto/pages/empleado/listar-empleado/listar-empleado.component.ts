import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/proyecto/service/util.service';
import { Cargo } from '../../../interface/cargo.interface';
import { Area } from '../../../interface/area.interface';
import { UsuarioService } from '../../../service/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Usuario } from '../../../interface/usuario.interface';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: [ './listar-empleado.component.css' ]
})
export class ListarEmpleadoComponent implements OnInit
{

  @Output() paginator: any;
  //Pagination
  page: number = 0;
  size: number = 8;
  order: string = 'idUsuario';
  asc: boolean = true;

  isFirst = false;
  isLast = false;
  totalPages = Array<number>()
  //VARIABLES
  empleados: Usuario[] = [];
  cargos: Cargo[] = [];
  areas: Area[] = [];
  nombre: string = '';
  search: string = '';
  error: boolean = false;

  constructor(private usuarioService: UsuarioService, private activeRoute: ActivatedRoute)
  {

  }
  ngOnInit(): void
  {
    this.getEmpleadoByParams();

  }
  getEmpleadoByParams()
  {
    this.usuarioService.getEmpleadoPage(this.page, this.size, this.order).subscribe((res) =>
    {
      this.empleados = res.content;
      this.isFirst = res.first;
      this.isLast = res.last;
      this.totalPages = new Array(res[ 'totalPages' ]);
    })
  }
  //PAGINACIÓN
  previus()
  {
    if (!this.isFirst) {
      this.page--;
      this.getEmpleadoByParams();
    }
  }
  next()
  {
    if (!this.isLast) {
      this.page++;
      this.getEmpleadoByParams();
    }
  }
  setPage(page: number)
  {
    this.page = page;
    this.getEmpleadoByParams();
  }

  // consultaNombre(){
  //   this.error = false;
  //   this.empleadoService.getEmpleadoPorNombre(this.nombre === ""?"todos":this.nombre).subscribe((res)=>{
  //     this.empleados = res;
  //   },(err)=>{
  //     this.error =true;
  //     console.log(err);
  //   })
  // }
  exportExcel()
  {
    this.usuarioService.downloadExcel().subscribe((res) =>
    {
      console.log(res);
    })
  }
}

