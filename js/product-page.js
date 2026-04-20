/* Single product page: product.html?id=NUMBER */

function getQueryId() {
  var params = new URLSearchParams(window.location.search);
  var idText = params.get("id");
  if (!idText) return null;
  var id = parseInt(idText, 10);
  if (isNaN(id)) return null;
  return id;
}

function findProduct(list, id) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i];
    }
  }
  return null;
}

function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderProduct(p) {
  var box = document.getElementById("productBox");
  if (!box) return;

  if (!p) {
    box.innerHTML =
      '<div class="border p-4 bg-light">' +
      '<h1 class="h3 font-heading fw-bold mb-2">Product not found</h1>' +
      '<p class="text-secondary mb-0">Please open this page from the shop list.</p>' +
      "</div>";
    return;
  }

  var gallery = productGallerySrcs(p);
  var thumbsBlock = "";
  if (gallery.length > 1) {
    thumbsBlock += '<div class="d-flex flex-wrap gap-2 mt-2">';
    for (var gi = 0; gi < gallery.length; gi++) {
      thumbsBlock +=
        '<button type="button" class="btn p-0 border rounded-0 product-gallery-thumb" data-gallery-src="' +
        escapeHtml(gallery[gi]) +
        '" style="width:4.25rem;height:4.25rem" aria-label="View image ' +
        (gi + 1) +
        '">' +
        '<img src="' +
        gallery[gi] +
        '" alt="" class="w-100 h-100" style="object-fit:cover" />' +
        "</button>";
    }
    thumbsBlock += "</div>";
  }

  box.innerHTML =
    '<div class="row g-4 align-items-start">' +
    '<div class="col-md-6">' +
    '<div class="border overflow-hidden">' +
    '<img id="productMainImg" src="' +
    gallery[0] +
    '" alt="' +
    escapeHtml(p.name) +
    '" class="w-100 d-block" style="aspect-ratio:1;object-fit:cover" />' +
    "</div>" +
    thumbsBlock +
    "</div>" +
    '<div class="col-md-6">' +
    '<p class="small text-uppercase text-secondary mb-2">' +
    p.brand +
    " · " +
    p.category +
    " · " +
    p.subCategory +
    "</p>" +
    '<h1 class="section-heading mb-3">' +
    p.name +
    "</h1>" +
    '<p class="section-subtext mb-3">' +
    p.shortDescription +
    "</p>" +
    (p.description
      ? '<div class="small text-secondary mb-3" style="white-space:pre-wrap">' +
        escapeHtml(p.description) +
        "</div>"
      : "") +
    (p.price_pkr
      ? '<p class="small text-muted mb-2">Reference: PKR ' + escapeHtml(p.price_pkr) + "</p>"
      : "") +
    '<p class="mb-3"><strong>Price:</strong> $' +
    p.price +
    "</p>" +
    '<p class="small mb-4"><a class="text-dark" href="' +
    p.detailDoc +
    '" download="Jensen-Decors-product-detail.txt">Download detail document</a></p>' +
    '<div class="d-flex flex-wrap gap-2">' +
    '<button type="button" class="btn btn-dark rounded-0 btn-tracked px-4" id="btnAddSingle">Add to cart</button>' +
    '<a class="btn btn-outline-dark rounded-0 btn-tracked px-4" href="compare.html">Compare</a>' +
    "</div>" +
    "</div>" +
    "</div>";

  var btn = document.getElementById("btnAddSingle");
  if (btn) {
    btn.addEventListener("click", function () {
      if (window.BeCart) {
        window.BeCart.add(p);
        alert("Added to cart: " + p.name);
      }
    });
  }

  var mainImg = document.getElementById("productMainImg");
  var thumbBtns = box.querySelectorAll(".product-gallery-thumb");
  if (mainImg && thumbBtns.length) {
    for (var t = 0; t < thumbBtns.length; t++) {
      thumbBtns[t].addEventListener("click", function () {
        var src = this.getAttribute("data-gallery-src");
        if (src) mainImg.src = src;
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var list = getProductsFromLocalStorage();
  var id = getQueryId();
  var p = id ? findProduct(list, id) : null;
  renderProduct(p);
});

