const std_note_names = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const SHARP = 1.0594630943592953;

function note2int(note_name) {
    var m = note_name.match(/([A-G])([b#]?)(\d)/);
    return 12 * parseInt(m[3], 10) + std_note_names.indexOf(m[1]) + {'':0, 'b':-1, '#':1}[m[2]];
}

function calc_note_freq(note_name){
    return 440 * Math.pow(SHARP, note2int(note_name) - 57 /*note2int('A4')*/);
}

function get_freq(note_name){
    return calc_note_freq(note_name);
    // return allNotes[note_name] || calc_note_freq(note_name);
}

var audioContext = new window.AudioContext;

function play_freq(freq, gain) {
    var now = audioContext.currentTime,
        o = audioContext.createOscillator(),
        g = audioContext.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    g.gain.linearRampToValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(gain, now + .1);
    g.gain.linearRampToValueAtTime(0, now + 1);
    o.connect(g);
    g.connect(audioContext.destination);
    o.start(0);
    setTimeout(function() { o.stop(); }, 1500);
}

function play(x) {
    if(x.length)
        for(var i = x.length; i--;)
            play_freq(get_freq(x[i]), 1/x.length);
}
