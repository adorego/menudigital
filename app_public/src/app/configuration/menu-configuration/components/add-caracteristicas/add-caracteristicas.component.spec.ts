import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaracteristicasComponent } from './add-caracteristicas.component';

describe('AddCaracteristicasComponent', () => {
  let component: AddCaracteristicasComponent;
  let fixture: ComponentFixture<AddCaracteristicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCaracteristicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCaracteristicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
