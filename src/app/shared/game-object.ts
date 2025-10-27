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

  update( elapsedTime:number ){
    // the most basic update - useable by all GameObjects that don't override update()
  }

  degreeToRadian( degree:number ){
    return degree * Math.PI / 180;
  }
  radianToDegree( radian:number ){
    return radian * 180 / Math.PI;
  }
  rotatePointAroundAnchor( point:Vector2D, anchor:Vector2D, degree:number ):Vector2D{
    let rotated = new Vector2D( point.x, point.y );
    if( degree > 0 ){
      let radian = this.degreeToRadian( degree );
      rotated.x = Math.cos(radian) * (point.x - anchor.x) - Math.sin(radian) * (point.y - anchor.y) + anchor.x;
      rotated.y = Math.sin(radian) * (point.x - anchor.x) + Math.cos(radian) * (point.y - anchor.y) + anchor.y;
    }
    return rotated;
  }
  
  // the clockwise angle from vector x=0, y=1.
  // returns n where 0 <= n < 360
  calcAngleDegrees( x:number, y:number ){
    return ((Math.atan2(y, x) * 180) / Math.PI + 90 + 360) % 360;
  }

}
