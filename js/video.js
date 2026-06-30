/* =====================================
   CAR GO PROCESS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const processInfo = [

    {
        title: "차량선택",
        text: "수요에 맞춘 차량을 선택하고 담당자와 상담을 진행합니다."
    },

    {
        title: "차량정비",
        text: "전문 정비사가 차량 상태를 꼼꼼하게 점검합니다."
    },

    {
        title: "차량출고",
        text: "출고 절차를 진행하고 고객님께 차량을 인계합니다."
    },

    {
        title: "차량운행",
        text: "안전하게 차량을 운행하시면 됩니다."
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

