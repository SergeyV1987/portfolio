const educationTitle = document.querySelector('.education-section-title-container');
const educationInfo = document.querySelector('.education-info-container');
const educationControl = document.querySelector('.education-section-control');
const slider = document.querySelector('.slider');
const items = document.querySelectorAll('.slider .projects-item');
const buttonDesc = document.querySelectorAll('.button-description');
const itemDesc = document.querySelectorAll('.projects-item-data');
const links = document.querySelectorAll('.project-item-link');

educationTitle.addEventListener('click', () => {
    educationInfo.classList.toggle('hidden');
    educationControl.classList.toggle('rotate');
});

let touchStartX;
let touchEndX;

Array.from(links).forEach(item => {
    item.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].pageX;
    });
});

Array.from(links).forEach(item => {
    item.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].pageX;
        if (touchStartX === touchEndX) {
            this.open(item.href, '_self');
        }
    });
});

Array.from(buttonDesc).forEach((item) => {
    item.addEventListener('click', ({target}) => {
        if (target.innerHTML === 'Show description') {
            target.innerHTML = 'Hide description';
            target.nextElementSibling.style.display = 'block';
        } else {
            target.innerHTML = 'Show description';
            target.nextElementSibling.style.display ='none';
        }
    });
});

Array.from(buttonDesc).forEach((item) => {
    item.addEventListener('touchend', ({target}) => {
        if (target.innerHTML === 'Show description') {
            target.innerHTML = 'Hide description';
            target.nextElementSibling.style.display = 'block';
        } else {
            target.innerHTML = 'Show description';
            target.nextElementSibling.style.display ='none';
        }
    });
});

window.addEventListener('load',  () => {
    if (window.innerWidth < 427) {
        Array.from(itemDesc).forEach((item) => {
            item.style.display = 'none';
        });
    }
});

window.addEventListener('resize',  () => {
    if (window.innerWidth > 426) {
        Array.from(itemDesc).forEach((item) => {
            item.style.display = 'block';
        });
    }

    if (window.innerWidth < 427) {
        Array.from(itemDesc).forEach((item) => {
            item.style.display = 'none';
        });

        Array.from(buttonDesc).forEach((item) => {
            item.innerHTML = 'Show description';
        });
    }
});

let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    });
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    });
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

document.querySelector('.control.left').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem);
    }
});

document.querySelector('.control.right').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem);
    }
});

const swipeDetect = (el) => {

    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;

    let threshold = 100;
    let restraint = 100;
    let allowedTime = 300;

    surface.addEventListener('mousedown', function(e) {
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false);

    surface.addEventListener('mouseup', function(e) {
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime){
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if (distX > 0 && isEnabled) {
                    previousItem(currentItem);
                } else {
                    nextItem(currentItem);
                }
            }
        }
        e.preventDefault();
    }, false);

    surface.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
            if (e.target.classList.contains('left') && isEnabled) {
                previousItem(currentItem);
            } else {
                nextItem(currentItem);
            }
        }
        let touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false);

    surface.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);

    surface.addEventListener('touchend', function(e) {
        let touchObj = e.changedTouches[0];
        distX = touchObj.pageX - startX;
        distY = touchObj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime){
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if (distX > 0 && isEnabled) {
                    previousItem(currentItem);
                } else {
                    nextItem(currentItem);
                }
            }
        }
        e.preventDefault();
    }, false);
};

swipeDetect(slider);