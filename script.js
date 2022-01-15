// dom movzusunu oyreneceksiniz
// object praktiki olaraq goreceksiniz

// template literal `` 

const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')

const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')

// Obyektleri daha yaxshi basha dushmeye key-value
const songs = [
    {
        name: 'alla',
        displayName: 'Milion ',
        artist: 'Alla Pukacova'
    },
    {
        name:'madonna-1',
        displayName: 'Madonnanin mahnisi',
        artist: 'Madonna'
    },
    {
        name: 'miri',
        displayName:'Karousel',
        artist: 'Miri Yusif'
    },
    {
        name:'zulfiye',
        displayName: 'Zulfiyenin mahnisi',
        artist: 'Zulfiye Xanbabayeva'
    }
]

// booleandan praktikada istifade
let isPlaying = false

// Play funksiyasini yaradiram
function playSong() {
    isPlaying= true
    playBtn.classList.replace('fa-play', 'fa-pause')
    music.play()
}

function pauseSong() {
    isPlaying=false
    playBtn.classList.replace('fa-pause', 'fa-play')
    music.pause()
}
// arrovv functionlar 
// ternary operator ? :

/*
if(zeynalabDinDerseQulaqASir) {
console.log("Aferin")
}
 else {
     console.log("Derse qykaq asmaq lazimdir")
 }
 
 zeynalAbdinDerseQulaqAsirsa ? console.log("Afderin") : console.log("Derse qulaq asmalisiniz")
*/

/*
function salamVer() {
    console.log("salam")
}

ES6 EcnaScript standart

const salamVer = () => console.log("SAlam")
*/

playBtn.addEventListener('click', ()=>(isPlaying ? pauseSong() : playSong()))


function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `musik/${song.name}.mp3`
}


let songIndex = 0
loadSong(songs[songIndex])



function prevSong() {
    songIndex--

    if(songIndex <0) {
        songIndex = songs.length-1
    }
    loadSong(songs[songIndex])
    playSong()
}


function nextSong() {
    songIndex++

    if(songIndex > songs.length-1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgressBar(e){
    if(isPlaying) {
        // object destruction desctructring
        const {duration, currentTime} = e.srcElement

        // Update progress bar vidth progress barin yenilenmesi

        const progressPercent = (currentTime /duration) *100
        progress.style.width = `${progressPercent}%`

        // calculate display for duration
    // mahni muddetini heablayan funksiyalar

    const durationMinutes = Math.floor(duration/60)
    let durationSeconds = Math.floor(duration % 60)
// 2:07
    if(durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`
    }

    if(durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`
    }
    const currentMinutes = Math.floor(currentTime/60)
    const currentSeconds = Math.floor(currentTime % 60)

    if(currentSeconds < 10) {
        // 2:10
        currentSeconds = `0${currentSeconds}`
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`

    }
}

// qara xett ucun funksiya
function setProgresBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const {duration } = music 
    music.currentTime = (clickX / width)*duration

}

prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click', nextSong)

// musiqinin vaxtinin deyishilmesi
music.addEventListener('timeupdate', updateProgressBar)

// mahnini el ile tezleshdirmek 
progressContainer.addEventListener('click', setProgresBar)