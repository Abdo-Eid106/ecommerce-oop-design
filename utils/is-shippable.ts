import { IShippable } from "../interfaces/shippable.interface";

export function isShippable(product: any): product is IShippable {
  return typeof product.getWeight === "function";
}
