
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//要確定是否可以讓遊戲起動
var started = false; 
var level = 0;

$(document).keydown(function() {
    //檢查變數並設定初始值
    //if (!b) {b = 2;}   簡寫就是 b || (b = 2);
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        console.log("success");
        
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        starOver();
    }
}

//重新開始遊戲
function starOver() {
    level = 0 ;
    gamePattern = [];
    started = false ;
}

//下個回合
function nextSequence() {
    //在下個level新增空集合
    userClickedPattern = [];

    //每呼叫一次nextSequence()就新增一個level
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColor = buttonColors[randomNumber];
    //push(): 在gamePattern空集合力新增randomChosenColor的選項
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
    }, 100);
    
}




