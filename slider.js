export default class CoffeeSlider {
  constructor() {
    this.viewArea = document.querySelector(".favorite__view-area");
    this.sliderContainer = document.querySelector(".favorite-slider");
    this.sliderCards = document.querySelectorAll(".main-slide__card");
    this.line = document.querySelectorAll(".line");

    this.count = 0;
    this.swipeTime = 4000;
    this.interval = 100;
    this.progress = 0;
    this.sliderPaginationItem = null;

    this.startX = 0;
    this.endX = 0;

    this.initialize();
  }

  initialize() {
    this.addEventListeners();
    this.updateSliderPaginationItem();
    this.handleResize();
  }

  addEventListeners() {
    this.viewArea.addEventListener("mouseenter", () =>
      this.pauseSliderPaginationItem()
    );
    this.viewArea.addEventListener("mouseleave", () =>
      this.updateSliderPaginationItem()
    );
    this.viewArea.addEventListener("touchstart", () =>
      this.pauseSliderPaginationItem()
    );
    this.viewArea.addEventListener("touchend", () =>
      this.updateSliderPaginationItem()
    );

    document
      .querySelector(".arrow-right")
      .addEventListener("click", () => this.shiftSlide("left"));
    document
      .querySelector(".arrow-left")
      .addEventListener("click", () => this.shiftSlide("right"));

    this.viewArea.addEventListener("touchstart", (event) =>
      this.handleTouchStart(event)
    );
    this.viewArea.addEventListener("touchend", (event) =>
      this.handleTouchEnd(event)
    );

    window.addEventListener("resize", () => this.handleResize());
  }

  shiftSlide(direction) {
    this.resetProgress();

    const increment = direction === "left" ? 1 : -1;
    this.count =
      (this.count + increment + this.sliderCards.length) %
      this.sliderCards.length;

    this.updateSlidePosition();
  }

  resetProgress() {
    this.line[this.count].style.width = "0";
    this.progress = 0;
  }

  updateSlidePosition() {
    const widthSlide = this.viewArea.offsetWidth;
    this.sliderContainer.style.transform = `translate(-${
      this.count * widthSlide
    }px)`;
  }

  updateSliderPaginationItem() {
    const animate = () => {
      this.progress += (this.interval / this.swipeTime) * 100;
      this.line[this.count].style.width = `${this.progress}%`;

      if (this.progress >= 100) {
        this.resetSliderAnimation();
      }
    };

    this.sliderPaginationItem = setInterval(animate, this.interval);
  }

  resetSliderAnimation() {
    clearInterval(this.sliderPaginationItem);
    this.shiftSlide("left");
    this.progress = 0;
    this.updateSliderPaginationItem();
  }

  pauseSliderPaginationItem() {
    clearInterval(this.sliderPaginationItem);
  }

  handleTouchEnd(event) {
    this.endX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  handleTouchStart(event) {
    this.startX = event.touches[0].clientX;
  }

  handleSwipe() {
    const swipeDist = 10;
    const deltaX = this.endX - this.startX;

    const directionMap = {
      [deltaX > swipeDist]: "right",
      [deltaX < -swipeDist]: "left",
    };

    const direction = directionMap[true];

    if (direction) {
      this.shiftSlide(direction);
    }
  }

  handleResize() {
    this.updateSlidePosition();
    this.resetSliderAnimation();
  }
}
