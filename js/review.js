const reviews = [
    {
        name: "김○○",
        car: "G80",
        star: 5,
        text: "차량 상태가 기대 이상이었습니다. 상담도 친절하고 진행도 빨라 다음에도 이용하고 싶습니다."
    },
    {
        name: "박○○",
        car: "GV80",
        star: 5,
        text: "실제 차량이 사진과 동일했고 내부도 매우 깨끗했습니다. 믿고 이용할 수 있는 서비스였습니다."
    },
    {
        name: "이○○",
        car: "K8",
        star: 5,
        text: "예약부터 차량 인수까지 절차가 간단했습니다. 원하는 시간에 맞춰 이용할 수 있어 편리했습니다."
    },
    {
        name: "정○○",
        car: "쏘렌토",
        star: 5,
        text: "첫 이용이라 걱정했는데 상담이 친절해서 안심할 수 있었습니다. 차량 컨디션도 매우 만족합니다."
    },
    {
        name: "최○○",
        car: "BMW 5 Series",
        star: 5,
        text: "수입차도 관리가 정말 잘 되어 있었습니다. 다음에도 ShareCar를 이용할 예정입니다."
    },
    {
        name: "한○○",
        car: "아반떼",
        star: 5,
        text: "가성비 좋은 차량을 찾고 있었는데 원하는 조건 그대로 이용할 수 있어서 만족했습니다."
    }
];

const track = document.querySelector(".review-track");

reviews.forEach(review => {

    const card = document.createElement("div");
    card.className = "review-card";

    card.innerHTML = `
        <div class="review-star">${"★".repeat(review.star)}</div>

        <div class="review-text">
            ${review.text}
        </div>

        <div class="review-user">
            <div>
                ${review.name}
                <span>${review.car}</span>
            </div>
        </div>
    `;

    track.appendChild(card);

});

// 무한 슬라이드를 위해 복제
reviews.forEach(review => {

    const card = document.createElement("div");
    card.className = "review-card";

    card.innerHTML = `
        <div class="review-star">${"★".repeat(review.star)}</div>

        <div class="review-text">
            ${review.text}
        </div>

        <div class="review-user">
            <div>
                ${review.name}
                <span>${review.car}</span>
            </div>
        </div>
    `;

    track.appendChild(card);

});

let current = 0;
let timer;

function getVisibleCards() {

    if (window.innerWidth <= 768) return 1;

    if (window.innerWidth <= 1024) return 2;

    return 3;

}

function slide() {

    const cards = document.querySelectorAll(".review-card");

    if (!cards.length) return;

    const gap = 30;

    const width = cards[0].offsetWidth + gap;

    current++;

    if (current >= reviews.length) {

        track.style.transition = "none";
        current = 0;
        track.style.transform = "translateX(0px)";

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                track.style.transition = ".7s ease";

            });

        });

    } else {

        track.style.transform = `translateX(-${width * current}px)`;

    }

}

function startSlider() {

    clearInterval(timer);

    timer = setInterval(slide, 3500);

}

startSlider();

track.addEventListener("mouseenter", () => {

    clearInterval(timer);

});

track.addEventListener("mouseleave", () => {

    startSlider();

});

window.addEventListener("resize", () => {

    current = 0;

    track.style.transition = "none";

    track.style.transform = "translateX(0px)";

    requestAnimationFrame(() => {

        track.style.transition = ".7s ease";

    });

});