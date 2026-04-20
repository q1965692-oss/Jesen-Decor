/* Shopping cart saved in localStorage (simple array of line items). */

var CART_KEY = "jensen_cart_v1";

function cartGetItems() {
  var json = localStorage.getItem(CART_KEY);
  if (!json) {
    return [];
  }
  try {
    return JSON.parse(json);
  } catch (e) {
    return [];
  }
}

function cartSaveItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  if (window.dispatchEvent) {
    window.dispatchEvent(new Event("cartupdated"));
  }
}

function cartTotals(items) {
  var totalItems = 0;
  var totalPrice = 0;
  for (var i = 0; i < items.length; i++) {
    totalItems += items[i].quantity;
    totalPrice += items[i].price * items[i].quantity;
  }
  return { totalItems: totalItems, totalPrice: totalPrice };
}

function cartUpdateBadges() {
  var t = cartTotals(cartGetItems());
  var wraps = document.querySelectorAll("[data-cart-badge]");
  for (var w = 0; w < wraps.length; w++) {
    var wrap = wraps[w];
    var n = wrap.querySelector("[data-cart-count]");
    if (n) {
      n.textContent = String(t.totalItems);
    }
    if (t.totalItems === 0) {
      wrap.classList.add("d-none");
    } else {
      wrap.classList.remove("d-none");
    }
  }
}

/*
  Encode local image paths for <img src>. encodeURI() leaves ( ) unencoded, which often
  breaks file:// and local static servers; encode each path segment instead (like real URLs).
  Leave http(s) URLs unchanged.
*/
function productImageUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  var parts = path.split("/");
  var out = [];
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] !== "") {
      out.push(encodeURIComponent(parts[i]));
    }
  }
  return out.join("/");
}

/* All image URLs for gallery: optional images[] (first should match image for cart/thumb). */
function productGallerySrcs(p) {
  var raw = [];
  if (p.images && p.images.length > 0) {
    raw = p.images;
  } else if (p.image) {
    raw = [p.image];
  }
  var out = [];
  for (var i = 0; i < raw.length; i++) {
    out.push(productImageUrl(raw[i]));
  }
  return out;
}

/* product must have: id, name, price, image, category, brand (optional) */
function cartAddProduct(product) {
  var items = cartGetItems();
  var found = -1;
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === product.id) {
      found = i;
      break;
    }
  }
  if (found >= 0) {
    items[found].quantity += 1;
  } else {
    var line = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
    };
    if (product.brand) {
      line.brand = product.brand;
    }
    items.push(line);
  }
  cartSaveItems(items);
}

function cartRemoveLine(id) {
  var items = cartGetItems();
  var next = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].id !== id) {
      next.push(items[i]);
    }
  }
  cartSaveItems(next);
}

function cartUpdateQuantity(id, quantity) {
  if (quantity < 1) {
    cartRemoveLine(id);
    return;
  }
  var items = cartGetItems();
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      items[i].quantity = quantity;
      break;
    }
  }
  cartSaveItems(items);
}

function cartClear() {
  cartSaveItems([]);
}

/* Same names as before so other pages keep working */
window.BeCart = {
  get: cartGetItems,
  save: cartSaveItems,
  totals: function () {
    return cartTotals(cartGetItems());
  },
  add: cartAddProduct,
  remove: cartRemoveLine,
  updateQuantity: cartUpdateQuantity,
  clear: cartClear,
};

document.addEventListener("DOMContentLoaded", function () {
  cartUpdateBadges();
  window.addEventListener("cartupdated", cartUpdateBadges);
});
