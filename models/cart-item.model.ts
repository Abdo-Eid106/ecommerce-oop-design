import { IProduct } from "../interfaces/product.interface";
import { isShippable } from "../utils/is-shippable";
import { isExpirable } from "../utils/is-expirable";

export class CartItem {
  constructor(public product: IProduct, public quantity: number) {
    if (quantity <= 0) throw new Error("Quantity must be positive");
    if (quantity > product.getQuantity()) {
      throw new Error("Quantity exceeds available stock");
    }
  }

  getSubtotal(): number {
    return this.product.getPrice() * this.quantity;
  }

  getShippingCost(ratePerG: number = 1): number {
    return isShippable(this.product)
      ? this.product.getWeight() * this.quantity * ratePerG
      : 0;
  }

  getPaidAmount(ratePerG: number = 1): number {
    return this.getSubtotal() + this.getShippingCost(ratePerG);
  }

  isShippable() {
    return isShippable(this.product);
  }

  isValid() {
    if (this.quantity > this.product.getQuantity()) {
      throw new Error("Quantity exceeds available stock");
    }

    if (isExpirable(this.product) && this.product.isExpired()) {
      throw new Error("product is expired");
    }

    return true;
  }
}
