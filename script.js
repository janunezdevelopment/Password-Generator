const defaultPasswordLength = 15;
const minPasswordLength = 4;
const maxPasswordLength = 40;
const emptyStateText = "Click to copy";
let characters = [];
let requiredCharacterPools = [];

const passContElOne = document.querySelector(".password-container-one");
const passContElTwo = document.querySelector(".password-container-two");
const copyStatusEl = document.querySelector(".copy-status");
const passwordLengthInputEl = document.querySelector("#password-length");
const passwordBoxes = [passContElOne, passContElTwo];

function setCopyStatus(message, isError = false) {
  copyStatusEl.textContent = message;
  copyStatusEl.classList.toggle("error", isError);
}

function getPasswordLength() {
  const inputValue = Number(passwordLengthInputEl.value);

  if (!Number.isFinite(inputValue)) {
    passwordLengthInputEl.value = defaultPasswordLength;
    return defaultPasswordLength;
  }

  const clampedLength = Math.min(
    maxPasswordLength,
    Math.max(minPasswordLength, Math.floor(inputValue)),
  );

  passwordLengthInputEl.value = clampedLength;
  return clampedLength;
}

function buildCharacterPools(sourceCharacters) {
  const uppercaseChars = sourceCharacters.filter((char) => /[A-Z]/.test(char));
  const lowercaseChars = sourceCharacters.filter((char) => /[a-z]/.test(char));
  const numberChars = sourceCharacters.filter((char) => /[0-9]/.test(char));
  const symbolChars = sourceCharacters.filter((char) =>
    /[^A-Za-z0-9]/.test(char),
  );

  return [uppercaseChars, lowercaseChars, numberChars, symbolChars];
}

async function loadCharacters() {
  if (characters.length > 0 && requiredCharacterPools.length > 0) {
    return true;
  }

  try {
    const response = await fetch("./data.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Failed to load character source file.");
    }

    const data = await response.json();
    const loadedCharacters = Array.isArray(data) ? data : data.characters;

    if (!Array.isArray(loadedCharacters) || loadedCharacters.length === 0) {
      throw new Error("Character data must be a non-empty array.");
    }

    const validatedCharacters = loadedCharacters.filter(
      (char) => typeof char === "string" && char.length === 1,
    );

    if (validatedCharacters.length !== loadedCharacters.length) {
      throw new Error("Character data contains invalid values.");
    }

    const pools = buildCharacterPools(validatedCharacters);
    const hasAllRequiredPools = pools.every((pool) => pool.length > 0);

    if (!hasAllRequiredPools) {
      throw new Error(
        "Character data must include upper, lower, number, symbol.",
      );
    }

    characters = validatedCharacters;
    requiredCharacterPools = pools;
    return true;
  } catch (error) {
    setCopyStatus("Could not load character data from data.json.", true);
    return false;
  }
}

function getRandomInt(maxExclusive) {
  if (maxExclusive <= 0) {
    return 0;
  }

  if (!window.crypto || !window.crypto.getRandomValues) {
    return Math.floor(Math.random() * maxExclusive);
  }

  const maxUint32 = 0x100000000;
  const validRange = Math.floor(maxUint32 / maxExclusive) * maxExclusive;
  const randomBuffer = new Uint32Array(1);

  let randomNumber = 0;
  do {
    window.crypto.getRandomValues(randomBuffer);
    randomNumber = randomBuffer[0];
  } while (randomNumber >= validRange);

  return randomNumber % maxExclusive;
}

function pickRandomChar(charPool) {
  return charPool[getRandomInt(charPool.length)];
}

function shuffleChars(charArray) {
  const shuffled = [...charArray];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = getRandomInt(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function generatePassword(length) {
  const targetLength = Math.max(length, requiredCharacterPools.length);
  const passwordChars = requiredCharacterPools.map((pool) =>
    pickRandomChar(pool),
  );

  for (let i = passwordChars.length; i < targetLength; i += 1) {
    passwordChars.push(pickRandomChar(characters));
  }

  return shuffleChars(passwordChars).join("");
}

window.passwordApp = {
  emptyStateText,
  passContElOne,
  passContElTwo,
  passwordBoxes,
  setCopyStatus,
  getPasswordLength,
  loadCharacters,
  generatePassword,
};
