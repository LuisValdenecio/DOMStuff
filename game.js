document.addEventListener('DOMContentLoaded', function() {
    // the game happens here...
    const 
        CAR1 = document.getElementById('car1'), 
        CAR2 = document.getElementById('car2'),
        BTN = document.querySelector('button');
    
        let INTERVAL1, INTERVAL2;

    BTN.addEventListener('click', function() {
        BTN.disabled = true;
        startRace();
    });

    function startRace() {
        INTERVAL1 = setIntervalHlpr(Math.random() * 1000, CAR1);
        INTERVAL2 = setIntervalHlpr(Math.random() * 1000, CAR2);
    }

    function setIntervalHlpr(timeInMls, ele) {

        let stepsForward = 0;

        return setInterval(function() {

            if (stepsForward >= window.innerWidth) {
                clearInterval(INTERVAL1);
                clearInterval(INTERVAL2);
                alert(`${ele.getAttribute("id")} wins!!`);
                BTN.disabled = false;
                return;
            }

            ele.style.left = `${stepsForward}px`;
            stepsForward += window.innerWidth/100;
        }, timeInMls);
    }

})