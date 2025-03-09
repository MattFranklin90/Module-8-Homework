// car.ts
import { Vehicle } from './vehicle';

export class Car extends Vehicle {
  constructor(
    make: string,
    model: string,
    year: number,
    type: string,
    public doors: number
  ) {
    super(make, model, year, type);
  }

  lockDoors(): void {
    console.log(`${this.make} ${this.model} doors are locked.`);
  }
}
