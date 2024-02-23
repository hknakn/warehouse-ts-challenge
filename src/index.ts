import getData from './services/getData';
import { buildPackages, connectInvoice, produceRestockingList, throwWarnings } from './utils';

// Main function to run the solution
const runSolution = async () => {
  const { orders, heatPumps, installationMaterials, tools } = await getData();

  const products = [...heatPumps, ...installationMaterials, ...tools];
  const packages = buildPackages(orders, products);
  const invoice = connectInvoice(packages);
  const restockList = produceRestockingList(products);
  throwWarnings(orders, products);

  console.log('Invoice:', invoice);
  console.log('Restocking List:', restockList);
};

// Run the solution
runSolution();