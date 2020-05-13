(function () {
    const playerContainer = document.getElementById('player-container'),
        playBtn = document.getElementById('play'),
        prevBtn = document.getElementById('prev'),
        nextBtn = document.getElementById('next'),

        player = document.getElementById('player'),
        progressContainer = document.getElementById('progressbar-container'),
        progress = document.querySelector('.progress-bar'),

        title = document.getElementById('title'),
        cover = document.getElementById('cover');

    const songs = ['Cosmic Movie', 'Fallen in Love', 'Fender', 'Shri Krishna Thank You'];

    let songIndex = 3;


    const loadSong = (song) => {
        title.innerText = song;
        player.src = `mp3/${song}.mp3`;

    }

    const playSong = () => {
        playerContainer.classList.add('play');
        playBtn.innerHTML = `<i class="fas fa-pause"></i>`
        player.play();
    }
    const pauseSong = () => {
        playerContainer.classList.remove('play');
        playBtn.innerHTML = `<i class="fas fa-play"></i>`
        player.pause();
    }

    const prevSong = () => {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }

        loadSong(songs[songIndex]);
        playSong();
    }

    const nextSong = () => {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }

        loadSong(songs[songIndex]);
        playSong();
    }

    const updateProgress = (e) => {

        const { duration, currentTime } = e.srcElement;
        const percent = (currentTime / duration) * 100;
        progress.style.width = `${percent}%`;

    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = player.duration;
        player.currentTime = (clickX / width) * duration;
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

})();