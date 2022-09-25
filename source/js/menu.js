document.addEventListener("DOMContentLoaded", () => {
  let menu = document.querySelector(".menu-mobile")
  menu.classList.remove("menu-mobile--nojs");
});

function toggleMenu() {
  const menu = document.querySelector(".menu-mobile");
  const menuItems = document.querySelectorAll(".menu-mobile__item");
  const body = document.querySelector('body');
  const header = document.querySelector('header');

  if (menu.classList.contains("menu-mobile--show")) {
    menu.classList.remove("menu-mobile--show");
    menu.classList.add("menu-mobile--closed");
    body.style.marginTop = "0px";
    header.style.top = "0";

  } else {
    menu.classList.remove("menu-mobile--closed");
    menu.classList.add("menu-mobile--show");
    body.style.marginTop = "220px";
    header.style.top = "224px";
  }

  menuItems.forEach(
    function(menuItem) {
      menuItem.addEventListener("click", toggleMenu);
    }
  )
}
