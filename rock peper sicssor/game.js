

const outcomes = ["Paper", "Rock", "Scissor"];
const winnerOutcome = [["Paper", "Rock"], ["Rock", "Scissor"], ["Scissor", "Paper"]];

document.getElementById("btn").addEventListener('click', draw);

function draw() {
    const container = document.getElementById("container");
    container.innerHTML = "";
    const player1 = document.createElement("div");
    const player2 = document.createElement("div");

    const playerOne = document.createElement("h3");
    const playerTwo = document.createElement("h3");
    
    const player1Outcome = outcomes[createRandomIndex(3)];
    const player2Outcome = outcomes[createRandomIndex(3)];

    player1.className = `${player1Outcome}`;
    player2.className = `${player2Outcome}`;

    playerOne.innerHTML = "Player1";
    playerTwo.innerHTML = "Player2";

    player1.innerHTML = getOutcomeUnicode(player1Outcome);
    player2.innerHTML = getOutcomeUnicode(player2Outcome);

    player1.appendChild(playerOne);
    player2.appendChild(playerTwo);
    container.appendChild(player1);
    container.appendChild(player2);

    const winner = result(player1Outcome, player2Outcome);
    const winnerP =  document.getElementById("winner") ? document.getElementById("winner") : document.createElement("p");
    winnerP.innerHTML = "";
    winnerP.innerHTML = winner !== "draw" ? `Congragulation ${winner}!` : winner;
    winnerP.id = "winner";
    container.after(winnerP);
}

function createRandomIndex(mul) {
    return Math.floor(Math.random() * mul);
}

//Outcome1 = Player1
//Outcome2 = player2
function result(outcome1, outcome2) {
    for (let arr of winnerOutcome) {
        if((arr[0] === outcome1 && arr[1] === outcome2) || (arr[1] === outcome1 && arr[0] === outcome2) ) {
            if(arr[0] === outcome1) {
                return "Player1";
            }
            return "Player2";
        }
    }
    return "draw";
}

function getOutcomeUnicode(outcome) {
    switch (outcome) {
        case "Rock":
            return "✊"
        case "Paper":
            return "✋"
        case "Scissor":
            return "✌️"
        default:
            break;
    }
}

//U+270A->Rock
//U+270B->Paper
//U+270C->Scissor