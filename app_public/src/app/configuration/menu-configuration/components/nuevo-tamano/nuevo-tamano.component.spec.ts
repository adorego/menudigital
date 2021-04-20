import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTamanoComponent } from './nuevo-tamano.component';

describe('NuevoTamanoComponent', () => {
  let component: NuevoTamanoComponent;
  let fixture: ComponentFixture<NuevoTamanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoTamanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTamanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
