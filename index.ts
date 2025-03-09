import inquirer from 'inquirer';
import { Vehicle } from './vehicle';

let vehicles: Vehicle[] = [];

async function main() {
  const { action }: { action: string } = await inquirer.prompt({
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
      { type: 'input', name: 'type', message: 'Enter type' },
    ]);
    const vehicle = new Vehicle(vehicleData.make, vehicleData.model, vehicleData.year, vehicleData.type);
    vehicles.push(vehicle);
    console.log('Vehicle created!');
  } else if (action === 'Select Vehicle') {
    // Allow user to select a vehicle from the list
    const { vehicleIndex }: { vehicleIndex: string } = await inquirer.prompt({
      type: 'list',
      name: 'vehicleIndex',
      message: 'Select a vehicle:',
      choices: vehicles.map((v, index) => `${v.make} ${v.model} (${index + 1})`),
    });

    const selectedVehicle = vehicles[parseInt(vehicleIndex, 10) - 1];
    console.log(`You selected: ${selectedVehicle.make} ${selectedVehicle.model}`);

    // Perform actions on the selected vehicle
    const { actionChoice }: { actionChoice: string } = await inquirer.prompt({
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
