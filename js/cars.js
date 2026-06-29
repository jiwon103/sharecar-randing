/* ==========================================================
   SHARECAR V2
   Cars Manager
========================================================== */

class ShareCar {

    constructor() {


                    this.currentPage = 0;

                    this.pageSize = 5;
                    this.totalPages = 1;

        this.cars = [];

        this.filteredCars = [];

        this.container = document.querySelector("#car-list");

        this.statusBox = document.querySelector("#car-list-status");

        this.searchInput = document.querySelector("#car-search");

        this.countItems = document.querySelectorAll("#car-count,.car-count-value");

        this.activeType = "전체";

        this.filterButtons =
        document.querySelectorAll(".filter-btn");

        this.sortButton =
        document.querySelector(".sort-btn");

        this.init();

    }

    async init(){

        this.setStatus(
            "loading",
            "차량 정보를 불러오는 중입니다.",
            "실시간 보유 차량 데이터를 확인하고 있습니다."
        );

        try{

            await this.loadCars();

            this.filteredCars = [...this.cars];

            this.render();
            
            this.renderFeatured();

        }catch(error){

            console.error("차량 목록을 불러오지 못했습니다.",error);

            this.cars = [];

            this.filteredCars = [];

            this.render();

            this.setStatus(
                "error",
                "차량 정보를 불러오지 못했습니다.",
                "잠시 후 다시 시도하거나 상담 문의를 이용해주세요."
            );

        }

        this.bindEvents();

    }

                    async loadCars(){

                        const result = await getCars();

                        this.cars = result.map(car => ({

                            image: car.imageurl,

                            model: car.model,

                            type: car.type,

                            origin: car.origin,

                            year: car.year,

                            color: car.color,

                            fuel: car.fuel,

                            mileage: car.mileage,

                            price: car.price,

                            status: car.status || "판매중",

                            recommend: car.recommend

                        }));

                    }


    render(){

        if(!this.container) return;

        this.container.innerHTML="";

        this.updateCount();

        if(!this.filteredCars.length){

            const hasLoadedCars=this.cars.length > 0;

            this.setStatus(
                "empty",
                hasLoadedCars ? "조건에 맞는 차량이 없습니다." : "등록된 차량이 없습니다.",
                hasLoadedCars ? "검색어 또는 필터를 변경해 다시 확인해주세요." : "상담 문의를 남겨주시면 원하는 조건의 차량을 안내해드리겠습니다."
            );

            return;

        }

        this.setStatus();

                            const fragment = document.createDocumentFragment();

                            this.totalPages = Math.ceil(
                                this.filteredCars.length / this.pageSize
                            );
                            // 현재 페이지 계산
                            const start = this.currentPage * this.pageSize;
                            const end = start + this.pageSize;

                            // 현재 페이지에 표시할 차량 10대만 가져오기
                            const pageCars = this.filteredCars.slice(start, end);

                            // 10대만 화면에 출력
                            pageCars.forEach((car, index) => {

                                fragment.appendChild(
                                    this.createCard(car, start + index)
                                );

                            });

                            this.container.appendChild(fragment);
                                this.renderPagination();
    }
    /******* */
    renderFeatured(){

console.log("renderFeatured 실행");

    const container=document.querySelector("#featured-list");

    if(!container) return;

    container.innerHTML="";

    const cars=this.cars
        .filter(car=>String(car.recommend).toUpperCase()=="TRUE")
        .slice(0,3);

    cars.forEach((car,index)=>{

        container.innerHTML+=`

        <article class="featured-card">

            <div class="featured-number">

                ${String(index+1).padStart(2,"0")}

            </div>

            <img src="${car.image}" alt="${car.model}">

            <div class="featured-content">

                <h3>${car.model}</h3>

                <p>

                    쉐어카 추천 차량

                </p>

                <ul>

                    <li>${car.type}</li>

                    <li>${car.fuel}</li>

                    <li>${car.year}년</li>

                </ul>

                <a href="#contact">

                    차량 보기 →

                </a>

            </div>

        </article>

        `;

    });

}
/**************************** */
                            renderPagination() {

                                const indicator = document.querySelector(".page-indicator");

                                if (!indicator) return;

                                indicator.innerHTML = "";

                                for (let i = 0; i < this.totalPages; i++) {

                                    const dot = document.createElement("span");

                                    dot.className = "page-dot";

                                    if (i === this.currentPage) {
                                        dot.classList.add("active");
                                    }

                                    dot.addEventListener("click", () => {

                                        this.currentPage = i;

                                        this.render();

                                        window.scrollTo({
                                            top: document.querySelector("#cars").offsetTop - 120,
                                            behavior: "smooth"
                                        });

                                    });

                                    indicator.appendChild(dot);

                                }
                                const prevBtn = document.querySelector(".page-btn.prev");
const nextBtn = document.querySelector(".page-btn.next");

if (prevBtn)
    prevBtn.disabled = this.currentPage === 0;

if (nextBtn)
    nextBtn.disabled = this.currentPage === this.totalPages - 1;

                            }


    updateCount(){

        this.countItems.forEach(item=>{

            item.textContent=this.filteredCars.length;

        });

    }

    setStatus(type="",title="",message=""){

        if(!this.statusBox) return;

        if(!type){

            this.statusBox.hidden=true;

            this.statusBox.removeAttribute("data-state");

            return;

        }

        this.statusBox.hidden=false;

        this.statusBox.dataset.state=type;

        const titleElement=this.statusBox.querySelector("strong");

        const messageElement=this.statusBox.querySelector("p");

        if(titleElement){

            titleElement.textContent=title;

        }

        if(messageElement){

            messageElement.textContent=message;

        }

    }

    createCard(car,index){

        const card=document.createElement("article");

        card.className="car-card reveal active";

        card.innerHTML=`

            <div class="car-thumb">

                <img
                    src="${car.image}"
                    alt="${car.model}"
                    loading="lazy"
                    decoding="async"
                >

                <span class="car-status">

                    ${car.status}

                </span>

            </div>

            <div class="car-info">

                <h3 class="car-title">

                    ${car.model}

                </h3>

                <div class="car-info">



                    <p class="car-summary">

                        ${car.year}년 · ${car.mileage}

                    </p>

                </div>

            </div>

        `;

        card.addEventListener("click", () => {

        if(window.carModal){

        window.carModal.open(car);

        }

});

        return card;

    }
convertDrive(url) {

    
    if (!url) return "";

    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);

    if (match) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }

    return url;
}
    bindEvents(){

        if(this.searchInput){

            this.searchInput.addEventListener("input",(e)=>{

                this.applyFilters(e.target.value);

            });

        }
                    const prevBtn = document.querySelector(".page-btn.prev");
                        const nextBtn = document.querySelector(".page-btn.next");

                        if (prevBtn) {

                            prevBtn.addEventListener("click", () => {

                                if (this.currentPage > 0) {

                                    this.currentPage--;

                                    this.render();

                                }

                            });

                        }

                        if (nextBtn) {

                            nextBtn.addEventListener("click", () => {

                                if (this.currentPage < this.totalPages - 1) {

                                    this.currentPage++;

                                    this.render();

                                }

                            });

                        }

        // if(this.container){

        //     this.container.addEventListener("click",(e)=>{

        //         const button=e.target.closest(".detail-btn");

        //         if(!button || !this.container.contains(button)) return;

        //         const car=this.filteredCars[Number(button.dataset.carIndex)];

        //         if(car && window.carModal){

        //             window.carModal.open(car);

        //         }

        //     });

        // }

        this.filterButtons.forEach(btn=>{

            btn.addEventListener("click",()=>{

                this.filterButtons.forEach(b=>

                    b.classList.remove("active")

                );

                btn.classList.add("active");

                this.activeType = btn.dataset.origin || "전체";

                this.applyFilters(this.searchInput ? this.searchInput.value : "");

            });

        });

        if(this.sortButton){

            this.sortButton.addEventListener("click",()=>{

                this.filteredCars.sort((a,b)=>

                    b.year.localeCompare(a.year)

                );

                this.render();

            });

        }

    }

    applyFilters(keyword=""){

        const normalizedKeyword=keyword.trim().toLowerCase();

        this.filteredCars=this.cars.filter(car=>{

            const matchesKeyword=!normalizedKeyword ||
                String(car.model || "").toLowerCase().includes(normalizedKeyword);

            const matchesType =
                this.activeType==="전체" ||
                car.origin===this.activeType;
            return matchesKeyword && matchesType;

        });

        this.render();

    }

}

window.addEventListener("DOMContentLoaded",()=>{

    window.shareCar=new ShareCar();

});

