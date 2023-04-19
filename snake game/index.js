const playboard = document.querySelector(".area");
const score_val=document.querySelector(".score");
const highestScore=document.querySelector(".high-score");

let xfood = 30, yfood = 30;
let xsnake = 1, ysnake = 1;
let snakebody = [];
let xvelocity = 0, yvelocity = 0;
let gameover = false;
let setIntervalId;
let score=0;

let highest=localStorage.getItem("high-score")||0;
highestScore.innerText=`High Score : ${highest}`;

const changefoodlocation = () => {
    xfood = Math.floor(Math.random() * 30) + 1;
    yfood = Math.floor(Math.random() * 30) + 1;
}
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game is Over press OK to replay..");
    location.reload();

}
const change_dir = (e) => {
    if (e.key === "ArrowUp" && yvelocity != 1) {
        xvelocity = 0;
        yvelocity = -1;
    } else if (e.key == "ArrowDown" && yvelocity != -1) {
        xvelocity = 0;
        yvelocity = 1;
    }
    else if (e.key == "ArrowLeft" && xvelocity != 1) {
        xvelocity = -1;
        yvelocity = 0;
    }
    else if (e.key == "ArrowRight" && xvelocity != -1) {
        xvelocity = 1;
        yvelocity = 0;
    }
}

const initailize = () => {
    if (gameover) return handleGameOver();
    let htmlmarker = `<div class="food" style="grid-area:${yfood}/${xfood}"></div>`;

    if (xsnake == xfood && ysnake == yfood) {
        changefoodlocation();
        snakebody.push([xfood, yfood]);
        score++;
        highest=(score>=highest)? score:highest;
        localStorage.setItem("high-score",highest);
        score_val.innerText=`Score : ${score}`;
        
    }
    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }
    snakebody[0] = [xsnake, ysnake];

    xsnake += xvelocity;
    ysnake += yvelocity;
    if (xsnake <= 0 || xsnake > 30 || ysnake <= 0 || ysnake > 30) {
        gameover = true;
    }

    for (let i = 0; i < snakebody.length; i++) {
        htmlmarker += `<div class="snakehead" style="grid-area:${snakebody[i][1]}/${snakebody[i][0]}"></div>`;
        if (i !== 0 && snakebody[0][1] === snakebody[0][0] === snakebody[i][0]) {
            gameover = true;
        }
    }


    playboard.innerHTML = htmlmarker;
}
changefoodlocation();
setIntervalId = setInterval(initailize, 125);
document.addEventListener('keydown', change_dir);
