import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoSaborComponent } from './nuevo-sabor.component';

describe('NuevoSaborComponent', () => {
  let component: NuevoSaborComponent;
  let fixture: ComponentFixture<NuevoSaborComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoSaborComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoSaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
