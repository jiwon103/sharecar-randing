const heroVideo = document.getElementById("heroVideo");

const videos = [
    "assets/video/hero1.mp4",
    "assets/video/hero2.mp4",
    "assets/video/hero3.mp4"
];

let currentVideo = 0;

heroVideo.addEventListener("ended", () => {

    heroVideo.style.opacity = 0;

    setTimeout(() => {

        currentVideo = (currentVideo + 1) % videos.length;

        heroVideo.src = videos[currentVideo];

        heroVideo.load();

        heroVideo.play();

    }, 400);

});

heroVideo.addEventListener("loadeddata", () => {

    heroVideo.style.opacity = 1;

});