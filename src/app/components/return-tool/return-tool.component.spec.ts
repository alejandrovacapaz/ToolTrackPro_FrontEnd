import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToolComponent } from './return-tool.component';

describe('ReturnToolComponent', () => {
  let component: ReturnToolComponent;
  let fixture: ComponentFixture<ReturnToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
