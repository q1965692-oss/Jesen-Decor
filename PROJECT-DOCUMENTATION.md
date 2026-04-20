## Jensen Decors — Project Documentation (Student Version)

This document explains what was required in the given project brief (`JensenDecors.txt`) and what was implemented in this website using **HTML + CSS + Bootstrap + JavaScript**.

---

## Technologies Used

- **HTML5**: All pages are plain `.html`
- **CSS**: `css/styles.css` (plus Bootstrap CSS)
- **Bootstrap 5**: Layout/grid, navbar, buttons, forms, and modals
- **JavaScript (vanilla)**: Product listing, filters, cart, compare, modals, and localStorage
- **Geolocation API + Google Map iframe**: for the Contact page

---

## Site flow and user journey (how the experience is wired now)

The site is still a **multi-page** flow (no SPA), but a few changes make navigation and messaging more consistent end-to-end.

### Global footer on every page

All main pages include the same **footer** (`footer-site`): `index.html`, `shop.html`, `product.html`, `cart.html`, `checkout.html`, `compare.html`, `contact.html`, and `404.html`.

**What this changes in practice**

- Users can move between **Home**, **Shop** (all products), **Compare**, **Cart**, and **Contact** without going back to the navbar only—the footer repeats those destinations.
- **Product detail document**: the footer includes a link to `docs/products-detail.txt` with a suggested download filename (`Jensen-Decors-product-detail.txt`), aligned with the per-product “Download detail document” behavior elsewhere.
- **Contact** is linked as `contact.html` everywhere (including from the home footer), so the contact experience is not hidden behind a single on-page anchor.
- **Account** links remain placeholders (`#`) until real auth pages exist.

### Product detail document (brief on page, full text file)

Flow is unchanged in spirit, but **download behavior is explicit**:

- **Shop** product cards and the **product modal** use `detailDoc` (typically `docs/products-detail.txt`) with a **`download`** attribute so browsers save a named `.txt` file where supported.
- **Product page** (`product.html?id=…`) uses the same pattern for the “Download detail document” link.
- The modal’s link has a **fallback `href`** before JavaScript runs so the download still works if scripts are slow or fail.

Together, this keeps the **brief features on the page** (short description, price, gallery) and the **longer shared reference** in one downloadable file.

### Home page content and imagery (messaging vs. “renovation”)

The home page was adjusted so visuals and copy emphasize **wall décor** (art, frames, panels) rather than full-room renovation.

- **Hero, About, and Services** use **client-provided images** under `assets/` (WebP/JPEG filenames such as `L1040906_…`, `Millionaire_Club.webp`, and the Screenshots dated 2026-02-19 / 2026-04-07), plus **product-style shots** from existing pilot assets where an extra tile was needed (e.g. multi-panel geometric art).
- **Contact** strip behind the form uses a **wall-art product** background (`pilot-id5-beige-gold-marble.jpg`) so the section reads as décor, not a construction site.
- **Services** blurbs and headings were rewritten to framed art, statement pieces, and multi-panel sets, with links into **Shop**.

### Inspiration / “Blog” section (external stock images)

The **Inspiration** grid (the section `#blog` on the home page) no longer uses only local files. It now loads **remote images** from **Unsplash** and **Pexels** (URLs with width parameters) so the mosaic shows varied **interior / wall-art** photography.

**Implications for flow**

- That section **depends on network access** to those CDNs; if a URL breaks or is blocked, a tile may fail to load.
- For a production deployment, you may want to **download** those images into `assets/` and switch `src` to local paths for offline use and stable URLs.

---

## Pages in the Project

- **Home**: `index.html`
- **Shop / Products list**: `shop.html`
- **Single product page (extra feature)**: `product.html?id=1`
- **Compare products**: `compare.html`
- **Cart**: `cart.html`
- **Checkout**: `checkout.html`
- **Contact**: `contact.html`
- **404**: `404.html`

---

## Requirement Checklist (from `JensenDecors.txt`)

### 1) Home page using sections + logo + header images

**Implemented in**: `index.html`

- Home page is divided into sections (Hero, About, Services, Contact, Inspiration/Blog, Footer)
- Logo is used in the navbar:
  - `assets/jensen-logo-black.png`
- Header/hero uses a **client wall-décor** image (e.g. `assets/L1040906_1_a70c426a-a7d2-41bb-a23b-074b62ea5d45.webp`), not generic renovation photography
- The **Inspiration** grid uses **remote** Unsplash/Pexels URLs (see “Site flow” above); other sections mix client images and local product shots where needed

### 2) Navigation links through categories / pages

**Implemented in**: navbars on all pages

- Navbar links exist for Shop, Compare, Contact, Cart
- Category navigation is available via **Categories dropdown**

### 3) Menu with product categories

**Implemented in**: navbars on all pages

Categories included:

- Metal wall art
- Wall papers
- Photo frame art
- Mirror art
- Wall shelves
- Wall mounted animals

### 4) Every category has sub-categories

**Implemented in**: 2-level Categories dropdown + shop filters

- Categories dropdown is **2-level**:
  - Level 1: Category
  - Level 2: Sub-category
- Clicking a sub-category opens:
  - `shop.html?category=...&sub=...`
- Shop filters also include sub-category dropdown (`selSub`)

### 5) Products can be filtered by brand

**Implemented in**: `shop.html`

- Brand dropdown (`selBrand`) lists all brands from product data
- Selecting brand shows only products of that brand

### 6) When user selects a brand, product list is shown

**Implemented in**: `shop.html`

- After selecting brand in dropdown, only matching products are displayed

### 7) Brief features on web + detailed features in a document

**Implemented in**: `shop.html`, `product.html`, and **site footer** on all pages

- Each product shows:
  - Picture
  - Short description (brief summary)
- A “Download detail document” link exists for each product:
  - **Shared detail file used**: `docs/products-detail.txt`
  - Links use the **`download`** attribute with a suggested filename (e.g. `Jensen-Decors-product-detail.txt`) for a consistent save-as experience
  - The same file is linked from the **footer** so users can grab it without opening a product
  - Note: The requirement mentions Word docs; for a beginner project we used a simple `.txt` file. It can be replaced later with `.doc/.docx` if needed.

### 8) Compare products (similar and different brands)

**Implemented in**: `compare.html`

- Two dropdowns are used to select Product A and Product B
- Clicking “Compare” shows a comparison table

### 9) Contact page with address + map (Geolocation) + clickable email

**Implemented in**: `contact.html`

- Address is displayed
- Google map iframe is displayed
- Email link uses `mailto:` to open local email client
- “Show my location” uses browser Geolocation API (lat/lng shown)

---

## Product Data (How Shop Page is Populated)

### Where products are written (source file)

- **File**: `js/products-data.js`
- Variable: `JENSEN_PRODUCTS` (40 demo products)

Each product contains:

- `id`, `name`, `brand`
- `category`, `subCategory`
- `price`, `image`
- `shortDescription`
- `detailDoc` (download link)
- `compareNote`

### How products are saved into localStorage

- **File**: `js/products-load.js`
- Function: `copyProductsIntoLocalStorage()`
- **localStorage key for products**: `jensen_products_v1`

Flow (simple):

1. `products-data.js` defines the list in `JENSEN_PRODUCTS`
2. `products-load.js` copies `JENSEN_PRODUCTS` into localStorage using key `jensen_products_v1`
3. Shop / Compare / Product page read products back from localStorage

### How shop filters work

**File**: `js/shop-page.js`

- Dropdowns:
  - Category: `#selCategory`
  - Sub-category: `#selSub`
  - Brand: `#selBrand`
- Filtering:
  - Uses basic `for` loops and `if` conditions
  - The product list is re-rendered after each filter change

### Category menu links (URL filtering)

Categories dropdown uses links like:

- `shop.html?category=Metal%20wall%20art&sub=Nature`

**File**: `js/shop-page.js`

On page load it reads URL parameters:

- `category`
- `sub`
- `brand` (optional)

Then it selects dropdown values and renders the filtered list.

---

## Product Categories + Subcategories Used (example structure)

The website uses these categories from the brief:

- Metal wall art → Nature / Geometric / Abstract
- Wall papers → Textured / Floral / Minimal
- Photo frame art → Gallery / Single / Collage
- Mirror art → Round / Decorative
- Wall shelves → Floating / Corner / Modular
- Wall mounted animals → Safari / Birds / Farm

---

## Brands Used (fake demo brands)

Brands included in the demo product list:

- Gloster
- WallCraft
- Artisan
- Nordic
- DecoLine
- FrameHaus

(Brands are defined in `js/products-data.js` inside each product object.)

---

## Cart (Add to Cart + Cart Page)

### Where cart is stored

**File**: `js/cart.js`

- **localStorage key for cart**: `jensen_cart_v1`
- Cart stores line items:
  - `id`, `name`, `price`, `image`, `category`, `brand` (optional), `quantity`

### Add to cart flow (simple)

When the user clicks **Add to Cart**:
- **Shop page**:
  - `shop.html` shows products and “Add to Cart” buttons
  - `js/shop-page.js` handles the button click and calls:
    - `window.BeCart.add(product)`
- **Single product page**:
  - `product.html` has an “Add to cart” button
  - `js/product-page.js` also calls:
    - `window.BeCart.add(product)`

Inside `js/cart.js`, the `add()` function does:
1. Read current cart from localStorage key `jensen_cart_v1`
2. If product already exists → increase `quantity`
3. Else → add new line item with `quantity: 1`
4. Save updated cart back to the same localStorage key

### Cart pages

- `cart.html` renders items and totals using `js/cart-page.js`
- `checkout.html` shows order summary and clears cart using `js/checkout-page.js`

### Checkout flow (simple)

- `checkout.html` reads cart items using `window.BeCart.get()`
- It calculates totals and shows order summary
- When “Place Order” is submitted:
  - `js/checkout-page.js` calls `window.BeCart.clear()`
  - This clears localStorage key `jensen_cart_v1`
  - Then it redirects to `index.html?ordered=1`

---

## Contact Form Saving (localStorage)

### Where contact messages are stored

- **localStorage key for messages**: `jensen_contacts_v1`

### Contact page

**File**: `contact.html`

- On submit, form data is saved to localStorage key `jensen_contacts_v1`
- A “Message saved” modal is shown

### Home page contact section

**File**: `index.html`

- On submit, form data is saved to the same key: `jensen_contacts_v1`
- A “Message saved” modal is shown

Each saved record contains:

- `name`, `email`, `message`, `date`
- Home page also stores `page: "index.html"`

---

## Modals (Where they are placed)

### Product View modal

- **Modal HTML**: in `shop.html` (id: `productModal`)
- **JavaScript**: in `js/shop-page.js`
  - Clicking “View product” opens the modal and fills product data
  - “Add to cart” inside the modal adds the item to cart

### “Message saved” modal

- `contact.html` modal id: `msgSavedModal`
- `index.html` modal id: `homeMsgSavedModal`

---

## 2-Level Categories Dropdown (How it works)

Bootstrap 5 does not include nested dropdowns by default, so a simple submenu solution is used:

- **CSS for submenu**: `css/styles.css`
  - positions the nested dropdown menu
  - enables hover open on desktop
- **JS for submenu**: `js/menu.js`
  - opens submenu on click (helpful on mobile)

---

## Notes for Teacher / Demo

- This is a student demo project: products and brands are **fake sample data**
- Products are stored in **localStorage** and can be checked in browser devtools:
  - Products: `jensen_products_v1`
  - Cart: `jensen_cart_v1`
  - Contact messages: `jensen_contacts_v1`
- **Footer** is duplicated in each HTML file (no build step); editing footer markup requires updating every page or introducing a small build/include later.
- **Inspiration** tiles on the home page load images from **third-party URLs**; for offline demos, mirror those files into `assets/` and point `src` locally.

