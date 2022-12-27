import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';

const router: Routes =[
  {
    path:'',
    children:[
      {
        path:'login',
        component: LoginComponent
      },
      {
        path:'registrar',
        component: RegistrarComponent
      },
      {
        path:'**',
        redirectTo:'login'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(router),
    CommonModule
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
