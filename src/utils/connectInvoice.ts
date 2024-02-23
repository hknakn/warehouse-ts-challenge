import { Invoice, Package } from "../types/types";

// Function to connect an invoice with the total price and articles
export const connectInvoice = (packages: Package[]): Invoice => {
  const totalInvoicePrice = packages.reduce((acc, pack) => acc + pack.totalPrice, 0);
  return { packages, totalInvoicePrice };
};