console.log("Welcome to Spotify");

//Initialize the variables

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"Peaky Blinders", filePath : "songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"Demo 2", filePath : "songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"Demo 3", filePath : "songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"Demo 4", filePath : "songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"Demo 5", filePath : "songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"Demo 6", filePath : "songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName:"Demo 7", filePath : "songs/7.mp3", coverPath:"covers/7.jpg"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})
//Handle pause and play button
masterPlay.addEventListener("click",()=>{
    const curbtn = document.getElementById(songIndex.toString());
    if(audioElement.paused || audioElement.currentTime == 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        curbtn.classList.remove('fa-circle-play');
        curbtn.classList.add('fa-circle-pause');


    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        curbtn.classList.remove('fa-circle-pause');
        curbtn.classList.add('fa-circle-play');
    }
})

// update progress bar
audioElement.addEventListener("timeupdate",()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

// updating the song according to song
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
// handling play button on screen
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener("click", (e) => {
        let clickedIndex = parseInt(e.target.id);
    
        // If the clicked song is the current one
        if (songIndex === clickedIndex) {
            if (audioElement.paused) {
                audioElement.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
            }
        } else {
            // If clicked song is different
            songIndex = clickedIndex;
            makeAllPlays(); // set all icons to play
    
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
    
            audioElement.src = `songs/${songIndex + 1}.mp3`; // load new song
            audioElement.currentTime = 0; // start from beginning
            audioElement.play();
    
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    })    
})

// Handling the next and previous buttons 
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 6){
        songIndex = 0;
    }else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    let songplaybtn = document.getElementById(songIndex.toString());
    songplaybtn.classList.remove('fa-circle-play');;
    songplaybtn.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 6;
    }else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    let songplaybtn = document.getElementById(songIndex.toString());
    songplaybtn.classList.remove('fa-circle-play');;
    songplaybtn.classList.add('fa-circle-pause');
})

