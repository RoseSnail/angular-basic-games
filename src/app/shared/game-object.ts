import { Component, model } from '@angular/core';

import { Vector2D } from './vector2-d';

@Component({
  selector: 'app-game-object',
  imports: [],
  templateUrl: './game-object.html',
  styleUrl: './game-object.css'
})
export class GameObject {
  id = 1;
  position = model<Vector2D>();
  x = model(100);
  y = model(100);
  
  update(elapsedTime: number){
    // the most basic update - useable by all GameObjects that don't override update()
  }
}
