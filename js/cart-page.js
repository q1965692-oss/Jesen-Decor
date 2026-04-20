/* Cart page: draw lines from BeCart */

function money(n) {
  return "$" + Math.round(n).toLocaleString();
}

function findCartLine(items, id) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i];
    }
  }
  return null;
}

function renderCartPage() {
  var items = window.BeCart ? window.BeCart.get() : [];
  var empty = document.getElementById("cart-empty");
  var filled = document.getElementById("cart-filled");
  var list = document.getElementById("cart-lines");
  if (!empty || !filled || !list) {
    return;
  }

  if (items.length === 0) {
    empty.classList.remove("d-none");
    filled.classList.add("d-none");
    return;
  }

  empty.classList.add("d-none");
  filled.classList.remove("d-none");

  list.innerHTML = "";
  var sub = 0;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    sub += item.price * item.quantity;
    var brandLine = item.brand ? item.brand + " · " : "";
    var row = document.createElement("div");
    row.className = "d-flex gap-4 border p-4 bg-white mb-4";
    row.innerHTML =
      '<img src="' +
      productImageUrl(item.image) +
      '" alt="" class="border" style="width:7rem;height:7rem;object-fit:cover" width="112" height="112" />' +
      '<div class="flex-grow-1 d-flex flex-column justify-content-between">' +
      '<div><p class="small text-uppercase text-secondary mb-1">' +
      brandLine +
      item.category +
      "</p>" +
      '<h3 class="h5 font-heading fw-bold mb-0">' +
      item.name +
      "</h3></div>" +
      '<div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-3">' +
      '<div class="btn-group border" role="group">' +
      '<button type="button" class="btn btn-light rounded-0 btn-sm px-3 js-qty" data-id="' +
      item.id +
      '" data-delta="-1"><i class="bi bi-dash-lg"></i></button>' +
      '<span class="d-inline-flex align-items-center px-3 small fw-semibold">' +
      item.quantity +
      "</span>" +
      '<button type="button" class="btn btn-light rounded-0 btn-sm px-3 js-qty" data-id="' +
      item.id +
      '" data-delta="1"><i class="bi bi-plus-lg"></i></button>' +
      "</div>" +
      '<span class="font-heading fw-bold">' +
      money(item.price * item.quantity) +
      "</span>" +
      '<button type="button" class="btn btn-link text-secondary p-0 js-remove" data-id="' +
      item.id +
      '"><i class="bi bi-trash"></i></button>' +
      "</div></div>";
    list.appendChild(row);
  }

  var tax = Math.round(sub * 0.1);
  var total = Math.round(sub * 1.1);
  document.getElementById("cart-subtotal").textContent = money(sub);
  document.getElementById("cart-tax").textContent = money(tax);
  document.getElementById("cart-total").textContent = money(total);

  var qtyBtns = list.querySelectorAll(".js-qty");
  for (var q = 0; q < qtyBtns.length; q++) {
    qtyBtns[q].addEventListener("click", function (ev) {
      var btn = ev.currentTarget;
      var id = parseInt(btn.getAttribute("data-id"), 10);
      var delta = parseInt(btn.getAttribute("data-delta"), 10);
      var it = findCartLine(window.BeCart.get(), id);
      if (it) {
        window.BeCart.updateQuantity(id, it.quantity + delta);
      }
      renderCartPage();
    });
  }

  var remBtns = list.querySelectorAll(".js-remove");
  for (var r = 0; r < remBtns.length; r++) {
    remBtns[r].addEventListener("click", function (ev) {
      var id = parseInt(ev.currentTarget.getAttribute("data-id"), 10);
      window.BeCart.remove(id);
      renderCartPage();
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderCartPage();
  window.addEventListener("cartupdated", renderCartPage);
});
