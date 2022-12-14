
//Defaults
let currentSize = 16;
let currentColor = "#000000";
//HTML Elements
const gridContainer = document.getElementById('grid-container');
const rangeSize = document.getElementById('range-size');
const rangeSizeText = document.getElementById('range-size-text');
const colorSelector = document.querySelector('.color-selector');
const buttonColor = document.getElementById('button-color');
const buttonRainbow = document.getElementById('button-rainbow');
const buttonEraser = document.getElementById('button-eraser');
const buttonClear = document.getElementById('button-clear');

let mouseDown = 0;
document.onmousedown = () => mouseDown = true;
document.onmouseup = () => mouseDown = false;

function createGrid(currentSize) {
    gridContainer.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;

    let gridBox = [];
    for (i = 0; i < (currentSize * currentSize); i++) {
        gridBox[i] = document.createElement("div");
        gridBox[i].classList.add('grid-box');
        gridBox[i].setAttribute('id', `grid-${i}`);
        gridBox[i].addEventListener('mouseover', setGridColor);
        gridBox[i].addEventListener('mousedown', setGridColor);
        gridContainer.appendChild(gridBox[i]);
    }
}

function setGridColor(e) {

    //User clicks and drags or User clicks just once
    if ((e.type == "mouseover" && mouseDown == true) || (e.type == "mousedown")){
        if (currentColor == "Rainbow"){
            let randomColorR = Math.floor(Math.random() * 256);
            let randomColorB = Math.floor(Math.random() * 256);
            let randomColorG = Math.floor(Math.random() * 256);        
            e.target.style.backgroundColor = `rgb(${randomColorR}, ${randomColorB}, ${randomColorG})`
        }
        else {
            e.target.style.backgroundColor = currentColor;
        }
    }
}

function updateCurrentColor() {
    currentColor = colorSelector.value;
}

function updateSize() {
    clearGrid();
    currentSize = rangeSize.value;
    createGrid(currentSize);
    updateSizeText();
}

function updateSizeText() {
    rangeSizeText.innerText = `${rangeSize.value} x ${rangeSize.value}`;
}

function clearGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function clearGridColor() {
    console.log(gridContainer.children.length);
    for (let i = 0; i < gridContainer.children.length; i++) {
        gridContainer.children[i].style.backgroundColor = "white";
    }
}

function changeModeToColor(){
    currentColor = colorSelector.value;
    buttonColor.classList.add('selected');
    clearOtherMode("Color");
}

function changeModeToRainbow(){
    currentColor = "Rainbow";
    buttonRainbow.classList.add('selected');
    clearOtherMode("Rainbow");
}

function changeModeToEraser(){
    currentColor = "#FFFFFF";
    buttonEraser.classList.add('selected');
    clearOtherMode("Eraser");
}

function clearOtherMode(Mode){
    if (Mode == "Color"){
        buttonRainbow.classList.remove('selected');
        buttonEraser.classList.remove('selected');
    }
    else if (Mode == "Rainbow"){
        buttonColor.classList.remove('selected');
        buttonEraser.classList.remove('selected');
    }
    else {
        buttonColor.classList.remove('selected');
        buttonRainbow.classList.remove('selected');
    }  
}

function setupListeners() {
    rangeSize.addEventListener('change', updateSize);
    colorSelector.addEventListener('change', updateCurrentColor);
    buttonClear.addEventListener('click', clearGridColor);
    buttonColor.addEventListener('click', changeModeToColor);  
    buttonRainbow.addEventListener('click', changeModeToRainbow);
    buttonEraser.addEventListener('click', changeModeToEraser);
}

function init() {
    setupListeners();
    createGrid(currentSize);
}
init();