export interface IProduct {
  getName(): string;
  getPrice(): number;
  getQuantity(): number;
  setQuantity(quantity: number): void;
}
