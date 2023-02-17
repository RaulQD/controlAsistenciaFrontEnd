import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './pages/empleado/registrar/registrar.component';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FeriadoComponent } from './pages/feriado/feriado.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListarEmpleadoComponent } from './pages/empleado/listar-empleado/listar-empleado.component';
import { ReporteAsistenciaComponent } from './pages/reporte/reporte-asistencia/reporte-asistencia.component';
import { ReporteGeneralComponent } from './pages/reporte/reporte-general/reporte-general.component';
import { AreaRegistrarComponent } from './pages/area/area-registrar/area-registrar.component';
import { ListarAreasComponent } from './pages/area/listar-areas/listar-areas.component';
import { EditarComponent } from './pages/empleado/editar/editar.component';
import { EditarAreaComponent } from './pages/area/editar-area/editar-area.component';
import { DetailsProfileComponent } from './pages/empleado/details-profile/details-profile.component';


const router: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'listar-empleado', component: ListarEmpleadoComponent, data: { titulo: 'Empleado' } },
      { path: 'listar-empleado/page/:page', component: ListarEmpleadoComponent, data: { titulo: 'Empleado' } },
      { path: 'registrar-empleado', component: RegistrarComponent, data: { titulo: 'Registrar Empleado' } },
      { path: 'editar-empleado/:id', component: EditarComponent, data: { titulo: 'Editar Empleado' } },
      { path: 'feriado', component: FeriadoComponent, data: { titulo: 'Feriado' } },
      { path: 'reporte-asistencia', component: ReporteAsistenciaComponent, data: { titulo: 'Reporte de asistencia' } },
      { path: 'reporte-general', component: ReporteGeneralComponent, data: { titulo: 'Reporte general' } },
      { path: 'listar-area', component: ListarAreasComponent, data: { titulo: 'Areas' } },
      { path: 'registrar-area', component: AreaRegistrarComponent, data: { titulo: 'Areas' } },
      { path: 'editar-area/:id', component: EditarAreaComponent, data: { titulo: 'Areas' } },
      // {path:'cargo',component:CargoComponent,data:{titulo:'Cargos'}}
      { path: 'detalle-empleado/:id', component: DetailsProfileComponent, data: { titulo: 'Perfil de Usuario' } },

    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(router),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class ProyectoRoutingModule { }
