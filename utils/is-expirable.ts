import { IExpirable } from "../interfaces/expirable.interface";

export function isExpirable(product: any): product is IExpirable {
  return typeof product.isExpired === "function";
}
