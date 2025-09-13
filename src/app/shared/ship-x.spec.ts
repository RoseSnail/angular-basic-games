import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipX } from './ship-x';

describe('ShipX', () => {
  let component: ShipX;
  let fixture: ComponentFixture<ShipX>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipX]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipX);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
