/* ==========================================================
   SHARECAR V2
   Modal Manager
========================================================== */

const BRAND_LOGOS = {

    "BMW": "assets/logo/bmw.svg",

    "Mercedes-Benz": "assets/logo/mercedes.svg",

    "Audi": "assets/logo/audi.svg",

    "Genesis": "assets/logo/genesis.svg",

    "Bentley": "assets/logo/bentley.svg",

    "Porsche": "assets/logo/porsche.svg",

    "Ferrari": "assets/logo/ferrari.svg",

    "Lamborghini": "assets/logo/lamborghini.svg",

    "Tesla": "assets/logo/tesla.svg",

    "Land Rover": "assets/logo/landrover.svg",

    "Mini": "assets/logo/mini.svg"

};
/********/

class CarModal {

    constructor(){

        this.modal=document.querySelector("#car-modal");

        this.image=document.querySelector("#modal-img");

        this.title=document.querySelector("#modal-title");

        this.type=document.querySelector("#modal-type");

        this.year=document.querySelector("#modal-year");

        this.color=document.querySelector("#modal-color");

        this.fuel=document.querySelector("#modal-fuel");

        this.mileage=document.querySelector("#modal-mileage");

        this.price=document.querySelector("#modal-price");

        this.brandLogo=document.querySelector("#modal-brand-logo");

        // const status = document.querySelector("#modal-status");

        // if(status){

        // status.textContent = car.status;

        // }
        
        this.closeBtn=document.querySelector(".modal-close");

        this.bind();

    }

    bind(){

        this.closeBtn.addEventListener("click",()=>{

            this.close();

        });

        this.modal.addEventListener("click",(e)=>{

            if(e.target===this.modal){

                this.close();

            }

        });

        document.addEventListener("keydown",(e)=>{

            if(e.key==="Escape"){

                this.close();

            }

        });

    }

open(car){

    this.image.src = this.convertDrive(car.image);
    this.image.alt = car.model;
    // this.brandLogo.alt = car.brand + " 로고";
    this.title.textContent = car.model;

    this.type.textContent = car.type;
    this.year.textContent = car.year;
    this.mileage.textContent =
    Number(String(car.mileage).replace(/[^\d]/g, ""))
        .toLocaleString("ko-KR") + "km";
    this.color.textContent = car.color;
    this.fuel.textContent = car.fuel;
    this.price.textContent =
    Number(String(car.price).replace(/[^\d]/g, ""))
        .toLocaleString("ko-KR") + "원";
    
    this.brandLogo.src =
    BRAND_LOGOS[car.brand] ||
    "assets/logo/default.svg";

    this.modal.classList.add("show");

    document.body.style.overflow = "hidden";

}

    close(){

        this.modal.classList.remove("show");

        document.body.style.overflow="";

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

}

window.addEventListener("DOMContentLoaded",()=>{

    window.carModal=new CarModal();

});
