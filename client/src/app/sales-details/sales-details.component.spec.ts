import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDetailsComponent } from './sales-details.component';

describe('SalesDetailsComponent', () => {
  let component: SalesDetailsComponent;
  let fixture: ComponentFixture<SalesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
