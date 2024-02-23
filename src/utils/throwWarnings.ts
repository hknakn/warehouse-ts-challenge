import { Order, Product } from "../types/types";

// Function to throw helpful warnings when orders are unable to be executed
export const throwWarnings = (orders: Order[], products: Product[]): void => {
  orders.forEach((order) => {
    const unavailableArticles = order.articles.filter((articleId) =>
      products.every((product) => product.id !== articleId || product.stock <= 0)
    );

    if (unavailableArticles.length > 0) {
      console.warn(`Order with "${order.id}" id cannot be executed. Article(s) not available with id(s): ${unavailableArticles.join(', ')}`);
    }
  });
};