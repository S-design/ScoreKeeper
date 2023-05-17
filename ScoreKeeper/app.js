// Our query selectors are contained in variables with their 
//values set to object, this is just a way to clean up our code (re-factorin)
//you can think of this like simplifying a fraction, intead of writting 2 functions
// for each player we have 2 variables as Object literals and 1 function
//Note: An Object literal is when you declare an Object in JavaScript code which 
//is a variable that stores data in key-value pairs, while JSON stands for JavaScript 
//Object Notation and it's a language-agnostic format for storing and transferring data 
//that is based on JavaScript Objects. Usually saved to a seperate file.
const p1 = {
    //we need to keep track of our score so we have set it 
    //at zero and saved it to this variable
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}
const p2 = {
    //we need to set the score for both players
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}
//You could re-factorise the function below to be opponents if you wanted more players
//and add a p3 variable, p4, p5 etc.

//this variable contains our queryselector with the id of #reset
//linked by the id attribute
const resetButton = document.querySelector('#reset');
//this variable contains our queryselector with the id of #playto
//this holds the value chosen by the user from the html select element
//linked by the id attribute
const winningScoreSelect = document.querySelector('#playto');
//These are the default values saved to variables
let winningScore = 3;
let isGameOver = false;

//this is a generic function that can be done for either p1 or p2
//player could be p1 or p2 and opponent can be p1 or p2
function updateScores(player, opponent) {
    //if not(!) game over then increment
    if (!isGameOver) {
        //this increments our score key value by 1
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            // this code adds new styles to our spans if the game is over
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            // this disables our buttons when our game is over
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        // this code changes the text within our spans depending on the score value
        //since p1 and p2 can be player at the same time in this case we dont need to duplicate for opponent 
        player.display.textContent = player.score;
    }
}

//Here are our event listeners in the event our buttons are
//clicked our scores will be updated
// the top one sets the player and opponent to p1 and p2 (our variables holding the Object Literals)
p1.button.addEventListener('click', function () {
    updateScores(p1, p2)
})
//p1.button selects the p1 variable and key button
//p2.button selects the p2 variable and key button
// the bottom one sets the player and opponent to p2 and p1 (the opposite way around so that player and opponent can represent either p1 or p2)
p2.button.addEventListener('click', function () {
    updateScores(p2, p1)
})



//the change event listener is triggered when a change 
//occours to the value contained in the winningScoreSelect variable
winningScoreSelect.addEventListener('change', function () {

//this updates the value of the winningScore variable upon change to the winningScoreSelect variable
//this. refers to the specific object we are listening for in an event
// in this case winningScoreSelect and then accessing the value with .value
//parseInt is how we take a string and get a number out of it
    winningScore = parseInt(this.value);
//we are calling the reset function within this function
//so that when we change the #playto value the game resets
    reset();
})

//When we click on the reset button it will reset the game as it calls on the reset function
resetButton.addEventListener('click', reset)

//reset is deffined in it's own function
//this function deffines what will happen upon reset
//in this case setting the score to 0, isGameOver variable to false,
//removing the added styles and re-enabling the buttons
function reset() {
    isGameOver = false;
    //after the above variable is re-set, this for loop itterates
    //through the objectlitterals contained in 2 different variables (p1,p2)
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}
