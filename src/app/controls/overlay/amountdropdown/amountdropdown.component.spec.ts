import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountdropdownComponent } from './amountdropdown.component';

describe('AmountdropdownComponent', () => {
  let component: AmountdropdownComponent;
  let fixture: ComponentFixture<AmountdropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountdropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
