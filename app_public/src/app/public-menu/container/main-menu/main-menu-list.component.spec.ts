import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuListComponent } from './main-menu-list.component';

describe('MainMenuComponent', () => {
  let component: MainMenuListComponent;
  let fixture: ComponentFixture<MainMenuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
