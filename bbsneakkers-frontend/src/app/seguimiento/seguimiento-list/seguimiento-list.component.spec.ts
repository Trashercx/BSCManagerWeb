import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoListComponent } from './seguimiento-list.component';

describe('SeguimientoListComponent', () => {
  let component: SeguimientoListComponent;
  let fixture: ComponentFixture<SeguimientoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeguimientoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
