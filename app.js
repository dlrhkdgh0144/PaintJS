const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const ranges = document.getElementById("jsRange");
const modes = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const colorBox = document.getElementById("jsCurrent");

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#ffffff";
ctx.fillRect(0,0,700,500);
ctx.lineWidth = 2.5;

canvas.width = 700;
canvas.height = 500;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function onMouseDown(event){
    painting = true;
    if(filling===true){
        ctx.fillRect(0,0,700,500);
    }
}
function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    colorBox.style.backgroundColor = color;
}
function handleRange(event){
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
}
function handleMode(event){
    if(filling===true){
        filling = false;
        modes.innerText = "Fill";
    }
    else{
        filling = true;
        modes.innerText = "Paint";
    }
}
function handleCM(event){
    event.preventDefault();
}
function handleSave(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",onMouseDown);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColor));
if(ranges) {
    ranges.addEventListener("input",handleRange);
}
if(modes){
    modes.addEventListener("click",handleMode);
}
if(saveBtn){
    saveBtn.addEventListener("click",handleSave);
}