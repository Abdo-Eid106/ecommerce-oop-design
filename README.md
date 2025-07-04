# 🛒 E-commerce OOP Design

A simple e-commerce simulation project focused on showcasing object-oriented programming (OOP) principles and design patterns like **Builder** and **Decorator** using TypeScript.

---

##  Features

- Product modeling with:
  - Name, price, and quantity
  - Optional expiration date
  - Optional shipping with weight
- Cart system:
  - Add items with quantity checks
  - Calculate subtotal, shipping cost, and total
  - Validate product stock and expiration
- Checkout process:
  - Prints receipt and shipment notice
  - Validates balance and inventory
- Uses **decorators** to add features to products dynamically
- Demonstrates **type guards**, **composition**, and **builder pattern**

---

##  Design Patterns Used

- **Decorator Pattern** – add behaviors (e.g., shipping, expiration) without changing the core class
- **Builder Pattern** – construct complex products in a readable way

##  Getting Started

### 1. Install Dependencies

```bash
npm install
```


### 2. Run Tests

```bash
npm test
```