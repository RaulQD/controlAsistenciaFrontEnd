import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../auth/security/service/token.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent
{

  constructor(private router: Router,
    private tokenService: TokenService) { }

  menuToggle()
  {
    const toggleMenu = document.querySelector('.nav__dropdown-content');
    toggleMenu?.classList.toggle('active')
  }
  logout()
  {
    this.tokenService.logOut();
  }
}
