import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../../service/area.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from '../../../interface/area.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-area',
  templateUrl: './editar-area.component.html',
  styleUrls: ['./editar-area.component.css']
})
export class EditarAreaComponent implements OnInit{

  id:string ="";
  objArea:Area ={
    idArea:0,
    nombre:'',

  }
  constructor(private areaService:AreaService, private activateRouter:ActivatedRoute,private router:Router) { }

  ngOnInit(): void
  {
    this.id = this.activateRouter.snapshot.params['id'];
    this.areaService.getAreaById(this.id).subscribe((res) =>{
      this.objArea = res;
    },(err) =>{
      console.log(err);
    })
  }
  putArea(){
    this.areaService.putArea(this.id,this.objArea).subscribe((res) =>{
      console.log(res);
      Swal.fire({title:'Actualización',text: res.mensaje, icon:'info'}).then(() =>{
        this.router.navigate(['/dashboard/listar-area']);
      });
    });
    //LIMPIAR CAMPOS
    this.objArea = {
      idArea:0,
      nombre:'',
    }
  }
  cancelar(){
    this.router.navigate(['/dashboard/listar-area'])
  }
}
