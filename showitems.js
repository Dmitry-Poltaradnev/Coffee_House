document.addEventListener("DOMContentLoaded", function () {
  const refreshButton = document.querySelector(".shop__btn_refresh");
  const hiddenItems = document.querySelectorAll(".shop__item_hidden");

  refreshButton.addEventListener("click", function () {
    hiddenItems.forEach((item) => {
      item.classList.remove("shop__item_hidden");
    });

    refreshButton.remove();
  });
});
