import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BscDetailComponent } from './bsc-detail.component';

describe('BscDetailComponent', () => {
  let component: BscDetailComponent;
  let fixture: ComponentFixture<BscDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BscDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BscDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
