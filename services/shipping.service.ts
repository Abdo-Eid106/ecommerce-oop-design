import { IShippableItem } from "../interfaces/shibbable-item.interface";

export class ShippingService {
  ship(items: IShippableItem[]): void {
    console.log("** Shipment notice **");

    let totalWeight = 0;
    for (const item of items) {
      const curWeight = item.product.getWeight() * item.quantity;
      totalWeight += curWeight;

      console.log(
        `${item.quantity}x ${item.product.getName()} - ${curWeight}g`
      );
    }

    console.log(`Total package weight ${(totalWeight / 1000).toFixed(2)}kg`);
  }
}
