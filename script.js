import CONFIG from "./api.js";

const YOUR_API_KEY = CONFIG.API_KEY;

const quoteDisplay = document.getElementById("typing-box");
const quoteInput = document.getElementById("typing-area");
const timerElement = document.getElementById("timer");
const wpmElement = document.querySelector(".stat-box:nth-child(1)"); // WPM
const accuracyElement = document.querySelector(".stat-box:nth-child(2)"); // Accuracy
const restartButton = document.getElementById("restart");

const shortTime = 30;
const longTime = 60;
let gameTime = shortTime * 1000; // Default game time in ms
let timer = null;
let gameStart = null;
let correctChars = 0;
let totalTyped = 0;
let totalMistakes = 0; // Tracks mistakes

// ✅ Hide accuracy until the end
accuracyElement.innerHTML = `0 <br> Accuracy`;

// ✅ API Call Function
async function getQuote() {
  try {
    document.querySelector(".loading-screen").style.display = "block"; // ✅ Show loading

    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      method: "GET",
      headers: {
        "X-Api-Key": YOUR_API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    if (!data || !data[0] || !data[0].quote) {
      throw new Error("Quote is missing in response");
    }
    const quote = data[0].quote;
    quoteDisplay.innerText = ""; // Clear previous quote

    // ✅ Create span elements for each character
    quote.split("").forEach((character) => {
      const span = document.createElement("span");
      span.innerText = character;
      quoteDisplay.appendChild(span);
    });

    // ✅ Set timer based on quote length
    updateTimerBasedOnText();

    quoteInput.value = ""; // Reset input
    resetGame();
  } catch (error) {
    console.error("Error fetching quote:", error);
  } finally {
    document.querySelector(".loading-screen").style.display = "none"; // ✅ Hide loading always
  }
}

// ✅ Function to set timer based on text length
function updateTimerBasedOnText() {
  const paragraphText = quoteDisplay.textContent.trim(); // Get text inside the typing box
  if (paragraphText.length > 200) {
    gameTime = longTime * 1000; // Set to 60 seconds
    timerElement.textContent = longTime;
  } else {
    gameTime = shortTime * 1000; // Set to 30 seconds
    timerElement.textContent = shortTime;
  }
}

quoteInput.addEventListener("input", () => {
  if (!gameStart) {
    startTimer(); // Start timer on first keypress
  }

  const arrayQuote = quoteDisplay.querySelectorAll("span");
  const arrayValue = quoteInput.value.split("");

  correctChars = 0;
  totalTyped = arrayValue.length; // Total characters typed

  let isComplete = true; // ✅ Track if typing is fully correct

  arrayQuote.forEach((span, index) => {
    const character = arrayValue[index] || ""; // Prevents undefined values

    if (character === "") {
      span.classList.remove("correct", "incorrect");
      isComplete = false;
    } else if (character === span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correctChars++; // ✅ Count correct characters
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
      totalMistakes++; // ❌ Count mistakes (even if corrected later)
      isComplete = false;
    }
  });

  // ✅ If typing is fully correct and complete, stop the timer early
  if (isComplete && totalTyped === arrayQuote.length) {
    clearInterval(timer); // ⏳ Stop timer
    quoteInput.disabled = true; // Disable further input
    showFinalStats(); // ✅ Show final stats
  }
});

// ✅ Start Timer Function
function startTimer() {
  gameStart = new Date().getTime();
  timer = setInterval(() => {
    const currentTime = new Date().getTime();
    const msPassed = currentTime - gameStart;
    const sPassed = Math.floor(msPassed / 1000);
    const sLeft = Math.max(0, Math.round(gameTime / 1000 - sPassed));

    timerElement.innerText = sLeft;

    if (sLeft <= 0) {
      clearInterval(timer);
      quoteInput.disabled = true; // Disable input when time is up
      showFinalStats(); // ✅ Show final WPM & Accuracy
    }
  }, 1000);
}

// ✅ Show Final WPM & Accuracy
function showFinalStats() {
  const timeElapsed = gameTime / 60000; // Convert ms to minutes
  let wpm = Math.round(correctChars / 5 / timeElapsed);
  let accuracy = calculateAccuracy();

  wpmElement.innerHTML = `${wpm} <br> WPM`;
  accuracyElement.innerHTML = `${accuracy}% <br> Accuracy`; // ✅ Show accuracy ONLY at the end
}

// ✅ Calculate Accuracy (Even with Deleted Mistakes)
function calculateAccuracy() {
  if (totalTyped === 0) return 100; // Avoid NaN errors

  let accuracy = Math.round(
    ((correctChars - totalMistakes) / totalTyped) * 100
  );

  return Math.max(0, accuracy); // Ensure accuracy doesn't go below 0%
}

// ✅ Reset Game Function
function resetGame() {
  clearInterval(timer);
  timer = null;
  gameStart = null;
  timerElement.innerText = gameTime / 1000; // Reset to correct time
  quoteInput.disabled = false; // Re-enable input
  correctChars = 0;
  totalTyped = 0;
  totalMistakes = 0; // Reset mistakes

  // ✅ Reset stats to 0
  wpmElement.innerHTML = `0 <br> WPM`;
  accuracyElement.innerHTML = `0 <br> Accuracy`; // ✅ Hide accuracy until the end
}

// ✅ Restart Button Fix
restartButton.addEventListener("click", () => {
  document.getElementById("typing-area").value = "";
  document.getElementById("typing-box").innerHTML = "";
  wpmElement.innerHTML = "0 <br> WPM";
  accuracyElement.innerHTML = `0 <br> Accuracy`; // ✅ Hide accuracy until the end
  getQuote(); // Get new quote
});

// ✅ Load the quote on page load
document.addEventListener("DOMContentLoaded", function () {
  getQuote(); // ✅ Get a new quote on load
});
