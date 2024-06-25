import { Product } from "./products.interface";

export type ProductPayload = Omit<Product, 'id'>;
