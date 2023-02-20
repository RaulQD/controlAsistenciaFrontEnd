import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/proyecto/service/util.service';
import { Cargo } from '../../../interface/cargo.interface';
import { Area } from '../../../interface/area.interface';
import { UsuarioService } from '../../../service/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../interface/usuario.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: [ './listar-empleado.component.css' ]
})
export class ListarEmpleadoComponent implements OnInit
{

  //pagination
  paginator: any;


  //VARIABLES
  usuario: Usuario[] = [];
  cargos: Cargo[] = [];
  areas: Area[] = [];
  nombre: string = "";
  error: boolean = false;

  constructor(private usuarioService: UsuarioService, private activeRoute: ActivatedRoute)
  {

  }
  ngOnInit(): void
  {
    this.getEmpleadoPage();
  }

  getEmpleadoPage()
  {
    this.activeRoute.paramMap.subscribe(params =>
    {
      let page: number = +(params.get('page') || 0);
      if (!page) {
        page = 0;
      }
      this.usuarioService.getEmpleadoPage(page).subscribe((res) =>
      {
        this.usuario = res.content as Usuario[];
        this.paginator = res;
      });
    });
  }
  getConsultName()
  {
    this.usuarioService.getUsuarioByParams(this.nombre).subscribe((res) =>
    {
      this.getEmpleadoPage();
      this.usuario = res.lista;
    })
  }
  clearConsult(): void
  {
    this.nombre = '';

  }

  deleteUsuario(usuario: Usuario)
  {
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al usuario : ${usuario.nombre} ${usuario.apellido}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#11dd2c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar',
    }).then((result) =>
    {
      if (result.isConfirmed) {
        this.usuarioService.deleteEmpleado(usuario.idUsuario!).subscribe((res) =>
        {
          this.getEmpleadoPage();
          Swal.fire({
            title: 'Eliminado!',
            text: res.mensaje,
            icon: 'success',
          })
        });
      }
    })

  }

  exportExcel()
  {
    this.usuarioService.downloadExcel().subscribe((res) =>
    {
      console.log(res);
    })
  }
}

