let canvas, ctx;

let createCanvas = (container, idCanvas) => {
    var canv = document.createElement('canvas');
    canv.id = idCanvas;
    document.body.appendChild(canv); // adds the canvas to the body element
    document.getElementById(container).appendChild(canv); // adds the canvas to #someBox
    document.getElementById(canv.id).classList.add("canvas");
}

let generateCanvas = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * 1;
    canvas.height = window.innerHeight * 1;
}

let twentythirdEffect = () => {
    canvas= document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas= document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    let widthInter = window.innerWidth / 10;
    let heightInter = window.innerHeight / 10;
    canvas.style.background = "#000"
    ctx.strokeStyle="#fff"
    for (let i = 0 ; i <= 10 ; i++){
        console.log("widthInter * i ",widthInter * i)
        console.log("heightInter * i ",heightInter * i)
        ctx.beginPath();
        ctx.moveTo(widthInter * i ,0);
        ctx.lineTo(widthInter * i, canvas.height);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(0, heightInter * i);
        ctx.lineTo(canvas.width,heightInter * i);
        ctx.stroke();
        ctx.closePath();
    }
}

generateCanvas();
twentythirdEffect();
/* ctx.beginPath();
ctx.rect(20, 20, 150, 100);
ctx.stroke(); */


