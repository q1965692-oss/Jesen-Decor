/* Checkout page: order summary + fake submit */

function moneyCheckout(n) {
  return "$" + Math.round(n).toLocaleString();
}

function renderCheckoutPage() {
  if (!window.BeCart) {
    return;
  }
  var items = window.BeCart.get();
  var empty = document.getElementById("checkout-empty");
  var formWrap = document.getElementById("checkout-form-wrap");
  var lines = document.getElementById("checkout-lines");

  if (!empty || !formWrap || !lines) {
    return;
  }

  if (items.length === 0) {
    empty.classList.remove("d-none");
    formWrap.classList.add("d-none");
    return;
  }

  empty.classList.add("d-none");
  formWrap.classList.remove("d-none");

  var sub = 0;
  lines.innerHTML = "";
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    sub += item.price * item.quantity;
    var row = document.createElement("div");
    row.className = "d-flex justify-content-between small mb-2";
    var brand = item.brand ? item.brand + " — " : "";
    row.innerHTML =
      "<span>" + brand + item.name + " × " + item.quantity + "</span><span>" + moneyCheckout(item.price * item.quantity) + "</span>";
    lines.appendChild(row);
  }

  var tax = Math.round(sub * 0.1);
  var total = Math.round(sub * 1.1);
  document.getElementById("co-subtotal").textContent = moneyCheckout(sub);
  document.getElementById("co-tax").textContent = moneyCheckout(tax);
  document.getElementById("co-total").textContent = moneyCheckout(total);
}

document.addEventListener("DOMContentLoaded", function () {
  renderCheckoutPage();
  window.addEventListener("cartupdated", renderCheckoutPage);

  var form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (window.BeCart.get().length === 0) {
        return;
      }
      var btn = form.querySelector('[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Processing...";
      }
      setTimeout(function () {
        window.BeCart.clear();
        window.location.href = "index.html?ordered=1";
      }, 1200);
    });
  }
});
