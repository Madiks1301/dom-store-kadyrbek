# GitHub publication and submission

1. Log in to your personal GitHub account. Create a **public** empty repository with the exact name **`dom-store-kadyrbek`** (don't tick the auto-create README option).
2. Extract the ZIP. Open a terminal inside `dom-store-kadyrbek`.
3. To create **at least three meaningful commits**, enter these commands in order:

```bash
git init
git branch -M main
git add src/Store.js tests/Store.test.js tests/Store.updateQty.test.js package.json
git commit -m "feat: reuse Lab 4 Store and support quantity updates"
git add index.html styles.css src/app.js
git commit -m "feat: add DOM inventory interface and event delegation"
git add README.md screenshots/store-manager.png GITHUB_STEPS.md .gitignore
git commit -m "docs: add screenshot and usage guide"
git remote add origin https://github.com/YOUR_USERNAME/dom-store-kadyrbek.git
git push -u origin main
```

4. Check that GitHub shows three commits and the image in README.
5. Optional: GitHub repository → Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save. GitHub Pages will publish the app.
6. Submit in the same Teams thread from your own Teams account:

`Готово. Репозиторий: https://github.com/YOUR_USERNAME/dom-store-kadyrbek`

Add `Site: <your GitHub Pages URL>` if you publish the website. Replace `YOUR_USERNAME` with your actual GitHub account name.

### Defense checklist

- Explain the `Store` class, its `items`, `add`, `remove`, `find`, `total`, and `updateQty` methods.
- Explain why `event.preventDefault()` is used for the form.
- Explain `render()`: `Store.items` → DOM elements → live totals.
- Explain why one delegated click listener on `tbody` handles all row buttons.
- Demonstrate empty name, zero price and invalid quantity errors beside inputs.
- Demonstrate add, quantity changes, remove and instant recalculation.
