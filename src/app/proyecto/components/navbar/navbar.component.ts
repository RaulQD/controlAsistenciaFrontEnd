import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../auth/security/service/token.service';
import { LoginUsuario } from '../../../auth/security/interface/login';
import { Usuario } from '../../interface/usuario.interface';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit
{
  isLogged = false;
  nombreCompleto = '';

  usuario: LoginUsuario;
  constructor(private router: Router,
    private tokenService: TokenService)
  {
    this.usuario = new LoginUsuario();
  }
  ngOnInit(): void
  {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreCompleto = this.tokenService.getNombreCompleto();
    } else {
      this.isLogged = false;
      this.nombreCompleto = '';
    }

  }

  menuToggle()
  {
    const toggleMenu = document.querySelector('.nav__dropdown-content');
    toggleMenu?.classList.toggle('active')
  }
  logout()
  {
    this.router.navigate([ '/auth/login' ])
    this.tokenService.logOut();
  }
}
