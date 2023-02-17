import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Usuario } from '../../../proyecto/interface/usuario.interface';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit
{

  constructor() { }
  ngOnInit(): void
  {
  }



}
