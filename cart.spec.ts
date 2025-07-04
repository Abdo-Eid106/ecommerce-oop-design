import { ShippingService } from "./services/shipping.service";
import { ProductBuilder } from "./builders/product.builder";
import { Cart } from "./models/cart.model";
import { CartItem } from "./models/cart-item.model";

describe("Cart Checkout", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart(new ShippingService());

    const cheese = new ProductBuilder()
      .setName("Cheese")
      .setPrice(100)
      .setQuantity(5)
      .setWeight(200) // in grams
      .setExpiryDate(new Date("2026-01-01"))
      .build();

    const biscuit = new ProductBuilder()
      .setName("Biscuits")
      .setPrice(150)
      .setQuantity(3)
      .setWeight(700)
      .setExpiryDate(new Date("2026-06-01"))
      .build();

    const scratchCard = new ProductBuilder()
      .setName("Mobile Scratch Card")
      .setPrice(50)
      .setQuantity(10)
      .build();

    cart.addItem(new CartItem(cheese, 2)); // 2 x 100 = 200
    cart.addItem(new CartItem(biscuit, 1)); // 1 x 150 = 150
    cart.addItem(new CartItem(scratchCard, 1)); // 1 x 50  = 50
  });

  it("should calculate correct subtotal", () => {
    expect(cart.getSubtotal()).toBe(400); // 200 + 150 + 50
  });

  it("should calculate correct shipping total", () => {
    expect(cart.getShippingCost(1)).toBe(200 * 2 + 700 * 1); // 1100
  });

  it("should calculate correct paid amount", () => {
    const subtotal = 400;
    const shipping = 1100;
    expect(cart.getPaidAmount(1)).toBe(subtotal + shipping); // 1500
  });

  it("should throw if one product is expired", () => {
    const expiredCheese = new ProductBuilder()
      .setName("Expired Cheese")
      .setPrice(100)
      .setQuantity(5)
      .setExpiryDate(new Date("2020-01-01")) // expired
      .build();

    cart.addItem(new CartItem(expiredCheese, 1));

    expect(() => cart.checkout(2000)).toThrow("product is expired");
  });

  it("should return only 2 shippable items", () => {
    const shippables = cart.getShibbableItems();
    expect(shippables.length).toBe(2); // Cheese and Biscuits are shippable
    expect(shippables[0].product.getName()).toBe("Cheese");
    expect(shippables[1].product.getName()).toBe("Biscuits");
  });
});
