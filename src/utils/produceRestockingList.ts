import { Product } from "../types/types";

const RESTOCKING_THRESHOLD = 5;

// Function to produce a restocking list for items that will run out of stock soon
export const produceRestockingList = (products: Product[]): Product[] => {
  // Selecting products with low stock
  return products.filter((product) => product.stock < RESTOCKING_THRESHOLD);
};