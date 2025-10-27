import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ship } from './ship';
import { Position } from './std-interface';



@Component({
  selector: 'app-ship-b',
  imports: [CommonModule],
  templateUrl: './ship.html',
  styleUrl: './ship.css'
})
export class ShipB extends Ship {
  override name = 'B';

  /*/5x5 grid ship; 14 Pixels
   * Ship model visual □■X
   *   -1 1/2 1
   *-2  ■ ■
   *-1  ■   ■
   *-.5 ■ ■ ■
   * .5 ■     ■
   * 1  ■     ■
   * 2  ■ ■ ■
  /*/
  //override upRotation = -90;
  override upRotation = 270;
  override offsets: Position[] = [
    {x:-1.5, y:-2.5}, {x:-0.5, y:-2.5},
    {x:-1.5, y:-1.5},                   {x:0.5, y:-1.5},
    {x:-1.5, y:-0.5}, {x:-0.5, y:-0.5}, {x:0.5, y:-0.5},
    {x:-1.5, y: 0.5},                                   {x:1.5, y:0.5},
    {x:-1.5, y: 1.5},                                   {x:1.5, y:1.5},
    {x:-1.5, y: 2.5}, {x:-0.5, y: 2.5}, {x:0.5, y:2.5},
  ];

}
