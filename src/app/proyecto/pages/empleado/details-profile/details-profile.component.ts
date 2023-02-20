import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../interface/usuario.interface';

@Component({
  selector: 'app-details-profile',
  templateUrl: './details-profile.component.html',
  styleUrls: [ './details-profile.component.css' ]
})
export class DetailsProfileComponent implements OnInit
{

  titulo: string = "Detalle de Empleado";

  id: number = 0;
  objEmpleado: Usuario = {
    idUsuario: 0,
    nombre: '',
    apellido: '',
    dni: '',
    correo: '',
    contacto: '',
    direccion: '',
    tarifa: 0,
    fechaNacimiento: new Date(),
    fechaRegistro: new Date(),
    area: {
      idArea: -1,
    },
    cargo: {
      idCargo: -1,
    },
    estado: '',

  }
  constructor(private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void
  {
    this.id = this.activatedRoute.snapshot.params[ 'id' ];
    this.usuarioService.getUsuarioById(this.id).subscribe((res) =>
    {
      this.objEmpleado = res;
    }, (error) => { console.log(error) });
  }

  cancelar()
  {
    this.router.navigate([ '/dashboard/listar-empleado' ])
  }

}

