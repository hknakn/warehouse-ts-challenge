// apiClient.test.js
import { APIClient } from '../api/apiClient';
import { processOrder } from '../utils/processOrders';

describe('APIClient', () => {
  let apiClient: APIClient;

  beforeAll(() => {
    apiClient = new APIClient('http://localhost:3000');
  });

  test('fetchOrders should set orders correctly', async () => {
    await apiClient.fetchOrders();
    expect(apiClient.orders).toHaveLength(5);
  });

  test('fetchProducts should set products correctly', async () => {
    await apiClient.fetchProducts();
    expect(apiClient.products).toHaveLength(14);
  });

  test('reduceProductStock should decrease stock by 1', () => {
    const productId = '1';
    const initialStock = 5;

    // Create a product with initial stock
    apiClient.products = [{
      id: productId,
      stock: initialStock,
      productCode: '123',
      name: 'Test Product',
      description: 'Test Description',
      unitPrice: 100,
    }];

    // Call reduceProductStock
    apiClient.reduceProductStock(productId);
    expect(apiClient.products[0].stock).toBe(initialStock - 1);
  });

  test('fetchHeatPumps should return an array of heat pumps', async () => {
    const heatPumps = await apiClient.fetchHeatPumps();
    expect(heatPumps).toHaveLength(4);
  });

  test('fetchInstallationMaterials should return an array of installation materials', async () => {
    const installationMaterials = await apiClient.fetchInstallationMaterials();
    expect(installationMaterials).toHaveLength(4);
  });

  test('fetchTools should return an array of tools', async () => {
    const tools = await apiClient.fetchTools();
    expect(tools).toHaveLength(6);
  });

});
