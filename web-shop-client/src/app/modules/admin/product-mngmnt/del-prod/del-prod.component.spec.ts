import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelProdComponent } from './del-prod.component';

describe('DelProdComponent', () => {
  let component: DelProdComponent;
  let fixture: ComponentFixture<DelProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
