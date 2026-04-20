/* Simple submenu support for Bootstrap 5.
   On small screens, click a category to open its sub menu. */

document.addEventListener("DOMContentLoaded", function () {
  var toggles = document.querySelectorAll(".dropdown-submenu > a");
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener("click", function (e) {
      var nextMenu = this.nextElementSibling;
      if (!nextMenu) {
        return;
      }
      /* Prevent the link from navigating when we want to open the submenu */
      e.preventDefault();
      e.stopPropagation();

      if (nextMenu.classList.contains("show")) {
        nextMenu.classList.remove("show");
      } else {
        nextMenu.classList.add("show");
      }
    });
  }
});

