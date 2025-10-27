import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ship } from './ship';
import { Position } from './std-interface';



@Component({
  selector: 'app-ship-x',
  imports: [CommonModule],
  templateUrl: './ship.html',
  styleUrl: './ship.css'
})
export class ShipX extends Ship {
  override name = 'X';

  /*/5x5 grid ship; 15 Pixels
   * Ship model visual □■X
   *  -2-1 0 1 2
   *-2 ■       ■
   *-1 ■ ■   ■ ■
   * 0   ■ ■ ■ 
   * 1 ■ ■   ■ ■
   * 2 ■       ■
  /*/
  //override upRotation = 0;
  override offsets: Position[] = [
    {x:-2, y:-2},                                           {x: 2, y:-2},
    {x:-2, y:-1}, {x:-1, y:-1},               {x: 1, y:-1}, {x: 2, y:-1},
                  {x:-1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0},
    {x:-2, y: 1}, {x:-1, y: 1},               {x: 1, y: 1}, {x: 2, y: 1},
    {x:-2, y: 2},                                           {x: 2, y: 2},
  ];

}
