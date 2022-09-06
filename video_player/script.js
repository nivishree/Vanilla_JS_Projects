const video = document.getElementById('video');
const play = document.getElementById('play');
const stopI = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');


play.addEventListener('click', toggleVideoStatus)
stopI.addEventListener('click', stopVideo)
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayicon)
video.addEventListener('play', updatePlayicon)
video.addEventListener('timeupdate', updateProgress)
progress.addEventListener('change', setVideoProgress)

function toggleVideoStatus(){
if(video.paused){
    video.play();
}else video.pause();
}

function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

function updatePlayicon() {
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    }else play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
}

function updateProgress() {
    progress.value = ( video.currentTime / video.duration) * 100;

    let mins = Math.floor(video.currentTime /60);
    if(mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerText = `${mins}:${secs}`;
}

function setVideoProgress() {
    video.currentTime =( +progress.value * video.duration) /100;
}