import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BscListComponent } from './bsc-list.component';

describe('BscListComponent', () => {
  let component: BscListComponent;
  let fixture: ComponentFixture<BscListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BscListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BscListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
