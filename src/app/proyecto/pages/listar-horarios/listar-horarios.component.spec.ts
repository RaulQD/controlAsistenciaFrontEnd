import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHorariosComponent } from './listar-horarios.component';

describe('ListarHorariosComponent', () => {
  let component: ListarHorariosComponent;
  let fixture: ComponentFixture<ListarHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarHorariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
