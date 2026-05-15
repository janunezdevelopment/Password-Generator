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

function adjustPasswordLength(step) {
  const passwordLengthInputEl = document.querySelector("#password-length");

  if (!passwordLengthInputEl) {
    return;
  }

  const min = Number(passwordLengthInputEl.min);
  const max = Number(passwordLengthInputEl.max);
  const currentValue = Number(passwordLengthInputEl.value);
  const safeCurrentValue = Number.isFinite(currentValue)
    ? currentValue
    : Number(passwordLengthInputEl.defaultValue);
  const nextValue = Math.min(max, Math.max(min, safeCurrentValue + step));

  passwordLengthInputEl.value = String(nextValue);
}

async function copyPassword(button) {
  const password = button.textContent.trim();

  if (!password || password === window.passwordApp.emptyStateText) {
    window.passwordApp.setCopyStatus(
      "Generate a password before copying.",
      true,
    );
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(password);
    } else {
      copyPasswordFallback(password);
    }

    window.passwordApp.setCopyStatus("Password copied to clipboard.");
    button.classList.remove("copied");
    window.requestAnimationFrame(() => {
      button.classList.add("copied");
    });
  } catch (error) {
    window.passwordApp.setCopyStatus(
      "Copy failed. Try selecting the password manually.",
      true,
    );
  }
}

async function randomPass() {
  const hasCharacterData = await window.passwordApp.loadCharacters();

  if (!hasCharacterData) {
    return;
  }

  const passwordLength = window.passwordApp.getPasswordLength();

  window.passwordApp.passContElOne.textContent =
    window.passwordApp.generatePassword(passwordLength);
  window.passwordApp.passContElTwo.textContent =
    window.passwordApp.generatePassword(passwordLength);
  window.passwordApp.passwordBoxes.forEach((button) => {
    button.classList.remove("copied");
  });
  window.passwordApp.setCopyStatus("Tap either password to copy it.");
}

window.passwordApp.passwordBoxes.forEach((button) => {
  button.addEventListener("click", () => {
    copyPassword(button);
  });
});

const increaseLengthButtonEl = document.querySelector(".length-arrow-up");
const decreaseLengthButtonEl = document.querySelector(".length-arrow-down");

if (increaseLengthButtonEl && decreaseLengthButtonEl) {
  increaseLengthButtonEl.addEventListener("click", () => {
    adjustPasswordLength(1);
  });

  decreaseLengthButtonEl.addEventListener("click", () => {
    adjustPasswordLength(-1);
  });
}

window.randomPass = randomPass;
window.passwordApp.loadCharacters();
