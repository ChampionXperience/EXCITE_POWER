let range = document.getElementById('range');
let image = document.getElementById('target');

let totalImages = 72; // Total number of images
range.max = totalImages;

let changeDelay = 50; // Default delay in milliseconds between image changes
let isMouseDown = false;
let startX = 0;
let currentImageIndex = 1;

function work(value) {
    image.src = `EXCITEPower_Jigsaw/EXCITEPower_Jigsaw_` + value + `.jpg`;
    image.setAttribute('data-index', value);
}

range.addEventListener("input", (event) => {
    work(event.target.value);
    currentImageIndex = event.target.value;
});

// Function to set the change delay
function setChangeDelay(newDelay) {
    changeDelay = newDelay;
}

// Mouse event handlers
function handleMouseMove(event) {
    if (!isMouseDown) return;

    const dx = event.clientX - startX;
    if (Math.abs(dx) > 20) { // Threshold for detecting significant movement
        if (dx > 0) {
            currentImageIndex = (parseInt(currentImageIndex) % totalImages) + 1;
        } else {
            currentImageIndex = (parseInt(currentImageIndex) - 1 + totalImages) % totalImages;
            if (currentImageIndex === 0) currentImageIndex = totalImages;
        }
        range.value = currentImageIndex;
        work(currentImageIndex);
        startX = event.clientX;
    }
}

function handleMouseDown(event) {
    if (event.button !== 0) return;

    isMouseDown = true;
    startX = event.clientX;
}

function handleMouseUp() {
    isMouseDown = false;
}

image.addEventListener('mousemove', handleMouseMove);
image.addEventListener('mousedown', handleMouseDown);
image.addEventListener('mouseup', handleMouseUp);

// Zoom functionality
let zoomLevel = 1;
document.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (event.deltaY < 0) {
        zoomLevel += 0.1;
    } else {
        zoomLevel -= 0.1;
    }
    zoomLevel = Math.min(Math.max(1, zoomLevel), 1.3); // Limit the zoom level to prevent shrinking below original size
    image.style.transform = `scale(${zoomLevel})`;
}, { passive: false });
