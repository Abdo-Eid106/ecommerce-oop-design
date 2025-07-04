import { IProduct } from "../interfaces/product.interface";
import { IShippable } from "../interfaces/shippable.interface";
import { ProductDecorator } from "./product.decorator";

export class ShippableProductDecorator
  extends ProductDecorator
  implements IProduct, IShippable
{
  constructor(protected product: IProduct, private weight: number) {
    super(product);
  }

  getWeight(): number {
    return this.weight;
  }

  getShippingPrice(ratePerG: number = 1): number {
    return this.weight * ratePerG;
  }
}
