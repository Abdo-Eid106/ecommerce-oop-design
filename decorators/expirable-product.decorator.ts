import { IProduct } from "../interfaces/product.interface";
import { IExpirable } from "../interfaces/expirable.interface";
import { ProductDecorator } from "./product.decorator";

export class ExpirableProductDecorator
  extends ProductDecorator
  implements IProduct, IExpirable
{
  constructor(protected product: IProduct, private expiryDate: Date) {
    super(product);
  }

  getExpiryDate(): Date {
    return this.expiryDate;
  }

  isExpired(currentDate: Date = new Date()): boolean {
    return currentDate > this.expiryDate;
  }
}
