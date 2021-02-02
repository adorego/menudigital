import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMenuItemComponent } from './public-menu-item.component';

describe('PublicMenuItemComponent', () => {
  let component: PublicMenuItemComponent;
  let fixture: ComponentFixture<PublicMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
