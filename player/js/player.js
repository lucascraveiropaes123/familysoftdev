var i = 0;
var playlist = [
    {
        mp3:'player/js/musics/Patience.mp3' ,
        title:'Patience - Guns and Roses',
        image: 'player/js/img/Guns.jpg'
    },
    {
        mp3:'player/js/musics/A Prophecy.mp3' ,
        title:'A Prophecy - Asking Alexandria',
        image: 'player/js/img/AA.jpg'

    },
    {
        mp3:'player/js/musics/Follow_You.mp3' ,
        title:'Follow You - Bring Me The Horizon',
        image: 'player/js/img/BMTH.jpg'
    },
]; 

audio = document.getElementById('audio');
var player = document.getElementById('player');

audio.addEventListener('play', play_event , false);
audio.addEventListener('timeupdate', atualizar , false);

document.onload = setPlayer();

function setPlayer(){
    if(audio.canPlayType("audio/mp3") != ''){
        audio.src = playlist[i].mp3;
        document.getElementById('music-cover').src = playlist[i].image;
    }
}

function play(){
    audio.play();
    play_event();
    document.getElementById('button-play').style.display = "none";
    document.getElementById('button-pause').style.display = "inline-block";
}

function pause(){
    audio.pause();
    document.getElementById('button-pause').style.display = "none";
    document.getElementById('button-play').style.display = "inline-block";
}

function play_event(){
    document.getElementById('actual-time').innerHTML = secToStr( audio.currentTime) ;
    document.getElementById('total-time').innerHTML = secToStr( audio.duration );

    document.getElementById('progress-bar').max = audio.duration;
    document.getElementById('progress-bar').value = audio.currentTime;
}

function atualizar(){
    document.getElementById('actual-time').innerHTML = secToStr( audio.currentTime);
    document.getElementById('progress-bar').value = audio.currentTime;
}

function secToStr(sec_num) {
    sec_num = Math.floor( sec_num );
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var secs = sec_num - (hours * 3600) - (minutes * 60);
     
    if (hours   < 10)  hours    = "0"+hours;
    if (minutes < 10)  minutes  = "0"+minutes;
    if (secs < 10) secs = "0"+secs;
     
    var time    = hours+':'+minutes+':'+secs;
     
    return time;
}

function next(){

    pause();

    i++;

    if( i >= playlist.length ) i = 0;

    if(audio.canPlayType("audio/mp3") != ''){
        audio.src = playlist[i].mp3;
    }
    
    document.getElementById('music-cover').src = playlist[i].image;
    document.getElementById('total-time').innerHTML = "00:00:00";
}

function prev(){

    pause();

    i--;

    if(i < 0) i=(playlist.length-1);

    if(audio.canPlayType("audio/mp3") != ''){
        audio.src = playlist[i].mp3;
    }
    
    document.getElementById('music-cover').src = playlist[i].image;
    document.getElementById('total-time').innerHTML = "00:00:00";
}

document.getElementById("volume").onchange = function(){
    var v = document.getElementById("volume").value;
    var VIcon = document.getElementById("volume-icon");
    audio.volume = (v/100);

    if(v>=50) {
        if(VIcon.classList.contains('glyphicon-volume-down'))
        {
            VIcon.className = 'glyphicon glyphicon-volume-up';
        }
        else if(VIcon.classList.contains('glyphicon-volume-off'))
        {
            VIcon.className = 'glyphicon glyphicon-volume-up';
        }
    } else if(v<50 && v>10) {
        if(VIcon.classList.contains('glyphicon-volume-up'))
        {
            VIcon.className = 'glyphicon glyphicon-volume-down';
        }
        else if(VIcon.classList.contains('glyphicon-volume-off'))
        {
            VIcon.className = 'glyphicon glyphicon-volume-down';
        }
    } else if(v<10) {
        if(VIcon.classList.contains('glyphicon-volume-up'))
        {
            VIcon.className = 'glyphicon glyphicon-volume-off';
        }
        else if(VIcon.classList.contains('glyphicon-volume-down'))
        {
            VIcon.className = 'glyphicon glyphicon-volume-off';
        }
    }
};

window.onload = function(){
    if(player.classList.contains("player-box-rounded"))
    {
        document.getElementById("player-content").className += " player-content-rounded";
        document.getElementById("player-controller").className += " player-controller-rounded";
    }
}

function openPlayer() {
    document.getElementById("player-page").style.opacity = "1";
    document.getElementById("player-page").style.zIndex = "1040";
}

function closePlayer() {
    document.getElementById("player-page").style.opacity = "0";
    document.getElementById("player-page").style.zIndex = "-1";
}