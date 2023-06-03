// Create a program that plays Rock, Paper, Scissors with the user.
// When the user completes a game - win or lose - they should be prompted to begin another one.
// The program should only use console output; no graphics are needed.
// Extensions
// Different coloured output for a win, loss, or draw
//
// The game should keep track of the user's results, and display them when prompted

import prompt from "prompt";
import colors from "@colors/colors"

const inputAskPlayAGain = {
    properties: {
        input: {
            description: 'Do you want to play again? Y/N',
            pattern: /^[yn]$/i,
            message: `Type "Y" or "N"`
        }
    }
}

const inputPlayGame = {
    properties: {
        input: {
            description: 'Type "R"(rock), "P"(paper), "S"(scissors)',
            pattern: /^[rps]$/i,
            message: 'Type "R"(rock), "P"(paper), "S"(scissors)'
        }
    }
}

//Keep track of the results
const results = {
    "Wins": 0,
    "Loss": 0
}

//Check if the user wants to play again or not
const askPlayAgain = () => {
    //console.log(`Do you want to play again? Y/N`);    
    
    prompt.get(inputAskPlayAGain, function (err, result) {
        if(result.input.toUpperCase() == "N") {

            console.log("\nGAME OVER \n".bold, results);
            return;
        }
        playGame();
        
    })
}

//Randomly pickup rock, paper or scissors
const computerOutput = (arr = ["R", "P", "S"]) => {
    return arr[Math.floor(Math.random() *3)];
};

//Tells who is the winner
const winner = (input, computerOutput) => {
    let formatInput = input.toUpperCase().trim();
    console.log(colors.bgBrightBlue("\n" + formatInput + " X " + computerOutput));

    if(formatInput === 'R' && computerOutput == 'P') {
        console.log(colors.cyan.bold("Looooser! :("));
        updateLoss(results);
        
    }else if(formatInput === 'P' && computerOutput == 'S') {
        console.log(colors.cyan.bold("Looooser!"));
        updateLoss(results);
        
    }else if(formatInput === 'S' && computerOutput == 'R') {
        console.log(colors.cyan.bold("Looooser!"));
        updateLoss(results);  

    }else if(formatInput === computerOutput) {
        console.log(colors.yellow.bold("It's a draw!"));

    }else {
        console.log(colors.red.bold("Winner! :D"));
        updateWins(results);        
    }    
};

//const askInput = () => console.log(`Type "R"(rock), "P"(paper), "S"(scissors)`);
const updateWins = (results) => results.Wins += 1;
const updateLoss = (results) => results.Loss += 1;
const printResults = () => console.log("\n", results);

//Starts the prompt
prompt.start();
const playGame = () => {    
    prompt.get(inputPlayGame, function (err, result) {
    
    const output = computerOutput();
    
    winner(result.input, output);    
    printResults();
    askPlayAgain();
    
  
})};

playGame();
