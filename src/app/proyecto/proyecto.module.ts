import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ListarEmpleadoComponent } from './pages/empleado/listar-empleado/listar-empleado.component';
import { RegistrarComponent } from './pages/empleado/registrar/registrar.component';
import { EditarComponent } from './pages/empleado/editar/editar.component';
import { ProyectoRoutingModule } from './proyecto-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FeriadoComponent } from './pages/feriado/feriado.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReporteAsistenciaComponent } from './pages/reporte/reporte-asistencia/reporte-asistencia.component';
import { ReporteGeneralComponent } from './pages/reporte/reporte-general/reporte-general.component';
import { FooterComponent } from './components/footer/footer.component';
import { AreaRegistrarComponent } from './pages/area/area-registrar/area-registrar.component';
import { ListarAreasComponent } from './pages/area/listar-areas/listar-areas.component';
import { EditarAreaComponent } from './pages/area/editar-area/editar-area.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    ListarEmpleadoComponent,
    RegistrarComponent,
    EditarComponent,
    HomeComponent,
    FeriadoComponent,
    BreadcrumbsComponent,
    DashboardComponent,
    ReporteAsistenciaComponent,
    ReporteGeneralComponent,
    FooterComponent,
    AreaRegistrarComponent,
    ListarAreasComponent,
    EditarAreaComponent
    // CargoComponent,

  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProyectoModule { }