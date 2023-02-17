import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [ './pagination.component.css' ]
})
export class PaginationComponent implements OnInit, OnChanges
{

  @Input() paginator: any;

  page: number[] = [];
  desde: number = 0;
  hasta: number = 0;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void
  {
    /* Checking if the paginator has changed. */
    let paginatorActualizado = changes[ 'paginator' ];
    if (paginatorActualizado.previousValue) {
      this.paginatorInit();
    };
  }
  ngOnInit(): void
  {
    this.paginatorInit();
  }
  paginatorInit(): void
  {
    /* *|MARKER_CURSOR|* */
    this.desde = Math.min(Math.max(1, this.paginator.number - 3), this.paginator.totalPages - 4);
    this.hasta = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 3), 5);
    /* Creating an array of numbers from 1 to the total number of pages. */
    if (this.paginator.totalPages > 5) {

      this.page = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    } else {
      this.page = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => indice + 1);

    }
  }


}
