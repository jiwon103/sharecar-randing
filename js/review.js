/* ===========================================
   REVIEW DATA
=========================================== */

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


/* ===========================================
   CREATE CARD
=========================================== */

const track = document.querySelector(".review-track");

function createCard(review){

    const card = document.createElement("div");

    card.className = "review-card";

    card.innerHTML = `
        <div class="review-star">
            ${"★".repeat(review.star)}
        </div>

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

    return card;

}


/* ===========================================
   CREATE DOM
=========================================== */

// 앞 복제
reviews.slice(-3).forEach(review=>{

    track.appendChild(createCard(review));

});

// 원본
reviews.forEach(review=>{

    track.appendChild(createCard(review));

});

// 뒤 복제
reviews.slice(0,3).forEach(review=>{

    track.appendChild(createCard(review));

});


const cards = [...document.querySelectorAll(".review-card")];

const gap = 45;

let current = 3;

let timer = null;

let dragging = false;

let startX = 0;

let isAnimating = false;

const AUTO_DELAY = 5500;

const DRAG_DISTANCE = 35;

track.style.transition =
".8s cubic-bezier(.22,.61,.36,1)";


/* ===========================================
   UPDATE
=========================================== */
let cardWidth = 0;

function calculateWidth(){

    cardWidth = cards[0].offsetWidth + gap;

}

function update(){

    calculateWidth();

    track.style.transform =
        `translateX(-${cardWidth * current}px)`;

    cards.forEach(card=>card.classList.remove("active"));

    const centerCard = cards[current + 1];

    if(centerCard){

        centerCard.classList.add("active");

    }

}


/* ===========================================
   NEXT / PREV
=========================================== */

function next(){

    if(isAnimating) return;

    isAnimating = true;


    current++;

    update();

}

function prev(){

    if(isAnimating) return;

    isAnimating = true;

    clearInterval(timer);

    current--;

    update();

}


/* ===========================================
   LOOP
=========================================== */

track.addEventListener("transitionend",()=>{

    if(current===reviews.length+3){

        track.style.transition="none";

        current=3;

        update();

        requestAnimationFrame(()=>{

            track.style.transition=
            ".8s cubic-bezier(.22,.61,.36,1)";

        });

    }

    if(current===0){

        track.style.transition="none";

        current=reviews.length;

        update();

        requestAnimationFrame(()=>{

            track.style.transition=
            ".8s cubic-bezier(.22,.61,.36,1)";

        });

    }

    isAnimating = false;

    if(!dragging){

        start();}


});


/* ===========================================
   AUTO SLIDE
=========================================== */

function start(){

    clearInterval(timer);

    timer=setInterval(()=>{

        if(isAnimating) return;

        isAnimating=true;

        clearInterval(timer);

        current++;

        update();

    },AUTO_DELAY);

}

start();


/* ===========================================
   BUTTON
=========================================== */

const nextBtn=document.querySelector(".review-next");

const prevBtn=document.querySelector(".review-prev");

nextBtn.addEventListener("click",()=>{

    next();

});

prevBtn.addEventListener("click",()=>{

    prev();

});


/* ===========================================
   HOVER
=========================================== */

track.addEventListener("mouseenter",()=>{

    clearInterval(timer);

});

track.addEventListener("mouseleave",()=>{

    start();

});

/* ===========================================
   DRAG
=========================================== */

track.style.cursor="grab";

track.addEventListener("pointerdown",(e)=>{

    dragging=true;

    startX=e.clientX;

    track.style.cursor="grabbing";

    clearInterval(timer);

});


window.addEventListener("pointerup",(e)=>{

    if(!dragging) return;

    dragging=false;

    track.style.cursor="grab";

    const diff=e.clientX-startX;

    if(diff>DRAG_DISTANCE){

        prev();

    }

    else if(diff<-DRAG_DISTANCE){

        next();

    }

    else{

        start();

    }

});


/* ===========================================
   TOUCH
=========================================== */

track.addEventListener("touchstart",(e)=>{

    startX=e.touches[0].clientX;

    clearInterval(timer);

});

track.addEventListener("touchend",(e)=>{

    const endX=e.changedTouches[0].clientX;

    const diff=endX-startX;

    if(diff>DRAG_DISTANCE){

        prev();

    }

    else if(diff<-DRAG_DISTANCE){

        next();

    }

    else{

        start();

    }

});


/* ===========================================
   RESIZE
=========================================== */
let resizeTimer;

window.addEventListener("resize",()=>{

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(()=>{

        update();

    },150);

});


/* ===========================================
   INIT
=========================================== */

requestAnimationFrame(()=>{

    update();

});


/* ===========================================
   KEYBOARD (선택)
=========================================== */

window.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        next();

    }

    if(e.key==="ArrowLeft"){

        prev();

    }

});


/* ===========================================
   PREVENT DOUBLE CLICK
=========================================== */

[nextBtn,prevBtn].forEach(btn=>{

    btn.addEventListener("dblclick",(e)=>{

        e.preventDefault();

    });

});


/* ===========================================
   END
=========================================== */