import { Component,
         signal,
         ViewChild,
         ViewChildren,
         QueryList,
         HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

//import { GameObject } from './shared/game-object';
import { Vector2D } from './shared/vector2-d';

import { Ship } from './shared/ship';
import { ShipA } from './shared/ship-a';
import { ShipB } from './shared/ship-b';
import { ShipX } from './shared/ship-x';
import { ShipY } from './shared/ship-y';
import { Player } from './shared/player';


/*/ TODO list
  - create selection menu
  - use router to route base on selection
  - add confirmation & setting modal
  - pull out shared functionality into base class
  - pull out shared data into a shared 'service' (window width/height)
  https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API - for looking into gamepad use
/*/

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Ship, ShipA, ShipB, ShipX, ShipY, Player],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentTime: Date = new Date();
  //canvasWidth  = signal(940 - 20);
  //canvasHeight = signal(400 - 20);
  windowWidth = signal(940);
  windowHeight = signal(400);
  framesPerSecond = signal(60);
  framesCompleted = signal(60);

  fpsMin = signal(60);
  fpsCaptures = signal(0);
  totalFrames = signal(0);
  fpsAverage(){
    return this.totalFrames() / this.fpsCaptures();
  }

  calcSvgWidth():number{ return Math.max(20, this.windowWidth()-20) }
  calcSvgHeight():number{ return Math.max(20, this.windowHeight()-20) }

  @ViewChildren('ship') ships!: QueryList<Ship>;
  @ViewChild('player') player!: Player;
  
  @ViewChildren('ShipA, a') shipsA!: QueryList<ShipA>;
  @ViewChildren('ShipB, b') shipsB!: QueryList<ShipB>;
  @ViewChildren('ShipX, x') shipsX!: QueryList<ShipX>;
  @ViewChildren('ShipY, y') shipsY!: QueryList<ShipY>;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.windowWidth.set( window.innerWidth );
    this.windowHeight.set( window.innerHeight );
    console.log( 'resize!' );
    console.log( this.windowWidth() + ", " + this.windowHeight() );
  }

  // ensure all the ships are within the view before trying to update them
  ngOnInit() {
    this.windowWidth.set( window.innerWidth );
    this.windowHeight.set( window.innerHeight );
  }

  // ensure all the ships are within the view before trying to update them
  ngAfterViewInit() {
    this.initializeGameObjects();
    console.log(this.ships);
    console.log(this.shipsA);
    console.log(this.shipsB);
    console.log(this.shipsX);
    console.log(this.shipsY);
    this.runGameLoop();
  }

  aliveShips = 0;
  initializeGameObjects(){
    let x = 10, y = 10, id = 1;
    this.ships.forEach( ship =>{
      ship.id = id++;
      this.aliveShips++;

      // randomize position
      x = this.getRandomArbitrary( x + 1, x + this.windowWidth() / 2 );
      y = this.getRandomArbitrary( y + 1, y + this.windowHeight() / 2 );
      if( x > this.windowWidth() ){
        x = this.getRandomArbitrary( 10, this.windowWidth() / 2 );
      }
      if( y > this.windowHeight() ){ 
        y = this.getRandomArbitrary( 10, this.windowHeight() / 2 );
      }
      // set position
      ship.position.set( new Vector2D(x, y));
      ship.x.set( x );
      ship.y.set( y );

      //set velocity
      ship.velocity = new Vector2D(this.getRandomArbitrary(-1, 1), this.getRandomArbitrary(-1, 1));
      ship.maxSpeed = this.getRandomArbitrary(20, 500);

      //set rotation
      console.log(ship);
      //ship.upRotation = 0;
      ship.rotationSpeed = 0;
      //ship.rotation = 180;
      ship.rotation = ship.calcAngleDegrees( ship.velocity.x, ship.velocity.y );
      console.log(ship.velocity);
      console.log(ship.rotation);
      console.log(ship.transformRotateString());
      
      //ship.rotationSpeed = this.getRandomArbitrary(-30, 30);
      //rotateSvgElement(element: ElementRef, options: TransformOptions): void {
      //const { angle, centerX, centerY } = options;
      //--element.setAttribute('transform', `rotate(${angle} ${centerX} ${centerY})`);
      //element.nativeElement.setAttribute('transform', `rotate(${angle} ${centerX} ${centerY})`);

      ship.scale = this.getRandomArbitrary(0.75, 4);
      let r = this.getRandomArbitrary(0, 255);
      let g = this.getRandomArbitrary(0, 255);
      let b = this.getRandomArbitrary(0, 255);
      ship.color = 'rgb('+r+','+g+','+b+')';

      ship.testerSignal.set(1);
      //ship.size.update( size++ );
      //ship.size.update( size++ );

      //console.log( x + ' : ' + y );
    });
  }

  //returns random value where: min <= value < max
  getRandomArbitrary( min:number, max:number ){
    return Math.random() * (max - min) + min;
  }

  // Uses JS's requestAnimationFrame() as a game loop that gets called before each repaint
  // and calls the update() method of all game objects within the scene.
  // Also, calls are paused in most browsers when running in background tabs or hidden <iframe>s
  runGameLoop(){
    let startTime: number | null = null;
    let prevFrame: number | null = null;
    let passedTime: number = 0;
    let frameCount: number = 0;

    // define the function that holds the actual game loop
    //   gets time passed since last frame and controls game loop recursive call
    const frameLogic = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      if (!prevFrame) prevFrame = currentTime;
      const elapsedMilliseconds = currentTime - prevFrame; //eg elapsed milliseconds since previous frame
      prevFrame = currentTime;

      frameCount++;
      passedTime += elapsedMilliseconds;
      if( passedTime > 1000 ){
        this.framesPerSecond.set(1000 / elapsedMilliseconds);
        passedTime = 0;
        
        this.fpsCaptures.set(this.fpsCaptures() + 1);
        this.totalFrames.set(this.totalFrames() + frameCount);

        if( this.fpsMin() > frameCount ){ this.fpsMin.set(frameCount); }
        this.framesCompleted.set(frameCount);
        frameCount = 0;

        this.switchShip();
      }

      this.runGameLogic(elapsedMilliseconds / 1000);

      // recursively call this "frameLogic()" loop; requesting Javascript to run it during the next Animation Frame.
      requestAnimationFrame(frameLogic);
    };

    // start the actual gameLoop by calling the first "requestAnimationFrame()" with the game loop logic
    requestAnimationFrame(frameLogic);
  }

  runGameLogic( elapsedSeconds: number ){
    this.ships.forEach( ship =>{ ship.update(elapsedSeconds); });
    this.player.update(elapsedSeconds);
    this.collisionCheck();
  }

  switchShip(){
    switch(this.player.shipType){
      case 'A': { this.player.shipType = 'B'; } break;
      case 'B': { this.player.shipType = 'X'; } break;
      case 'X': { this.player.shipType = 'Y'; } break;
      default: {  this.player.shipType = 'A'; } break;
    }
  }

  // for testing - only collide with similar style ships
  collisionCheck(){
    this.shipCollisions(this.ships, true);
    //this.shipCollisions(this.shipsA, true);
    //this.shipCollisions(this.shipsB, true);
    //this.shipCollisions(this.shipsX, true);
    //this.shipCollisions(this.shipsY, true);
    this.uncheck(this.ships);
  }

  shipCollisions(ships:QueryList<Ship>, showConsole = false){
    ships.forEach(( ship, shipIdx )=>{
      ships.forEach(( other, otherIdx )=>{
        if(ship.id != other.id && !other.checked && ship.health > 0 && other.health > 0){
          let distance = new Vector2D(ship.x() - other.x(), ship.y() - other.y()).magnitude();
          if( distance <= ship.radius() + other.radius() ){
            if( ship.collideWithShip(other)){
              if(ship.health <= 0){
                console.log( ship.name + " has died!" );
                this.aliveShips--;
                console.log( this.aliveShips + " ships left..." );
              }
              if(other.health <= 0){
                console.log( other.name + " has died!" );
                this.aliveShips--;
                console.log( this.aliveShips + " ships left..." );
              }
            }

            if( showConsole ){
              //console.log( ship.name + other.name + " collision! id: { " + ship.id + " } collided with id: { " + other.id + " }!" );
              ////console.log( 'distance: ' + distance.toFixed(2) );
              ////console.log( 'ship.radius: ' + ship.radius().toFixed(1) + ', other.radius: ' + other.radius().toFixed(1) );
            }
          }
        }
      })
      ship.checked = true; 
    });
  }
  uncheck(ships:QueryList<Ship>){
    ships.forEach( ship =>{ ship.checked = false; });
  }

}
