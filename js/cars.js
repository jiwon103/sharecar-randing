/* ==========================================================
   SHARECAR V2
   Cars Manager
========================================================== */

class ShareCar {

    constructor() {

                    this.csvUrl =
                    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRou7lOLzRsClUxJ22uKZgtxxtiZTUrIvgvrNTkTMQYkR5DwAOET-UYsusXd-C_alVh7vHsOwrqWLEW/pub?output=csv";

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

            


        return new Promise((resolve,reject)=>{

            Papa.parse(this.csvUrl,{

                download:true,

                header:true,

                skipEmptyLines:true,

                complete:(result)=>{

console.log("성공");
    console.log(result);
    console.log(result.data);

                    this.cars=result.data.map(car=>({

                        image:car.imageurl,

                        model:car.model,

                        type:car.type,

                        year:car.year,

                        color:car.color,

                        fuel:car.fuel,

                        mileage:car.mileage,

                        price:car.price,

                        status:car.status || "대여가능"

                    }));

                    resolve();

                },

                error:reject

            });

        });

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

        const fragment=document.createDocumentFragment();

        this.filteredCars.forEach((car,index)=>{

            fragment.appendChild(
                this.createCard(car,index)
            );

        });

        this.container.appendChild(fragment);

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
                    src="${this.convertDrive(car.image)}"
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



                    <p class="car-year">
                        ${car.year}년
                    </p>

                    <p class="car-mileage">
                        ${car.mileage}
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
        convertDrive(url){

        if(!url) return "image/car_kakao-001.png";

        if(url.includes("drive.google.com")){

            const match=url.match(/[-\\w]{25,}/);

            if(match){

                return `https://lh3.googleusercontent.com/d/${match[0]}`;

            }

        }

        return url;

    }
    bindEvents(){

        if(this.searchInput){

            this.searchInput.addEventListener("input",(e)=>{

                this.applyFilters(e.target.value);

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

                this.activeType=btn.textContent.trim();

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

            const matchesType=this.activeType==="전체" || car.type===this.activeType;

            return matchesKeyword && matchesType;

        });

        this.render();

    }

}

window.addEventListener("DOMContentLoaded",()=>{

    window.shareCar=new ShareCar();

});

