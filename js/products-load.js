/*
  Copy the product list from products-data.js into localStorage.
  Other pages read the list back with getProductsFromLocalStorage().
  Works when you open the HTML file directly (double-click) — no server needed.
*/

var STORAGE_KEY_PRODUCTS = "jensen_products_v1";

function copyProductsIntoLocalStorage() {
  var text = JSON.stringify(JENSEN_PRODUCTS);
  localStorage.setItem(STORAGE_KEY_PRODUCTS, text);
}

function getProductsFromLocalStorage() {
  copyProductsIntoLocalStorage();
  var text = localStorage.getItem(STORAGE_KEY_PRODUCTS);
  var list = JSON.parse(text);
  return list;
}
