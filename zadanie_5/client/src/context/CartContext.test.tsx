import { renderHook, act } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { CartProvider, useCart } from "./CartContext";
import { type Product } from "../types";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const product1: Product = {
  id: 1,
  name: "Maple Table",
  price: 1200,
  description: "Test",
};
const product2: Product = {
  id: 2,
  name: "Mouse",
  price: 270,
  description: "Test",
};

describe("CartContext Test Suite", () => {
  test("1. Initializes empty Cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.state.items).toHaveLength(0);
    expect(result.current.state.totalPrice).toBe(0);
  });

  test("2. Adds product to the Cart and recalculates total amount", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product1);
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0].product.id).toBe(1);
    expect(result.current.state.items[0].product.name).toBe("Maple Table");
    expect(result.current.state.items[0].quantity).toBe(1);
    expect(result.current.state.totalPrice).toBe(1200);
    expect(result.current.state.items[0].product.price).toBeGreaterThan(0);
    expect(typeof result.current.state.totalPrice).toBe("number");
  });

  test("3. Increments number of items when items already present in the Cart are added", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product1);
      result.current.addItem(product1);
      result.current.addItem(product1);
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0].quantity).toBe(3);
    expect(result.current.state.totalPrice).toBe(3 * 1200);
    expect(result.current.state.items[0].product.id).toBe(1);
    expect(result.current.state.items[0].product.name).toEqual("Maple Table");
    expect(result.current.state.totalPrice).not.toBe(0);
    expect(result.current.state.items[0].quantity).toBeGreaterThan(1);
    expect(result.current.state.items[0].quantity).toBeLessThan(4);
  });

  test("4. Calculates total price of Cart containing various products", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product1);
      result.current.addItem(product2);
      result.current.addItem(product2);
    });

    expect(result.current.state.items).toHaveLength(2);
    expect(result.current.state.totalPrice).toBe(1200 + 270 * 2);

    expect(result.current.state.items[0].product.name).toBe("Maple Table");
    expect(result.current.state.items[0].quantity).toBe(1);

    expect(result.current.state.items[1].product.name).toBe("Mouse");
    expect(result.current.state.items[1].quantity).toBe(2);
    expect(result.current.state.items[1].product.id).toBe(2);
    expect(result.current.state.items[1].product.price).toBe(270);
  });

  test("5. Removes items from cart and clears cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(product1);
      result.current.addItem(product2);
    });

    expect(result.current.state.items).toHaveLength(2);

    act(() => {
      result.current.removeItem(1);
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0].product.name).toBe("Mouse");
    expect(result.current.state.totalPrice).toBe(270);
    expect(result.current.state.items[0].product.id).not.toBe(1);
    expect(result.current.state.items[0].product.id).toBe(2);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.state.items).toHaveLength(0);
    expect(result.current.state.totalPrice).toBe(0);
    expect(result.current.state.items).toStrictEqual([]);
    expect(result.current.state.totalPrice).toBeFalsy();
  });
});
