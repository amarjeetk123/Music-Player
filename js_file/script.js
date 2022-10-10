let wrapper = document.querySelector(".wrapper")
let song_number = document.querySelector(".song_number")


let image = document.querySelector(".image_div img")
let song_name = document.querySelector(".song_detailes .song_name")

let artist_name = document.querySelector(".song_detailes .artist_name")
let music_audio = document.querySelector("#main_music")

let paly_pouse_btn = document.querySelector(".paly_pouse_btn")

let random_btn = document.querySelector(".random_btn")

let time_slider = document.querySelector(".time_slider")
let current_time = document.querySelector(".current_time")
let total_time = document.querySelector(".total_time")

let wave = document.querySelector("#wave")

let index = 0;
let is_music_play = false;
let is_random = false;
let music_list_length = music_data.length - 1
window.addEventListener('load', () => {
    load_music(index)
})


let updateTimer;
let current_track = document.createElement("audio")
function load_music(index) {

    song_name.innerHTML = music_data[index].music_name
    artist_name.innerHTML = music_data[index].artist_name

    image.src = music_data[index].image
    current_track.src = music_data[index].music_source
    // current_track.load(); 

song_number.innerHTML = `Playing ${index+1} of ${music_list_length+1}`
    updateTimer = setInterval(time_update, 1000);

    current_track.addEventListener("ended" , next)
}


function play_pause() {
    is_music_play ? pauseMusic() : playMusic();
}



function playMusic() {
    current_track.play();
    is_music_play = true;
    paly_pouse_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>'

    paly_pouse_btn.classList.add("randomActive")

    wave.classList.add("loader")

    image.classList.add("rotate")
}
function pauseMusic() {
    current_track.pause();
    is_music_play = false;
    paly_pouse_btn.innerHTML = '<i class="fa-solid fa-circle-play fa-2x  "></i>'
    paly_pouse_btn.classList.remove("randomActive")
    wave.classList.remove("loader")
}


// code for next button
function next() {
    if (index < music_list_length && is_random === false) {
        index = index + 1;
    }
    else if (music_list_length && is_random === true) {
        let random_number = Math.ceil(Math.random() * music_list_length)
        index = random_number
    } else {
        index = 0;
    }

    load_music(index);
    playMusic()
}

// code for privious
function previous() {
    if (index > 0) {
        index = index - 1;
    }
    else {
        index = music_list_length
    }

    load_music(index)
    playMusic()
}

// code for repeat button
function repeat(){
    let current_index = index;
    load_music(current_index);
    playMusic();
}
// code for random music
function random_play() {
    is_random ? pause_random() : play_random();
}

function play_random() {
    is_random = true;
    random_btn.classList.add("randomActive")
}
function pause_random() {
    is_random = false;
    random_btn.classList.remove("randomActive")
}

let music_list = document.querySelector(".music_list")
function open_music_list() {
    music_list.classList.add("show")
    // music_list.classList.add("randomActive")
}
function close_music_list() {
    music_list.classList.remove("show")
}

// code for timer flow
function time_seek() {
    let time_seek = current_track.duration * (time_slider.value / 100)
    current_track.currentTime = time_seek;

}


// code for timer
function time_update() {
    let seekPosition = 0;
    if (!isNaN(current_track.duration)) {
        seekPosition = current_track.currentTime * (100 / current_track.duration);
        time_slider.value = seekPosition;

        let currentMinutes = Math.floor(current_track.currentTime / 60);
        let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(current_track.duration / 60);
        let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        current_time.textContent = currentMinutes + ":" + currentSeconds;
        total_time.textContent = durationMinutes + ":" + durationMinutes;
    }
}