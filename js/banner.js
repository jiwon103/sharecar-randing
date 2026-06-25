/* ==========================================
   SHARECAR V2
   Hero Banner Slider
========================================== */

class HeroSlider {

    constructor() {

        this.slides = document.querySelectorAll(".hero-image");

        this.current = 0;

        this.interval = 5000;

        this.timer = null;

        if (!this.slides.length) return;

        this.start();

    }

    start() {

        this.stop();

        this.timer = setInterval(() => {

            this.next();

        }, this.interval);

    }

    stop() {

        if (this.timer) {

            clearInterval(this.timer);

            this.timer = null;

        }

    }

    next() {

        this.slides[this.current].classList.remove("active");

        this.current++;

        if (this.current >= this.slides.length) {

            this.current = 0;

        }

        this.slides[this.current].classList.add("active");

    }

}

window.addEventListener("DOMContentLoaded", () => {

    new HeroSlider();

});
