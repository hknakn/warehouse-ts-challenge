import apiClient from './api/apiClient';
import { createRestockingList } from './utils/createRestockingList';
import { processAllOrders } from './utils/processOrders';

// Main function to run the solution
const main = async () => {
  // Fetching orders and products
  await Promise.all([
    apiClient.fetchOrders(),
    apiClient.fetchProducts(),
  ]);

  // Processing orders
  processAllOrders();

  // Logging restocking list
  console.log('\n--- Restocking list ---');
  createRestockingList();
};

// Run the solution
main();