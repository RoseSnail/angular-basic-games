export class Vector2D {
  constructor( public x: number = 0, public y: number = 0 ){}

  magnitude(): number {
    return Math.sqrt( this.x * this.x + this.y * this.y );
  }

  normalize(){
    const mag = this.magnitude();
    if( mag !== 0 ){
      this.x = this.x / mag;
      this.y = this.y / mag;
    }
  }
}