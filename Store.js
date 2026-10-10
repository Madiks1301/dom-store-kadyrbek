export class Store {
  #items = [];

  constructor(items = []) {
    if (!Array.isArray(items)) throw new TypeError('items must be an array');
    items.forEach((item) => this.add(item));
  }

  static isValidItem(item) {
    return item && typeof item.name === 'string' && item.name.trim() !== '' &&
      typeof item.price === 'number' && item.price >= 0 &&
      Number.isInteger(item.qty) && item.qty >= 0;
  }

  get items() {
    return this.#items.map((item) => ({ ...item }));
  }

  add(item) {
    if (!Store.isValidItem(item)) throw new TypeError('Invalid store item');
    this.#items.push({ ...item });
    return this;
  }

  remove(name) {
    if (typeof name !== 'string') throw new TypeError('name must be a string');
    const index = this.#items.findIndex((item) => item.name === name);
    if (index === -1) return false;
    this.#items.splice(index, 1);
    return true;
  }

  updateQty(name, qty) {
    if (typeof name !== 'string' || !Number.isInteger(qty) || qty < 0) {
      throw new TypeError('Invalid name or quantity');
    }
    const item = this.#items.find((current) => current.name === name);
    if (!item) return false;
    item.qty = qty;
    return true;
  }

  find(name) {
    if (typeof name !== 'string') throw new TypeError('name must be a string');
    const item = this.#items.find((current) => current.name === name);
    return item ? { ...item } : undefined;
  }

  total() {
    return this.#items.reduce((sum, { price, qty }) => sum + price * qty, 0);
  }
}

export class SortedStore extends Store {
  add(item) {
    super.add(item);
    return this;
  }

  get items() {
    return super.items.sort((a, b) => a.name.localeCompare(b.name));
  }
}
