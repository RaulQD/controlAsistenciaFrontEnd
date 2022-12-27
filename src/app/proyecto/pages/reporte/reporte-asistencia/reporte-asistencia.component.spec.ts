import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAsistenciaComponent } from './reporte-asistencia.component';

describe('ReporteAsistenciaComponent', () => {
  let component: ReporteAsistenciaComponent;
  let fixture: ComponentFixture<ReporteAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteAsistenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
