import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasePage } from './add-purchase.page';

describe('AddPurchasePage', () => {
  let component: AddPurchasePage;
  let fixture: ComponentFixture<AddPurchasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
