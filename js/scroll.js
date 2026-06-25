/* ==========================================
   SHARECAR V2
   Scroll Animation
========================================== */

class ScrollEffects {

    constructor() {

        this.header = document.querySelector(".header");

        this.revealItems = document.querySelectorAll(
            ".reveal,.service-card,.car-card,.event-card,.timeline-item"
        );

        this.bind();

        this.reveal();

    }

    bind() {

        window.addEventListener("scroll", () => {

            this.headerEffect();

            this.reveal();

            this.parallax();

        });

    }

    headerEffect() {

        if (window.scrollY > 80) {

            this.header.classList.add("scrolled");

        } else {

            this.header.classList.remove("scrolled");

        }

    }

    reveal() {

        const trigger = window.innerHeight * 0.88;

        this.revealItems.forEach(item => {

            if (item.getBoundingClientRect().top < trigger) {

                item.classList.add("active");

            }

        });

    }

    parallax() {

        const hero = document.querySelector(".hero");

        if (!hero) return;

        hero.style.backgroundPositionY =
            window.scrollY * 0.35 + "px";

    }

}

window.addEventListener("DOMContentLoaded", () => {

    new ScrollEffects();

});