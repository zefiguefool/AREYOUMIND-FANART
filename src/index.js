import './style.scss';

( () => {
let canvas,canvas2, firstCanvas, secondCanvas,
    ctx, ctx2, ctx3, ctx4, ctx5, ctx6, ctx7, ctx8, ctx9, ctx10, ctx11, ctx12, ctx13, ctx14, ctx15,
    source,
    context,
    analyser,
    fbc_array,
    bar_count,
    bar_pos,
    bar_width,
    bar_height;

let audio = new Audio("./media/do-i-wanna-know.mp3");

    audio.src = "./media/do-i-wanna-know.mp3";
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
        modifySampleEqualizerCanvas(ctx, ctx2, 'canvas', 'canvas2', 0.3, "#ffffff", "#ffffff", 8, 16, 4, 2 )
    }
    if(audio.currentTime >= 7 && audio.currentTime < 18){
        modifySampleEqualizerCanvas(ctx, ctx2, 'canvas', 'canvas2', 0.3, "#ffffff", "#ffffff", 16, 32, 8, 1.5 )
    }
    if(audio.currentTime >= 18 && audio.currentTime <= 42){
        modifySampleEqualizerCanvas(ctx, ctx2, 'canvas', 'canvas2', 0.3, "#ffffff", "#ffffff", 8, 16, 4, 2)
    }
    if(audio.currentTime >= 26 && audio.currentTime <= 44){
        document.getElementById('couple-container-one').classList.add("withHalf");
        if(document.getElementById('sep-line') != null){
            document.getElementById('sep-line').remove();
        }
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
    if(audio.currentTime > 42 && audio.currentTime < 92){
        modifySampleEqualizerCanvas(ctx, ctx2, 'canvas', 'canvas2', 0.3, "#0b73c5", "#0b73c5", 8, 16, 4, 2)
    }
    if(audio.currentTime > 44 && audio.currentTime < 92){
        modifySampleEqualizerCanvas(ctx3, ctx4, 'canvas3', 'canvas4', 0.3, "#c9d547", "#c9d547", 8, 16, 4, 2)
    }
    if(audio.currentTime >= 46 && audio.currentTime < 92){
        modifySampleEqualizerCanvas(ctx5, ctx6, 'canvas5', 'canvas6', 1,  "#fe0000", "#fe0000",2, 8, 4, 4)
    }
    if(audio.currentTime >= 52 && audio.currentTime < 92){
        document.getElementById('couple-container-five').classList.add("tenthEffect");
        modifySampleEqualizerCanvas(ctx9, ctx10, 'canvas9', 'canvas10', 1, "#ffeb00", "#ffeb00",2, 8, 4, 4)
    }
    if(audio.currentTime >= 80 && audio.currentTime < 92){
        document.getElementById('couple-container-six').classList.add("eighteenthEffect");
        modifySampleEqualizerCanvas(ctx11, ctx12, 'canvas11', 'canvas12', 1, "#fdad03", "#fdad03",2, 8, 4, 4)
    }
    if(audio.currentTime >= 84 && audio.currentTime < 92){
        document.getElementById('couple-container-seven').classList.add("twentieth");
        modifySampleEqualizerCanvas(ctx13, ctx14, 'canvas13', 'canvas14', 1, "#eb00ff", "#eb00ff",2, 8, 4, 4)
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

let ninthEffect = () => {
    document.getElementById('canvas7').classList.add("ninthEffect");
    document.getElementById('canvas8').classList.add("ninthEffect");
}

let eleventhEffect = () => {
    document.getElementById('canvas9').classList.add("eleventhEffect");
    document.getElementById('canvas10').classList.add("eleventhEffect");
}

let twelfthEffect = () => {
    document.getElementById('wave-container').classList.add("twelfthEffect");
    //audio.pause();
}

let thirteenthEffect = () => {
    document.getElementById('canvas').classList.add("thirteenthEffect");
    document.getElementById('canvas2').classList.add("thirteenthEffect");
    document.getElementById('canvas3').classList.add("thirteenthEffect");
    document.getElementById('canvas4').classList.add("thirteenthEffect");
    document.getElementById('wave-container').classList.add("thirteenthEffect");
    
}

let fourteenthEffect = () => {
    document.getElementById('canvas7').classList.add("fourteenthEffect");
    document.getElementById('canvas8').classList.add("fourteenthEffect");
}

let fifteenthEffect = () => {
    document.getElementById('canvas5').classList.add("fifteenthEffect");
    document.getElementById('canvas6').classList.add("fifteenthEffect");
    document.getElementById('canvas9').classList.add("fifteenthEffect");
    document.getElementById('canvas10').classList.add("fifteenthEffect");
}
let sixteenthEffect = () => {
    document.getElementById('canvas5').classList.add("sixteenthEffect");
    document.getElementById('canvas6').classList.add("sixteenthEffect");
}

let seventeenthEffect = () => {
    document.getElementById('canvas9').classList.add("seventeenthEffect");
    document.getElementById('canvas10').classList.add("seventeenthEffect");
}

let nineteenthEffect = () => {
    document.getElementById('canvas11').classList.add("nineteenthEffect");
    document.getElementById('canvas12').classList.add("nineteenthEffect");
    document.getElementById('wave-container').classList.add("nineteenthEffect");
}
let twentyfirstEffect = () => {
    document.getElementById('canvas13').classList.add("twentyfirstEffect");
    document.getElementById('canvas14').classList.add("twentyfirstEffect");
}

let twentysecondEffect = () => {
    if(document.getElementById('canvas') != null)
    document.getElementById('canvas').remove();
    if(document.getElementById('canva2') != null)
    document.getElementById('canvas2').remove();
    if(document.getElementById('canvas3') != null)
    document.getElementById('canvas3').remove();
    if(document.getElementById('canvas4') != null)
    document.getElementById('canvas4').remove();
    if(document.getElementById('canvas5') != null)
    document.getElementById('canvas5').remove();
    if(document.getElementById('canvas6') != null)
    document.getElementById('canvas6').remove();
    if(document.getElementById('canvas9') != null)
    document.getElementById('canvas9').remove();
    if(document.getElementById('canvas10') != null)
    document.getElementById('canvas10').remove();
    if(document.getElementById('canvas11') != null)
    document.getElementById('canvas11').remove();
    if(document.getElementById('canvas12') != null)
    document.getElementById('canvas12').remove();
    if(document.getElementById('canvas13') != null)
    document.getElementById('canvas13').remove();
    if(document.getElementById('canvas14') != null)
    document.getElementById('canvas14').remove();
    document.getElementById('wave-container').classList.add("twentysecondEffect");
}

let twentythirdEffect = () => {
    if(document.getElementById('canvas15') == null)
    createCanvas('grid', 'canvas15');
    let canvas15;
    canvas15 = document.getElementById("canvas15");
    canvas15.width = window.innerWidth;
    canvas15.height = window.innerHeight;
    canvas15 = document.getElementById("canvas15");
    ctx15 = canvas.getContext("2d");
    let widthInter = window.innerWidth / 10;
    let heightInter = window.innerHeight / 10;
    ctx15.strokeStyle="#fff"
    for (let i = 0 ; i <= 10 ; i++){
        console.log("widthInter * i ",widthInter * i)
        console.log("heightInter * i ",heightInter * i)
        ctx15.beginPath();
        ctx.moveTo(heightInter * i ,0);
        ctx15.lineTo(0, canvas15.width);
        ctx15.stroke();
        ctx15.closePath();
        ctx15.beginPath();
        ctx.moveTo(widthInter * i ,0);
        ctx15.lineTo(widthInter * i ,canvas15.height);
        ctx15.stroke();
        ctx15.closePath();
    }

}

generateCanvas();
createCanvas('couple-container-two', 'canvas3');
createCanvas('couple-container-two', 'canvas4');
createCanvas('couple-container-three', 'canvas5');
createCanvas('couple-container-three', 'canvas6');
createCanvas('couple-container-four', 'canvas7');
createCanvas('couple-container-four', 'canvas8');
createCanvas('couple-container-five', 'canvas9');
createCanvas('couple-container-five', 'canvas10');
createCanvas('couple-container-six', 'canvas11');
createCanvas('couple-container-six', 'canvas12');
createCanvas('couple-container-seven', 'canvas13');
createCanvas('couple-container-seven', 'canvas14');
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
            //audio.currentTime = 91
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
                else if(audio.currentTime >= 48 && audio.currentTime < 49){
                    ninthEffect();
                }
                else if(audio.currentTime >52 && audio.currentTime < 53){
                    eleventhEffect();
                }
                else if(audio.currentTime > 55 && audio.currentTime < 56){
                    twelfthEffect();
                }
                else if(audio.currentTime > 59 && audio.currentTime < 61){
                    thirteenthEffect();
                }
                else if(audio.currentTime > 63 && audio.currentTime < 65){
                    fourteenthEffect();
                }
                else if(audio.currentTime > 67 && audio.currentTime < 69){
                    fifteenthEffect();
                }
                else if(audio.currentTime > 71 && audio.currentTime < 73){
                    sixteenthEffect();
                }
                else if(audio.currentTime > 75 && audio.currentTime < 77){
                    seventeenthEffect();
                }
                else if(audio.currentTime > 79 && audio.currentTime < 81){
                    nineteenthEffect();
                }
                else if(audio.currentTime > 86 && audio.currentTime < 88){
                    twentyfirstEffect();
                }
                else if(audio.currentTime > 92 && audio.currentTime < 93){
                    twentysecondEffect();
                }
                /* if(audio.currentTime > 96 && audio.currentTime < 98){
                    twentythirdEffect();
                } */
            },200);
            twentythirdEffect();

        }else{
            source.connect(analyser);
            analyser.connect(context.destination);
            audio.play();
            FrameLooper();
        }
    }
);

document.getElementById("pause").addEventListener(
    "click",
    () => {
        audio.pause();
    },
    false
);

})();



