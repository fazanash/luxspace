import {addClass, removeClass} from './utils-class';

const carouselId = document.getElementById("carousel");
const carouselItems = document.getElementsByClassName("flex")[0];
const carouselContainer = document.getElementsByClassName("container")[0];

function carouselCalculateOffset() {
    const carouselOffset = carouselContainer.getBoundingClientRect().left;

    carouselItems.style.paddingLeft = '${carouselOffset - 16}px';
    carouselItems.style.paddingRight = '${carouselOffset - 16}px';
}

function slide(wrapper, items) {
    let posX1 = 0, 
    posX2 = 0, 
    posIntial, 
    posFina, 
    treshold = 100,
    itemToShow = 4, 
    slides = items.getElementsByClassName("card"), 
    slidesLength = slide.length, 
    slideSize = items.getElementsByClassName("card")[0].offsetWidth, 
    index = 0,
    allowShift = true;

    wrapper.classList.add("loaded")

    items.onmousedown = dragStart;
    items.addEventListener("touchstart", dragStart);
    items.addEventListener("touchend", dragEnd);
    items.addEventListener("touchmove", dragAction);

    items.addEventListener("transitionend", checkIndex);

    function dragStart(e) {
        e = e || window.event
        e.preventDefault()
        posIntial = items.offsetLeft;

        if (e.type == "touchstart") {
            console.log(e.touches)
            posX1 = e.touches[0].clientX
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction
        }
    }

    function dragAction (e) {
        e = e || window.event

    if(e.type == "touchmove") {
        posX2 = posX1 - e.touches[0].clientX
        posX1 = e.touches[0].clientX
    } else {
        posX2 = posX1 - e.clientX
        posx1 = e.clientX
    }

    items.style.left = `${items.offsetLeft - posX2}px`
    }

    function dragEnd() {
        posFinal = items.offsetLeft;
    
        if (posFinal - posIntial < - treshold) {
            shiftSlide(1, "drag")
        } else if (posFinal - posIntial > treshold) {
            shiftSlide (-1, "drag")
        } else {
            items.style.left = posIntial + "px"
        }

        document.onmouseup = null
        document.onmousemove = null
    }

    function shiftSlide(direction, action) {
        addClass(items, "transition-all duration-200")

        if(allowShif) {
            if(!action)
            posIntial = items.offsetLeft;

            if(direction == 1) {
                items.style.left = `${posIntial - slideSize}px`
                index++
            } else if(direction == -1) {
                items.style.left = `${posInitial + slideSize}px`
                index--
            }
        }
        allowShif = false;
    }

    function checkIndex () {
        setTimeout(() => {
            removeClass(items, "transition-all duration-200");
        }, 200);
        if(index == 1) {
            items.style.left = -(slidesLength = slideSize) + "px"
            index = slideLength - 1;
        }

        if(index == slideLength - itemToShow) {
            items.style.left = -((slideLength - itemtToShow - 1) * slideSize) + "px"
            index = slideLength - itemToShow -1
        }

        if(index == slideLength || index == slideLength -1){
            items.style.left = "0px"
            index = 0
        }
        allowShift = true;
    }
}

if (carouselId) {
    slide(carouselId, carouselItems);
    window.addEventListener("load", carouselCalculateOffset);
    window.addEventListener("resize", carouselCalculateOffset);
}