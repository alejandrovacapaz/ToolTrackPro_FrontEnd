import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowToolComponent } from './borrow-tool.component';

describe('BorrowToolComponent', () => {
  let component: BorrowToolComponent;
  let fixture: ComponentFixture<BorrowToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
