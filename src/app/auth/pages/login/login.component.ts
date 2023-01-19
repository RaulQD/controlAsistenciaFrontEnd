import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../security/service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginUsuario } from '../../security/interface/login';
import { ConnectableObservable } from 'rxjs';
import { TokenService } from '../../security/service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent
{
  usuario: LoginUsuario;


  form: FormGroup = this.formBuilder.group({
    usuario: [ '', [ Validators.required, ] ],
    contrasena: [ '', [ Validators.required, Validators.minLength(3) ] ]
  });
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService)
  {
    this.usuario = new LoginUsuario();
  }


  login()
  {
    console.log(this.form.value);
    const { usuario, contrasena } = this.form.value;
    if (this.form.value.usuario == '' || this.form.value.contrasena == '') {
      Swal.fire('Error', 'Usuario o contraseña vacios', 'error');
      return;
    }
    this.authService.login(usuario, contrasena).subscribe(res =>
    {
      console.log(res);
      let payload = JSON.parse(atob(res.token.split('.')[ 1 ]));
      console.log(payload);
      this.tokenService.setToken(res.token);
      this.tokenService.setUsername(payload.sub);
      this.tokenService.setAuthorities(res.authorities);

      Swal.fire('Login', `Hola ${payload.sub}, has iniciado sesión con éxito!`, 'success')
      this.router.navigateByUrl('/dashboard');
    }, (err) =>
    {
      if (err.status == 401) {
        Swal.fire('Error', 'Usuario o contraseña incorrecta', 'error')
      }
    })
  }
}
