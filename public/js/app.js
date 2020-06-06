(function () {
    const playerContainer = document.getElementById('player-container'),
        playBtn = document.getElementById('play'),
        prevBtn = document.getElementById('prev'),
        nextBtn = document.getElementById('next'),

        player = document.getElementById('player'),
        progressContainer = document.getElementById('progressbar-container'),
        progress = document.querySelector('.progress-bar'),
        volume = document.getElementById('volume'),
        soundSwitch = document.getElementById('player-mute'),

        title = document.getElementById('title'),
        cover = document.getElementById('cover');

        window.onload = function() {
            console.log(volume.value);
            console.log(player.volume);
            player.volume = volume.value / 10;
            if ( (player.volume * 10) >= 1 && (player.volume * 10) < 5) {
                soundSwitch.innerHTML =`<i class="fa fa-volume-down" aria-hidden="true"></i>`;
            }
        };
    const songs = [
        'Cosmic Movie',
        'Different Worlds',
        'Far Away',
        'Im Alone',
        'Shri Krishna Thank You',
        'Keep Forgetting',
        'Misterious Lady',
        'Pretty Polly',
        'Fender(Demo)',
        'Real Love',
        'See You Tomorrow',
        'Shine your light',
        'Spinning Out',
        'Valentine',
        'We Play'
    ];

    let songIndex = 3;


    const loadSong = (song) => {
        title.innerText = song;
        player.src = `mp3/${song}.mp3`;

    };

    const playSong = () => {
        playerContainer.classList.add('play');
        playBtn.innerHTML = `<i class="fas fa-pause"></i>`
        player.play();
    };
    const pauseSong = () => {
        playerContainer.classList.remove('play');
        playBtn.innerHTML = `<i class="fas fa-play"></i>`
        player.pause();
    };

    const prevSong = () => {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }

        loadSong(songs[songIndex]);
        playSong();
    };

    const nextSong = () => {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }

        loadSong(songs[songIndex]);
        playSong();
    };

    const updateProgress = (e) => {

        const { duration, currentTime } = e.srcElement;
        const percent = (currentTime / duration) * 100;
        progress.style.width = `${percent}%`;

    };

    const changeVolume = () => {
        player.volume = volume.value / 10;
        console.log(player.volume);
        if (!player.volume) {
            soundSwitch.innerHTML =`<i class="fas fa-volume-off"></i>`;
        } else if ( (player.volume * 10) >= 1 && (player.volume * 10) < 5) {
            soundSwitch.innerHTML =`<i class="fa fa-volume-down" aria-hidden="true"></i>`;
        } else {
            soundSwitch.innerHTML =`<i class="fa fa-volume-up" aria-hidden="true"></i>`;
        }
    };

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = player.duration;
        player.currentTime = (clickX / width) * duration;
    }

    function switchSound() {
        if (!player.muted) {            
            soundSwitch.innerHTML =`<i class="fas fa-volume-off"></i>`;
            player.muted = true;
            
        } else if((player.volume * 10) >= 1 && (player.volume * 10) < 5) {
            soundSwitch.innerHTML =`<i class="fas fa-volume-down"></i>`;
            player.muted = false;
            
        } else {
            soundSwitch.innerHTML =`<i class="fas fa-volume-up"></i>`;
            player.muted = false;
        }
    }

    loadSong(songs[songIndex]);

    playBtn.addEventListener('click', () => {
        const isPaying = playerContainer.classList.contains('play');

        if (!isPaying) {
            playSong();
        } else {
            pauseSong();
        }

    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    player.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    player.addEventListener('ended', nextSong);
    volume.addEventListener('change', changeVolume);
    soundSwitch.addEventListener('click', switchSound);

})();