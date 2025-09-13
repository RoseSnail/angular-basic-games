import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipA } from './ship-a';

describe('ShipA', () => {
  let component: ShipA;
  let fixture: ComponentFixture<ShipA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
