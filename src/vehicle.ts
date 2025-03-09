// src/vehicle.ts

export class Vehicle {
  make: string;
  model: string;
  year: number;
  type: string;

  constructor(make: string, model: string, year: number, type: string) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.type = type;
  }

  start() {
    console.log(`${this.make} ${this.model} is starting!`);
  }

  stop() {
    console.log(`${this.make} ${this.model} is stopping!`);
  }

  honk() {
    console.log(`${this.make} ${this.model} is honking!`);
  }
}

// Subclass for Truck
export class Truck extends Vehicle {
  loadCapacity: number;

  constructor(make: string, model: string, year: number, type: string, loadCapacity: number) {
    super(make, model, year, type);
    this.loadCapacity = loadCapacity;
  }

  loadCargo() {
    console.log(`Loading ${this.loadCapacity} tons of cargo into the ${this.make} ${this.model}`);
  }
}

// Subclass for Motorcycle
export class Motorcycle extends Vehicle {
  hasSidecar: boolean;

  constructor(make: string, model: string, year: number, type: string, hasSidecar: boolean) {
    super(make, model, year, type);
    this.hasSidecar = hasSidecar;
  }

  checkTires() {
    console.log(`Checking tires of ${this.make} ${this.model}`);
  }
}

// Subclass for Bus
export class Bus extends Vehicle {
  seatCount: number;

  constructor(make: string, model: string, year: number, type: string, seatCount: number) {
    super(make, model, year, type);
    this.seatCount = seatCount;
  }

  boardPassengers() {
    console.log(`Boarding passengers into the ${this.make} ${this.model} bus with ${this.seatCount} seats.`);
  }
}
