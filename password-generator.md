# Password Generator Project Context

## Project Overview

This project is a lightweight, static web application that generates secure random passwords for users. The main goal is to provide a simple and fast password generation experience with configurable length, clear copy-to-clipboard actions, and visually polished UI.

### Key goals

- Generate random passwords with strong character diversity
- Allow users to set length from a bounded range
- Provide two generated password results for quick comparison/copying
- Keep the implementation simple, dependency-light, and easy to run locally in a browser
- Use a secure random source when available via the Web Crypto API

### Primary technologies

- HTML for structure and layout
- CSS for styling, theme system, responsiveness, and motion
- JavaScript for password generation, validation, clipboard behavior, and UI logic
- Local JSON data file for the allowed character set
- Vanilla browser APIs only; no framework or build tool is required

---

## Architecture & Structure

This is a small front-end application built without a package manager or app framework.

| Area              | File         | Purpose                                                                                      |
| ----------------- | ------------ | -------------------------------------------------------------------------------------------- |
| Entry page        | `index.html` | Page structure, input controls, action button, password containers, status text              |
| Core logic        | `script.js`  | Character pool loading, length validation, password generation, secure randomness, app state |
| UI behavior       | `handler.js` | Copy logic, fallback clipboard behavior, length spinner controls, click events               |
| Character data    | `data.json`  | Source list of allowed characters including uppercase, lowercase, digits, and symbols        |
| Styling           | `styles.css` | Design system, layout, gradients, buttons, copy feedback, responsive styling                 |
| Local font assets | `font/`      | Custom variable font used for the branded UI                                                 |

### Runtime behavior

- The page loads a list of valid characters from `data.json`.
- Character pools are categorized into uppercase, lowercase, numeric, and symbol groups.
- The application ensures that each generated password includes at least one character from each required category.
- Password length is clamped to a minimum of 4 and a maximum of 40; default length is 15.
- Passwords are shuffled before display so the required characters are mixed into the final result.
- Clicking a password copies it to the clipboard using `navigator.clipboard` when available, otherwise a fallback textarea-based copy method is used.

### Design notes

- The app is intentionally static and browser-only.
- The system favors reliability and simplicity over complexity.
- Visual design uses a warm, glassmorphism-inspired aesthetic with a custom local font.

---

## Key Decisions & Guidelines

### Coding standards and conventions

- Prefer plain JavaScript over frameworks to keep the project lightweight and easy to understand.
- Keep functionality in a small set of clear functions with explicit names.
- Validate external data before using it.
- Use graceful fallback behavior for clipboard access and browser API limitations.
- Keep DOM queries centralized and tied to meaningful UI elements.

### Technical constraints and rules

- The browser must still work even if clipboard API is unavailable or not secure.
- Generated passwords must include a mix of character types to improve security.
- Character source data must be a non-empty array of single-character strings.
- Input length must remain within safe bounds and be normalized before generation.
- The project should remain easy to open and run from local files without a bundler or server setup.

### Design rules

- Use strong contrast and readable labels for accessibility.
- Keep actions obvious: generate password, copy password, adjust length.
- Maintain consistent spacing and a clean visual hierarchy.
- Respect reduced-motion preferences in CSS animations.

---

## Current State & Todo List

### Completed features

- Password generation UI with two output slots
- Adjustable length input with min/max range enforcement
- Up/down controls for length adjustment
- Character data validation and category-aware generation
- Clipboard copy with secure and fallback behavior
- Status messaging for copy success/failure and empty state
- Responsive layout and themed styling
- Local font loading and custom design tokens

### Immediate next steps

- Add a README with run instructions and project overview
- Consider a stronger customizability panel for character inclusion/exclusion
- Add support for copy-to-clipboard feedback improvements and keyboard accessibility review
- Evaluate whether additional password strength indicators would be useful
- Consider optional export or bulk generation features if the app grows
- Add automated tests if the project evolves beyond the static prototype stage

---

## AI Agent Context

This project is a static client-side password generator and should be treated as a small, standalone front-end app rather than a framework-based application.

### What an AI should know when continuing work

- The project is intentionally minimal and dependency-free.
- The core logic lives in `script.js`; UI behaviors and event wiring live in `handler.js`.
- `data.json` is the authoritative source of the allowed character set and must remain valid.
- Password generation semantics should preserve the rule: each password contains at least one uppercase, lowercase, number, and symbol unless the data source is invalid.
- Prefer editing the existing structure and style system rather than introducing major tooling or framework migration.
- If adding features, keep consistency with the current static HTML/CSS/JS architecture.
- Accessibility matters: buttons, copy instructions, and status messaging should remain clear and keyboard-friendly.

### Working assumptions

- The app is meant to be opened directly in a browser or served from a simple static web server.
- No build process is required unless a future feature explicitly introduces one.
- The codebase values clarity and directness over abstraction.
- The design is already established and should remain visually coherent with the current warm neutral palette and glass-card layout.

### Best continuation guidance

- When fixing bugs, check the interaction between `script.js` and `handler.js` first because the app relies on shared globals via `window.passwordApp`.
- When modifying the UI, ensure the styling remains aligned with the CSS variables in `styles.css`.
- When changing generation logic, preserve secure random generation and character diversity rules.
- When adding new behavior, prefer incremental changes that fit the current architecture instead of rewriting the app into a framework.
