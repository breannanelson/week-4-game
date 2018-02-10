
// array of char objs
//hp >> health points
const PATH = "./assets/images/"
var charArr = [
    {
        name: "Baymax",
        hp: 50,
        image: PATH + "Baymax.png"
    },
    {
        name: "Hiro",
        hp: 50,
        image: PATH + "Hiro_Hamada_Profile.png"
    },
    {
        name: "GoGo",
        hp: 50,
        image: PATH + "GoGo_Suit_back_Render.png"
    },
    {
        name: "Frederick",
        hp: 50,
        image: PATH + "Frederick_(Earth-14123)_001.png"
    },
    {
        name: "Tadashi",
        hp: 50,
        image: PATH + "Tadashi_Hamada.png"
    },
    {
        name: "Honey",
        hp: 50,
        image: PATH + "Tumblr_n8se6pza1R1ry7whco1_1280.png"
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

    // while(chosenHero.hp-enemyPoint < 0 && chosenEnemy.hp-heroPoint < 0) {
    heroPoint = Math.floor(Math.random() * 5);
    enemyPoint = Math.floor(Math.random() * 5);
    // }

    if (heroPoint < enemyPoint && isEnemyAlive && isHeroAlive) {

        if (chosenHero.hp - enemyPoint <= 0) {
            chosenHero.hp = 0;
            isHeroAlive = false;
        }
        else {
            chosenHero.hp -= enemyPoint;
        }
        $("#heroHP").text(chosenHero.hp)
    }
    else if (enemyPoint < heroPoint && isEnemyAlive && isHeroAlive) {

        if (chosenEnemy.hp - heroPoint <= 0) {
            isEnemyAlive = false;
        }
        else {
            chosenEnemy.hp -= heroPoint;
        }
        $("#enemyHP").text(chosenEnemy.hp)
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
            "<img src='" + charArr[i].image + "' style='width:150px; height: 150px;'/><h3>" + charArr[i].name + "</h3>"
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

initGame()

$(document).on("click", ".char", function () {
    if (!isHeroChosen) {
        //returns the number we need to search for the chosen character in the array
        chosenHero = charArr[$(this).attr("value")]
        console.log(chosenHero)
        isHeroChosen = true
        $(this).addClass("fader")
        $(".heroCho").html("<h1>Your hero:</h1><br>" +
            "<img src='" + chosenHero.image + "' style='width:300px; height: 300px; align-content: center; '/><h3>" + chosenHero.name + "</h3><h5 id = 'heroHP'>" + chosenHero.hp + "</h5>"
        )
    }
    else if (!isEnemyChosen) {
        //returns the number we need to search for the chosen character in the array
        chosenEnemy = charArr[$(this).attr("value")]
        console.log(chosenEnemy)
        isEnemyChosen = true
        $(this).addClass("fader")
        $(".enemyCho").html("<h1>Your enemy:</h1><br>" +
            "<img src='" + chosenEnemy.image + "' style='width:300px; height: 300px; align-content: center; '/><h3>" + chosenEnemy.name + "</h3><h5 id = 'enemyHP'>" + chosenEnemy.hp + "</h5>"
        )
        $(".stats").html("<br><br><button id='heroAttack' class='btn btn-default btn-lg play-button'><span class='glyphicon glyphicon-play'></span> Ready?</button></div>")

    }

})

var count = 0;
var wins = 0;
$(document).on("click", "#heroAttack", function () {
    $("#heroAttack").text("Attack!")
    if (count !== 0) {
        attack();

        if (isHeroAlive && !isEnemyAlive) {
            if(wins < 1){
                chosenHero.hp += 25;
                $("#heroHP").text(chosenHero.hp)
                isEnemyChosen = false;
                isEnemyAlive = true;
                $(".enemyCho").empty()
                $(".stats").empty()
                alert("You won! Pick a new enemy.")
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
                alert("You are the master. You can not be defeated! Play Again");
                initGame()
            }
            //second round
        }
        else if (!isHeroAlive && isEnemyAlive) {
            $(".characters").empty()
            $(".heroCho").empty()
            $(".enemyCho").empty()
            $(".stats").empty()
            updateHealthPoint();
            initGame()
            chosenHero = {}
            isHeroChosen = false
            isHeroAlive = true
            alert("You have been defeated. Try Again!");
        }

    }
    count = 1;

})


// reset game. Used when hero losses
// function reset {

// }

// This works but the code below also works.
// $(".char").on("click", function() {
//     alert("Hi")
// })


        // $(".characters").append(charThing)

        // when the hero dies, change is hero alive to false
        // we just need to matipulate chosenHero and chosenEnemy



        // reset game function 
