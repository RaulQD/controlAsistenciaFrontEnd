import { Component } from '@angular/core';
import { Empleado } from '../../interface/empelado.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(){}
  
  menuToggle(){
    const toggleMenu = document.querySelector('.nav__dropdown-content');
    toggleMenu?.classList.toggle('active')
  }
  
}
