# Lab 5 — DOM Store Manager

A simple interactive inventory manager made with **vanilla JavaScript**, DOM API, and the `Store` class from Lab 4. No JavaScript frameworks are used.

## How to open

Open `index.html` in a modern web browser (Chrome, Edge or Firefox). **Because the page uses ES modules, it is more reliable to use a local server**: from the project folder run `python -m http.server 8000`, then open `http://localhost:8000`. Alternatively, use VS Code **Live Server** or deploy to GitHub Pages. No build step is required.

## Functionality

- Products are rendered from the `Store.items` array into an HTML table.
- Add a product with name, positive price and a non-negative whole-number quantity. Validation errors appear next to the fields, not in an alert.
- Increase or decrease quantity, or remove a product.
- The total inventory value, product count and unit count update immediately without refreshing the page.
- One delegated click handler on the product list handles all product-row actions.

## Events I handled (4 sentences)

I used the `submit` event on the product form to validate user input and add a new item. I called `event.preventDefault()` so the page does not reload when the form is submitted. I used the `input` event to clear validation errors while the user corrects a field. For the product list, I used one `click` event listener on the parent `tbody`, and `event.target.closest()` identifies which quantity or delete button was clicked; this is event delegation and it also works for newly rendered rows.

## Screenshot

![Store Manager interface](screenshots/store-manager.png)

## AI disclosure

OpenAI ChatGPT was used to help write and review the interface, JavaScript code, README, and test cases. I checked the logic and should be able to explain the code during the defense.

## Tests

```bash
npm install
npm test
```

The project keeps the original Lab 4 `Store` tests and adds tests for the new `updateQty` method.

## Suggested commit history

Make at least three meaningful commits in your **own public** GitHub repository, for example:

1. `feat: reuse Lab 4 Store and support quantity updates`
2. `feat: build product form and reactive inventory DOM`
3. `docs: add README, screenshot and Store tests`

Do not upload an entire zip as a single commit if you need the three-commit grading criterion. See `GITHUB_STEPS.md` for the submission workflow.
