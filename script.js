  const correctSound = new Audio(
  "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
);
const alphabetList = [
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"
];
let allScores = [];


// leadearboard stuff

const leaderboardBtn =
  document.getElementById("leaderboardBtn");

const leaderboardPanel =
  document.getElementById("leaderboardPanel");

const leaderboardOverlay =
  document.getElementById("leaderboardOverlay");

const leaderboardList =
  document.getElementById("leaderboardList");

// ===== CURRENT MODE =====

let leaderboardMode = "alphabet";

// ===== TOGGLE PANEL =====

leaderboardBtn.addEventListener("click", () => {

  leaderboardPanel.classList.toggle("open");

  leaderboardOverlay.classList.toggle("open");

  leaderboardBtn.classList.toggle("open");

  fetchLeaderboard();

});

// ===== CLOSE =====


leaderboardOverlay.addEventListener("click", () => {

  leaderboardPanel.classList.remove("open");

  leaderboardOverlay.classList.remove("open");

  leaderboardBtn.classList.remove("open");

});

// ===== SWITCH MODE =====

function switchLeaderboardMode(mode) {

  leaderboardMode = mode;

  document
    .querySelectorAll(".leaderboard-tab")
    .forEach(tab => {
      tab.classList.remove("active");
    });

  if (mode === "alphabet") {

    document
      .querySelectorAll(".leaderboard-tab")[0]
      .classList.add("active");

  } else {

    document
      .querySelectorAll(".leaderboard-tab")[1]
      .classList.add("active");
  }

  fetchLeaderboard();
}

// ===== DISPLAY =====

// UPDATE displayLeaderboard()

function displayLeaderboard(players) {

  leaderboardList.innerHTML = "";

  players
    .slice(0, 10)
    .forEach((player, index) => {

      leaderboardList.innerHTML += `

        <div class="leaderboard-entry">

          <span>
            ${index + 1}. ${player.name}
          </span>

          <span>
            ⭐ ${player.score}
          </span>

        </div>

      `;
    });
}

//side menu stuff
const openMenuBtn =
  document.getElementById("openMenuBtn");

const sideMenu =
  document.getElementById("sideMenu");

const overlay =
  document.getElementById("overlay");
  
  const leaderboardLoading =
  document.getElementById("leaderboardLoading");

// TOGGLE MENU

openMenuBtn.addEventListener("click", () => {

  sideMenu.classList.toggle("open");

  overlay.classList.toggle("open");

  if (sideMenu.classList.contains("open")) {
    openMenuBtn.textContent = "✖ Close";
  } else {
    openMenuBtn.textContent = "☰ Menu";
  }

});

// CLOSE when clicking overlay

overlay.addEventListener("click", () => {

  sideMenu.classList.remove("open");

  overlay.classList.remove("open");

});



let wordList = [];



function setMode(mode) {
  currentMode = mode;

  if (mode === "alphabet") {
    words = alphabetList;
  } else {
    words = wordList;
  }

  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  if (mode === "alphabet") {
    document.querySelectorAll(".mode-btn")[0].classList.add("active");
  } else {
    document.querySelectorAll(".mode-btn")[1].classList.add("active");
  }
}

let currentMode = "alphabet";
let words = alphabetList;
    let currentWord = "";
    let score = 0;
    let time = 60;
    let timer;
    let gameStarted = false;

    const wordDisplay = document.getElementById("wordDisplay");
    const wordInput = document.getElementById("wordInput");
    const scoreDisplay = document.getElementById("score");
    const timeDisplay = document.getElementById("time");
    const messageDisplay = document.getElementById("message");
    
    
  // ===== PLAYER NAME =====

let playerName = "";

const playerNameInput =
  document.getElementById("playerNameInput");

// HIDE GAME UI INITIALLY

document.querySelector(".stats").style.display = "none";
document.querySelector(".word-display").style.display = "none";
document.querySelector(".toggle-btn").style.display = "none";
document.querySelector(".buttons").style.display = "none";
document.querySelector(".message").style.display = "none";
document.querySelector(".mode-select").style.display = "none";
wordInput.style.display = "none";

// ===== CONFIRM NAME =====

playerNameInput.addEventListener("keydown", (e) => {

  // ENTER
  if (e.key === "Enter") {

    e.preventDefault();

    const name =
      playerNameInput.value.trim();

    if (name === "") return;

    playerName = name;

    // HIDE NAME SCREEN

    document
      .getElementById("nameScreen")
      .style.display = "none";

    // SHOW GAME UI

document.querySelector(".stats").style.display = "flex";
document.querySelector(".word-display").style.display = "block";
document.querySelector(".toggle-btn").style.display = "inline-block";
document.querySelector(".buttons").style.display = "flex";
document.querySelector(".message").style.display = "block";
document.querySelector(".mode-select").style.display = "flex";

    return;
  }

});
    function getRandomWord() {
      return words[Math.floor(Math.random() * words.length)];
    }

function showNewWord() {
  currentWord = getRandomWord();
  updateWordDisplay();
}

function updateWordDisplay() {
  const typed = wordInput.value.toLowerCase();
  let displayHTML = "";

  for (let i = 0; i < currentWord.length; i++) {
    const letter = currentWord[i];

    if (i < typed.length) {
      // Highlight typed letters
      displayHTML += `<span class="correct-letter">${letter.toUpperCase()}</span>`;
    } else {
      // Normal letters
      displayHTML += `<span>${letter.toUpperCase()}</span>`;
    }
  }

  wordDisplay.innerHTML = displayHTML;
}

// Prevent Japanese IME composition
wordInput.addEventListener("input", () => {

  wordInput.value =
    wordInput.value.replace(/[^a-zA-Z]/g, "");

});

function startGame() {
  if (gameStarted) return;

  gameStarted = true;
  score = 0;
  time = 60;

  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
  messageDisplay.textContent = "🔥 Game Started!";

  wordInput.value = "";
  
  // SHOW input box when game starts
  wordInput.style.display = "block";
  wordInput.focus();

  // Hide mode selector when game starts
  document.querySelector(".mode-select").style.display = "none";

  // Hide Start button, Show End Game button
  document.querySelector(".start-btn").style.display = "none";
  document.querySelector(".end-btn").style.display = "inline-block";

  showNewWord();

  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;

    if (time <= 0) {
      endGame();
    }
  }, 1000);
}
function forceEndGame() {
  endGame();
}

function endGame() {
  clearInterval(timer);
  gameStarted = false;
  if (score !== 0){
  		sendScore();
        }

  messageDisplay.textContent = `🏆 Game Over! Final Score: ${score}`;
  wordDisplay.textContent = `🏆 Game Over! Final Score: ${score}`;
  wordInput.value = "";

  // HIDE input box when game ends
  wordInput.style.display = "none";

  // Show mode selector again
  document.querySelector(".mode-select").style.display = "flex";

  // Show Start button again
  document.querySelector(".start-btn").style.display = "inline-block";

  // Hide End Game button
  document.querySelector(".end-btn").style.display = "none";
}
    wordInput.addEventListener("input", () => {
      wordInput.addEventListener("keydown", (e) => {
if (e.key.length === 1) {
  const currentInput = wordInput.value.toLowerCase();
  const expectedLetter = currentWord[currentInput.length];

  if (e.key.toLowerCase() !== expectedLetter) {
    e.preventDefault();

    highlightKey(e.key, false); // red for wrong key
    messageDisplay.textContent = "❌ Wrong letter! Try again!";
    return;
  } else {
    highlightKey(e.key, true); // blue for correct key
    setTimeout(() => {
  updateWordDisplay();
}, 10);
  }
}
  if (!gameStarted) return;

//   // Allow special keys
//   const allowedKeys = [
//     "Backspace",
//     "Delete",
//     "ArrowLeft",
//     "ArrowRight",
//     "Tab",
//     "Shift",
//     "Control",
//     "Alt",
//     "Enter",
// 	"Process",
//   	"Unidentified"
//   ];

//   if (allowedKeys.includes(e.key)) return;
  
//   if (!/^[a-zA-Z]$/.test(e.key)) {
//   e.preventDefault();
//   return;
// }

  // Only check normal letter keys
  if (e.key.length === 1) {
    const currentInput = wordInput.value.toLowerCase();
    const expectedLetter = currentWord[currentInput.length];

    // If wrong letter → block typing
    if (e.key.toLowerCase() !== expectedLetter) {
      e.preventDefault(); // stops wrong letter

      messageDisplay.textContent = "❌ Wrong letter! Try again!";
      return;
    }
  }

      // Small delay so the typed letter enters first
      setTimeout(() => {
        if (wordInput.value.toLowerCase() === currentWord) {
        correctSound.currentTime = 0;
correctSound.play();
          score++;
          scoreDisplay.textContent = score;
          messageDisplay.textContent = "🎉 Correct!";

          wordInput.value = "";
          showNewWord();
        }
      }, 10);
    });
	
      if (wordInput.value.toLowerCase() === currentWord) {
      correctSound.currentTime = 0;
correctSound.play();
        score++;
        scoreDisplay.textContent = score;
        messageDisplay.textContent = "🎉 Correct!";
        wordInput.value = "";
        showNewWord();
      }
    });
    
   const toggleKeyboardBtn = document.getElementById("toggleKeyboardBtn");
const keyboard = document.getElementById("keyboard");
const allKeys = document.querySelectorAll(".key");

let keyboardVisible = false;

// Toggle keyboard button
toggleKeyboardBtn.addEventListener("click", () => {
  keyboardVisible = !keyboardVisible;

  if (keyboardVisible) {
    keyboard.style.display = "block";
    toggleKeyboardBtn.textContent = "⌨️ Hide Keyboard";
  } else {
    keyboard.style.display = "none";
    toggleKeyboardBtn.textContent = "⌨️ Show Keyboard";
  }

	setTimeout(() => {
  wordInput.focus();
}, 0);
});

// Highlight pressed key
function highlightKey(letter, isCorrect = true) {
  // Remove old highlights
  allKeys.forEach(key => {
    key.classList.remove("active");
    key.classList.remove("wrong");
  });

  const targetKey = document.querySelector(
    `.key[data-key="${letter.toLowerCase()}"]`
  );

  if (targetKey) {
    if (isCorrect) {
      targetKey.classList.add("active"); // blue
    } else {
      targetKey.classList.add("wrong"); // red
    }
  }
}

function setMode(mode) {
  currentMode = mode;

  if (mode === "alphabet") {
    words = alphabetList;
  } else {
    words = wordList;
  }

  // Update button styles
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  if (mode === "alphabet") {
    document.querySelectorAll(".mode-btn")[0].classList.add("active");
  } else {
    document.querySelectorAll(".mode-btn")[1].classList.add("active");
  }
}


//api stuff
const API_KEY = "AIzaSyCKfDIE_jC3aCF80gPR-rHFZRjVnBf7e6k";
const wordList_SHEET_ID = "1gBVLfq1UBuA9OhG3devzZcyUiH4kNg-xlKt0mvMru6A";
const wordList_RANGE = "words!A2:A";


//get word list from gsheet
async function loadWordsFromSheet() {
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${wordList_SHEET_ID}/values/${wordList_RANGE}?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    wordList = data.values.map(row => row[0]);

    console.log("Loaded words:", wordList);

  } catch (error) {
    console.error("Error loading words:", error);
  }
}


//send score to sheets
	async function sendScore() {
       
        const data = {
        	name: playerName,
            score: score,
            mode: currentMode
        };
            
        try {
        	await fetch(
            	"https://script.google.com/macros/s/AKfycbwTa-7MuVnFKmASaodSoOFNyi65bgLkZnbCGkAeeZ20wYj0q8tRPbGq7IGUgt7YtyCB/exec",
                {
                  method: "POST",
                  body: JSON.stringify(data)
                }
             );
             
             fetchLeaderboard();
             
         console.log("Score sent!", playerName, score, currentMode)
         
         } catch (error) {
         	console.error("Error sending score:", error);
            }
        
}


//get scores
async function getScores() {

  try {

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwTa-7MuVnFKmASaodSoOFNyi65bgLkZnbCGkAeeZ20wYj0q8tRPbGq7IGUgt7YtyCB/exec"
    );

    const scores =
      await response.json();

    console.log(scores);

  } catch (error) {

    console.error(
      "Error getting scores:",
      error
    );
  }
}

// ===== FETCH LEADERBOARD =====

async function fetchLeaderboard() {

 // SHOW LOADER
  leaderboardLoading.style.display = "block";

  // HIDE SCORES
  leaderboardList.style.display = "none";


  try {

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwTa-7MuVnFKmASaodSoOFNyi65bgLkZnbCGkAeeZ20wYj0q8tRPbGq7IGUgt7YtyCB/exec"
    );

    allScores = await response.json();

    updateLeaderboard();

  } catch (error) {

    console.error(
      "Leaderboard Fetch Error:",
      error
    );
  }
  finally {

    // HIDE LOADER
    leaderboardLoading.style.display = "none";

    // SHOW SCORES
    leaderboardList.style.display = "block";
  }
}

function updateLeaderboard() {

  const filtered =
    allScores.filter(player =>
      player.mode === leaderboardMode
    );

  displayLeaderboard(filtered);
}

document.addEventListener("click", (e) => {

  // only during game
  if (!gameStarted) return;

  // ignore clicks on input itself
  if (e.target === wordInput) return;

  // ignore buttons/menu interactions
  if (
    e.target.closest("button") ||
    e.target.closest("#leaderboardPanel") ||
    e.target.closest("#sideMenu")
  ) {
    return;
  }

  // refocus input
  setTimeout(() => {
    wordInput.focus();
  }, 0);

});

playerNameInput.focus();
loadWordsFromSheet();
fetchLeaderboard();
