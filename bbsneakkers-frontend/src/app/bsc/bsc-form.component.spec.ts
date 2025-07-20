import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BscFormComponent } from './bsc-form.component';

describe('BscFormComponent', () => {
  let component: BscFormComponent;
  let fixture: ComponentFixture<BscFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BscFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BscFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
