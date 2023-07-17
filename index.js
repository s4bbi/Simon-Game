var buttonColors = ["red", "green", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern =[]; // creating an array wo that when user clicks on a button, it gets added into the array

var Level = 0;

var started = false

    // Any Key Pressed

    $("body").on("keydown",function(){
        if(!started){
            $("h1").html("Level " + Level);
            nextSequence();
            started = true;
        }
    });

    // Mouse Click on button

    $(".btn").on("click",function(){

        var userChosenColour = $(this).attr("id");
        console.log(userChosenColour);
        playSound(userChosenColour);
        userClickedPattern.push(userChosenColour); // adds the clicked button to array
        console.log(userClickedPattern)
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });

    function checkAnswer(currentLevel) {

        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
          console.log("success");
    
          if (userClickedPattern.length === gamePattern.length){
    
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    
        } else {
    
            $("body").addClass("game-over"); // adding the class

            setTimeout(function(){
                $("body").removeClass('game-over');
            }, 200);
            
            var gameOver = new Audio("./sounds/wrong.mp3")
            gameOver.play();

            $("h1").html("Game Over, Press Any Key to Restart");
            startOver();

        }
    
    }

    function nextSequence(){

        userClickedPattern = [];
    
        // Increasing the level
        Level++;
    
        // Updating h1
    
        $("h1").html("Level " + Level);
    
        // generating a random number between 0 and 3
    
        var randomNumber = Math.random();
        randomNumber = randomNumber*4;
        randomNumber = Math.floor(randomNumber); 
    
        // now generating a random color from the array 
    
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
    
        console.log(randomChosenColor);
        console.log(gamePattern);
    
        // The Flash Animation (gets applied when the game is atarted by pressing any keyboard key, thr random button flashes and level gets changed to Level 1)
    
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
      }

    // Playing the sound!

    function playSound(key){

        switch(key){

            case "red":
                var redAudio = new Audio("./sounds/red.mp3");
                redAudio.play();
                break;
    
            case "green":
                var greenAudio = new Audio("./sounds/green.mp3");
                greenAudio.play();
                break;
    
            case "yellow":
                var yellowAudio = new Audio("./sounds/yellow.mp3");
                yellowAudio.play();
                break;
                
            case "blue":
                var blueAudio = new Audio("./sounds/blue.mp3");
                blueAudio.play();
                break;
    
            default:
                console.log("Click right button")
        }

    }

    function animatePress(currentColor) {

        $("#" + currentColor).addClass("pressed"); // adding the class

        setTimeout(function(){
            $("#" + currentColor).removeClass('pressed');
        }, 100);
    }        

    function startOver(){
        Level = 0;
        gamePattern = [];
        started = false;
    }
    