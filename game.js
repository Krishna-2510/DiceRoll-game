var gamer1 = {
    name: "Player1",
    score: 0,
    totwin: 0
};
var gamer2 = {
    name: "Player2",
    score: 0,
    totwin: 0
};
var maxscore = 25;//deafult maxscore is 25
 const dicesound=new Audio('dicerollaudio.mp3');
 const psound=new Audio('positivesound.wav');
 const gotone=new Audio('gotone.mp3');
 const win=new Audio('winner.wav');
 const losehalf=new Audio('losehalf.mp3');

//button to start the game
var btnstart = document.getElementById('Start');
btnstart.addEventListener('click', startgame);

//button to Quit or reload
var btnquit = document.getElementById('Quit');
btnquit.addEventListener('click', () => {
    var c = confirm("Are you sure");
    if (c == true)
        window.location.reload();
});

//button to Help
var btnhelp = document.getElementById('Help');
btnhelp.addEventListener('click', () => {
    var dis = document.getElementById('rules');
    dis.style.display = "block"
});

//button to close rules
var btnclose = document.getElementById('close');
btnclose.addEventListener('click', () => {
    var cl = document.getElementById('rules');
    cl.style.display = "none"
});

//button for mode

var md = document.getElementById('mode');

var btnmode = document.getElementById('Mode');
btnmode.addEventListener('click', () => {
    md.style.display = "block";
});
//easy mode
var btneasy = document.getElementById('easy');
btneasy.addEventListener('click', () => {
    maxscore = 25;
    md.style.display = 'none';
});
//meduim mode
var btnmed = document.getElementById('med');
btnmed.addEventListener('click', () => {
    maxscore = 50;
    md.style.display = 'none';
});
//hard mode
var btnhard = document.getElementById('hard');
btnhard.addEventListener('click', () => {
    maxscore = 100;
    md.style.display = 'none';
});

console.log("Maxscore=" + maxscore);
//function to start the game
function startgame() {
    var p1 = document.getElementById('player1');
    var p2 = document.getElementById('player2');
    if (p1.value == '' || p2.value == '') {
        alert("Please enter the names first");
    }
    else {
        gamer1.name = p1.value;
        gamer2.name = p2.value;
        document.getElementById('img').innerHTML = "<img id='diceimg' src='dice6.png'>";
        document.getElementById('Start').style.display = 'none'
        active = 1;
        let dice = document.getElementById('img');
        dice.addEventListener('click', diceroll);
    }
}
//function to roll the dice and add the score
function diceroll() {
    dicesound.play();
    let n = Math.random();
    n = (Math.round(n * 10)) / 10;
    n = n * 6;
    n = Math.round(n);
    console.log(n);
    if (n == 0)
        n = 6;
    let lnk = `dice${n}.png`;
    let i = document.getElementById('img');
    i.innerHTML = `<img id="diceimg" src="${lnk}">`;
    instantchanges(active);
    document.getElementById('img').style.border = "none";
    //checking the value of n
    if (n != 1) {
        if (active == 1) {
            if (n == 3) {
                losehalf.play();
                activeplayer(1);
                gamer1.score /= 2;
                gamer1.score = Math.round(gamer1.score);
            }
            else {
                activeplayer(1);
                gamer1.score += n;
                if (gamer1.score >= maxscore) {
                    displaywinner(gamer1.name, 1);
                    playagain();
                }
            }
            showscore(1);
        }
        else {
            if (n == 3) {
                losehalf.play();
                activeplayer(0);
                gamer2.score /= 2;
                gamer2.score = Math.round(gamer2.score);
            }
            else {
                activeplayer(0);
                gamer2.score += n;
                if (gamer2.score >= maxscore) {
                    displaywinner(gamer2.name, 0);
                    playagain();
                }
            }
            showscore(0);
        }
    }
    else {
        gotone.play();
        if (active == 1)
            active = 0;
        else
            active = 1;

        activeplayer(active);
        document.getElementById('img').style.border = "5px solid red";
    }
}
//function to highlight the active player
function activeplayer(a) {
    if (a == 1) {
        document.getElementById('p1').style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        document.getElementById('p1').style.borderColor = "black";
        document.getElementById('p2').style.removeProperty("background-color");
        document.getElementById('p2').style.borderColor = "white";
    }
    else {
        document.getElementById('p2').style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        document.getElementById('p2').style.borderColor = "black";
        document.getElementById('p1').style.removeProperty("background-color");
        document.getElementById('p1').style.borderColor = "white";

    }
}
//function to display the current score
function showscore(act) {
    if (act == 1) {
        console.log("gamer1.score=" + gamer1.score);
        let p = document.getElementById('score1');
        p.innerHTML = gamer1.score;
    }
    else {
        console.log("gamer2.score=" + gamer2.score);
        let p = document.getElementById('score2');
        p.innerHTML = gamer2.score;
    }
}
//function to display the winner in the center
function displaywinner(name, a) {
    win.play();
    document.getElementById('img').style.backgroundImage = "url('trophy.png')";
    document.getElementById('img').style.backgroundSize = "300px 300px";
    document.getElementById('img').style.border = "2px solid white";
    document.getElementById('img').innerHTML = `${name} wins`;
    document.getElementById('img').removeEventListener('click', diceroll);
    if (a == 1) {
        gamer1.totwin+=1;
        console.log("totwin2="+gamer2.totwin)
        document.getElementById('p1').style.backgroundImage = "url('redwinner.jpg')";
        document.getElementById('p2').style.backgroundColor = "rgb(0,0,0,0.5)";
        document.getElementById('player2').style.color = "rgb(105, 105, 105)";
        document.getElementById('player2').style.backgroundColor = "rgb(0,0,0,0.5)";
        document.getElementById('score2').style.backgroundColor = "rgb(0,0,0,0.5)";
        document.getElementById('score2').style.color = "rgb(105, 105, 105)";
        document.getElementById('totwin2').style.backgroundColor="rgb(0,0,0,0.5)";
        document.getElementById('totwin2').style.color="rgb(105, 105, 105)";
    }
    else {
        gamer2.totwin+=1;
        console.log("totwin2="+gamer2.totwin)
        document.getElementById('p2').style.backgroundImage = "url('bluewinner.jpg')";
        document.getElementById('p1').style.backgroundColor = "rgb(0,0,0,0.5)";
        document.getElementById('player1').style.backgroundColor = "rgb(0,0,0,0.5)";
        document.getElementById('score1').style.backgroundColor = "rgb(0,0,0,0.5)";
        document.getElementById('player1').style.color = "rgb(105, 105, 105)";
        document.getElementById('score1').style.color = "rgb(105, 105, 105)";
        document.getElementById('totwin1').style.backgroundColor="rgb(0,0,0,0.5)";
        document.getElementById('totwin1').style.color="rgb(105, 105, 105)";
    }
    document.getElementById('totwin1').innerHTML=gamer1.totwin;
    document.getElementById('totwin2').innerHTML=gamer2.totwin;
    document.getElementById('totwin1').style.visibility="visible";
    document.getElementById('totwin2').style.visibility="visible";
}
//function to ask the user if he wants to play again
function playagain() {
    var m = document.getElementById('message');
    m.style.visibility = "visible";
    document.getElementById('Playagain').addEventListener('click', () => {
        gamer1.score = gamer2.score = 0;
        showscore(0);
        showscore(1);
        m.style.visibility = "hidden";
        document.getElementById('img').style.backgroundImage = 'none';
        document.getElementById('img').innerHTML = "<img id='diceimg' src='dice5.png'>"
        document.getElementById('img').style.backgroundColor = "rgb(71 63 63)";
        document.getElementById('img').style.border = "none";
        document.getElementById('p1').style.removeProperty("background-color");
        document.getElementById('p2').style.removeProperty("background-color");
        document.getElementById('p1').style.borderColor = "white";
        document.getElementById('p2').style.borderColor = "white";
        document.getElementById('p1').style.backgroundImage = 'none';
        document.getElementById('p2').style.backgroundImage = 'none';
        document.getElementById('player1').style.backgroundColor = "rgb(255, 0, 64)";
        document.getElementById('score1').style.backgroundColor = "rgba(255, 0, 64, 0.644)";
        document.getElementById('player2').style.backgroundColor = "rgb(162, 0, 255)";
        document.getElementById('score2').style.backgroundColor = "rgb(162, 0, 255, 0.644)";
        document.getElementById('player2').style.color = "rgb(255, 255, 255)";
        document.getElementById('score2').style.color = "rgb(255, 255, 255)";
        document.getElementById('player1').style.color = "rgb(255, 255, 255)";
        document.getElementById('score1').style.color = "rgb(255, 255, 255)";
        document.getElementById('totwin1').style.backgroundColor="rgba(255, 0, 64, 0.644)";
        document.getElementById('totwin1').style.color="white";
        document.getElementById('totwin2').style.backgroundColor="rgba(162, 0, 255, 0.644)";
        document.getElementById('totwin2').style.color="white";
        startgame();
    });
    document.getElementById('No').addEventListener('click', () => {
        window.location.reload();
    })
};
//function for some visual effects
function instantchanges(act) {
    document.getElementById('img').addEventListener('mousedown', () => {
        document.getElementById('img').style.border = "2px solid rgb(72,255,0)";

    });
}
