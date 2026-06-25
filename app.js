let userScore = 0;
let cpuScore = 0;
let rounds = 3;
let currentRound = 0;

const coin = document.getElementById("coin");

function getModeRounds() {
  const mode = document.getElementById("mode").value;
  if (mode === "custom") {
    return parseInt(document.getElementById("customRounds").value || 3);
  }
  return parseInt(mode);
}

function play(choice) {
  rounds = getModeRounds();

  if (currentRound >= rounds) return;

  const result = Math.random() < 0.5 ? "heads" : "tails";

  // animazione 3D
  const spins = 5 + Math.floor(Math.random() * 5);
  const rotation = spins * 360 + (result === "heads" ? 0 : 180);

  coin.style.transform = `rotateY(${rotation}deg)`;

  setTimeout(() => {
    if (choice === result) {
      userScore++;
      document.getElementById("result").innerText = "Hai vinto il round!";
    } else {
      cpuScore++;
      document.getElementById("result").innerText = "Hai perso il round!";
    }

    currentRound++;

    document.getElementById("userScore").innerText = userScore;
    document.getElementById("cpuScore").innerText = cpuScore;

    checkGame();
  }, 2000);
}

function checkGame() {
  if (currentRound >= rounds) {
    let msg =
      userScore > cpuScore
        ? "🏆 Hai vinto la partita!"
        : "💀 Hai perso la partita!";

    document.getElementById("result").innerText = msg;

    setTimeout(() => {
      resetGame();
    }, 3000);
  }
}

function resetGame() {
  userScore = 0;
  cpuScore = 0;
  currentRound = 0;

  document.getElementById("userScore").innerText = 0;
  document.getElementById("cpuScore").innerText = 0;
  document.getElementById("result").innerText = "";
}
