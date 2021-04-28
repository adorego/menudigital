import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaGuarnicionComponent } from './nueva-guarnicion.component';

describe('NuevaGuarnicionComponent', () => {
  let component: NuevaGuarnicionComponent;
  let fixture: ComponentFixture<NuevaGuarnicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaGuarnicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaGuarnicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
