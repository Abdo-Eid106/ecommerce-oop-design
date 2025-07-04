import { IShippable } from "./shippable.interface";

export interface IShippableItem {
  product: IShippable;
  quantity: number;
}
