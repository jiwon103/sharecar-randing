/* =====================================
   CAR GO PROCESS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const processInfo = [

    {
        title: "01. 차량 선택",
        text: "원하는 차량을 선택하세요."
    },

    {
        title: "02. 선납금 확인",
        text: "선납금만 확인하고 이용할 준비 완료!"
    },

    {
        title: "03. 계약 및 출고",
        text: "간편한 계약 후 바로 출고됩니다."
    },

    {
        title: "04. 타면 끝!",
        text: "차량 인수 후 자유롭게 이용하세요."
    }

];


    const cards = document.querySelectorAll(".process-card");
    const steps = document.querySelectorAll(".step-index");
    const progress = document.querySelector(".progress-fill");
    const videoTitle = document.getElementById("videoTitle");
    const videoText = document.getElementById("videoText");

    const layer1 = document.getElementById("media-layer-1");
    const layer2 = document.getElementById("media-layer-2");

    let activeLayer = layer1;
    let hiddenLayer = layer2;

    let current = 0;

    function updateUI(index){

        cards.forEach((card,i)=>{

            card.classList.toggle("active",i===index);

        });

        steps.forEach((step,i)=>{

            step.classList.toggle("active",i===index);

        });

        progress.style.width=((index+1)/cards.length*100)+"%";

        videoTitle.textContent = processInfo[index].title;
        videoText.textContent = processInfo[index].text;


    }

    function createVideo(src){

        const video=document.createElement("video");

        video.src=src;

        video.autoplay=true;

        video.muted=true;

        video.playsInline=true;

        video.preload="auto";

        video.onended=()=>{

            nextVideo();

        };

        return video;

    }

    function changeVideo(index){

        current=index;

        const src=cards[index].dataset.mediaSrc;

        hiddenLayer.innerHTML="";

        const video=createVideo(src);

        hiddenLayer.appendChild(video);

        requestAnimationFrame(()=>{

            hiddenLayer.classList.add("active");

            activeLayer.classList.remove("active");

            [activeLayer,hiddenLayer]=[hiddenLayer,activeLayer];

        });

        updateUI(index);

    }

    function nextVideo(){

        let next=current+1;

        if(next>=cards.length){

            next=0;

        }

        changeVideo(next);

    }

    cards.forEach((card,index)=>{

        card.addEventListener("click",()=>{

            changeVideo(index);

        });

    });

    updateUI(0);

    const firstVideo=layer1.querySelector("video");

    if(firstVideo){

        firstVideo.loop=false;

        firstVideo.onended=()=>{

            nextVideo();

        };

    }

});

