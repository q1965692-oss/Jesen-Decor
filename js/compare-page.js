/* Compare page: uses the same product list as the shop (from localStorage). */

var COMPARE_PRODUCTS = [];

function loadForCompare() {
  COMPARE_PRODUCTS = getProductsFromLocalStorage();
  fillCompareDropdown("compareA");
  fillCompareDropdown("compareB");
  var b = document.getElementById("compareB");
  if (b && b.options.length > 1) {
    b.selectedIndex = 1;
  }
  document.getElementById("btnCompare").addEventListener("click", runCompare);
}

function fillCompareDropdown(selectId) {
  var sel = document.getElementById(selectId);
  if (!sel) {
    return;
  }
  sel.innerHTML = "";
  for (var i = 0; i < COMPARE_PRODUCTS.length; i++) {
    var p = COMPARE_PRODUCTS[i];
    var opt = document.createElement("option");
    opt.value = String(p.id);
    opt.textContent = p.name + " (" + p.brand + ")";
    sel.appendChild(opt);
  }
}

function findProductById(id) {
  for (var i = 0; i < COMPARE_PRODUCTS.length; i++) {
    if (COMPARE_PRODUCTS[i].id === id) {
      return COMPARE_PRODUCTS[i];
    }
  }
  return null;
}

function runCompare() {
  var idA = parseInt(document.getElementById("compareA").value, 10);
  var idB = parseInt(document.getElementById("compareB").value, 10);
  var pa = findProductById(idA);
  var pb = findProductById(idB);
  var box = document.getElementById("compareResult");
  if (!pa || !pb || !box) {
    return;
  }
  box.classList.remove("d-none");
  box.innerHTML =
    '<table class="table table-bordered">' +
    "<thead><tr><th></th><th>" +
    pa.name +
    "</th><th>" +
    pb.name +
    "</th></tr></thead><tbody>" +
    "<tr><th>Brand</th><td>" +
    pa.brand +
    "</td><td>" +
    pb.brand +
    "</td></tr>" +
    "<tr><th>Category</th><td>" +
    pa.category +
    "</td><td>" +
    pb.category +
    "</td></tr>" +
    "<tr><th>Sub-category</th><td>" +
    pa.subCategory +
    "</td><td>" +
    pb.subCategory +
    "</td></tr>" +
    "<tr><th>Price</th><td>$" +
    pa.price +
    "</td><td>$" +
    pb.price +
    "</td></tr>" +
    "<tr><th>Summary</th><td>" +
    pa.shortDescription +
    "</td><td>" +
    pb.shortDescription +
    "</td></tr>" +
    "<tr><th>Notes</th><td>" +
    pa.compareNote +
    "</td><td>" +
    pb.compareNote +
    "</td></tr>" +
    "</tbody></table>";
}

document.addEventListener("DOMContentLoaded", loadForCompare);
