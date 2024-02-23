import { Order, Package, Product } from "../types/types";

// This function takes a list of orders and products, then builds and returns an array of packages.
export const buildPackages = (orders: Order[], products: Product[]): Package[] => {
  return orders.map((order) => {
    const articles: Product[] = order.articles
      .map((articleId) => products.find((product) => product.id === articleId))
      .filter((article): article is Product => !!article);

    // Ensure that unitPrice is defined before using it in the reduce function
    const totalPrice = articles.reduce((acc, article) => acc + (article.unitPrice ?? 0), 0);
    return { articles, totalPrice };
  });
};