
// array of char objs
//hp >> health points
const PATH = "./assets/images/"
var charArr = [
    {
        name: "Baymax",
        hp: 50,
        image: PATH + "baymax-selectPhoto.jpg",
        battleImage: PATH + "baymax-battlePhoto.gif"
    },
    {
        name: "Hiro",
        hp: 50,
        image: PATH + "hiro-selectPhoto.jpeg",
        battleImage: PATH + "hiro-battlePhoto.gif"
    },
    {
        name: "Fred",
        hp: 50,
        image: PATH + "fred-selectPhoto.jpeg",
        battleImage: PATH + "fred-battlePhoto.gif"
    },
    {
        name: "Honey Lemon",
        hp: 50,
        image: PATH + "honeyLemon-selectPhoto.jpeg",
        battleImage: PATH + "honey-battlePhoto.gif"
    },
    {
        name: "Wasabi",
        hp: 50,
        image: PATH + "wasabi-selectPhoto.jpeg",
        battleImage: PATH + "wasabi-battlePhoto.gif"
    },
    {
        name: "Go Go Tomago",
        hp: 50,
        image: PATH + "gogoTomago-selectPhoto.jpeg",
        battleImage: PATH + "gogo-battlePhoto.gif"
    }
]

// chosen hero obj
var chosenHero
// is hero choosen bool
var isHeroChosen
// is hero alive bool
var isHeroAlive = true;
// chosen enemy obj
var chosenEnemy
// is enemy choosen bool
var isEnemyChosen
// is enemy alive bool
var isEnemyAlive = true;


// attack functions
function attack() {
    var heroPoint;
    var enemyPoint;

    heroPoint = Math.floor(Math.random() * 5);
    enemyPoint = Math.floor(Math.random() * 5);

    if (heroPoint < enemyPoint && isEnemyAlive && isHeroAlive) {

        if (chosenHero.hp - enemyPoint <= 0) {
            chosenHero.hp = 0;
            isHeroAlive = false;
        }
        else {
            chosenHero.hp -= enemyPoint;
        }
        $("#heroHP").text(chosenHero.hp)
        updateProgressBar("heroHP",chosenHero.hp, 50)
    }
    else if (enemyPoint < heroPoint && isEnemyAlive && isHeroAlive) {

        if (chosenEnemy.hp - heroPoint <= 0) {
            isEnemyAlive = false;
        }
        else {
            chosenEnemy.hp -= heroPoint;
        }
        $("#enemyHP").text(chosenEnemy.hp)
        updateProgressBar("enemyHP",chosenEnemy.hp, 50)
    }

    

}

// init game function "initialize the game"
function initGame() {
    isHeroChosen = false
    isEnemyChosen = false

    var num = Math.floor(12 / charArr.length)

    for (var i = 0; i < charArr.length; i++) {
        var charThing = $("<div id='character-" + i + "' class='char col-md-" + num + "' value='" + i + "' ></div>")
        charThing.html(
            "<img src='" + charArr[i].image + "' style='width:150px; height: 150px;'/><h3 class = 'charName'>" + charArr[i].name + "</h3>"
        )
        $(".characters").append(charThing)
    }
}


// update health points
function updateHealthPoint() {
    for(var i=0; i<charArr.length; i++) {
        charArr[i].hp = 50;
    }
}

function updateProgressBar (chosenHP, val, maxVal) {
    var addStr = " progress-bar progress-bar-striped progress-bar-animated "
    var percentage = Math.floor((val/maxVal)*100) 
    if(percentage > 50) {
        $("#"+ chosenHP).removeClass( "bg-danger" )
        $("#"+ chosenHP).removeClass( "bg-warning" )
        $("#"+ chosenHP).attr("class", addStr + "bg-success")
    }
    if(percentage <= 50 && percentage >25){
        $("#"+ chosenHP).removeClass( "bg-success" )
        $("#"+ chosenHP).attr("class", addStr + "bg-warning")
    }
    else if(percentage <= 25) {
        $("#"+ chosenHP).removeClass( "bg-warning" )
        $("#"+ chosenHP).attr("class", addStr + "bg-danger")
    }

    $("#"+ chosenHP).attr("style", "width: " + percentage + "%; height:25px")

}

// Gets Link for Song
var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "./assets/audio/immortals.mp3");
// Plays default music when page is loaded
audioElement.play();

initGame();

$(document).on("click", ".char", function () {
    if (!isHeroChosen) {
        //returns the number we need to search for the chosen character in the array
        chosenHero = charArr[$(this).attr("value")]
        isHeroChosen = true
        $(this).addClass("fader")
        $(".heroCho").html("<h1>Your Hero:</h1><br>" +
            "<img class = 'battlePho' src='" + chosenHero.battleImage + "' style='width:99%; height: 60% align-content: center; '/><h3><br>"
             + chosenHero.name + "</h3><div class = 'progress'><div id = 'heroHP' class ='progress-bar progress-bar-striped progress-bar-animated bg-success' role = 'progressbar' ria-valuenow='50' aria-valuemin='0' aria-valuemax='100' style='width: 100%; height:25px'>" + chosenHero.hp + "</div></div>")
         $(".heroCho").addClass("herobkg")
    }
    else if (!isEnemyChosen) {
        //returns the number we need to search for the chosen character in the array
        chosenEnemy = charArr[$(this).attr("value")]
        isEnemyChosen = true
        $(this).addClass("fader")
        $(".enemyCho").html("<h1>Your Opponent:</h1><br>" +
            "<img class = 'battlePho' src='" + chosenEnemy.battleImage + "' style='width:99%; height: 60% align-content: center; '/><h3><br>" + chosenEnemy.name + "</h3><div class = 'progress'><div id = 'enemyHP' class ='progress-bar progress-bar-striped progress-bar-animated bg-success' role = 'progressbar' ria-valuenow='50' aria-valuemin='0' aria-valuemax='100' style='width: 100%; height:25px'>" + chosenEnemy.hp + "</div></div>")
        $(".stats").html("<br><br><button id='heroAttack' class='btn btn-lg btn-danger' data-toggle='button'><span class='glyphicon glyphicon-play'></span> Ready?</button></div>")
        $(".enemyCho").addClass("enemybkg")

    }

})

var count = 0;
var wins = 0;
$(document).on("click", "#heroAttack", function () {
    
    $("#heroAttack").text("Battle!")
    if (count !== 0) {
        attack();

        if (isHeroAlive && !isEnemyAlive) {
            if(wins < 1){
                if((chosenHero.hp + 25) >= 50){
                    chosenHero.hp = 50;
                }
                else {
                    chosenHero.hp += 25;
                }
                $("#heroHP").text(chosenHero.hp)
                isEnemyChosen = false;
                isEnemyAlive = true;
                updateProgressBar("heroHP",chosenHero.hp, 50)
                $(".enemyCho").empty()
                $(".stats").empty()
                alert("You won! Test your skills and pick a new opponent.")
                $(".enemyCho").removeClass("enemybkg")
                wins++;
            }
            else{
                isEnemyChosen = false;
                isEnemyAlive = true;
                $(".enemyCho").empty()
                $(".stats").empty()
                $(".heroCho").empty()
                $(".characters").empty()
                updateHealthPoint();
                chosenHero = {}
                isHeroChosen = false
                isHeroAlive = true
                alert("You are the master. You have been selected to challenge Yokai! Continue to test your skills");
                wins =0;
                $(".heroCho").removeClass("herobkg")
                $(".enemyCho").removeClass("enemybkg")
                initGame()
            }
        }
        else if (!isHeroAlive && isEnemyAlive) {
            $(".characters").empty()
            $(".heroCho").empty()
            $(".enemyCho").empty()
            $(".stats").empty()
            updateHealthPoint();
            updateProgressBar("enemyHP",chosenEnemy.hp, 50)
            $(".heroCho").removeClass("herobkg")
            $(".enemyCho").removeClass("enemybkg")
            initGame()
            chosenHero = {}
            isHeroChosen = false
            isHeroAlive = true
            alert("You Lost. Keep training and you will soon be able to defeat Yokai!");
            wins=0;
        }

    }
    count = 1;

})
