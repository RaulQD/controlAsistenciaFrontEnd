import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  
  @Input() paginator:any;

  constructor(){}
  ngOnInit(): void{}

  previus(){
    if(!this.paginator.isFirst){
      this.paginator.page--;
      this.paginator.getEmpleadoByParams();
    }
  }
  next(){
    if(!this.paginator.isLast){
      this.paginator.page++;
      this.paginator.getEmpleadoByParams();
    }
  }
}
