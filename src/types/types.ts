export type Product = {
  id: string;
  productCode: string;
  name: string;
  description?: string | null;
  stock: number;
  unitPrice?: number;
};

export type Order = {
  id: string;
  articles: string[];
  installationDate: string;
};

export type Package = {
  articles: Product[];
  totalPrice: number;
};

export type Invoice = {
  packages: Package[];
  totalInvoicePrice: number;
};

export type Data = {
  heatPumps: Product[];
  installationMaterials: Product[];
  tools: Product[];
  orders: Order[];
};