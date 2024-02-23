export type Product = {
  id: string;
  productCode: string;
  name: string;
  description: string | null;
  stock: number;
  unitPrice?: number;
};

export type Order = {
  id: string;
  articles: string[];
  installationDate: string;
};

export type Package = {
  id: string;
  name: string;
  quantity: number;
};

export type Invoice = {
  id: string;
  orderId: string;
  packages: Package[];
  price: number;
};
