import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameObject } from './game-object';

describe('GameObject', () => {
  let component: GameObject;
  let fixture: ComponentFixture<GameObject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameObject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameObject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
