import { describe, expect, it } from 'vitest';
import { Store, SortedStore } from '../src/Store.js';

describe('Store', () => {
  it('adds and finds an item', () => {
    const store = new Store();
    store.add({ name: 'Apple', price: 500, qty: 2 });
    expect(store.find('Apple')).toEqual({ name: 'Apple', price: 500, qty: 2 });
  });

  it('calculates total price times quantity', () => {
    const store = new Store([{ name: 'A', price: 100, qty: 2 }, { name: 'B', price: 50, qty: 3 }]);
    expect(store.total()).toBe(350);
  });

  it('empty store total is zero', () => expect(new Store().total()).toBe(0));

  it('removes an item', () => {
    const store = new Store([{ name: 'A', price: 100, qty: 1 }]);
    expect(store.remove('A')).toBe(true);
    expect(store.find('A')).toBeUndefined();
  });

  it('rejects invalid item', () => expect(() => new Store().add({ name: 'A', price: '100', qty: 1 })).toThrow(TypeError));

  it('SortedStore returns items sorted by name and uses inherited add', () => {
    const store = new SortedStore();
    store.add({ name: 'Banana', price: 200, qty: 1 });
    store.add({ name: 'Apple', price: 100, qty: 1 });
    expect(store.items.map(({ name }) => name)).toEqual(['Apple', 'Banana']);
  });
});
