/* ===========================================
   SHARECAR REVIEW SLIDER V2
=========================================== */

const reviews = [

    {
        name:"김○○",
        car:"BMW 520i M Sport",
        star:5,
        text:"상담부터 차량 인수까지 정말 빠르고 친절했습니다. 차량 상태도 기대 이상이었습니다."
    },

    {
        name:"박○○",
        car:"GV80",
        star:5,
        text:"차량 컨디션이 정말 좋았습니다. 다음에도 이용하고 싶은 서비스입니다."
    },

    {
        name:"이○○",
        car:"벤츠 E300",
        star:5,
        text:"사진과 동일한 차량이었고 상담도 친절해서 만족했습니다."
    },

    {
        name:"정○○",
        car:"G80",
        star:5,
        text:"예약부터 인수까지 정말 간편했습니다. 추천드립니다."
    },

    {
        name:"최○○",
        car:"K8",
        star:5,
        text:"원하는 일정에 맞춰 이용할 수 있어서 너무 편리했습니다."
    },

    {
        name:"한○○",
        car:"쏘렌토",
        star:5,
        text:"첫 이용이라 걱정했는데 너무 만족스러웠습니다."
    },

    {
        name:"강○○",
        car:"BMW X5",
        star:5,
        text:"차량 관리가 정말 잘 되어 있어서 믿음이 갔습니다."
    },

    {
        name:"송○○",
        car:"카니발",
        star:5,
        text:"가족여행용으로 이용했는데 너무 만족했습니다."
    },

    {
        name:"임○○",
        car:"아우디 A6",
        star:5,
        text:"수입차인데도 상태가 너무 좋았습니다."
    },

    {
        name:"윤○○",
        car:"그랜저",
        star:5,
        text:"차량도 깨끗했고 상담도 빨랐습니다."
    },

    {
        name:"오○○",
        car:"BMW 7 Series",
        star:5,
        text:"다음에도 무조건 이용하고 싶습니다."
    },

    {
        name:"조○○",
        car:"제네시스 GV70",
        star:5,
        text:"친절하고 빠른 진행 덕분에 편하게 이용했습니다."
    }

];


/* ===========================================
   ELEMENT
=========================================== */

const slider = document.querySelector(".review-slider");
const track = document.querySelector(".review-track");
const pagination = document.querySelector(".review-pagination");

let currentPage = 0;
let timer;

let isDragging = false;

let startX = 0;

const DRAG_DISTANCE = 60;


/* ===========================================
   CARD
=========================================== */

function createCard(review){

    const card = document.createElement("article");

    card.className = "review-card";

    card.innerHTML = `

        <div class="review-star">

            ${"★".repeat(review.star)}

        </div>

        <div class="review-text">

            ${review.text}

        </div>

        <div class="review-footer">

            <div class="review-car">

                ${review.car}

            </div>

            <div class="review-user">

                ${review.name} 고객

            </div>

        </div>

    `;

    return card;

}


/* ===========================================
   PAGE CREATE
=========================================== */

const pageCount = Math.ceil(reviews.length / 4);

for(let i=0;i<pageCount;i++){

    const page = document.createElement("div");

    page.className = "review-page";

    const items = reviews.slice(i*4,i*4+4);

    items.forEach(review=>{

        page.appendChild(createCard(review));

    });

    track.appendChild(page);

}


/* ===========================================
   PAGINATION
=========================================== */

for(let i=0;i<pageCount;i++){

    const dot=document.createElement("span");

    if(i===0){

        dot.classList.add("active");

    }

    dot.addEventListener("click",()=>{

        move(i);

    });

    pagination.appendChild(dot);

}


/* ===========================================
   MOVE
=========================================== */

function move(index){

    currentPage=index;

    track.style.transform=
        `translateX(-${index*100}%)`;

    document
    .querySelectorAll(".review-pagination span")
    .forEach(dot=>dot.classList.remove("active"));

    document
    .querySelectorAll(".review-pagination span")[index]
    .classList.add("active");

}


/* ===========================================
   AUTO
=========================================== */

function next(){

    currentPage++;

    if(currentPage>=pageCount){

        currentPage=0;

    }

    move(currentPage);

}


function start(){

    clearInterval(timer);

    timer=setInterval(next,5000);

}

start();

/* ===========================================
   DRAG
=========================================== */

slider.style.cursor = "grab";

slider.addEventListener("pointerdown",(e)=>{

    isDragging = true;

    startX = e.clientX;

    slider.style.cursor = "grabbing";

    clearInterval(timer);

});

window.addEventListener("pointerup",(e)=>{

    if(!isDragging) return;

    isDragging = false;

    slider.style.cursor = "grab";

    const diff = e.clientX - startX;

    if(diff < -DRAG_DISTANCE){

        next();

    }

    else if(diff > DRAG_DISTANCE){

        currentPage--;

        if(currentPage < 0){

            currentPage = pageCount - 1;

        }

        move(currentPage);

    }

    start();

});

/* ===========================================
   TOUCH
=========================================== */

slider.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

    clearInterval(timer);

});

slider.addEventListener("touchend",(e)=>{

    const endX = e.changedTouches[0].clientX;

    const diff = endX - startX;

    if(diff < -DRAG_DISTANCE){

        next();

    }

    else if(diff > DRAG_DISTANCE){

        currentPage--;

        if(currentPage < 0){

            currentPage = pageCount - 1;

        }

        move(currentPage);

    }

    start();

});


/* ===========================================
   HOVER
=========================================== */

slider.addEventListener("mouseenter",()=>{

    clearInterval(timer);

});

slider.addEventListener("mouseleave",()=>{

    start();

});