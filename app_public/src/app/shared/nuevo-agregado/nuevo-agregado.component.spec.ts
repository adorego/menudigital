import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAgregadoComponent } from './nuevo-agregado.component';

describe('NuevoAgregadoComponent', () => {
  let component: NuevoAgregadoComponent;
  let fixture: ComponentFixture<NuevoAgregadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAgregadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAgregadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
