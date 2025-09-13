import { Component, WritableSignal, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Position } from './std-interface';
import { Vector2D } from './vector2-d';
import { GameObject } from './game-object';

@Component({
  selector: 'app-ship',
  imports: [CommonModule, GameObject],
  templateUrl: './ship.html',
  styleUrl: './ship.css'
})
export class Ship extends GameObject {
  name = "Base";
  svgId = input("");
  svgWidth = input(920);
  svgHeight = input(380);
  testerSignal: WritableSignal<number> = signal(0);
  //viewBoxWidth = input(800);
  //viewBoxHeight = input(400);

  size = 4; 
  scale = 1.5;
  scaledSize(){ return this.size * this.scale; }
  color = 'rgb(255,0,255)';

  health = 1;
  hitPoints: boolean[] = [];
  maxHealth(): number { return this.offsets.length; }
  offsets: Position[] = [{ x:0, y:0 }];
  rawRadius = 1;
  // simple & "incorrect" version of the radius
  radius(): number { return this.rawRadius * this.scaledSize(); }

  //maxSpeed = input(10);
  maxSpeed = 200;
  //velocity: Position = { x:0.2, y:1 };
  velocity: Vector2D = new Vector2D(0,0);
  desiredVelocity: Vector2D = new Vector2D(0,0);
  
  // how many seconds it takes to fully accelerate / decelerate
  acceleration = 1.0;
  deceleration = 0.2;
  
  up = 0; //rotation to be applied so the ship is in the "up" position (thrusters down, nose up)
  
  calcXPosition(offset:number): number{
    return (this.x() + this.offsets[offset].x * this.scaledSize());
  }
  calcYPosition(offset:number): number{
    return (this.y() + this.offsets[offset].y * this.scaledSize());
  }
  calcRadius(){
    let furthest = 0;
    for( let i = 0; i < this.offsets.length; i++ ){
      let offsetEdge = new Vector2D(Math.abs(this.offsets[i].x) + 0.5,  Math.abs(this.offsets[i].y) + 0.5);
      if( offsetEdge.magnitude() > furthest ){
        furthest = offsetEdge.magnitude();
      }
    }
    this.rawRadius = furthest;
  }

  // happens prior to any overrides
  //constructor(){
  //  super();
  //}

  ngOnInit(){
    //happens after overrides (of children) are accounted for
    //console.log( this.offsets );
    this.refillHitPoints();
    this.calcRadius();
    this.velocity.normalize();
  }
  ngAfterViewInit() {
    //console.log('afterview init!');
    this.faceUp();
  }

  refillHitPoints(){
    this.health = this.maxHealth();
    let refilledArray: boolean[] = Array(this.maxHealth()).fill(true);
    this.hitPoints = refilledArray;
  }
  
  override update(elapsedTime: number = 0){
    this.move(this.velocity.x * this.maxSpeed * elapsedTime, this.velocity.y * this.maxSpeed * elapsedTime);
  }

  move( x: number, y: number ){
    this.x.update(currentXPos => currentXPos + x);
    this.y.update(currentYPos => currentYPos + y);

    this.keepWithinViewBox();
  }
  
  keepWithinViewBox(){
    if( this.x() - this.radius() > this.svgWidth() ){
      this.x.set( -1 * this.radius());
    } else if( this.x() + this.radius() < 0 ){
      this.x.set( this.svgWidth() + this.radius());
    }
    
    if( this.y() - this.radius() > this.svgHeight() ){
      this.y.set( -1 * this.radius());
    } else if( this.y() + this.radius() < 0 ){
      this.y.set( this.svgHeight() + this.radius());
    }
  }
  
  faceUp(){
    
  }

}
