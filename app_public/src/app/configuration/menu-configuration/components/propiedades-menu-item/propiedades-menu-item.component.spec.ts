import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesMenuItemComponent } from './propiedades-menu-item.component';

describe('PropiedadesMenuItemComponent', () => {
  let component: PropiedadesMenuItemComponent;
  let fixture: ComponentFixture<PropiedadesMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropiedadesMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadesMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
