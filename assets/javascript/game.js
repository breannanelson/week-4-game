
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
var isHeroAlive
// chosen enemy obj
var chosenEnemy
// is enemy choosen bool
var isEnemyChosen
// is enemy alive bool
var isEnemyAlive


// attack functions
function attack() {
    var heroPoint = Math.floor(Math.random() * 5);
    var enemyPoint = Math.floor(Math.random() * 5);

    if (heroPoint < enemyPoint) {
        chosenHero.hp -= enemyPoint;
    }
    else {
        chosenEnemy.hp -= heroPoint;
    }
    // upset stats

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

// This works but the code below also works.
// $(".char").on("click", function() {
//     alert("Hi")
// })

initGame()
$(document).on("click", ".char", function () {
    if (!isHeroChosen) {
        //returns the number we need to search for the chosen character in the array
        chosenHero = charArr[$(this).attr("value")]
        console.log(chosenHero)
        isHeroChosen = true
        $(this).addClass("fader")
        $(".heroCho").html("<h1>Your hero:</h1><br>" +
            "<img src='" + chosenHero.image + "' style='width:300px; height: 300px; align-content: center; '/><h3>" + chosenHero.name + "</h3><h5>" + chosenHero.hp + "</h5>"
        )
    }
    else if (!isEnemyChosen) {
        //returns the number we need to search for the chosen character in the array
        chosenEnemy = charArr[$(this).attr("value")]
        console.log(chosenEnemy)
        isEnemyChosen = true
        $(this).addClass("fader")
        $(".enemyCho").html("<h1>Your enemy:</h1><br>" +
            "<img src='" + chosenEnemy.image + "' style='width:300px; height: 300px; align-content: center; '/><h3>" + chosenEnemy.name + "</h3><h5>" + chosenEnemy.hp + "</h5>"
        )
        $(".stats").html("<br><br><button id='heroAttack' class='btn btn-default btn-lg play-button'><span class='glyphicon glyphicon-play'></span> Ready?</button></div>")

    }

})

$(document).on("click", "#heroAttack", function () {
    console.log("Test")
    $("#heroAttack").text("Attack!")

    if (isHeroAlive && !isEnemyAlive) {
        chosenHero.hp += 10;
        //second round
    }
    else if (!isHeroAlive && isEnemyAlive) {
        chosenEnemy.hp += Math.floor(Math.random() * 10);
        alert("You have been defeated");
        // call reset game function
    }
    else {
        attack();
    }

})





        // $(".characters").append(charThing)

        // when the hero dies, change is hero alive to false
        // we just need to matipulate chosenHero and chosenEnemy



        // reset game function 
