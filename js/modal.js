/* ==========================================================
   SHARECAR V2
   Modal Manager
========================================================== */

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

        this.image.src=this.convertDrive(car.image);

        this.title.textContent=car.model;

        this.type.textContent="차종 : "+car.type;

        this.year.textContent="연식 : "+car.year;

        this.color.textContent="색상 : "+car.color;

        this.fuel.textContent="연료 : "+car.fuel;

        this.mileage.textContent="주행거리 : "+car.mileage;

        this.price.textContent="가격 : "+car.price;

        this.modal.classList.add("show");

        document.body.style.overflow="hidden";

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
