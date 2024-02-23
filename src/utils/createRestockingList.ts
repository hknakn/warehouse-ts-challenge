import apiClient from "../api/apiClient";

const RESTOCKING_THRESHOLD = 2;

export const createRestockingList = () => {
  const products = apiClient.products;
  return products.filter((product) => product.stock <= RESTOCKING_THRESHOLD).map((product) => console.log(`"${product.name}" named product with "${product.id}" needs restocking.`));
}