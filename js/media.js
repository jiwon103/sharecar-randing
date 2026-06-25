/* ==========================================================
   SHARECAR V2
   Media Switch
========================================================== */

class MediaPlayer{

    constructor(){

        this.container=document.querySelector("#media-container");

        this.layer1=document.querySelector("#media-layer-1");

        this.layer2=document.querySelector("#media-layer-2");

        this.active=this.layer1;

        this.inactive=this.layer2;

        this.controls=document.querySelector("[data-media-controls]");

        if(!this.container || !this.layer1 || !this.layer2) return;

        this.bind();

    }

    bind(){

        if(!this.controls) return;

        this.controls.addEventListener("click",(event)=>{

            const button=event.target.closest(".video-btn");

            if(!button || !this.controls.contains(button)) return;

            this.setActiveButton(button);

            this.switch(button.dataset.mediaSrc,button.dataset.mediaType || "video");

        });

    }

    setActiveButton(activeButton){

        this.controls.querySelectorAll(".video-btn").forEach(button=>{

            const isActive=button===activeButton;

            button.classList.toggle("active",isActive);

            button.setAttribute("aria-pressed",String(isActive));

        });

    }

    switch(src,type="video"){

        if(!src || !this.active || !this.inactive) return;

        let element;

        if(type==="video"){

            element=document.createElement("video");

            element.src=src;

            element.autoplay=true;

            element.loop=true;

            element.muted=true;

            element.playsInline=true;

            element.preload="metadata";

        }else{

            element=document.createElement("img");

            element.src=src;

            element.alt="ShareCar 차량 이미지";

            element.loading="lazy";

        }

        this.inactive.innerHTML="";

        this.inactive.appendChild(element);

        this.inactive.classList.add("active");

        this.active.classList.remove("active");

        [this.active,this.inactive]=[this.inactive,this.active];

    }

}

window.mediaPlayer=new MediaPlayer();

function switchMedia(src,type){

    if(window.mediaPlayer){

        window.mediaPlayer.switch(src,type);

    }

}
