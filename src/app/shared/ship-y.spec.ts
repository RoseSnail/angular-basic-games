import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipY } from './ship-y';

describe('ShipY', () => {
  let component: ShipY;
  let fixture: ComponentFixture<ShipY>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipY]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipY);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
