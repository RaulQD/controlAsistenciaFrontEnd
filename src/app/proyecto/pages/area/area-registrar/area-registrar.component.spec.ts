import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaRegistrarComponent } from './area-registrar.component';

describe('AreaRegistrarComponent', () => {
  let component: AreaRegistrarComponent;
  let fixture: ComponentFixture<AreaRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaRegistrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
