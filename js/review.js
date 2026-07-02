/* ===========================================
   SHARECAR REVIEW SLIDER V2
=========================================== */

const reviews = [

    {
        tag:"BMW 520i 이용 고객",

        title:"상담부터 출고까지\n정말 빨랐어요.",

        desc:"생각보다 진행이 훨씬 빨라서 놀랐습니다.\n차량 상태도 정말 만족스러웠습니다.",

        highlight:"다음에도 꼭 다시 이용할 예정입니다.",

        user:"30대 직장인 김○○님"
    },

    {
        tag:"GV80 이용 고객",

        title:"원하는 차량을\n부담 없이 이용했습니다.",

        desc:"처음엔 걱정했는데 상담부터 출고까지\n모든 과정이 정말 친절했습니다.",

        highlight:"가족들도 모두 만족했습니다.",

        user:"40대 자영업 박○○님"
    },

    {
        tag:"벤츠 E300 이용 고객",

        title:"사진 그대로의\n차량이었습니다.",

        desc:"실제로 받아보니 차량 컨디션이\n기대 이상이라 정말 만족했습니다.",

        highlight:"수입차도 믿고 이용할 수 있습니다.",

        user:"30대 프리랜서 이○○님"
    },

    {
        tag:"G80 이용 고객",

        title:"차량 상태가\n정말 좋았습니다.",

        desc:"내 차처럼 관리되어 있어서\n안심하고 이용했습니다.",

        highlight:"주변에도 추천하고 있습니다.",

        user:"50대 사업자 정○○님"
    },

    {
        tag:"BMW X5 이용 고객",

        title:"SUV도 정말\n깨끗했습니다.",

        desc:"장거리 여행이었는데 차량 상태가\n너무 좋아 편하게 다녀왔습니다.",

        highlight:"SUV 이용도 적극 추천합니다.",

        user:"40대 김○○님"
    },

    {
        tag:"카니발 이용 고객",

        title:"가족 여행에\n딱이었습니다.",

        desc:"아이들과 함께 이용했는데\n너무 만족스러웠습니다.",

        highlight:"가족 여행이라면 꼭 추천합니다.",

        user:"30대 박○○님"
    },
    {
    tag:"제네시스 G90 이용 고객",

    title:"처음 이용인데도\n정말 편했습니다.",

    desc:"상담도 빠르고 진행 과정이 명확해서\n처음인데도 어렵지 않았습니다.",

    highlight:"주변에도 추천하고 싶을 만큼 만족했습니다.",

    user:"40대 법인사업자 최○○님"
},

{
    tag:"BMW X7 이용 고객",

    title:"차량 상태가\n정말 최고였습니다.",

    desc:"사진보다 실물이 훨씬 좋았고\n실내도 매우 깨끗했습니다.",

    highlight:"프리미엄 차량을 믿고 이용할 수 있었습니다.",

    user:"30대 자영업 김○○님"
},

{
    tag:"아우디 A7 이용 고객",

    title:"상담이 정말\n친절했습니다.",

    desc:"궁금한 점을 하나하나 설명해 주셔서\n안심하고 진행했습니다.",

    highlight:"다음 차량도 CAR GO를 이용할 예정입니다.",

    user:"30대 직장인 박○○님"
},

{
    tag:"GV70 이용 고객",

    title:"생각보다 훨씬\n간편했습니다.",

    desc:"절차가 복잡할 줄 알았는데\n상담부터 출고까지 정말 빨랐습니다.",

    highlight:"처음 이용하는 분들에게도 추천합니다.",

    user:"20대 프리랜서 이○○님"
},

{
    tag:"벤츠 S580 이용 고객",

    title:"프리미엄 서비스가\n느껴졌습니다.",

    desc:"차량 관리 상태도 좋고\n응대도 정말 만족스러웠습니다.",

    highlight:"고급 차량도 믿고 맡길 수 있었습니다.",

    user:"50대 대표 김○○님"
},

{
    tag:"카니발 하이리무진 이용 고객",

    title:"가족 모두\n만족했습니다.",

    desc:"장거리 여행 동안 정말 편하게 이용했고\n아이들도 매우 좋아했습니다.",

    highlight:"가족 여행이라면 적극 추천합니다.",

    user:"40대 직장인 한○○님"
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

        <div class="review-tag">

            ${review.tag}

        </div>



        <h3>

            ${review.title.replace(/\n/g,"<br>")}

        </h3>

        <p>

            ${review.desc.replace(/\n/g,"<br>")}

        </p>

        <strong>

            ${review.highlight}

        </strong>

        <div class="review-user">

            <strong>

                ${review.user}

            </strong>

            <span>

                REAL REVIEW

            </span>

        </div>

    `;

    return card;

}


/* ===========================================
   PAGE CREATE
=========================================== */

const pageCount = Math.ceil(reviews.length / 3);

for(let i=0;i<pageCount;i++){

    const page = document.createElement("div");

    page.className = "review-page";

    const items = reviews.slice(i*3,i*3+3);

    items.forEach(review=>{

        page.appendChild(createCard(review));

    });

    track.appendChild(page);

}


const prevBtn = document.querySelector(".review-arrow.prev");
const nextBtn = document.querySelector(".review-arrow.next");

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

    if(index >= pageCount){

        index = 0;

    }

    if(index < 0){

        index = pageCount - 1;

    }

    currentPage = index;

    track.style.transform =
        `translateX(-${currentPage * 100}%)`;

    document
        .querySelectorAll(".review-pagination span")
        .forEach(dot=>dot.classList.remove("active"));

    document
        .querySelectorAll(".review-pagination span")[currentPage]
        .classList.add("active");

}

function next(){

    move(currentPage + 1);

}

function prev(){

    move(currentPage - 1);

}

nextBtn.addEventListener("click",()=>{

    next();

    start();

});

prevBtn.addEventListener("click",()=>{

    prev();

    start();

});

function start(){

    clearInterval(timer);

    timer = setInterval(()=>{

        next();

    },5000);

}

start();

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

        prev();

    }

    start();

});

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

        prev();

    }

    start();

});

slider.addEventListener("mouseenter",()=>{

    clearInterval(timer);

});

slider.addEventListener("mouseleave",()=>{

    start();

});

