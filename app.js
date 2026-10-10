import { Store } from './Store.js';

// This is the same Store class used in Lab 4, with updateQty added.
const store = new Store([
  { name: 'Wireless Headphones', price: 18900, qty: 4 },
  { name: 'Mechanical Keyboard', price: 32500, qty: 2 },
  { name: 'USB-C Hub', price: 12500, qty: 6 },
  { name: 'Laptop Stand', price: 15900, qty: 3 }
]);

const form = document.querySelector('#product-form');
const list = document.querySelector('#product-list');
const emptyState = document.querySelector('#empty-state');
const status = document.querySelector('#form-status');
const money = (number) => `₸${number.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

// Create elements safely; product names are never inserted as HTML.
function el(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined) element.textContent = content;
  return element;
}

function render() {
  const items = store.items;
  list.replaceChildren();

  items.forEach((item, index) => {
    const row = el('tr');
    row.dataset.name = item.name;
    const product = el('td');
    const productCell = el('div', 'product-cell');
    const avatar = el('span', 'product-avatar', item.name.charAt(0).toUpperCase());
    avatar.dataset.tone = String(index % 4);
    productCell.append(avatar, el('span', 'product-name', item.name));
    product.append(productCell);
    const price = el('td', 'price-cell', money(item.price));
    const quantityCell = el('td');
    const qtyGroup = el('div', 'qty-controls');
    const decrease = el('button', 'qty-button', '−');
    decrease.type = 'button'; decrease.dataset.action = 'decrease';
    decrease.setAttribute('aria-label', `Decrease quantity of ${item.name}`);
    decrease.disabled = item.qty === 0;
    const qty = el('span', 'qty-number', String(item.qty));
    const increase = el('button', 'qty-button', '+');
    increase.type = 'button'; increase.dataset.action = 'increase';
    increase.setAttribute('aria-label', `Increase quantity of ${item.name}`);
    qtyGroup.append(decrease, qty, increase);
    quantityCell.append(qtyGroup);
    const subtotal = el('td', 'subtotal-cell', money(item.price * item.qty));
    const action = el('td', 'align-right');
    const remove = el('button', 'delete-button', '✕');
    remove.type = 'button'; remove.dataset.action = 'remove';
    remove.setAttribute('aria-label', `Remove ${item.name}`);
    action.append(remove);
    row.append(product, price, quantityCell, subtotal, action);
    list.append(row);
  });

  const total = store.total();
  document.querySelector('#total-value').textContent = money(total);
  document.querySelector('#footer-total').textContent = money(total);
  document.querySelector('#product-count').textContent = String(items.length);
  document.querySelector('#list-badge').textContent = String(items.length);
  document.querySelector('#unit-count').textContent = String(items.reduce((sum, item) => sum + item.qty, 0));
  emptyState.hidden = items.length !== 0;
}

function showError(field, message) {
  document.querySelector(`#${field}-error`).textContent = message;
  document.querySelector(`#${field}`).setAttribute('aria-invalid', String(Boolean(message)));
}

function validate(values) {
  const errors = {};
  if (!values.name) errors.name = 'Enter a product name.';
  else if (store.find(values.name)) errors.name = 'This product already exists.';
  if (values.price.trim() === '' || !Number.isFinite(Number(values.price)) || Number(values.price) <= 0) {
    errors.price = 'Price must be greater than 0.';
  }
  if (values.qty.trim() === '' || !Number.isInteger(Number(values.qty)) || Number(values.qty) < 0) {
    errors.qty = 'Quantity must be a whole number (0 or more).';
  }
  return errors;
}

// Submit events handle additions. Validation messages are displayed in the DOM.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  const values = {
    name: form.elements.name.value.trim(),
    price: form.elements.price.value,
    qty: form.elements.qty.value
  };
  const errors = validate(values);
  ['name', 'price', 'qty'].forEach((field) => showError(field, errors[field] || ''));
  if (Object.keys(errors).length) return;
  store.add({ name: values.name, price: Number(values.price), qty: Number(values.qty) });
  render();
  form.reset();
  status.textContent = `${values.name} added successfully.`;
  form.elements.name.focus();
});

// Clear one field's error when the user corrects it.
form.addEventListener('input', (event) => {
  if (['name', 'price', 'qty'].includes(event.target.name)) {
    showError(event.target.name, '');
    status.textContent = '';
  }
});

// Event delegation: ONE click listener on the parent list handles all item buttons.
list.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button || !list.contains(button)) return;
  const row = button.closest('tr[data-name]');
  if (!row) return;
  const name = row.dataset.name;
  const item = store.find(name);
  if (!item) return;
  switch (button.dataset.action) {
    case 'remove': store.remove(name); break;
    case 'increase': store.updateQty(name, item.qty + 1); break;
    case 'decrease': store.updateQty(name, Math.max(0, item.qty - 1)); break;
    default: return;
  }
  render(); // Re-render the list and total without reloading the page.
});

render();
