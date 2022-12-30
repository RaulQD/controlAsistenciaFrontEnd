import { Component } from '@angular/core';
import { EmpleadoService } from '../../../service/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-profile',
  templateUrl: './details-profile.component.html',
  styleUrls: ['./details-profile.component.css']
})
export class DetailsProfileComponent {

  constructor(private empleadoService:EmpleadoService, private router:Router) { }
    
  
  detailsEmpleado(id:number){
    this.router.navigate(['/dashboard/detalle-empleado', id]);
  };
}

