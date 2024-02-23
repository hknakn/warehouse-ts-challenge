
import { Invoice, Order, Package, Product } from '../types/types';
import { buildPackages, connectInvoice, produceRestockingList } from '../utils';

describe('buildPackages', () => {
  it('builds packages correctly', async () => {
    const packages: Package[] = buildPackages(mockOrders, mockProducts);
    expect(packages.length).toBe(2);

    // Example assertions for the first order
    const firstPackage = packages[0];
    expect(firstPackage.articles.length).toBe(2);
    expect(firstPackage.totalPrice).toBe(80); // (50 + 30)
  });
});

describe('connectInvoice', () => {
  it('connects invoice correctly', async () => {
    const packages: Package[] = buildPackages(mockOrders, mockProducts);
    const invoice: Invoice = connectInvoice(packages);
    expect(invoice.totalInvoicePrice).toBe(150); // (50 + 30) + (30 + 40)
  });
});

describe('restockingList', () => {
  it('creates restocking list correctly', async () => {
    const restockList: Product[] = produceRestockingList(mockProducts);
    expect(restockList.length).toBe(1); // Only product3 has low stock

    // Example assertion for the product in the restocking list
    const restockedProduct = restockList[0];
    expect(restockedProduct.stock).toBeLessThan(5); // Assuming low stock threshold is 5
  });
});


export const mockOrders: Order[] = [
  {
    id: 'order1',
    articles: ['product1', 'product2'],
    installationDate: '2024-02-25T00:00:00.000Z',
  },
  {
    id: 'order2',
    articles: ['product2', 'product3'],
    installationDate: '2024-02-26T00:00:00.000Z',
  },
];

export const mockProducts: Product[] = [
  {
    id: 'product1',
    productCode: 'CODE1',
    name: 'Product 1',
    stock: 10,
    unitPrice: 50,
  },
  {
    id: 'product2',
    productCode: 'CODE2',
    name: 'Product 2',
    stock: 5,
    unitPrice: 30,
  },
  {
    id: 'product3',
    productCode: 'CODE3',
    name: 'Product 3',
    stock: 2,
    unitPrice: 40,
  },
];