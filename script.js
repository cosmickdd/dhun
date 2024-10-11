console.log("Welcome to Musico");


let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Alan Walker - Faded", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Alan Walker, Sabrina Carpenter & Farruko - On My Way", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Alan Walker - Alone", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    // ... other songs
]
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});
const playSong = (index) => {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
};
masterPlay.addEventListener('click', ()=> {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});
audioElement.addEventListener('timeupdate', ()=> {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    if (!isNaN(progress)) {
        myProgressBar.value = progress;
    }
});

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = i;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        playSong(songIndex);
    });
});
const makeAllPlays = () => {
    document.querySelectorAll('.songItemPlay').forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex <= 0) ? 0 : songIndex - 1;
    playSong(songIndex);
});
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
    playSong(songIndex);
});
