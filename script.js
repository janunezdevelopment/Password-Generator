const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

const passwordLength = 15;
const emptyStateText = "Tap to copy";

const passContElOne = document.querySelector("#password-container-one");
const passContElTwo = document.querySelector("#password-container-two");
const copyStatusEl = document.querySelector("#copy-status");
const passwordBoxes = [passContElOne, passContElTwo];

function setCopyStatus(message, isError = false) {
  copyStatusEl.textContent = message;
  copyStatusEl.classList.toggle("error", isError);
}

function generatePassword() {
  let password = "";

  for (let i = 0; i < passwordLength; i += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

function copyPasswordFallback(text) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  tempInput.setAttribute("readonly", "");
  tempInput.style.position = "absolute";
  tempInput.style.left = "-9999px";
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

async function copyPassword(button) {
  const password = button.textContent.trim();

  if (!password || password === emptyStateText) {
    setCopyStatus("Generate a password before copying.", true);
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(password);
    } else {
      copyPasswordFallback(password);
    }

    setCopyStatus("Password copied to clipboard.");
    button.classList.remove("copied");
    window.requestAnimationFrame(() => {
      button.classList.add("copied");
    });
  } catch (error) {
    setCopyStatus("Copy failed. Try selecting the password manually.", true);
  }
}

function randomPass() {
  passContElOne.textContent = generatePassword();
  passContElTwo.textContent = generatePassword();
  setCopyStatus("Tap either password to copy it.");
}

passwordBoxes.forEach((button) => {
  button.addEventListener("click", () => {
    copyPassword(button);
  });
});
