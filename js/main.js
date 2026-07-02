/* ==========================
HERO VIDEO
========================== */

const heroVideo = document.getElementById("heroVideo");

const videos = [
    "assets/video/hero1.mp4",
    "assets/video/hero2.mp4"
];

let currentVideo = 0;

heroVideo.addEventListener("ended",()=>{

    heroVideo.style.opacity=0;

    setTimeout(()=>{

        currentVideo=(currentVideo+1)%videos.length;

        heroVideo.src=videos[currentVideo];

        heroVideo.load();

        heroVideo.play();

    },400);

});

heroVideo.addEventListener("loadeddata",()=>{

    heroVideo.style.opacity=1;

});


/* ==========================
EVENT POPUP
========================== */

const banner=document.getElementById("event-banner");

const moreBtn=document.querySelector(".event-more");

const eventModal=document.querySelector(".event-modal");

const eventImage=document.getElementById("event-modal-image");

const eventClose=document.querySelector(".event-modal-close");

function openEventPopup(){

    eventImage.src=banner.src;

    eventModal.classList.add("active");

}

banner.addEventListener("click",openEventPopup);

moreBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    openEventPopup();

});

eventClose.addEventListener("click",()=>{

    eventModal.classList.remove("active");

});

eventModal.addEventListener("click",(e)=>{

    if(e.target===eventModal){

        eventModal.classList.remove("active");

    }

});

// **///////

const floatingMenu = document.querySelector(".floating-menu");
const lightSections = document.querySelectorAll(".light-section");

function updateFloatingMenu(){

    const center = window.innerHeight / 2;

    let isLight = false;

    lightSections.forEach(section=>{

        const rect = section.getBoundingClientRect();

        if(rect.top <= center && rect.bottom >= center){

            isLight = true;

        }

    });

    if(isLight){

        floatingMenu.classList.add("light-mode");

    }else{

        floatingMenu.classList.remove("light-mode");

    }

}

window.addEventListener("scroll", updateFloatingMenu);
window.addEventListener("resize", updateFloatingMenu);

updateFloatingMenu();