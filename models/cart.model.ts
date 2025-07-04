import { IShippableItem } from "../interfaces/shibbable-item.interface";
import { ShippingService } from "../services/shipping.service";
import { CartItem } from "./cart-item.model";

export class Cart {
  private items: CartItem[] = [];

  constructor(private readonly shippingService: ShippingService) {}

  addItem(item: CartItem) {
    this.items.push(item);
  }

  getItems(): CartItem[] {
    return this.items;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getSubtotal(): number {
    return this.items.reduce((total, item) => total + item.getSubtotal(), 0);
  }

  getShippingCost(ratePerG: number = 1): number {
    return this.items.reduce(
      (total, item) => total + item.getShippingCost(ratePerG),
      0
    );
  }

  getPaidAmount(ratePerG: number = 1): number {
    return this.items.reduce(
      (total, item) => total + item.getPaidAmount(ratePerG),
      0
    );
  }

  getShibbableItems() {
    return this.items.filter((item) =>
      item.isShippable()
    ) as any as IShippableItem[];
  }

  validateCart(customerBalance: number) {
    if (this.isEmpty()) {
      throw new Error("Cart is empty");
    }

    if (customerBalance < this.getPaidAmount()) {
      throw new Error("Not enough balance");
    }

    this.items.forEach((item) => item.isValid());
    return true;
  }

  checkout(customerBalance: number) {
    this.validateCart(customerBalance);
    this.shippingService.ship(this.getShibbableItems());
    this.printReceipt(customerBalance);
  }

  private printReceipt(customerBalance: number): void {
    const subtotal = this.getSubtotal();
    const shipping = this.getShippingCost();
    const total = this.getPaidAmount();
    const remaining = customerBalance - total;

    console.log("\n** Checkout receipt **");

    this.items.forEach((item) => {
      const lineTotal = item.quantity * item.product.getPrice();
      console.log(`${item.quantity}x ${item.product.getName()} - ${lineTotal}`);
    });

    console.log("----------------------");
    console.log(`Subtotal             ${subtotal}`);
    console.log(`Shipping             ${shipping}`);
    console.log(`Amount               ${total}`);
    console.log(`Balance after payment ${remaining}`);
  }
}
