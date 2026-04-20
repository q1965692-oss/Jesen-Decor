/* Shop page: show products from memory, filter by category, subCategory, brand */

var ALL_PRODUCTS = [];

var CATEGORIES = [
  "All",
  "Metal wall art",
  "Wall papers",
  "Photo frame art",
  "Mirror art",
  "Wall shelves",
  "Wall mounted animals",
];

function fillCategorySelect() {
  var sel = document.getElementById("selCategory");
  if (!sel) return;
  sel.innerHTML = "";
  for (var i = 0; i < CATEGORIES.length; i++) {
    var opt = document.createElement("option");
    opt.value = CATEGORIES[i];
    opt.textContent = CATEGORIES[i];
    sel.appendChild(opt);
  }
}

function fillBrandSelect() {
  var sel = document.getElementById("selBrand");
  if (!sel) return;
  var brands = [];
  for (var i = 0; i < ALL_PRODUCTS.length; i++) {
    var b = ALL_PRODUCTS[i].brand;
    var found = false;
    for (var j = 0; j < brands.length; j++) {
      if (brands[j] === b) {
        found = true;
        break;
      }
    }
    if (!found) {
      brands.push(b);
    }
  }
  brands.sort();
  sel.innerHTML = "";
  var allOpt = document.createElement("option");
  allOpt.value = "All";
  allOpt.textContent = "All brands";
  sel.appendChild(allOpt);
  for (var k = 0; k < brands.length; k++) {
    var o = document.createElement("option");
    o.value = brands[k];
    o.textContent = brands[k];
    sel.appendChild(o);
  }
}

function fillSubCategorySelect() {
  var selCat = document.getElementById("selCategory");
  var selSub = document.getElementById("selSub");
  if (!selCat || !selSub) return;
  var cat = selCat.value;
  var subs = [];
  for (var i = 0; i < ALL_PRODUCTS.length; i++) {
    var p = ALL_PRODUCTS[i];
    if (cat === "All" || p.category === cat) {
      var s = p.subCategory;
      var found = false;
      for (var j = 0; j < subs.length; j++) {
        if (subs[j] === s) {
          found = true;
          break;
        }
      }
      if (!found) {
        subs.push(s);
      }
    }
  }
  subs.sort();
  selSub.innerHTML = "";
  var allOpt = document.createElement("option");
  allOpt.value = "All";
  allOpt.textContent = "All sub-categories";
  selSub.appendChild(allOpt);
  for (var k = 0; k < subs.length; k++) {
    var o = document.createElement("option");
    o.value = subs[k];
    o.textContent = subs[k];
    selSub.appendChild(o);
  }
}

function getFilteredList() {
  var cat = document.getElementById("selCategory").value;
  var sub = document.getElementById("selSub").value;
  var brand = document.getElementById("selBrand").value;
  var out = [];
  for (var i = 0; i < ALL_PRODUCTS.length; i++) {
    var p = ALL_PRODUCTS[i];
    if (cat !== "All" && p.category !== cat) {
      continue;
    }
    if (sub !== "All" && p.subCategory !== sub) {
      continue;
    }
    if (brand !== "All" && p.brand !== brand) {
      continue;
    }
    out.push(p);
  }
  return out;
}

function renderProducts(list) {
  var row = document.getElementById("product-list");
  if (!row) return;
  row.innerHTML = "";
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    var col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4";
    col.innerHTML =
      '<div class="border overflow-hidden bg-white h-100 product-card">' +
      '<div class="overflow-hidden"><img src="' +
      productImageUrl(p.image) +
      '" alt="' +
      p.name +
      '" class="w-100 d-block" style="aspect-ratio:1;object-fit:cover" loading="lazy" width="400" height="400" /></div>' +
      '<div class="p-4">' +
      '<p class="small text-uppercase text-secondary mb-1">' +
      p.brand +
      " · " +
      p.subCategory +
      "</p>" +
      '<p class="small text-muted mb-2">' +
      p.category +
      "</p>" +
      '<h2 class="h5 font-heading fw-bold mb-2">' +
      p.name +
      "</h2>" +
      '<p class="small section-subtext mb-3">' +
      p.shortDescription +
      "</p>" +
      '<p class="small mb-2"><a href="#" class="text-dark js-view" data-id="' +
      p.id +
      '">View product</a></p>' +
      '<p class="small mb-3"><a href="' +
      p.detailDoc +
      '" download="Jensen-Decors-product-detail.txt" class="text-dark">Download detail document</a></p>' +
      '<div class="d-flex align-items-center justify-content-between flex-wrap gap-2">' +
      '<span class="h5 font-heading fw-bold mb-0">$' +
      p.price +
      "</span>" +
      '<button type="button" class="btn btn-dark rounded-0 btn-tracked px-3 btn-add-cart" data-pid="' +
      p.id +
      '">Add to Cart</button>' +
      "</div></div></div>";
    row.appendChild(col);
  }

  var buttons = row.querySelectorAll(".btn-add-cart");
  for (var b = 0; b < buttons.length; b++) {
    buttons[b].addEventListener("click", onAddClick);
  }

  var views = row.querySelectorAll(".js-view");
  for (var v = 0; v < views.length; v++) {
    views[v].addEventListener("click", onViewClick);
  }
}

function onAddClick(ev) {
  var id = parseInt(ev.target.getAttribute("data-pid"), 10);
  var product = null;
  for (var i = 0; i < ALL_PRODUCTS.length; i++) {
    if (ALL_PRODUCTS[i].id === id) {
      product = ALL_PRODUCTS[i];
      break;
    }
  }
  if (!product || !window.BeCart) return;
  window.BeCart.add(product);
  showAddedMessage(product.name);
}

function showAddedMessage(name) {
  alert("Added to cart: " + name);
}

function onViewClick(ev) {
  ev.preventDefault();
  var id = parseInt(ev.target.getAttribute("data-id"), 10);
  var product = null;
  for (var i = 0; i < ALL_PRODUCTS.length; i++) {
    if (ALL_PRODUCTS[i].id === id) {
      product = ALL_PRODUCTS[i];
      break;
    }
  }
  if (!product) return;
  openProductModal(product);
}

function openProductModal(p) {
  if (typeof bootstrap === "undefined") return;
  var el = document.getElementById("productModal");
  if (!el) return;

  var gallery = productGallerySrcs(p);
  var pmImg = document.getElementById("pmImg");
  document.getElementById("pmTitle").textContent = p.name;
  pmImg.src = gallery[0] || "";
  pmImg.alt = p.name;

  var thumbs = document.getElementById("pmThumbs");
  if (thumbs) {
    thumbs.innerHTML = "";
    if (gallery.length > 1) {
      thumbs.classList.remove("d-none");
      for (var gi = 0; gi < gallery.length; gi++) {
        (function (src) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "btn p-0 border rounded-0";
          b.style.width = "3.25rem";
          b.style.height = "3.25rem";
          b.setAttribute("aria-label", "Show image");
          var im = document.createElement("img");
          im.src = src;
          im.alt = "";
          im.className = "w-100 h-100";
          im.style.objectFit = "cover";
          b.appendChild(im);
          b.addEventListener("click", function () {
            pmImg.src = src;
          });
          thumbs.appendChild(b);
        })(gallery[gi]);
      }
    } else {
      thumbs.classList.add("d-none");
    }
  }
  document.getElementById("pmMeta").textContent = p.brand + " · " + p.category + " · " + p.subCategory;
  document.getElementById("pmDesc").textContent = p.shortDescription;
  document.getElementById("pmPrice").textContent = "$" + p.price;
  var pmDocEl = document.getElementById("pmDoc");
  pmDocEl.href = p.detailDoc;
  pmDocEl.setAttribute("download", "Jensen-Decors-product-detail.txt");
  document.getElementById("pmPage").href = "product.html?id=" + p.id;

  var addBtn = document.getElementById("pmAdd");
  addBtn.onclick = function () {
    if (window.BeCart) {
      window.BeCart.add(p);
      showSavedModal("Added to cart", p.name + " was added to cart.");
    }
  };

  var m = bootstrap.Modal.getOrCreateInstance(el);
  m.show();
}

function showSavedModal(title, msg) {
  /* fallback if you don't want another modal here */
  alert(title + ": " + msg);
}

function wireFilters() {
  var c = document.getElementById("selCategory");
  var s = document.getElementById("selSub");
  var b = document.getElementById("selBrand");
  if (c) {
    c.addEventListener("change", function () {
      fillSubCategorySelect();
      renderProducts(getFilteredList());
    });
  }
  if (s) {
    s.addEventListener("change", function () {
      renderProducts(getFilteredList());
    });
  }
  if (b) {
    b.addEventListener("change", function () {
      renderProducts(getFilteredList());
    });
  }
}

function startShopPage() {
  ALL_PRODUCTS = getProductsFromLocalStorage();
  fillCategorySelect();
  fillBrandSelect();
  fillSubCategorySelect();

  /* If the page is opened from a category link like:
     shop.html?category=Metal%20wall%20art&sub=Nature&brand=Gloster
  */
  try {
    var params = new URLSearchParams(window.location.search);
    var pCat = params.get("category");
    var pSub = params.get("sub");
    var pBrand = params.get("brand");
    if (pCat && document.getElementById("selCategory")) {
      document.getElementById("selCategory").value = pCat;
    }
    fillSubCategorySelect();
    if (pSub && document.getElementById("selSub")) {
      document.getElementById("selSub").value = pSub;
    }
    if (pBrand && document.getElementById("selBrand")) {
      document.getElementById("selBrand").value = pBrand;
    }
  } catch (e) {
    /* ignore */
  }

  /* Render using selected filters (including URL params). */
  renderProducts(getFilteredList());
  wireFilters();
}

document.addEventListener("DOMContentLoaded", startShopPage);
