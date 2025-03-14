// Establishing variables linking to HTML elements
var stopbutton = document.getElementById('circleL');
var playbutton = document.getElementById('circleC');
var pausebutton = document.getElementById('circleR');
var nextbutton = document.getElementById('nextbutton');
var backbutton = document.getElementById('backbutton');

var albumart = document.getElementById('albumart');
var songName = document.getElementById('songname');
var artistName = document.getElementById('artistname');
var albumName = document.getElementById('albumname');

var progressbar = document.getElementById('progressbar');

// Song class with five parameters - title, artist, album, album art url, song url
class Song {
  constructor(songtitle, artist, album, albumart, url) {
    this.songtitle = songtitle;
    this.artist = artist;
    this.album = album;
    this.albumart = albumart;
    this.url = url;
  }
}

// Creating a pre-made list of Song objects
var s1 = new Song("My Girls", "Animal Collective", "Merriweather Post Pavilion", "img/merriweather.jpg", "audio/animalcollecmygirls.mp3");
var s2 = new Song("Child I Will Hurt You", "Crystal Castles", "(III)", "img/iii.jpg", "audio/crystalcastleschild.mp3");
var s3 = new Song("Ultimate", "Denzel Curry", "32 Zel/Planet Shrooms", "img/planetshrooms.jpg", "audio/denzelultimate.mp3");
var s4 = new Song("Lucky You feat. Joyner Lucas", "Eminem", "Kamikaze", "img/kamikaze.png", "audio/emluckyyou.mp3");
var s5 = new Song("Fineshrine", "Purity Ring", "Shrines", "img/shrines.jpg", "audio/Fineshrine.mp3");
var s6 = new Song("Two Weeks", "FKA Twigs", "LP1", "img/lp1.jpg", "audio/fkatwoweeks.mp3");
var s7 = new Song("SLOW DANCING IN THE DARK", "Joji", "SLOW DANCING IN THE DARK", "img/slowdancing.jpg", "audio/jojislowdancing.mp3");
var s8 = new Song("Heartbeats", "The Knife", "Deep Cuts", "img/deepcuts.jpg", "audio/knifeheartbeats.mp3");
var s9 = new Song("Ultralight Beam feat. Chance the Rapper & Kirk Franklin", "Kanye West", "The Life of Pablo", "img/tlop.jpg", "audio/UltraLightBeam.mp3");
var s10 = new Song("Intro", "The xx", "xx", "img/xx.png", "audio/xxintro.mp3");
var s11 = new Song("Heart Attack", "Scarlxrd", "Chaos Theory", "img/chaostheory.jpg", "audio/heartattack.mp3")

// Jukebox class that consists of an array of the previously made Song objects
class Jukebox {
  constructor() {
    this.songArchive = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11];
    this.trackNum = 0;
    this.currentSong = new Audio(this.songArchive[this.trackNum].url);
    // this.currentSongName = this.songArchive[this.trackNum].songtitle;
    // this.currentArtist = this.songArchive[this.trackNum].artist;
    // this.currentAlbum = this.songArchive[this.trackNum].album;
    // this.currentAlbumArtLoc = this.songArchive[this.trackNum].albumart;
  }

  // Plays the current trackNum song
  playCurrent() {
    this.currentSong.play();
    albumart.style.backgroundImage = "url(" + this.songArchive[this.trackNum].albumart + ")";
    songName.innerText = this.songArchive[this.trackNum].songtitle;
    artistName.innerText = this.songArchive[this.trackNum].artist;
    albumName.innerText = this.songArchive[this.trackNum].album;

    // This placeholder variable is created to store the vale of the current Jukebox object (this)
    var placeholderJukebox = this;

    // When this event handler is fired, 'this' is NOT within the scope
    // "Async - event handlers do not run in a sequential order", they run when an event is fired
    // https://stackoverflow.com/questions/5490448/how-do-i-pass-the-this-context-into-an-event-handler
    this.currentSong.onended = function() {
      placeholderJukebox.nextSong();
    }

    // Event listener for the song that, upon timeupdate, will update the value of the progress bar to what percentage it is at
    this.currentSong.addEventListener('timeupdate', function() {
      progressbar.value = ((placeholderJukebox.currentSong.currentTime / placeholderJukebox.currentSong.duration));
    })
  }

  // Pauses the current trackNum song and sets it to play at the beginning
  stopSong() {
    this.currentSong.pause();
    this.currentSong.currentTime = 0;
  }

  // Pause the current trackNum song
  pauseCurrent() {
    this.currentSong.pause();
  }

  // Plays the previous song by rewinding one track number
  previousSong() {
      this.currentSong.pause();
      this.currentSong.currentTime = 0;
      this.trackNum--;

      if(this.trackNum < 0) {
        this.trackNum = this.songArchive.length - 1;
        this.currentSong = new Audio(this.songArchive[this.trackNum].url);
        this.currentSong.play()
        albumart.style.backgroundImage = "url(" + this.songArchive[this.trackNum].albumart + ")";
        songName.innerText = this.songArchive[this.trackNum].songtitle;
        artistName.innerText = this.songArchive[this.trackNum].artist;
        albumName.innerText = this.songArchive[this.trackNum].album;
      }
      else {
        this.currentSong = new Audio(this.songArchive[this.trackNum].url);
        this.currentSong.play();
        albumart.style.backgroundImage = "url(" + this.songArchive[this.trackNum].albumart + ")";
        songName.innerText = this.songArchive[this.trackNum].songtitle;
        artistName.innerText = this.songArchive[this.trackNum].artist;
        albumName.innerText = this.songArchive[this.trackNum].album;
      }

      var placeholderJukebox = this;

      this.currentSong.onended = function() {
        placeholderJukebox.nextSong();
      }

      this.currentSong.addEventListener('timeupdate', function() {
        progressbar.value = ((placeholderJukebox.currentSong.currentTime / placeholderJukebox.currentSong.duration));
      })
  }

  // Pauses the current trackNum song, sets the time to zero, plays trackNum+1
  nextSong() {
    this.currentSong.pause();
    this.currentSong.currentTime = 0;
    this.trackNum++;

    if(this.trackNum > this.songArchive.length - 1) {
      this.trackNum = 0;
      this.currentSong = new Audio(this.songArchive[this.trackNum].url);
      this.currentSong.play()
      albumart.style.backgroundImage = "url(" + this.songArchive[this.trackNum].albumart + ")";
      songName.innerText = this.songArchive[this.trackNum].songtitle;
      artistName.innerText = this.songArchive[this.trackNum].artist;
      albumName.innerText = this.songArchive[this.trackNum].album;
    }
    else {
      this.currentSong = new Audio(this.songArchive[this.trackNum].url);
      this.currentSong.play();
      albumart.style.backgroundImage = "url(" + this.songArchive[this.trackNum].albumart + ")";
      songName.innerText = this.songArchive[this.trackNum].songtitle;
      artistName.innerText = this.songArchive[this.trackNum].artist;
      albumName.innerText = this.songArchive[this.trackNum].album;
    }

    var placeholderJukebox = this;

    this.currentSong.onended = function() {
      placeholderJukebox.nextSong();
    }

    this.currentSong.addEventListener('timeupdate', function() {
      progressbar.value = ((placeholderJukebox.currentSong.currentTime / placeholderJukebox.currentSong.duration));
    })
  }
}

// Jukebox object created!
var virtJukebox = new Jukebox();

// Upon load, the first song in the "playlist" will be displayed on the vinyl and with song information
window.addEventListener('load', function() {
  albumart.style.backgroundImage = "url(" + virtJukebox.songArchive[virtJukebox.trackNum].albumart + ")";
  songName.innerText = virtJukebox.songArchive[virtJukebox.trackNum].songtitle;
  artistName.innerText = virtJukebox.songArchive[virtJukebox.trackNum].artist;
  albumName.innerText = virtJukebox.songArchive[virtJukebox.trackNum].album;
})

// Event listeners for the buttons to trigger the functions of the Jukebox object
playbutton.addEventListener('click', function() {
  virtJukebox.playCurrent();
});

pausebutton.addEventListener('click', function() {
  virtJukebox.pauseCurrent();
});

backbutton.addEventListener('click', function() {
  virtJukebox.previousSong();
})

nextbutton.addEventListener('click', function() {
  virtJukebox.nextSong();
})

stopbutton.addEventListener('click', function() {
  virtJukebox.stopSong();
})
