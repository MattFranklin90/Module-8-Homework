import inquirer from 'inquirer';
import { Vehicle, Truck, Motorcycle, Bus } from './vehicle';

let vehicles: Vehicle[] = [];

async function main() {
  const { action }: { action: 'Create Vehicle' | 'Select Vehicle' | 'Exit' } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Choose an action:',
    choices: ['Create Vehicle', 'Select Vehicle', 'Exit'],
  });

  if (action === 'Create Vehicle') {
    // Collect vehicle data
    const vehicleData = await inquirer.prompt([
      { type: 'input', name: 'make', message: 'Enter make' },
      { type: 'input', name: 'model', message: 'Enter model' },
      { type: 'number', name: 'year', message: 'Enter year' },
      { 
        type: 'list',
        name: 'type',
        message: 'Select vehicle type:',
        choices: ['Car', 'Truck', 'Motorcycle', 'Bus'],
      },
    ]);

    let vehicle: Vehicle | undefined; // Declare as Vehicle or undefined
    switch (vehicleData.type) {
      case 'Car':
        vehicle = new Vehicle(vehicleData.make, vehicleData.model, vehicleData.year, vehicleData.type);
        break;
      case 'Truck':
        const { loadCapacity } = await inquirer.prompt({
          type: 'number',
          name: 'loadCapacity',
          message: 'Enter load capacity (tons):',
        });
        vehicle = new Truck(vehicleData.make, vehicleData.model, vehicleData.year, vehicleData.type, loadCapacity);
        break;
      case 'Motorcycle':
        const { hasSidecar } = await inquirer.prompt({
          type: 'confirm',
          name: 'hasSidecar',
          message: 'Does the motorcycle have a sidecar?',
        });
        vehicle = new Motorcycle(vehicleData.make, vehicleData.model, vehicleData.year, vehicleData.type, hasSidecar);
        break;
      case 'Bus':
        const { seatCount } = await inquirer.prompt({
          type: 'number',
          name: 'seatCount',
          message: 'Enter seat count:',
        });
        vehicle = new Bus(vehicleData.make, vehicleData.model, vehicleData.year, vehicleData.type, seatCount);
        break;
      default:
        console.log('Invalid vehicle type');
        return; // Exit if no vehicle was created
    }

    // Ensure vehicle is created before adding to array
    if (vehicle) {
      vehicles.push(vehicle);
      console.log('Vehicle created!');
    } else {
      console.log('Error: Vehicle could not be created.');
    }

  } else if (action === 'Select Vehicle') {
    // Allow user to select a vehicle from the list
    if (vehicles.length === 0) {
      console.log('No vehicles available.');
      await main();
      return;
    }

    const { vehicleIndex }: { vehicleIndex: number } = await inquirer.prompt({
      type: 'list',
      name: 'vehicleIndex',
      message: 'Select a vehicle:',
      choices: vehicles.map((v, index) => `${v.make} ${v.model} (${index + 1})`),
    });

    const selectedVehicle = vehicles[vehicleIndex - 1];
    console.log(`You selected: ${selectedVehicle.make} ${selectedVehicle.model}`);

    // Perform actions on the selected vehicle
    const { actionChoice }: { actionChoice: 'Start' | 'Stop' | 'Honk' | 'Back to Main Menu' } = await inquirer.prompt({
      type: 'list',
      name: 'actionChoice',
      message: `What would you like to do with ${selectedVehicle.make} ${selectedVehicle.model}?`,
      choices: ['Start', 'Stop', 'Honk', 'Back to Main Menu'],
    });

    switch (actionChoice) {
      case 'Start':
        selectedVehicle.start();
        break;
      case 'Stop':
        selectedVehicle.stop();
        break;
      case 'Honk':
        selectedVehicle.honk();
        break;
      case 'Back to Main Menu':
        console.log('Returning to the main menu...');
        break;
      default:
        console.log('Invalid option');
        break;
    }

    // Continue to the main menu after each action
    if (actionChoice !== 'Back to Main Menu') {
      await main();  // Recursively call to show menu again
    }
  } else {
    console.log('Exiting...');
    return;
  }

  // Show the main menu again if the user chooses to go back to it
  await main();  // Recursively call to show menu again
}

main();
