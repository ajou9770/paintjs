const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jssave");

const INITAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITAL_COLOR; 
ctx.fillStyle = INITAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting () {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath ();
        ctx.moveTo(x,y);
        ctx.fillStyle = ctx.strokeStyle;
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function onMouseDown(event) {
    painting = true;
}

function onMouseLeave(event){
    painting = false;
}

function handleColorClick(event) {
 const color = event.target.style.backgroundColor;
 ctx.strokeStyle = color;
 ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick() {
 if(filling === true ) {
     filling = false;
     mode.innerText = "Fill"
 } else {
    filling = true; 
    mode.innerText = "Paint";
 }
 }
function handleCavasClick() {
    if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}
}

function handleCM (event) {
    event.preventDefault(); // 우측마우스 조작방지 기능
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS(🃏)";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCavasClick);
    canvas.addEventListener("contextmenu", handleCM);// 우마우스 조작방지 기능. 

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
   range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}