import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/proyecto/interface/area.interface';
import { AreaService } from '../../../service/area.service';
import { Empleado } from '../../../interface/empelado.interface';

@Component({
  selector: 'app-listar-areas',
  templateUrl: './listar-areas.component.html',
  styleUrls: ['./listar-areas.component.css']
})
export class ListarAreasComponent implements OnInit{
  //Pagination
  page:number = 0;
  size:number = 4;
  order:string = 'idArea';
  asc:boolean = true;

  isFirst =false;
  isLast = false;
  totalPages = Array<number>()

  area: Area[] =[];
  objArea:Area = {
    idArea: 0,
    nombre: '',
  }
    constructor(private areaService: AreaService){}
  ngOnInit(): void
  {
   this.getAreas();
  }
  

  sort(){
    this.asc = !this.asc;
    this.getAreas();
  }
  rewind(){
    if(!this.isFirst){
      this.page--;
      this.getAreas();
    }
  }
  forward(){
    if(!this.isLast){
      this.page++;
      this.getAreas();
    }
  }
  getAreas(){
   this.areaService.getAreaPage(this.page, this.size, this.order,this.asc).subscribe((res) =>{
    this.area = res.content;
    this.isFirst = res.first;
    this.isLast = res.last;
    })
  }
  deleteArea(area:Area){
    this.areaService.deleteArea(area.idArea).subscribe( (res) => {
      console.log("Area eliminada",area);
    })
  }
}
