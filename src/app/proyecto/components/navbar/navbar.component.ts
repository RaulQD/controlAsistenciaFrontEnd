import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit
{
  isLogged = false;
  nombreCompleto = '';


  constructor(private router: Router)
  {

  }
  ngOnInit(): void
  {

  }

  menuToggle()
  {
    const toggleMenu = document.querySelector('.nav__dropdown-content');
    toggleMenu?.classList.toggle('active')
  }
  logout()
  {
    Swal.fire('Sesion cerrada', `${this.nombreCompleto}, has cerrado sesion con exito`, 'success');
    this.router.navigate([ '/auth/login' ])

  }
}
