import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropiedadComponent } from './list-propiedad.component';

describe('ListPropiedadComponent', () => {
  let component: ListPropiedadComponent;
  let fixture: ComponentFixture<ListPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPropiedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
