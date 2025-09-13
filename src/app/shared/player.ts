import { Component, input, HostListener, ViewChild } from '@angular/core';

//import { GameObject } from './game-object';
import { Ship } from './ship';

import { ShipA } from './ship-a';
import { ShipB } from './ship-b';
import { ShipX } from './ship-x';
import { ShipY } from './ship-y';

@Component({
  selector: 'app-player',
  imports: [ShipA, ShipB, ShipX, ShipY],
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class Player extends Ship {
  shipType = 'A';
  activeShip(): Ship {
    switch( this.shipType ){
      default: {
        return this.shipY;
      } break;
    }
  }
  @ViewChild('shipA') shipA!: ShipA;
  @ViewChild('shipB') shipB!: ShipB;
  @ViewChild('shipX') shipX!: ShipX;
  @ViewChild('shipY') shipY!: ShipY;
  
  @HostListener('document:keydown', ['$event'])
  handleKeydownEvent(event: KeyboardEvent){
    console.log('key pressed: ', event.key);
    console.log(event);
    this.evaluateKeydown( event.key ); //could also use "event.code"
  }
  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(event: KeyboardEvent){
    console.log('key released: ', event.key);
    console.log(event);
    this.evaluateKeyup( event.key ); //could also use "event.code"
  }

  evaluateKeyup( key: string ){
    switch( key ){
      case "up":
      case "ArrowUp":
      case "w":
      case "W":
      case "down":
      case "ArrowDown":
      case "s":
      case "S":{
        this.desiredVelocity.y = 0;
        this.velocity.y = 0;
        this.velocity.x = this.desiredVelocity.x;
        this.velocity.normalize();
      } break;

      case "left":
      case "ArrowLeft":
      case "a":
      case "A":
      case "right":
      case "ArrowRight":
      case "d":
      case "D":{
        this.desiredVelocity.x = 0;
        this.velocity.x = 0;
        this.velocity.y = this.desiredVelocity.y;
        this.velocity.normalize();
      } break;
      
      case "shoot":
      case " ":
      case "Space":{
        this.shoot();
      } break;
    }
  }
  evaluateKeydown( key: string ){
    switch( key ){
      case "up":
      case "ArrowUp":
      case "w":
      case "W":{
        this.desiredVelocity.y = -1;
        this.velocity.y = -1;
        this.velocity.x = this.desiredVelocity.x;
        this.velocity.normalize();
      } break;

      case "down":
      case "ArrowDown":
      case "s":
      case "S":{
        this.desiredVelocity.y = 1;
        this.velocity.y = 1;
        this.velocity.x = this.desiredVelocity.x;
        this.velocity.normalize();
      } break;

      case "left":
      case "ArrowLeft":
      case "a":
      case "A":{
        this.desiredVelocity.x = -1;
        this.velocity.x = -1;
        this.velocity.y = this.desiredVelocity.y;
        this.velocity.normalize();
      } break;

      case "right":
      case "ArrowRight":
      case "d":
      case "D":{
        this.desiredVelocity.x = 1;
        this.velocity.x = 1;
        this.velocity.y = this.desiredVelocity.y;
        this.velocity.normalize();
      } break;

      
      case "shoot":
      case " ":
      case "Space":{
        this.shoot();
      } break;
    }
  }
  
  shoot(){
    console.log('pew!');
  }

}
