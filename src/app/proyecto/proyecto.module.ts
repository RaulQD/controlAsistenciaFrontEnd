import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

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
import { DetailsProfileComponent } from './pages/empleado/details-profile/details-profile.component';
import { ListarHorariosComponent } from './pages/listar-horarios/listar-horarios.component';
import { UsuarioService } from './service/usuario.service';
import { PaginationComponent } from './components/pagination/pagination.component';

import { FiltrosPipe } from './pipe/filtros.pipe';
import localeES from '@angular/common/locales/es';
registerLocaleData(localeES, 'es')


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
    EditarAreaComponent,
    DetailsProfileComponent,
    ListarHorariosComponent,
    FiltrosPipe,
    PaginationComponent,
    // CargoComponent,

  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PaginationComponent
  ],
  providers: [ UsuarioService, { provide: LOCALE_ID, useValue: 'es' } ],

})
export class ProyectoModule { }
