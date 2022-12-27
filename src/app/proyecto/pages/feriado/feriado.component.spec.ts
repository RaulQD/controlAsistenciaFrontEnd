import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriadoComponent } from './feriado.component';

describe('FeriadoComponent', () => {
  let component: FeriadoComponent;
  let fixture: ComponentFixture<FeriadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeriadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeriadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
