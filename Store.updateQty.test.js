import { describe, expect, it } from 'vitest';
import { Store } from '../src/Store.js';

describe('Store.updateQty', () => {
  it('changes quantity and recalculates the total', () => {
    const store = new Store([{ name: 'A', price: 500, qty: 2 }]);
    expect(store.updateQty('A', 4)).toBe(true);
    expect(store.find('A').qty).toBe(4);
    expect(store.total()).toBe(2000);
  });
  it('supports zero quantity', () => {
    const store = new Store([{ name: 'A', price: 10, qty: 1 }]);
    store.updateQty('A', 0);
    expect(store.total()).toBe(0);
  });
  it('rejects invalid quantities', () => {
    const store = new Store([{ name: 'A', price: 5, qty: 2 }]);
    expect(() => store.updateQty('A', -1)).toThrow(TypeError);
    expect(() => store.updateQty('A', 1.5)).toThrow(TypeError);
    expect(() => store.updateQty('A', NaN)).toThrow(TypeError);
  });
  it('returns false for an unknown product', () => {
    expect(new Store().updateQty('Missing', 2)).toBe(false);
  });
});
