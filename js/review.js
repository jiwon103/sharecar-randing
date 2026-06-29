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

function createCard(review){

    const card = document.createElement("div");

    card.className="review-card";

    card.innerHTML=`
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

// 앞쪽 복제
reviews.slice(-3).forEach(r=>{

    track.appendChild(createCard(r));

});

// 원본

reviews.forEach(r=>{

    track.appendChild(createCard(r));

});

// 뒤쪽 복제

reviews.slice(0,3).forEach(r=>{

    track.appendChild(createCard(r));

});

const cards=document.querySelectorAll(".review-card");

let current=3;

let timer;

const gap=45;

track.style.transition=".7s cubic-bezier(.22,.61,.36,1)";

function update(){

    const width=cards[0].offsetWidth+gap;

    track.style.transform=`translateX(-${width*current}px)`;

    cards.forEach(card=>{

        card.classList.remove("active");

    });

    cards[current].classList.add("active");

}

update();

function next(){

    current++;

    update();

}

function prev(){

    current--;

    update();

}

track.addEventListener("transitionend",()=>{

    if(current===reviews.length+3){

        track.style.transition="none";

        current=3;

        update();

        requestAnimationFrame(()=>{

            track.style.transition=".7s cubic-bezier(.22,.61,.36,1)";

        });

    }

    if(current===0){

        track.style.transition="none";

        current=reviews.length;

        update();

        requestAnimationFrame(()=>{

            track.style.transition=".7s cubic-bezier(.22,.61,.36,1)";

        });

    }

});

function start(){

    clearInterval(timer);

    timer=setInterval(next,4500);

}

start();

track.addEventListener("mouseenter",()=>{

    clearInterval(timer);

});

track.addEventListener("mouseleave",()=>{

    start();

});

document.querySelector(".review-next").onclick=next;

document.querySelector(".review-prev").onclick=prev;


// ===== 드래그 =====

let startX=0;

let dragging=false;

track.addEventListener("pointerdown",(e)=>{

    dragging=true;

    startX=e.clientX;

    clearInterval(timer);

});

window.addEventListener("pointerup",(e)=>{

    if(!dragging) return;

    dragging=false;

    const diff=e.clientX-startX;

    if(diff>70){

        prev();

    }

    else if(diff<-70){

        next();

    }

    start();

});

window.addEventListener("resize",()=>{

    update();

});