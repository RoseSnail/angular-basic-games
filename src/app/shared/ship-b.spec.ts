import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipB } from './ship-b';

describe('ShipB', () => {
  let component: ShipB;
  let fixture: ComponentFixture<ShipB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipB]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipB);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
