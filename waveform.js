//create audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

//get the audio element
const audioElement = document.querySelector('audio');

//pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

//gain node to change volume
const gainNode = audioContext.createGain();

// connect our graph
track.connect(gainNode).connect(audioContext.destination);

// play button
const playButton = document.querySelector('button');

//volume slider
const volumeControl = document.querySelector('#volume');

//play and pause button function
playButton.addEventListener('click', function() {

    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // play or pause track depending on state
    if (this.dataset.playing === 'false') {
        audioElement.play();
        this.dataset.playing = 'true';
    } else if (this.dataset.playing === 'true') {
        audioElement.pause();
        this.dataset.playing = 'false';
    }

}, false);

//if track ends
audioElement.addEventListener('ended', () => {
    playButton.dataset.playing = 'false';
}, false);

//volume listener
volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
}, false);
