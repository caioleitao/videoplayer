var playerVideo, view, timer, Preloader, videoPreloader;

var btnPlay;

var hour, min, seg, currentHour, currentMin, currentSeg;

var intervalTimer;

var barProgress, videoLoader, progress;

var pctSeek, pctBar;

var temp;

function prepare(elem){
    if(playerVideo != elem){
        playerVideo = elem;

        view = playerVideo.querySelector(".video-view");
        timer = playerVideo.querySelector('.video-time');

        barProgress = playerVideo.querySelector('.video-progress-bar');
        videoLoader = playerVideo.querySelector('.video-loader');
        progress = playerVideo.querySelector('.video-progress');

        barProgress.addEventListener('click', seeker);

        btnPlay = playerVideo.querySelector('.video-play');
        btnPlay.addEventListener('click', play);

        intervalTimer = setInterval(updateTimer, 100)

        videoPreloader = playerVideo.querySelector('.video-preloader');
        view.addEventListener('waiting', loader);
        view.addEventListener('playing', loader);
    }
}

function loader(event){
    switch(event.type){
        case 'waiting':
            videoPreloader.style.display = "block";
            break;
        case 'playing':
            videoPreloader.style.display = "none";
            break;
    }
}

function seeker(){
    pctBar = (event.clientX / barProgress.clientWidth) *100 - 11;
    view.currentTime = (view.duration * pctBar) / 100 ;
}

function updateTimer(){

    bufferedEnd = view.buffered.end(view.buffered.lenght - 1);

    videoLoader.style.width = String((bufferedEnd / view.duration) * 100)+'%';

    pctSeek = (view.currentTime / view.duration) * 100;

    progress.style.width = String(pctSeek)+'%';

    horas = Math.floor(view.duration / 300);
    minutos = Math.floor(view.duration / 60);
    segundos = Math.floor(((view.duration / 60) % 1) * 60);

    currentHour = Math.floor((view.currentTime - view.duration) / 3600);
    currentMin = Math.floor((view.currentTime - view.duration) / 60);
    currentSeg = Math.floor((((view.currentTime - view.duration) / 60) % 1) *60);

    timer.innerHTML = converteTimer(currentHour, currentMin, currentSeg);


}

function play(){
    if(view.played.length != 0){
        if(view.played.start(0)==0 & !view.paused){

            view.pause();
            btnPlay.style.backgroundImage = "url(_img/play.png)";
        }else{

            view.play();
            btnPlay.style.backgroundImage = "url(_img/pause.png)";
        }

    }else{
        view.play();
    }
}

function converteTimer(horas, minutos, segundos){

    if(minutos<10){
        minutos = '0' +String(minutos);
    }else if(minutos > 59){
        minutos = minutos - (Math.floor(minutos / 60) * 60);
    }

    if(segundos<10){
        segundos = "0" + String(segundo);
    }

    return String(minutos) + ':' + String(segundos);

}

