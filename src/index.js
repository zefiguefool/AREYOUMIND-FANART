import './style.scss';

( () => {
let canvas,canvas2, firstCanvas, secondCanvas,
    ctx,ctx2,ctx3,ctx4,ctx5,ctx6,ctx7,ctx8,
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

    if(audio.currentTime >= 7 && audio.currentTime < 18){
        modifySampleEqualizerCanvas(ctx, ctx2, 'canvas', 'canvas2', 0.3, "#ffffff", "#ffffff", 16, 32, 8, 1.5 )
    }
    if(audio.currentTime >= 18 && audio.currentTime <= 42){
        modifySampleEqualizerCanvas(ctx, ctx2, 'canvas', 'canvas2', 0.3, "#ffffff", "#ffffff", 8, 16, 4, 2)
    }
    if(audio.currentTime >= 26 && audio.currentTime <= 44){
        document.getElementById('couple-container-one').classList.add("withHalf");
        modifySampleEqualizerCanvas(ctx3, ctx4, 'canvas3', 'canvas4', 0.3, "#ffffff", "#ffffff", 8, 16, 4, 2)
    }
    if(audio.currentTime >= 34 && audio.currentTime <= 46){
        document.getElementById('couple-container-three').classList.add("seventhEffect");
        modifySampleEqualizerCanvas(ctx5, ctx6, 'canvas5', 'canvas6', 1,  "#ffffff", "#ffffff",2, 8, 4, 4)
    }
    if(audio.currentTime >= 38){
        document.getElementById('couple-container-four').classList.add("eighthEffect");
        modifySampleEqualizerCanvas(ctx7, ctx8, 'canvas7', 'canvas8', 1,  "#ffffff", "#ffffff",2, 8, 4, 4)
    }
    if(audio.currentTime > 42){
        modifySampleEqualizerCanvas(ctx, ctx2, 'canvas', 'canvas2', 0.3, "#0b73c5", "#0b73c5", 8, 16, 4, 2)
    }
    if(audio.currentTime > 44){
        modifySampleEqualizerCanvas(ctx3, ctx4, 'canvas3', 'canvas4', 0.3, "#c9d547", "#c9d547", 8, 16, 4, 2)
    }
    if(audio.currentTime >= 46){
        modifySampleEqualizerCanvas(ctx5, ctx6, 'canvas5', 'canvas6', 1,  "#fe0000", "#fe0000",2, 8, 4, 4)
    }
}

let firstEffect = () => {
    document.getElementById('canvas').classList.add("firstEffect");
    document.getElementById('canvas2').classList.add("firstEffect");

}

let postFirstEffect = () => {
    document.getElementById('canvas').classList.add("vanish");
    document.getElementById('canvas2').classList.add("vanish");
}

let preSecondEffect = () => {
    document.getElementById('canvas').classList.remove("vanish");
    document.getElementById('canvas2').classList.remove("vanish");

}
 
let modifySampleEqualizerCanvas = (firstCtx, secondCtx, firstCanvasId, secondCanvasId, radioCanvasHeight, color1, color2, bar_sample, bar_posi, bar_width, ratioBarHeight ) =>{

    firstCanvas = document.getElementById(firstCanvasId);
    secondCanvas = document.getElementById(secondCanvasId);

    firstCanvas.width = window.innerWidth;
    firstCanvas.height = window.innerHeight * radioCanvasHeight;
    secondCanvas.width = window.innerWidth;
    secondCanvas.height = window.innerHeight * radioCanvasHeight;
    
    firstCtx = firstCanvas.getContext("2d");
    secondCtx = secondCanvas.getContext("2d");

    firstCanvas.height = window.innerHeight * 0.30;
    secondCanvas.height = window.innerHeight * 0.30;

    firstCtx.clearRect(0, 0, firstCanvas.width, firstCanvas.height);
    secondCtx.clearRect(0, 0, secondCanvas.width, secondCanvas.height);
        firstCtx.fillStyle = color1;
        secondCtx.fillStyle = color2;
        bar_count = window.innerWidth / bar_sample;
        for (var i = 0; i < bar_count; i++) {
            bar_pos = i * bar_posi;
            bar_width = bar_width;
            bar_height = -(fbc_array[i] / ratioBarHeight );

            firstCtx.fillRect(bar_pos, firstCanvas.height, bar_width, bar_height);
            secondCtx.fillRect(bar_pos, secondCanvas.height, bar_width, bar_height);
        }
}


let postSecondEffect = () => {
    document.getElementById('canvas').classList.add("vanish");
    document.getElementById('canvas2').classList.add("vanish");
}

let preThirdEffect = () => {
    document.getElementById('canvas').classList.remove("vanish");
    document.getElementById('canvas2').classList.remove("vanish");

}

let createCanvas = (container, idCanvas) => {
    var canv = document.createElement('canvas');
    canv.id = idCanvas;
    document.body.appendChild(canv); // adds the canvas to the body element
    document.getElementById(container).appendChild(canv); // adds the canvas to #someBox
    document.getElementById(canv.id ).classList.add("canvas");
}

let fourthEffect = () => {
    
    document.getElementById('couple-container-two').classList.add("translateforsixthEffect");
    document.getElementById('canvas').classList.add("reduceforsixthEffect");
    document.getElementById('canvas2').classList.add("reduceforsixthEffect");
    
}
let fifthEffect = () => {
    
    document.getElementById('canvas').classList.add("translateforsixthEffect");
    document.getElementById('canvas2').classList.add("translateforsixthEffect");
    
}

let sixthEffect = () => {
    document.getElementById('canvas3').classList.add("sixthEffect");
    document.getElementById('canvas4').classList.add("sixthEffect");
}

generateCanvas();
createCanvas('couple-container-two', 'canvas3');
createCanvas('couple-container-two', 'canvas4');
createCanvas('couple-container-three', 'canvas5');
createCanvas('couple-container-three', 'canvas6');
createCanvas('couple-container-four', 'canvas7');
createCanvas('couple-container-four', 'canvas8');
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
                //console.log(audio.currentTime);
                if(audio.currentTime >= 2 && audio.currentTime < 3 ){
                    firstEffect();
                }
                if(audio.currentTime >= 6 && audio.currentTime < 7 ){
                    postFirstEffect();
                }
                if(audio.currentTime >= 7 && audio.currentTime < 8 ){
                    preSecondEffect();
                }
                else if(audio.currentTime > 12 && audio.currentTime < 13){
                    document.getElementById('sep-line').classList.add("blue");
                }
                if(audio.currentTime >= 17 && audio.currentTime < 18 ){
                    postSecondEffect();
                }
                if(audio.currentTime >= 18 && audio.currentTime < 19 ){
                    preThirdEffect();
                }
                else if(audio.currentTime > 22 && audio.currentTime < 23){
                    fourthEffect();
                }
                else if(audio.currentTime >= 23 && audio.currentTime < 25){
                    fifthEffect();
                }
                else if(audio.currentTime >= 28 && audio.currentTime < 30){
                    sixthEffect();
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



