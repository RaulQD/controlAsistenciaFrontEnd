import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Area } from 'src/app/proyecto/interface/area.interface';
import { AreaService } from 'src/app/proyecto/service/area.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area-registrar',
  templateUrl: './area-registrar.component.html',
  styleUrls: [ './area-registrar.component.css' ]
})
export class AreaRegistrarComponent
{

  objArea: Area = {
    idArea: 0,
    area: '',
  }

  constructor(private router: Router, private areaService: AreaService) { }

  postArea()
  {
    this.areaService.postArea(this.objArea).subscribe((res) =>
    {
      Swal.fire(
        { title: 'Registro guardado', text: res.errores, icon: 'info' }).then(() =>
        {
          this.router.navigate([ '/dashboard/listar-area' ]);
        });
    })
    //LIMPIAR
    this.objArea = {
      idArea: 0,
      area: '',
    }
  }

  cancelar()
  {
    this.router.navigate([ '/dashboard/listar-area' ])
  }
}
