import { ExpirableProductDecorator } from "../decorators/expirable-product.decorator";
import { ShippableProductDecorator } from "../decorators/shippable-product.decorator";
import { IProduct } from "../interfaces/product.interface";
import { Product } from "../models/product.model";

export class ProductBuilder {
  private name!: string;
  private price!: number;
  private quantity!: number;

  private expiryDate?: Date;
  private weight?: number;

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setPrice(price: number): this {
    this.price = price;
    return this;
  }

  setQuantity(quantity: number): this {
    this.quantity = quantity;
    return this;
  }

  setExpiryDate(expiryDate: Date): this {
    this.expiryDate = expiryDate;
    return this;
  }

  setWeight(weight: number): this {
    this.weight = weight;
    return this;
  }

  build(): IProduct {
    let product: IProduct = new Product(this.name, this.price, this.quantity);

    if (this.expiryDate !== undefined) {
      product = new ExpirableProductDecorator(product, this.expiryDate);
    }

    if (this.weight !== undefined) {
      product = new ShippableProductDecorator(product, this.weight);
    }

    return product;
  }
}
