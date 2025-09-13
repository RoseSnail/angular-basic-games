import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ship } from './ship';
import { Position } from './std-interface';
import { Vector2D } from './vector2-d';

@Component({
  selector: 'app-ship-a',
  imports: [CommonModule],
  templateUrl: './ship.html',
  styleUrl: './ship.css'
})
export class ShipA extends Ship{
  override name = 'A';

  /*/5x5 grid ship; 15 Pixels
   * Ship model visual □■X
   *  -2-1 0 1 2
   *-2     ■
   *-1   ■ ■ ■
   * 0 ■ ■   ■ ■
   * 1 ■ ■ ■ ■ ■
   * 2 ■       ■
  /*/
  //override up = 0;
  override offsets: Position[] = [
                                {x: 0, y:-2},
                  {x:-1, y:-1}, {x: 0, y:-1}, {x: 1, y:-1},
    {x:-2, y: 0}, {x:-1, y: 0},               {x: 1, y: 0}, {x: 2, y: 0},
    {x:-2, y: 1}, {x:-1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1},
    {x:-2, y: 2},                                           {x: 2, y: 2},
  ];

  override velocity: Vector2D = new Vector2D(-0.4, -0.65);
  
  //override update(elapsedTime: number = 0){
  //  super.update(elapsedTime);
  //}

}
