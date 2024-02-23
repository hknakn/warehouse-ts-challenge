import { Order, Product } from "../types";

export class APIClient {
  private readonly apiUrl: string;
  public products: Product[] = [];
  public orders: Order[] = [];

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  private async fetchData(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async fetchOrders() {
    const orders = await this.fetchData('orders');
    this.orders = orders;
  }

  public async fetchProducts() {
    // Fetching all products
    const [
      heatPumps,
      installationMaterials,
      tools,
    ] = await Promise.all([
      this.fetchHeatPumps(),
      this.fetchInstallationMaterials(),
      this.fetchTools(),
    ]);

    // Merging all products into one array
    const productsArray = [
      ...heatPumps,
      ...installationMaterials,
      ...tools,
    ] as Product[];

    // Setting the products array
    this.products = productsArray;
  }

  public reduceProductStock(productId: string) {
    const product = this.products.find((product) => product.id === productId);

    // Checking if the product exists
    if (!product) {
      console.error(`Product with "${productId}" id not found.`);
      return;
    }

    // Checking if the product is out of stock
    if (product.stock <= 0) {
      console.error(`"${product.name}" with "${product.id}" id is out of stock`);
      return;
    }

    // Decreasing stock by 1
    product.stock -= 1;
  }

  public async fetchHeatPumps(): Promise<Product[]> {
    return await this.fetchData('heatPumps');
  }

  public async fetchInstallationMaterials(): Promise<Product[]> {
    return await this.fetchData('installationMaterials');
  }

  public async fetchTools(): Promise<Product[]> {
    return await this.fetchData('tools');
  }
}

const apiClient = new APIClient('http://localhost:3000');
export default apiClient;
