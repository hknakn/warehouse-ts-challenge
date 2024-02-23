import apiClient from "../api/apiClient";
import { Invoice, Order, Package } from "../types";

export const processAllOrders = () => {
  const orders = apiClient.orders;
  // Checking if there are any orders to process
  if (orders.length === 0) {
    console.log('No orders to process.');
    return;
  }

  const editedOrders = [...orders];
  // Sorting orders by installation date in ascending order (earliest first)
  editedOrders.sort((a, b) => new Date(a.installationDate).getTime() - new Date(b.installationDate).getTime());


  // Processing each order
  for (const order of editedOrders) {
    processOrder(order);
  }
};

export const processOrder = (order: Order) => {
  let invoicePrice = 0;
  let packages: Package[] = [];
  const products = apiClient.products;

  for (const article of order.articles) {
    const product = products.find((product) => product.id === article);

    // Checking if the product exists
    if (!product) {
      console.error(`Product with "${article}" id not found.`);
      return;
    }

    // Checking if the product is out of stock
    if (product.stock <= 0) {
      console.error(`"${product.name}" with "${product.id}" id is out of stock`);
      return;
    }

    // Creating a package and adding it to the packages array
    if (!packages.some((p) => p.id === product.id)) {
      packages.push({
        id: product.id,
        name: product.name,
        quantity: order.articles.filter((a) => a === product.id).length,
      });
    }

    // Adding product's unit price to the total price
    invoicePrice += product.unitPrice || 0;

    // Decreasing stock by 1
    if (product.stock > 0) {
      apiClient.reduceProductStock(product.id);
    }
  }

  // Creating an invoice
  const invoice: Invoice = {
    id: `INV-${order.id}`,
    orderId: order.id,
    packages,
    price: Math.round(invoicePrice),
  };

  console.log(`Order with "${order.id}" id processed!`);
  console.log('Invoice:', invoice);
};