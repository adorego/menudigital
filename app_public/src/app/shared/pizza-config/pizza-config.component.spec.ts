import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaConfigComponent } from './pizza-config.component';

describe('PizzaConfigComponent', () => {
  let component: PizzaConfigComponent;
  let fixture: ComponentFixture<PizzaConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
