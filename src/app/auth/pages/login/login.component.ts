import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../security/service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginUsuario } from '../../security/interface/login';
import { TokenService } from '../../security/service/token.service';
import { Usuario } from '../../../proyecto/interface/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit
{
  usuario: Usuario;
  roles: string[] = [];


  form: FormGroup = this.formBuilder.group({
    usuario: [ '', [ Validators.required, ] ],
    contrasena: [ '', [ Validators.required, Validators.minLength(3) ] ]
  });
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService)
  {
    this.usuario = new Usuario();
  }
  ngOnInit(): void
  {

  }
  login()
  {
    console.log(this.form.value);
    const { usuario, contrasena } = this.form.value;
    if (this.form.value.usuario.trim() == '' || this.form.value.contrasena.trim() == '') {
      Swal.fire('Error', 'Usuario o contraseña vacios', 'error');
      return;
    }
    this.authService.login(usuario, contrasena).subscribe({
      next: (res) =>
      {
        console.log(res);
        let payload = JSON.parse(atob(res.token.split('.')[ 1 ]));
        console.log(payload);
        this.tokenService.setToken(res.token);
        this.tokenService.setUsername(res.usuario);
        this.tokenService.setAuthorities(res.authorities);
        this.tokenService.setNombreCompleto(res.nombreCompleto);
        this.roles = this.tokenService.getAuthorities();
        console.log(this.roles);

        Swal.fire('Login', `Hola ${res.nombreCompleto}, has iniciado sesión con éxito!`, 'success')
        this.router.navigateByUrl('/dashboard');
      }, error: (err) =>
      {
        if (err.status == 401) {
          Swal.fire('Error', 'Usuario o contraseña incorrecta', 'error')
        }
      }
    })
  }
}
