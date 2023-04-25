let editedPlayer;
const players = [
  { name: "", symbol: "X" },
  { name: "", symbol: "O" },
];
let activePlayer = 0;
let roundCount = 0;
const gameData = ["", "", "", "", "", "", "", "", ""];
const winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
];
const form = document.querySelector("form");
const inputErrorElem = document.querySelector(".input-error");
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".modal-close");
const cancelModalBtn = document.getElementById("cancel-modal-btn");
const editBtn1Elem = document.getElementById("edit-player-1-btn");
const editBtn2Elem = document.getElementById("edit-player-2-btn");
const startNewGameBtn = document.getElementById("start-game-btn");
const gameSections = document.querySelector(".active-game");
const cellsContainerElem = document.querySelector(".game-container");
const winnerNameElem = document.getElementById("winner-name");
const gameOverElem = document.querySelector(".game-over");
const activePlayerNameElem = document.getElementById("active-player");

function toggleModal() {
  modal.classList.toggle("show-modal");
  backdrop.classList.toggle("show-backdrop");
  form.firstElementChild.children[1].classList.remove("error");
  inputErrorElem.textContent = "";
}

function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid;
  toggleModal();
}

function submitForm(evt) {
  evt.preventDefault();
  const enterdPlayername = evt.target.playername.value.trim();
  const inputElem = evt.target.querySelector("input[name=playername]");

  if (!enterdPlayername) {
    inputElem.classList.add("error");
    inputErrorElem.textContent = "Please enter a valid name.";
    return;
  }
  const playerNameElem = document.getElementById(`player-${editedPlayer}`).children[1];
  playerNameElem.textContent = enterdPlayername;
  players[editedPlayer - 1].name = enterdPlayername;
  inputElem.value = "";
  toggleModal();
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please update players name!");
    return;
  }
  gameSections.style.display = "block";
  gameOverElem.style.display = "none";
}

function playGame(event) {
  if (event.target.classList.contains("game-container")) return;
  if (event.target.innerHTML !== "") return;
  event.target.innerHTML = players[activePlayer].symbol;
  event.target.classList.add("disabled");
  activePlayerNameElem.textContent = players[activePlayer].name;
  gameData[event.target.id - 1] = activePlayer;
  const winner = checkGameOver();
  if (winner) gameOver(winner);
  roundCount++;
  console.log(winner);
  toggleTurn();
}

function toggleTurn() {
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function checkGameOver() {
  for (let arr of winnerCombinations) {
    if (gameData[arr[0]] !== "" && gameData[arr[0]] === gameData[arr[1]] && gameData[arr[1]] === gameData[arr[2]]) {
      return players[gameData[arr[0]]].name;
    }
  }

  if (roundCount >= 8) return "Draw";
}

function gameOver(winner) {
  if (winner !== "Draw") {
    winnerNameElem.textContent = winner;
  } else {
    document.querySelector(".game-status").innerHTML = "It is a draw!";
  }
  gameOverElem.style.display = "block";
  gameSections.style.display = "none";

  resetGame();
}

function resetGame() {
  const cells = cellsContainerElem.children;
  for (let i = 0; i < gameData.length; i++) {
    gameData[i] = "";
    cells[i].innerHTML = "";
    cells[i].classList.remove("disabled");
  }
  roundCount = 0;
}

form.addEventListener("submit", submitForm);
editBtn1Elem.addEventListener("click", openPlayerConfig);
editBtn2Elem.addEventListener("click", openPlayerConfig);
backdrop.addEventListener("click", toggleModal);
closeModal.addEventListener("click", toggleModal);
cancelModalBtn.addEventListener("click", toggleModal);
startNewGameBtn.addEventListener("click", startNewGame);
cellsContainerElem.addEventListener("click", playGame);
