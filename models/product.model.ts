import { IProduct } from "../interfaces/product.interface";

export class Product implements IProduct {
  constructor(
    protected name: string,
    protected price: number,
    protected quantity: number
  ) {}

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }
}
