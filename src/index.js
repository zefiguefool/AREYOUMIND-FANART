import './style.scss';

( () => {
let canvas,canvas2,
    ctx,ctx2,
    source,
    context,
    analyser,
    fbc_array,
    bar_count,
    bar_pos,
    bar_width,
    bar_height;

let audio = new Audio("/media/do-i-wanna-know.mp3");

    audio.src = "/media/do-i-wanna-know.mp3";
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

let intervalId =''

let drawWaveform = () => {
    stroke(240);
    strokeWeight(4);
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, 0, width);
      let y = map(waveform[i], -1, 1, -height / 2, height / 2);
      vertex(x, y + height / 2);
    }
    endShape();
  }
  
  let drawText = (modFreq, modAmp) => {
    strokeWeight(1);
    text('Modulator Frequency: ' + modFreq.toFixed(3) + ' Hz', 20, 20);
    text('Modulator Amplitude: ' + modAmp.toFixed(3), 20, 40);
  }

let generateOscilloscope = () =>{
    let carrier; // this is the oscillator we will hear
    let modulator; // this oscillator will modulate the amplitude of the carrier
    let fft; // we'll visualize the waveform

    carrier = new p5.Oscillator(); // connects to master output by default
    carrier.freq(340);
    carrier.amp(0);
    // carrier's amp is 0 by default, giving our modulator total control
    carrier.start();

    modulator = new p5.Oscillator('triangle');
    modulator.disconnect(); // disconnect the modulator from master output
    modulator.freq(5);
    modulator.amp(1);
    modulator.start();

    // Modulate the carrier's amplitude with the modulator
    // Optionally, we can scale the signal.
    carrier.amp(modulator.scale(-1, 1, 1, -1));

    // create an fft to analyze the audio
    fft = new p5.FFT();

    // map mouseY to moodulator freq between 0 and 20hz
    let modFreq = map(mouseY, 0, height, 20, 0);
    modulator.freq(modFreq);

    let modAmp = map(mouseX, 0, width, 0, 1);
    modulator.amp(modAmp, 0.01); // fade time of 0.1 for smooth fading

    // analyze the waveform
    waveform = fft.waveform();

    // draw the shape of the waveform
    drawWaveform();

    drawText(modFreq, modAmp);
}

let generateCanvas = () => {
    canvas = document.getElementById("canvas");
    canvas2 = document.getElementById("canvas2");
    ctx = canvas.getContext("2d");
    ctx2 = canvas2.getContext("2d");
    canvas.width = window.innerWidth * 1;
    canvas.height = window.innerHeight * 0.30;
    canvas2.width = window.innerWidth * 1;
    canvas2.height = window.innerHeight * 0.30;
}

let FrameLooper = () => {
    //console.log('frameLooper')
    window.RequestAnimationFrame =
        window.requestAnimationFrame(FrameLooper) ||
        window.msRequestAnimationFrame(FrameLooper) ||
        window.mozRequestAnimationFrame(FrameLooper) ||
        window.webkitRequestAnimationFrame(FrameLooper);
    
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    if(audio.currentTime < 8){
        bar_count = window.innerWidth / 8;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx.fillStyle = "#ffffff";
        ctx2.fillStyle = "#ffffff";
        for (var i = 0; i < bar_count; i++) {
            bar_pos = i * 16;
            bar_width = 4;
            bar_height = -(fbc_array[i] / 2);
    
            ctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
            ctx2.fillRect(bar_pos, canvas2.height, bar_width, bar_height);
        }
    }
    else if(audio.currentTime >= 8 && audio.currentTime < 18){
        secondEffect();
    }
    else if(audio.currentTime >= 18){
        thirdEffect();
    }
    
}

let firstEffect = () => {
    document.getElementById('canvas').classList.add("firstEffect");
    document.getElementById('canvas2').classList.add("firstEffect");

}

let secondEffect = () => {
        console.log('second effet')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx.fillStyle = "#ffffff";
        ctx2.fillStyle = "#ffffff";
        bar_count = window.innerWidth / 16;
        for (var i = 0; i < bar_count; i++) {
            bar_pos = i * 32;
            bar_width = 8;
            bar_height = -(fbc_array[i] / 1.5 );

            ctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
            ctx2.fillRect(bar_pos, canvas2.height, bar_width, bar_height);
        }
 
}

let thirdEffect = () => {
    console.log('third effet')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx.fillStyle = "#ffffff";
    ctx2.fillStyle = "#ffffff";
    bar_count = window.innerWidth / 8;
    for (var i = 0; i < bar_count; i++) {
        bar_pos = i * 16;
            bar_width = 4;
            bar_height = -(fbc_array[i]);

        ctx.fillRect(bar_pos, canvas.height, bar_width, bar_height);
        ctx2.fillRect(bar_pos, canvas2.height, bar_width, bar_height);
    }

}

let fourthEffect = () => {
    document.getElementById('canvas').classList.add("fourthEffect");
}

generateCanvas();
//generateOscilloscope();

document.getElementById("play").addEventListener(
    "click",
    function() {
        if(typeof context === "undefined"){
            context = new AudioContext();
            analyser = context.createAnalyser();
            source = context.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(context.destination);
            audio.play();
            FrameLooper();
            intervalId = setInterval(() => {
                console.log(audio.currentTime);
                if(audio.currentTime >= 2 && audio.currentTime < 3 ){
                        firstEffect();
                }
                else if(audio.currentTime > 10 && audio.currentTime < 11){
                    document.getElementById('sep-line').classList.add("blue");
                }
                else if(audio.currentTime > 22){
                        fourthEffect();
                }
            },200);

        }else{
            source.connect(analyser);
            analyser.connect(context.destination);
            audio.play();
            FrameLooper();
        }
    },
    false
);

document.getElementById("pause").addEventListener(
    "click",
    () => {
        audio.pause();
    },
    false
);

})();



