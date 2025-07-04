import { IProduct } from "../interfaces/product.interface";

export abstract class ProductDecorator implements IProduct {
  constructor(protected product: IProduct) {}

  getName(): string {
    return this.product.getName();
  }

  getPrice(): number {
    return this.product.getPrice();
  }

  getQuantity(): number {
    return this.product.getQuantity();
  }

  setQuantity(quantity: number): void {
    this.product.setQuantity(quantity);
  }
}
