const script = [
  // ═══════════════════════════════════════════════════════════════
  //  PART 1 — INTRODUCTION
  // ═══════════════════════════════════════════════════════════════
  {
    part: 1,
    title: "Introduction & App Preview",
    teach: [
      "Hi, today you and me are going to build a feature-packed Digital Clock application using HTML, CSS, and JavaScript.",
      "This isn't just a clock that shows the time. We're building a full clock suite with five tabs — a digital and analog clock with date display",
       `"a stopwatch with lap tracking that highlights your best and worst splits, a countdown timer with an animated SVG ring and quick presets, 
       an alarm system with toggle switches and a dismissible modal with sound, and a world clock that lets you track time across 15 cities with live UTC offsets.",
      "On top of that, we've got a 12/24 hour format toggle, dark and light themes with smooth transitions, localStorage persistence for alarms, world clocks, 
      and theme preference, and procedural audio using the Web Audio API for alarm and timer sounds.",
      "If this sounds good, smash that like button and subscribe for more projects like this. Let's jump right into the code."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 2 — PROJECT SETUP
  // ═══════════════════════════════════════════════════════════════
  {
    part: 2,
    title: "Project Setup",
    teach: [
      "Our setup is pretty simple",
      "We just need a project folder with three files — an HTML file for structure, a CSS file for styling, 
      and a JavaScript file for all the logic and interactivity."
    ],
    do: "mkdir digital-clock && cd digital-clock",
    teach2: [
      "Now let's create our three files."
    ],
    do2: "touch index.html style.css script.js",
    teach3: [
      "That's it. Three files is all we need.",
      "Let's start building the HTML structure."
    ],
    do3: "code ."
  },DD

  // ═══════════════════════════════════════════════════════════════
  //  PART 3 — HTML STRUCTURE
  // ═══════════════════════════════════════════════════════════════
  {
    part: 3,
    title: "HTML Structure",
    file: "index.html",
    teach: [
      "Let's build out our HTML. The app has a header with the logo, a 12/24 hour toggle and a theme switcher, a tab navigation bar for our five features, and then a section panel for each tab.",
      "We'll start with the document head and the header with its controls."
    ],
    write_step1: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Digital Clock</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app">
    <header class="header">
      <h1 class="logo">Clock<span>Hub</span></h1>
      <div class="header-controls">
        <button class="btn-icon" id="formatToggle" title="Toggle 12/24 hour">24H</button>
        <button class="btn-icon" id="themeToggle" title="Toggle theme">
          <svg class="icon sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg class="icon moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </header>`,
    teach2: [
      "The header uses flexbox to push the logo to the left and the controls to the right.",
      "The format toggle is a simple button that shows '24H' or '12H' — we'll swap the text from JavaScript.",
      "For the theme toggle we use two inline SVG icons — a sun for light mode and a moon for dark mode. We toggle their 
      visibility with CSS based on the current data-theme attribute.",
      "Using inline SVGs means zero extra HTTP requests and full control over styling with currentColor.",
      "Now let's add the tab navigation. This is the backbone of our multi-feature layout."
    ],
    write_step2: `

    <nav class="tabs">
      <button class="tab active" data-tab="clock">Clock</button>
      <button class="tab" data-tab="stopwatch">Stopwatch</button>
      <button class="tab" data-tab="timer">Timer</button>
      <button class="tab" data-tab="alarm">Alarm</button>
      <button class="tab" data-tab="world">World</button>
    </nav>`,
    teach3: [
      "Five tab buttons, each with a data-tab attribute that maps to a panel ID. The first tab starts with the 'active' class.",
      "We're using a nav element because this is a navigation pattern — good for semantics and accessibility.",
      "In JavaScript we'll add click handlers that toggle the 'active' class on both the tab buttons and their corresponding panels.",
      "Now let's build the main clock panel with both digital and analog displays."
    ],
    write_step3: `

    <!-- Clock Tab -->
    <section class="panel active" id="panel-clock">
      <div class="clock-display">
        <div class="time-row">
          <span class="digit" id="hours">00</span>
          <span class="separator">:</span>
          <span class="digit" id="minutes">00</span>
          <span class="separator">:</span>
          <span class="digit" id="seconds">00</span>
          <span class="ampm" id="ampm"></span>
        </div>
        <div class="date-row" id="dateDisplay"></div>
      </div>
      <div class="analog-clock">
        <div class="clock-face">
          <div class="hand hour-hand" id="hourHand"></div>
          <div class="hand minute-hand" id="minuteHand"></div>
          <div class="hand second-hand" id="secondHand"></div>
          <div class="center-dot"></div>
        </div>
      </div>
    </section>`,
    teach4: [
      "The digital display uses individual span elements for hours, minutes, and seconds. This lets us style each digit independently and 
      update them from JavaScript without touching the separators.",
      "The separators are styled with a CSS blink animation to create that classic clock pulse effect.",
      "The AM/PM indicator is its own span that only shows content when we're in 12-hour mode.",
      "Below the digital display we have a pure CSS analog clock — three div elements positioned as hands, rotated from JavaScript using transform: rotate().",
      "The clock face uses a ::before pseudo-element for the inner ring detail, and a center dot sits on top of all hands with z-index.",
      "Now let's build the stopwatch panel."
    ],
    write_step4: `

    <!-- Stopwatch Tab -->
    <section class="panel" id="panel-stopwatch">
      <div class="stopwatch-display">
        <span class="sw-digit" id="swMinutes">00</span>
        <span class="sw-sep">:</span>
        <span class="sw-digit" id="swSeconds">00</span>
        <span class="sw-sep">.</span>
        <span class="sw-digit sw-ms" id="swMilliseconds">00</span>
      </div>
      <div class="controls">
        <button class="btn btn-primary" id="swStart">Start</button>
        <button class="btn btn-secondary" id="swLap" disabled>Lap</button>
        <button class="btn btn-danger" id="swReset" disabled>Reset</button>
      </div>
      <ul class="lap-list" id="lapList"></ul>
    </section>`,
    teach5: [
      "The stopwatch display shows minutes, seconds, and centisecond milliseconds. The milliseconds use a smaller font size to create visual hierarchy.",
      "We have three buttons — Start doubles as Pause when running, Lap records a split time, and Reset clears everything.",
      "Lap and Reset start disabled and we enable them once the stopwatch is running.",
      "The lap list is an empty ul that we'll populate dynamically. It highlights the best lap in green and worst in red when there are more than two laps.",
      "Now let's add the countdown timer panel with its SVG progress ring."
    ],
    write_step5: `

    <!-- Timer Tab -->
    <section class="panel" id="panel-timer">
      <div class="timer-setup" id="timerSetup">
        <div class="timer-inputs">
          <div class="timer-input-group">
            <input type="number" id="timerHours" min="0" max="23" value="0" class="timer-input">
            <label>Hours</label>
          </div>
          <div class="timer-input-group">
            <input type="number" id="timerMinutes" min="0" max="59" value="5" class="timer-input">
            <label>Minutes</label>
          </div>
          <div class="timer-input-group">
            <input type="number" id="timerSeconds" min="0" max="59" value="0" class="timer-input">
            <label>Seconds</label>
          </div>
        </div>
        <div class="timer-presets">
          <button class="btn-preset" data-time="60">1 min</button>
          <button class="btn-preset" data-time="300">5 min</button>
          <button class="btn-preset" data-time="600">10 min</button>
          <button class="btn-preset" data-time="900">15 min</button>
          <button class="btn-preset" data-time="1800">30 min</button>
        </div>
      </div>
      <div class="timer-running hidden" id="timerRunning">
        <div class="timer-ring">
          <svg viewBox="0 0 200 200">
            <circle class="ring-bg" cx="100" cy="100" r="90"/>
            <circle class="ring-progress" id="timerRing" cx="100" cy="100" r="90"/>
          </svg>
          <div class="timer-remaining" id="timerRemaining">00:00</div>
        </div>
      </div>
      <div class="controls">
        <button class="btn btn-primary" id="timerStart">Start</button>
        <button class="btn btn-secondary hidden" id="timerPause">Pause</button>
        <button class="btn btn-danger hidden" id="timerCancel">Cancel</button>
      </div>
    </section>`,
    teach6: [
      "The timer has two states — setup and running. We toggle visibility between timerSetup and timerRunning using the 'hidden' class.",
      "The setup view has three number inputs for hours, minutes, and seconds, plus preset buttons that populate the inputs with common durations.",
      "Each preset stores its total seconds in a data-time attribute — we convert that back to hours, minutes, and seconds in JavaScript.",
      "The running view features an SVG ring with two circles — a background circle and a progress circle. We animate the progress 
      by changing stroke-dashoffset. The circumference is 2 * PI * 90 which is roughly 565.48.",
      "The remaining time sits absolutely centered inside the ring using transform: translate(-50%, -50%).",
      "Now let's add the alarm panel."
    ],
    write_step6: `

    <!-- Alarm Tab -->
    <section class="panel" id="panel-alarm">
      <div class="alarm-form">
        <input type="time" id="alarmTime" class="alarm-time-input">
        <input type="text" id="alarmLabel" class="alarm-label-input" placeholder="Alarm label (optional)">
        <button class="btn btn-primary" id="addAlarm">Add Alarm</button>
      </div>
      <ul class="alarm-list" id="alarmList">
        <li class="alarm-empty">No alarms set</li>
      </ul>
    </section>`,
    teach7: [
      "The alarm form uses a native time input — this gives us a nice time picker on mobile and validates the format for free.",
      "There's an optional text input for a label so users can name their alarms like 'Meeting' or 'Lunch break'.",
      "The alarm list starts with a placeholder message. As alarms are added, we replace it with alarm cards that have the time, label, a toggle switch, and a delete button.",
      "When an alarm fires, we create a fullscreen overlay with a modal that has a shaking bell icon, the alarm details, and a dismiss button. The sound uses the Web Audio API.",
      "Alarms persist in localStorage so they survive page refreshes.",
      "Last panel — the world clocks."
    ],
    write_step7: `

    <!-- World Clocks Tab -->
    <section class="panel" id="panel-world">
      <div class="world-add">
        <select id="timezoneSelect" class="tz-select">
          <option value="">Add a city...</option>
          <option value="America/New_York">New York</option>
          <option value="America/Los_Angeles">Los Angeles</option>
          <option value="America/Chicago">Chicago</option>
          <option value="Europe/London">London</option>
          <option value="Europe/Paris">Paris</option>
          <option value="Europe/Berlin">Berlin</option>
          <option value="Asia/Tokyo">Tokyo</option>
          <option value="Asia/Shanghai">Shanghai</option>
          <option value="Asia/Kolkata">Mumbai</option>
          <option value="Asia/Dubai">Dubai</option>
          <option value="Australia/Sydney">Sydney</option>
          <option value="Pacific/Auckland">Auckland</option>
          <option value="America/Sao_Paulo">Sao Paulo</option>
          <option value="Africa/Cairo">Cairo</option>
          <option value="Asia/Singapore">Singapore</option>
        </select>
        <button class="btn btn-primary" id="addTimezone">Add</button>
      </div>
      <div class="world-list" id="worldList"></div>
    </section>
  </div>

  <script src="script.js"><\/script>
</body>
</html>`,
    teach8: [
      "The world clock uses a select dropdown with 15 major cities across every continent. Each option value is a standard IANA timezone string 
      like 'America/New_York' — these work directly with JavaScript's toLocaleTimeString.",
      "We'll prevent duplicate cities and use the Intl API to format times in each timezone.",
      "Each world clock card shows the city name, its UTC offset calculated dynamically, the current time, and a delete button.",
      "The selected cities persist in localStorage so users keep their setup across sessions.",
      "That's our complete HTML! Five panels, clean semantic markup, no external dependencies. Let's move on to CSS and make this look incredible."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 4 — CSS: RESET, THEME & BASE LAYOUT
  // ═══════════════════════════════════════════════════════════════
  {
    part: 4,
    title: "CSS — Reset, Theme Variables & Base Layout",
    file: "style.css",
    teach: [
      "Now for the fun part — styling. Our CSS uses a theme system based on CSS custom properties, which lets us swap 
      every color in the app with a single attribute change.",
      "Let's start with the universal reset and our dark theme variables."
    ],
    write_step1: `*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg: #0f1117;
  --surface: #1a1c25;
  --surface-hover: #24262f;
  --border: #2a2d38;
  --text: #e4e4e7;
  --text-muted: #8b8d97;
  --primary: #6366f1;
  --primary-glow: rgba(99, 102, 241, 0.25);
  --danger: #ef4444;*,
  --success: #22c55e;
  --warning: #f59e0b;
  --radius: 12px;
  --font: 'SF Mono', 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
}`,
    teach2: [
      "Universal reset with border-box sizing — this ensures padding doesn't add to element dimensions. 
      Every element starts from the same baseline.",
      "We define all our design tokens in :root — this is effectively our dark theme since it's the default.",
      "The naming convention is straightforward: bg for backgrounds, surface for card-like elements, 
      text for typography, primary for our brand indigo, and semantic colors like danger, success, and warning.",
      "We store the monospace font stack in a variable because we use it on the clock digits, stopwatch, 
      timer, and world clock times.",
      "Now let's add the light theme override."
    ],
    write_step2: `

[data-theme="light"] {
  --bg: #f4f4f5;
  --surface: #ffffff;
  --surface-hover: #f0f0f2;
  --border: #d4d4d8;
  --text: #18181b;
  --text-muted: #71717a;
  --primary: #4f46e5;
  --primary-glow: rgba(79, 70, 229, 0.15);
}`,
    teach3: [
      "Light mode uses the same variable names with different values. Background flips to a soft zinc, surfaces become white, and text goes dark.",
      "The primary color shifts slightly darker to maintain contrast on the lighter background. The glow opacity drops since it doesn't need to be as visible.",
      "Because every component references these variables, adding a theme is just defining a new set of values — zero changes to component styles.",
      "Now let's style the body and app container."
    ],
    write_step3: `

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
  transition: background 0.3s, color 0.3s;
}

.app {
  width: 100%;
  max-width: 480px;
}`,
    teach4: [
      "The body is a flex container that centers our app horizontally. We use align-items: flex-start instead of center so it starts from the top rather than being vertically centered — this feels more natural for a utility app.",
      "The transition on background and color gives us a smooth fade when toggling themes instead of an abrupt flash.",
      "The app container is capped at 480px — wide enough for comfortable use but narrow enough to feel like a dedicated app, not a sprawling webpage.",
      "Now let's style the header with the logo and control buttons."
    ],
    write_step4: `

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.logo {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.logo span {
  color: var(--primary);
}

.header-controls {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font);
  transition: all 0.2s;
}

.btn-icon:hover {
  background: var(--surface-hover);
  border-color: var(--primary);
}

.icon {
  width: 18px;
  height: 18px;
}

.sun { display: none; }
.moon { display: block; }

[data-theme="light"] .sun { display: block; }
[data-theme="light"] .moon { display: none; }`,
    teach5: [
      "The header is a simple space-between flex row. The logo uses tight letter-spacing for a modern feel and colors the 'Hub' part with our primary indigo.",
      "The icon buttons are 40x40px squares with rounded corners. They use our surface color for the background and get a primary-colored border on hover for a nice interactive feel.",
      "For the theme toggle icons, the sun is hidden by default in dark mode and the moon is shown. When data-theme switches to light, the CSS swaps their display values. No JavaScript needed for the icon swap — pure CSS.",
      "Now let's style the tab navigation — this is the core of our multi-panel layout."
    ],
    write_step5: `

/* Tabs */
.tabs {
  display: flex;
  background: var(--surface);
  border-radius: var(--radius);
  padding: 4px;
  gap: 2px;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
}

.tab {
  flex: 1;
  padding: 0.6rem 0.3rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}

.tab:hover {
  color: var(--text);
}

.tab.active {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 2px 8px var(--primary-glow);
}

/* Panels */
.panel {
  display: none;
  animation: fadeIn 0.3s ease;
}

.panel.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}`,
    teach6: [
      "The tab bar is a flex row inside a pill-shaped container with 4px padding — this creates that segmented control look popular in mobile UIs.",
      "Each tab takes equal space with flex: 1. The active tab gets our primary color background with a subtle glow shadow. The transition makes the color change smooth.",
      "The panel system is simple — all panels are display: none by default, and the active one gets display: block. The fadeIn keyframe gives each panel a slight upward slide and opacity transition when it appears.",
      "This animation-on-display trick works because the animation runs every time the display changes from none to block.",
      "That covers our base layout. Let's move on to the main clock display styles."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 5 — CSS: CLOCK DISPLAY & ANALOG CLOCK
  // ═══════════════════════════════════════════════════════════════
  {
    part: 5,
    title: "CSS — Clock Display & Analog Clock",
    file: "style.css",
    teach: [
      "Now let's style the hero of our app — the digital clock display and the analog clock below it.",
      "These need to look impressive since this is the first thing users see."
    ],
    write_step1: `

/* Clock Display */
.clock-display {
  text-align: center;
  padding: 2rem 0 1.5rem;
}

.time-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
} 

.digit {
  font-family: var(--font);
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -2px;
  min-width: 2ch;
  text-align: center;
  background: linear-gradient(135deg, var(--text), var(--text-muted));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.separator {
  font-family: var(--font);
  font-size: 3.5rem;
  font-weight: 300;
  color: var(--primary);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0.3; }
}

.ampm {
  font-family: var(--font);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary);
  margin-left: 8px;
}

.date-row {
  margin-top: 0.75rem;
  font-size: 0.95rem;
  color: var(--text-muted);
  font-weight: 500;
}`,
    teach2: [
      "The digits use a gradient text effect — background-clip: text with a transparent text fill. This gives the numbers a subtle fade from bright to muted that adds visual depth.",
      "min-width: 2ch ensures the digits don't shift layout when numbers change — each digit always takes at least two character widths.",
      "The separators blink with a step-end timing function — this gives a hard on/off pulse instead of a smooth fade, which looks more like a real digital clock.",
      "The AM/PM badge uses the primary color to tie it visually to the active tab indicator and other accent elements.",
      "Now let's build the analog clock entirely with CSS."
    ],
    write_step2: `

/* Analog Clock */
.analog-clock {
  display: flex;
  justify-content: center;
  padding: 1rem 0 2rem;
}

.clock-face {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: var(--surface);
  border: 2px solid var(--border);
  position: relative;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

.clock-face::before {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  border: 1px solid var(--border);
}

.hand {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform-origin: bottom center;
  border-radius: 4px;
  transform: translateX(-50%) rotate(0deg);
}

.hour-hand {
  width: 4px;
  height: 50px;
  background: var(--text);
}

.minute-hand {
  width: 3px;
  height: 65px;
  background: var(--text-muted);
}

.second-hand {
  width: 1.5px;
  height: 72px;
  background: var(--primary);
}

.center-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--primary);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}`,
    teach3: [
      "The clock face is a 180px circle with a subtle box shadow for depth. The ::before pseudo-element creates an inner ring detail — a common design pattern in real clock faces.",
      "Each hand is absolutely positioned at the bottom of the center point. The key property is transform-origin: bottom center — this makes the hand rotate from its base, like a real clock hand.",
      "The initial transform uses translateX(-50%) to center the hand horizontally, and we'll append rotate() from JavaScript. Each hand has different dimensions — the hour hand is shortest and thickest, the minute hand is longer and thinner, and the second hand is the longest and thinnest.",
      "The second hand and center dot use our primary indigo color to create a visual accent that ties into our design system.",
      "Now let's style the stopwatch."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 6 — CSS: STOPWATCH, BUTTONS & TIMER
  // ═══════════════════════════════════════════════════════════════
  {
    part: 6,
    title: "CSS — Stopwatch, Buttons & Timer",
    file: "style.css",
    teach: [
      "Let's style the stopwatch display, the shared button system, the lap list, and the countdown timer with its SVG ring.",
      "We need a consistent button design since multiple panels share the same button classes."
    ],
    write_step1: `

/* Stopwatch */
.stopwatch-display {
  text-align: center;
  padding: 3rem 0 2rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.sw-digit {
  font-family: var(--font);
  font-size: 3.5rem;
  font-weight: 700;
  min-width: 2ch;
  text-align: center;
}

.sw-sep {
  font-family: var(--font);
  font-size: 3rem;
  color: var(--text-muted);
  margin: 0 2px;
}

.sw-ms {
  font-size: 2.5rem;
  color: var(--text-muted);
}`,
    teach2: [
      "The stopwatch display is similar to the clock but without the gradient text effect — we want it to feel different. The milliseconds are smaller and muted to create a clear visual hierarchy between seconds and centiseconds.",
      "We use align-items: baseline so the smaller millisecond text aligns with the bottom of the larger digits rather than the center.",
      "Now let's build the shared button system."
    ],
    write_step2: `

/* Controls */
.controls {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.7rem 1.8rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 2px 12px var(--primary-glow);
}

.btn-primary:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--surface-hover);
}

.btn-danger {
  background: var(--danger);
  color: #fff;
}

.btn-danger:hover:not(:disabled) {
  filter: brightness(1.1);
}`,
    teach3: [
      "We have three button variants — primary for main actions like Start, secondary for supporting actions like Lap, and danger for destructive actions like Reset and Cancel.",
      "The primary button has a subtle glow shadow using our primary-glow variable. On hover, it brightens slightly and lifts up 1px — a micro-interaction that makes the UI feel responsive.",
      "The :not(:disabled) pseudo-class ensures hover effects don't apply to disabled buttons. We reduce opacity to 0.4 for the disabled state, which is enough to look clearly inactive without being invisible.",
      "Now let's style the lap list and the timer."
    ],
    write_step3: `

/* Lap List */
.lap-list {
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
}

.lap-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 0.4rem;
  font-family: var(--font);
  font-size: 0.85rem;
  animation: fadeIn 0.2s ease;
}

.lap-list .lap-num {
  color: var(--text-muted);
}

.lap-list .lap-best {
  color: var(--success);
}

.lap-list .lap-worst {
  color: var(--danger);
}`,
    teach4: [
      "The lap list has a max-height with overflow-y auto — this creates a scrollable area so the list doesn't push the layout down indefinitely.",
      "Each lap item uses our fadeIn animation so new laps slide in smoothly. The monospace font ensures all times align perfectly.",
      "Best and worst lap highlighting uses our semantic success and danger colors — green for best, red for worst. We determine these in JavaScript by comparing all split times.",
      "Now the timer styles with the SVG ring progress indicator."
    ],
    write_step4: `

/* Timer */
.timer-setup {
  padding: 2rem 0;
}

.timer-inputs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.timer-input-group {
  text-align: center;
}

.timer-input {
  width: 80px;
  height: 70px;
  text-align: center;
  font-family: var(--font);
  font-size: 2rem;
  font-weight: 700;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  outline: none;
  transition: border-color 0.2s;
}

.timer-input:focus {
  border-color: var(--primary);
}

.timer-input-group label {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.timer-presets {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn-preset {
  padding: 0.5rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-preset:hover {
  border-color: var(--primary);
  color: var(--primary);
}`,
    teach5: [
      "The timer inputs are styled as large, bold number fields with a thick border that turns indigo on focus. The labels below use uppercase tracking for that clean utility look.",
      "Preset buttons use pill-shaped border-radius of 20px and get a primary color highlight on hover. They're wrapped in a flex container with flex-wrap so they reflow on smaller screens.",
      "Now let's add the timer ring styles for the running state."
    ],
    write_step5: `

.timer-running {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.timer-ring {
  position: relative;
  width: 200px;
  height: 200px;
}

.timer-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: var(--border);
  stroke-width: 6;
}

.ring-progress {
  fill: none;
  stroke: var(--primary);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 565.48;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear;
}

.timer-remaining {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font);
  font-size: 2.2rem;
  font-weight: 700;
}`,
    teach6: [
      "The SVG ring trick works by setting stroke-dasharray to the full circumference of the circle — 2 * PI * 90 = 565.48. Then we animate stroke-dashoffset from 0 to 565.48 as time passes.",
      "We rotate the entire SVG by -90 degrees so the progress starts at the top instead of the right side — which is the default starting point for SVG arcs.",
      "stroke-linecap: round gives the progress line a smooth rounded end instead of a flat cut. The transition on stroke-dashoffset with 1s linear timing creates a smooth sweep that syncs with our 1-second timer interval.",
      "The remaining time text is absolutely centered inside the ring — this overlay technique is used constantly in dashboard and data visualization UIs.",
      "Let's move on to the alarm and world clock styles."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 7 — CSS: ALARM, WORLD CLOCKS & RESPONSIVE
  // ═══════════════════════════════════════════════════════════════
  {
    part: 7,
    title: "CSS — Alarm, World Clocks & Responsive",
    file: "style.css",
    teach: [
      "Let's style the alarm system with its form, toggle switches, ringing overlay, the world clock cards, and finish with responsive adjustments and utility classes."
    ],
    write_step1: `

/* Alarm */
.alarm-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem 0;
}

.alarm-time-input,
.alarm-label-input {
  padding: 0.8rem 1rem;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.alarm-time-input {
  font-family: var(--font);
  font-size: 1.4rem;
  text-align: center;
}

.alarm-time-input:focus,
.alarm-label-input:focus {
  border-color: var(--primary);
}

.alarm-list {
  list-style: none;
}

.alarm-empty {
  text-align: center;
  color: var(--text-muted);
  padding: 2rem;
  font-size: 0.9rem;
}

.alarm-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 0.5rem;
  animation: fadeIn 0.2s ease;
}

.alarm-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.alarm-info-time {
  font-family: var(--font);
  font-size: 1.4rem;
  font-weight: 700;
}

.alarm-info-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.alarm-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}`,
    teach2: [
      "The alarm form stacks vertically. The time input uses our monospace font at a larger size so it looks prominent and easy to read.",
      "Each alarm item is a flex row with the time and label on the left, and the toggle plus delete button on the right.",
      "Now let's build the toggle switch — this is a pure CSS component, no JavaScript styling needed."
    ],
    write_step2: `

.toggle {
  width: 44px;
  height: 24px;
  background: var(--border);
  border-radius: 12px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
}

.toggle.active {
  background: var(--primary);
}

.toggle::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  transition: transform 0.2s;
}

.toggle.active::after {
  transform: translateX(20px);
}

.btn-delete {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
}

.btn-delete:hover {
  color: var(--danger);
}`,
    teach3: [
      "The toggle is a button element styled as a pill. The white circle is a ::after pseudo-element that slides right using translateX when the 'active' class is added. JavaScript just toggles the class — all the animation is CSS.",
      "The delete button uses a times symbol and transitions to our danger red on hover. No background, no border — just a minimal icon button.",
      "Now let's add the alarm ringing overlay and modal."
    ],
    write_step3: `

/* Alarm ringing overlay */
.alarm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeIn 0.3s ease;
}

.alarm-modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  max-width: 320px;
  width: 90%;
}

.alarm-modal .alarm-ring-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: shake 0.5s infinite;
}

@keyframes shake {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(15deg); }
  75% { transform: rotate(-15deg); }
}

.alarm-modal h2 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.alarm-modal p {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}`,
    teach4: [
      "The alarm overlay uses position: fixed with inset: 0 to cover the entire viewport. The dark semi-transparent background with centered flex layout is a standard modal pattern.",
      "The bell emoji gets a shake animation — it rotates back and forth 15 degrees infinitely. This draws attention and makes the alarm feel urgent.",
      "The modal itself has generous padding and a large border radius for a friendly, non-threatening look despite being an interruption.",
      "Now let's style the world clock cards."
    ],
    write_step4: `

/* World Clocks */
.world-add {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 0;
}

.tz-select {
  flex: 1;
  padding: 0.7rem 1rem;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
}

.tz-select:focus {
  border-color: var(--primary);
}

.world-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.world-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  animation: fadeIn 0.2s ease;
}

.world-card-city {
  font-weight: 600;
  font-size: 1rem;
}

.world-card-offset {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
}

.world-card-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.world-card-time {
  font-family: var(--font);
  font-size: 1.3rem;
  font-weight: 700;
}`,
    teach5: [
      "Each world card has the city name and UTC offset on the left, and the current time with a delete button on the right.",
      "The time uses our monospace font at 1.3rem so it's clearly the primary piece of information. The offset in a smaller muted font provides context without competing for attention.",
      "Now let's add our utility class and responsive styles to wrap up the CSS."
    ],
    write_step5: `

.hidden {
  display: none !important;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

/* Responsive */
@media (max-width: 500px) {
  body {
    padding: 1rem 0.75rem;
  }

  .digit {
    font-size: 3rem;
  }

  .separator {
    font-size: 2.5rem;
  }

  .sw-digit {
    font-size: 2.5rem;
  }

  .sw-ms {
    font-size: 1.8rem;
  }

  .timer-input {
    width: 65px;
    height: 60px;
    font-size: 1.6rem;
  }

  .tab {
    font-size: 0.72rem;
    padding: 0.5rem 0.2rem;
  }
}`,
    teach6: [
      "The hidden utility class uses !important to guarantee it overrides any display value — this is one of the few places where !important is justified.",
      "We customize the WebKit scrollbar to be a thin 4px track with our border color — it blends into the design instead of showing the default chunky system scrollbar.",
      "The responsive breakpoint at 500px scales down the large monospace text on the clock, stopwatch, and timer inputs. The tab font size also drops slightly to prevent text wrapping.",
      "That's all our CSS! Roughly 780 lines covering two themes, five feature panels, a toggle switch component, an SVG ring animation, an analog clock, a modal overlay, and responsive adaptations. Let's move on to JavaScript and bring everything to life."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 8 — JS: STATE & DOM REFERENCES
  // ═══════════════════════════════════════════════════════════════
  {
    part: 8,
    title: "JavaScript — State & DOM References",
    file: "script.js",
    teach: [
      "Time for JavaScript. This is where the magic happens. We've got around 530 lines of logic covering a real-time clock, 
      stopwatch, timer, alarms, world clocks, themes, and persistence.",
      "Let's start with our centralized state object and DOM references."
    ],
    write_step1: `// ── State ──
const state = {
  is24Hour: true,
  theme: localStorage.getItem('clock-theme') || 'dark',
  stopwatch: { running: false, elapsed: 0, laps: [], interval: null, startTime: 0 },
  timer: { running: false, paused: false, total: 0, remaining: 0, interval: null },
  alarms: JSON.parse(localStorage.getItem('clock-alarms') || '[]'),
  worldClocks: JSON.parse(localStorage.getItem('clock-world') || '[]'),
};`,
    teach2: [
      "We use a single state object that holds everything — this is a lightweight version of the state management 
      pattern you see in frameworks like React and Vue.",
      "The theme, alarms, and world clocks all initialize from localStorage with sensible defaults. This means the 
      app remembers your preferences across sessions.",
      "The stopwatch and timer have their own nested state objects with flags for running, paused, and interval references. We store the interval 
      IDs so we can clear them when pausing or stopping.",
      "Now let's set up our DOM helper functions and element references."
    ],
    write_step2: `

// ── DOM References ──
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
  hours: $('#hours'),
  minutes: $('#minutes'),
  seconds: $('#seconds'),
  ampm: $('#ampm'),
  dateDisplay: $('#dateDisplay'),
  hourHand: $('#hourHand'),
  minuteHand: $('#minuteHand'),
  secondHand: $('#secondHand'),
  formatToggle: $('#formatToggle'),
  themeToggle: $('#themeToggle'),
};`,
    teach3: [
      "We create shorthand functions $ and $$ for querySelector and querySelectorAll. This saves us from typing document.querySelector
       everywhere and keeps the code clean.",
      "The dom object caches references to the clock elements we update every second. Caching DOM references upfront is more efficient 
      than querying the DOM on every tick.",
      "We only cache the elements that belong to the always-visible clock panel. The stopwatch, timer, alarm, and world clock elements 
      will be queried in their own sections since they're self-contained features.",
      "Now let's add our utility functions."
    ],
    write_step3: `

// ── Utilities ──
function pad(n) {
  return String(n).padStart(2, '0');
}

function formatTime(date, is24Hour) {
  let h = date.getHours();
  const m = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  let ampm = '';

  if (!is24Hour) {
    ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
  }

  return { h: pad(h), m, s, ampm };
}`,
    teach4: [
      "The pad function converts any number to a two-digit string using padStart — so 5 becomes '05' and 12 stays '12'. We use 
      this everywhere: clock, stopwatch, timer, alarms, and world clocks.",
      "formatTime takes a Date object and a boolean for 24-hour mode. It returns an object with pre-formatted hour, minute, second, and AM/PM strings.",
      "The 12-hour conversion uses the modulo trick — h % 12 gives us 0-11, and the || 12 converts 0 (midnight/noon) to 12. Simple but important to get right.",
      "Now let's set up the theme system and the format toggle."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 9 — JS: THEME, FORMAT TOGGLE & TABS
  // ═══════════════════════════════════════════════════════════════
  {
    part: 9,
    title: "JavaScript — Theme, Format Toggle & Tabs",
    file: "script.js",
    teach: [
      "Let's wire up the theme switcher, the 12/24 hour toggle, and the tab navigation system.",
      "These three pieces control the global app experience."
    ],
    write_step1: `

// ── Theme ──
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('clock-theme', state.theme);
}

dom.themeToggle.addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
});

applyTheme();`,
    teach2: [
      "The theme system is beautifully simple. applyTheme sets the data-theme attribute on the html element and saves to localStorage. That's it.",
      "Because all our CSS colors reference custom properties scoped to [data-theme], changing the attribute instantly updates every color in the app.",
      "We call applyTheme() on load so the saved theme is applied immediately before the user sees the default.",
      "Notice we don't need to toggle SVG icons in JavaScript — our CSS rules for .sun and .moon handle that automatically based on [data-theme].",
      "Now the 12/24 hour toggle."
    ],
    write_step2: `

// ── 12/24 Hour Toggle ──
dom.formatToggle.addEventListener('click', () => {
  state.is24Hour = !state.is24Hour;
  dom.formatToggle.textContent = state.is24Hour ? '24H' : '12H';
});`,
    teach3: [
      "One click handler, one state flip, one text update. The clock display will automatically use the new format on its next tick 
      since it reads state.is24Hour every second.",
      "The world clocks also respect this setting — they pass the is24Hour flag to toLocaleTimeString's hour12 option.",

      "Now let's build the tab system."
    ],
    write_step3: `

// ── Tabs ──
$$('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    $$('.tab').forEach((t) => t.classList.remove('active'));
    $$('.panel').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    $(\`#panel-\${tab.dataset.tab}\`).classList.add('active');
  });
});`,
    teach4: [
      "We loop over all tab buttons and add a click handler to each. On click, we remove 'active' from all tabs and all panels, then add it back to the clicked tab and its corresponding panel.",
      "The panel ID is built dynamically from the tab's data-tab attribute — so clicking the tab with data-tab='stopwatch' activates #panel-stopwatch.",
      "The CSS handles the show/hide with display: none/block and the fadeIn animation triggers automatically when the panel becomes visible.",
      "This is a clean, reusable tab pattern that works for any number of tabs without modifying the JavaScript.",
      "Now let's build the main clock feature — the heart of the app."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 10 — JS: MAIN CLOCK & ANALOG HANDS
  // ═══════════════════════════════════════════════════════════════
  {
    part: 10,
    title: "JavaScript — Main Clock & Analog Hands",
    file: "script.js",
    teach: [
      "The main clock is the centerpiece. It updates the digital display, the date, and rotates the analog hands — all every second.",
      "Let's build the updateClock function."
    ],
    write_step1: `

// ── Main Clock ──
function updateClock() {
  const now = new Date();
  const { h, m, s, ampm } = formatTime(now, state.is24Hour);

  dom.hours.textContent = h;
  dom.minutes.textContent = m;
  dom.seconds.textContent = s;
  dom.ampm.textContent = ampm;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dom.dateDisplay.textContent = now.toLocaleDateString('en-US', options);

  // Analog hands
  const hours24 = now.getHours();
  const mins = now.getMinutes();
  const secs = now.getSeconds();

  const hourDeg = (hours24 % 12) * 30 + mins * 0.5;
  const minDeg = mins * 6 + secs * 0.1;
  const secDeg = secs * 6;

  dom.hourHand.style.transform = \`translateX(-50%) rotate(\${hourDeg}deg)\`;
  dom.minuteHand.style.transform = \`translateX(-50%) rotate(\${minDeg}deg)\`;
  dom.secondHand.style.transform = \`translateX(-50%) rotate(\${secDeg}deg)\`;

  // Check alarms
  checkAlarms(now);

  // Update world clocks
  updateWorldClocks();
}

setInterval(updateClock, 1000);
updateClock();`,
    teach2: [
      "We create a new Date on every tick and destructure the formatted time. The digital display is updated by setting textContent on each digit span.",
      "The date uses toLocaleDateString with options for full weekday and month names — so you get something like 'Thursday, May 8, 2025'.",
      "For the analog hands, the math is: each hour is 30 degrees (360/12), plus a 0.5 degree offset per minute so the hour hand moves smoothly between hours. Minutes are 6 degrees each (360/60), plus 0.1 degree per second for smooth movement.",
      "We call checkAlarms and updateWorldClocks from within updateClock so everything stays in sync on the same 1-second interval. This avoids having multiple intervals competing.",
      "setInterval runs updateClock every 1000ms, and we call it once immediately so the display is populated before the first tick.",
      "Now let's build the stopwatch."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 11 — JS: STOPWATCH
  // ═══════════════════════════════════════════════════════════════
  {
    part: 11,
    title: "JavaScript — Stopwatch",
    file: "script.js",
    teach: [
      "The stopwatch is one of the more complex features. It needs to start, pause, resume, record laps, highlight best and worst splits, and reset cleanly.",
      "Let's start with the DOM references and the display update function."
    ],
    write_step1: `

// ── Stopwatch ──
const sw = state.stopwatch;
const swDisplay = {
  min: $('#swMinutes'),
  sec: $('#swSeconds'),
  ms: $('#swMilliseconds'),
  startBtn: $('#swStart'),
  lapBtn: $('#swLap'),
  resetBtn: $('#swReset'),
  lapList: $('#lapList'),
};

function updateStopwatchDisplay() {
  const total = sw.elapsed;
  const mins = Math.floor(total / 60000);
  const secs = Math.floor((total % 60000) / 1000);
  const ms = Math.floor((total % 1000) / 10);

  swDisplay.min.textContent = pad(mins);
  swDisplay.sec.textContent = pad(secs);
  swDisplay.ms.textContent = pad(ms);
}`,
    teach2: [
      "We alias state.stopwatch as sw for convenience since we reference it heavily. The swDisplay object caches all the stopwatch DOM elements.",
      "The display function breaks the total elapsed milliseconds into minutes, seconds, and centiseconds. We divide by 10 instead of keeping raw milliseconds because two digits (00-99) is the standard for stopwatch centiseconds.",
      "Now let's build the start/pause toggle."
    ],
    write_step2: `

function startStopwatch() {
  if (sw.running) {
    // Pause
    clearInterval(sw.interval);
    sw.running = false;
    swDisplay.startBtn.textContent = 'Resume';
    swDisplay.startBtn.classList.remove('btn-danger');
    swDisplay.startBtn.classList.add('btn-primary');
  } else {
    // Start / Resume
    sw.running = true;
    sw.startTime = Date.now() - sw.elapsed;
    sw.interval = setInterval(() => {
      sw.elapsed = Date.now() - sw.startTime;
      updateStopwatchDisplay();
    }, 10);
    swDisplay.startBtn.textContent = 'Pause';
    swDisplay.startBtn.classList.remove('btn-primary');
    swDisplay.startBtn.classList.add('btn-danger');
    swDisplay.lapBtn.disabled = false;
    swDisplay.resetBtn.disabled = false;
  }
}`,
    teach3: [
      "The start button is a toggle — if running, it pauses by clearing the interval. If paused, it resumes.",
      "The key timing trick is sw.startTime = Date.now() - sw.elapsed. On resume, we subtract the previously elapsed time from the current timestamp so the stopwatch continues from where it left off.",
      "We swap the button text and color classes — Start is primary blue, Pause is danger red. This visual feedback makes the current state immediately obvious.",
      "The interval runs every 10ms for smooth centisecond updates. Each tick calculates elapsed as the difference between now and startTime.",
      "Now let's add lap recording and rendering."
    ],
    write_step3: `

function addLap() {
  if (!sw.running) return;
  const lapTime = sw.elapsed;
  const prevLap = sw.laps.length > 0 ? sw.laps[sw.laps.length - 1].total : 0;
  const split = lapTime - prevLap;

  sw.laps.push({ total: lapTime, split });
  renderLaps();
}

function renderLaps() {
  if (sw.laps.length === 0) {
    swDisplay.lapList.innerHTML = '';
    return;
  }

  const splits = sw.laps.map((l) => l.split);
  const best = Math.min(...splits);
  const worst = Math.max(...splits);

  swDisplay.lapList.innerHTML = sw.laps
    .slice()
    .reverse()
    .map((lap, i) => {
      const num = sw.laps.length - i;
      const splitMin = Math.floor(lap.split / 60000);
      const splitSec = Math.floor((lap.split % 60000) / 1000);
      const splitMs = Math.floor((lap.split % 1000) / 10);
      const timeStr = \`\${pad(splitMin)}:\${pad(splitSec)}.\${pad(splitMs)}\`;

      let cls = '';
      if (sw.laps.length > 2) {
        if (lap.split === best) cls = 'lap-best';
        else if (lap.split === worst) cls = 'lap-worst';
      }

      return \`<li class="\${cls}"><span class="lap-num">Lap \${num}</span><span>\${timeStr}</span></li>\`;
    })
    .join('');
}`,
    teach4: [
      "addLap stores both the total elapsed time and the split — the difference since the last lap. This split is what we display and compare.",
      "renderLaps reverses the array so the most recent lap appears at the top. When there are more than two laps, we find the best and worst splits using Math.min and Math.max on the spread array.",
      "The best lap gets the 'lap-best' class (green) and worst gets 'lap-worst' (red). We skip highlighting when there are fewer than three laps because with two laps, one would always be best and the other worst — not very meaningful.",
      "Now the reset function and event listeners."
    ],
    write_step4: `

function resetStopwatch() {
  clearInterval(sw.interval);
  sw.running = false;
  sw.elapsed = 0;
  sw.laps = [];
  updateStopwatchDisplay();
  renderLaps();
  swDisplay.startBtn.textContent = 'Start';
  swDisplay.startBtn.classList.remove('btn-danger');
  swDisplay.startBtn.classList.add('btn-primary');
  swDisplay.lapBtn.disabled = true;
  swDisplay.resetBtn.disabled = true;
}

swDisplay.startBtn.addEventListener('click', startStopwatch);
swDisplay.lapBtn.addEventListener('click', addLap);
swDisplay.resetBtn.addEventListener('click', resetStopwatch);`,
    teach5: [
      "Reset clears the interval, zeros out the elapsed time and laps, updates the display, and restores the buttons to their initial state. Clean and complete.",
      "We wire up all three event listeners at the bottom — start, lap, and reset. Each points to its function.",
      "That's a full stopwatch with pause/resume, lap tracking, best/worst highlighting, and proper state management. Let's build the countdown timer next."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 12 — JS: COUNTDOWN TIMER
  // ═══════════════════════════════════════════════════════════════
  {
    part: 12,
    title: "JavaScript — Countdown Timer",
    file: "script.js",
    teach: [
      "The countdown timer has more states to manage — setup, running, paused, and finished. It also animates an SVG ring and plays a sound when done.",
      "Let's start with the DOM references and constants."
    ],
    write_step1: `

// ── Timer ──
const timerDom = {
  setup: $('#timerSetup'),
  running: $('#timerRunning'),
  remaining: $('#timerRemaining'),
  ring: $('#timerRing'),
  startBtn: $('#timerStart'),
  pauseBtn: $('#timerPause'),
  cancelBtn: $('#timerCancel'),
  hoursInput: $('#timerHours'),
  minutesInput: $('#timerMinutes'),
  secondsInput: $('#timerSeconds'),
};

const RING_CIRCUMFERENCE = 2 * Math.PI * 90; // ~565.48

function updateTimerDisplay() {
  const t = state.timer;
  const mins = Math.floor(t.remaining / 60);
  const secs = t.remaining % 60;
  timerDom.remaining.textContent = \`\${pad(mins)}:\${pad(secs)}\`;

  const progress = t.total > 0 ? (t.total - t.remaining) / t.total : 0;
  timerDom.ring.style.strokeDashoffset = RING_CIRCUMFERENCE * progress;
}`,
    teach2: [
      "RING_CIRCUMFERENCE is calculated from our SVG circle radius of 90 — this gives us ~565.48. We use this to convert progress percentage to a stroke-dashoffset value.",
      "The display function formats remaining seconds as MM:SS and calculates progress as the fraction of time elapsed. Multiplying that by the circumference gives us the dashoffset that visually sweeps the ring.",
      "When progress is 0, the offset is 0 and the ring is full. When progress is 1, the offset equals the circumference and the ring is empty.",
      "Now the core timer functions — start, tick, pause, and cancel."
    ],
    write_step2: `

function startTimer() {
  const t = state.timer;

  if (t.paused) {
    // Resume
    t.paused = false;
    t.running = true;
    t.interval = setInterval(timerTick, 1000);
    timerDom.pauseBtn.textContent = 'Pause';
    return;
  }

  const h = parseInt(timerDom.hoursInput.value) || 0;
  const m = parseInt(timerDom.minutesInput.value) || 0;
  const s = parseInt(timerDom.secondsInput.value) || 0;
  const total = h * 3600 + m * 60 + s;

  if (total <= 0) return;

  t.total = total;
  t.remaining = total;
  t.running = true;
  t.paused = false;

  timerDom.setup.classList.add('hidden');
  timerDom.running.classList.remove('hidden');
  timerDom.startBtn.classList.add('hidden');
  timerDom.pauseBtn.classList.remove('hidden');
  timerDom.cancelBtn.classList.remove('hidden');

  timerDom.ring.style.strokeDasharray = RING_CIRCUMFERENCE;
  updateTimerDisplay();

  t.interval = setInterval(timerTick, 1000);
}

function timerTick() {
  const t = state.timer;
  t.remaining--;
  updateTimerDisplay();

  if (t.remaining <= 0) {
    clearInterval(t.interval);
    t.running = false;
    timerFinished();
  }
}

function timerFinished() {
  playBeep();
  cancelTimer();
}

function pauseTimer() {
  const t = state.timer;
  if (t.running) {
    clearInterval(t.interval);
    t.running = false;
    t.paused = true;
    timerDom.pauseBtn.textContent = 'Resume';
  } else if (t.paused) {
    startTimer();
  }
}

function cancelTimer() {
  const t = state.timer;
  clearInterval(t.interval);
  t.running = false;
  t.paused = false;
  t.remaining = 0;

  timerDom.setup.classList.remove('hidden');
  timerDom.running.classList.add('hidden');
  timerDom.startBtn.classList.remove('hidden');
  timerDom.pauseBtn.classList.add('hidden');
  timerDom.cancelBtn.classList.add('hidden');
  timerDom.pauseBtn.textContent = 'Pause';
}`,
    teach3: [
      "startTimer handles two cases — resuming from pause and starting fresh. On resume, we just restart the interval. On fresh start, we read the inputs, convert to total seconds, validate it's positive, and swap the UI from setup to running view.",
      "timerTick decrements remaining by 1 each second and updates the display. When it hits 0, we clear the interval, play a sound, and reset to the setup view.",
      "pauseTimer toggles between paused and running states. The Pause button text changes to 'Resume' and back. The timer calls startTimer on resume, which detects the paused flag and handles it.",
      "cancelTimer is a hard reset — it clears everything and restores the setup view regardless of whether the timer was running or paused.",
      "Now the preset buttons and event listeners."
    ],
    write_step3: `

// Presets
$$('.btn-preset').forEach((btn) => {
  btn.addEventListener('click', () => {
    const totalSecs = parseInt(btn.dataset.time);
    timerDom.hoursInput.value = Math.floor(totalSecs / 3600);
    timerDom.minutesInput.value = Math.floor((totalSecs % 3600) / 60);
    timerDom.secondsInput.value = totalSecs % 60;
  });
});

timerDom.startBtn.addEventListener('click', startTimer);
timerDom.pauseBtn.addEventListener('click', pauseTimer);
timerDom.cancelBtn.addEventListener('click', cancelTimer);`,
    teach4: [
      "Each preset reads its total seconds from the data-time attribute and converts back to hours, minutes, and seconds to fill the input fields. The user can then adjust before starting if they want.",
      "This pattern of data attributes plus event delegation is clean and extensible — adding a new preset is just one more HTML button, no JavaScript changes.",
      "Now let's build the alarm system."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 13 — JS: ALARMS
  // ═══════════════════════════════════════════════════════════════
  {
    part: 13,
    title: "JavaScript — Alarms",
    file: "script.js",
    teach: [
      "The alarm system needs to render a dynamic list, persist to localStorage, check the current time every second, and show a modal with sound when triggered.",
      "Let's start with the render and save functions."
    ],
    write_step1: `

// ── Alarms ──
function renderAlarms() {
  const list = $('#alarmList');
  if (state.alarms.length === 0) {
    list.innerHTML = '<li class="alarm-empty">No alarms set</li>';
    return;
  }

  list.innerHTML = state.alarms
    .map(
      (alarm, i) => \`
    <li class="alarm-item">
      <div class="alarm-info">
        <span class="alarm-info-time">\${alarm.time}</span>
        <span class="alarm-info-label">\${alarm.label || 'Alarm'}</span>
      </div>
      <div class="alarm-actions">
        <button class="toggle \${alarm.active ? 'active' : ''}" data-alarm-toggle="\${i}"></button>
        <button class="btn-delete" data-alarm-delete="\${i}">&times;</button>
      </div>
    </li>
  \`
    )
    .join('');

  // Toggle listeners
  list.querySelectorAll('[data-alarm-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.alarmToggle);
      state.alarms[idx].active = !state.alarms[idx].active;
      saveAlarms();
      renderAlarms();
    });
  });

  // Delete listeners
  list.querySelectorAll('[data-alarm-delete]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.alarmDelete);
      state.alarms.splice(idx, 1);
      saveAlarms();
      renderAlarms();
    });
  });
}

function saveAlarms() {
  localStorage.setItem('clock-alarms', JSON.stringify(state.alarms));
}`,
    teach2: [
      "renderAlarms builds the entire list from the state array using template literals. Each alarm card shows the time, label, a toggle button, and a delete button.",
      "After rendering the HTML, we attach event listeners for the toggle and delete buttons. The toggle flips the active flag, saves to localStorage, and re-renders. Delete splices the alarm from the array and does the same.",
      "This pattern of render-then-attach-listeners is called 'event delegation at the element level'. An alternative would be event delegation on the parent, but for a small list this is simpler to read.",
      "saveAlarms serializes the alarm array to localStorage — we call it after every mutation.",
      "Now let's add the alarm creation handler and the checking logic."
    ],
    write_step2: `

$('#addAlarm').addEventListener('click', () => {
  const timeVal = $('#alarmTime').value;
  if (!timeVal) return;

  const label = $('#alarmLabel').value.trim();
  state.alarms.push({ time: timeVal, label, active: true, triggered: false });
  saveAlarms();
  renderAlarms();

  $('#alarmTime').value = '';
  $('#alarmLabel').value = '';
});

function checkAlarms(now) {
  const currentTime = pad(now.getHours()) + ':' + pad(now.getMinutes());

  state.alarms.forEach((alarm) => {
    if (alarm.active && alarm.time === currentTime && now.getSeconds() === 0 && !alarm.triggered) {
      alarm.triggered = true;
      triggerAlarm(alarm);
    }
    // Reset triggered flag when minute changes
    if (alarm.time !== currentTime) {
      alarm.triggered = false;
    }
  });
}`,
    teach3: [
      "Adding an alarm pushes a new object with the time string from the input, the optional label, active set to true, and triggered set to false. We clear the inputs after adding for a clean user experience.",
      "checkAlarms runs every second from updateClock. It formats the current time as HH:MM and compares against each active alarm. The triggered flag prevents the alarm from firing repeatedly during the same minute.",
      "We only fire at exactly 0 seconds so the alarm triggers at the start of the minute, not at a random point. The triggered flag resets when the minute changes so the alarm can fire again the next day.",
      "Now the trigger function that shows the modal."
    ],
    write_step3: `

function triggerAlarm(alarm) {
  playBeep();

  const overlay = document.createElement('div');
  overlay.className = 'alarm-overlay';
  overlay.innerHTML = \`
    <div class="alarm-modal">
      <div class="alarm-ring-icon">&#128276;</div>
      <h2>\${alarm.label || 'Alarm'}</h2>
      <p>\${alarm.time}</p>
      <button class="btn btn-primary" id="dismissAlarm">Dismiss</button>
    </div>
  \`;
  document.body.appendChild(overlay);

  overlay.querySelector('#dismissAlarm').addEventListener('click', () => {
    overlay.remove();
  });
}

renderAlarms();`,
    teach4: [
      "triggerAlarm plays a beep sound using the Web Audio API, then creates a fullscreen overlay with a modal programmatically.",
      "We use createElement and innerHTML instead of having the modal in the HTML — this way it only exists when needed and we can create multiple overlays if several alarms fire simultaneously.",
      "The dismiss button removes the entire overlay from the DOM with overlay.remove(). Clean and simple — no hide/show, just add and remove.",
      "The initial renderAlarms() call at the bottom loads any saved alarms from localStorage on page load.",
      "Now let's build the world clocks feature."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 14 — JS: WORLD CLOCKS
  // ═══════════════════════════════════════════════════════════════
  {
    part: 14,
    title: "JavaScript — World Clocks",
    file: "script.js",
    teach: [
      "World clocks use the Intl API to display times in different timezones. We need helper functions, a render function, and the add/delete logic.",
      "Let's build it."
    ],
    write_step1: `

// ── World Clocks ──
function getTimezoneCity(tz) {
  return tz.split('/').pop().replace(/_/g, ' ');
}

function getTimezoneOffset(tz) {
  const now = new Date();
  const localOffset = now.getTimezoneOffset();
  const tzDate = new Date(now.toLocaleString('en-US', { timeZone: tz }));
  const diff = (tzDate - now) / 60000 + localOffset;
  const hours = Math.floor(Math.abs(diff) / 60);
  const mins = Math.abs(diff) % 60;
  const sign = diff >= 0 ? '+' : '-';
  return \`UTC\${sign}\${hours}\${mins > 0 ? ':' + pad(mins) : ''}\`;
}`,
    teach2: [
      "getTimezoneCity extracts the city name from the IANA timezone string — 'America/New_York' becomes 'New York'. We split on slash, take the last part, and replace underscores with spaces.",
      "getTimezoneOffset dynamically calculates the UTC offset for any timezone. We create a date in the target timezone using toLocaleString, find the difference in minutes from the local time, add back the local UTC offset, and format the result.",
      "This handles half-hour and quarter-hour offsets correctly — Mumbai is UTC+5:30, for example. The mins > 0 check only shows the minutes portion when needed.",
      "Now let's build the world clock rendering and update logic."
    ],
    write_step2: `

function updateWorldClocks() {
  const container = $('#worldList');
  if (state.worldClocks.length === 0) {
    container.innerHTML = '';
    return;
  }

  const now = new Date();

  container.innerHTML = state.worldClocks
    .map((tz, i) => {
      const time = now.toLocaleTimeString('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: !state.is24Hour,
      });
      const city = getTimezoneCity(tz);
      const offset = getTimezoneOffset(tz);

      return \`
      <div class="world-card">
        <div>
          <div class="world-card-city">\${city}</div>
          <div class="world-card-offset">\${offset}</div>
        </div>
        <div class="world-card-right">
          <span class="world-card-time">\${time}</span>
          <button class="btn-delete" data-world-delete="\${i}">&times;</button>
        </div>
      </div>
    \`;
    })
    .join('');

  container.querySelectorAll('[data-world-delete]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.worldDelete);
      state.worldClocks.splice(idx, 1);
      localStorage.setItem('clock-world', JSON.stringify(state.worldClocks));
      updateWorldClocks();
    });
  });
}`,
    teach3: [
      "updateWorldClocks re-renders every second from the main clock loop. It uses toLocaleTimeString with the timeZone option — this is the Intl API doing the heavy lifting for us.",
      "The hour12 option respects our 12/24 hour toggle so world clocks and the main clock always show the same format.",
      "Each card gets a delete button with a data index. The delete handler splices the timezone from the array, saves to localStorage, and re-renders.",
      "Now let's add the timezone selection and initialization."
    ],
    write_step3: `

$('#addTimezone').addEventListener('click', () => {
  const select = $('#timezoneSelect');
  const tz = select.value;
  if (!tz || state.worldClocks.includes(tz)) return;

  state.worldClocks.push(tz);
  localStorage.setItem('clock-world', JSON.stringify(state.worldClocks));
  updateWorldClocks();
  select.value = '';
});

updateWorldClocks();`,
    teach4: [
      "The add handler reads the selected timezone, checks it's not empty and not already added (prevents duplicates), pushes it to the array, saves, and re-renders.",
      "We reset the select to the empty placeholder option after adding so the user gets a clean state.",
      "updateWorldClocks() is called on load to render any saved world clocks immediately.",
      "One last piece — the sound system. Let's add the Web Audio API beep."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 15 — JS: SOUND (WEB AUDIO API)
  // ═══════════════════════════════════════════════════════════════
  {
    part: 15,
    title: "JavaScript — Sound (Web Audio API)",
    file: "script.js",
    teach: [
      "For the alarm and timer completion sounds, we use the Web Audio API to generate tones procedurally. No audio files needed.",
      "Let's build the playBeep function."
    ],
    write_step1: `

// ── Sound ──
function playBeep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  [0, 200, 400].forEach((delay) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.value = 880;
    gain.gain.value = 0.3;

    const start = ctx.currentTime + delay / 1000;
    osc.start(start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
    osc.stop(start + 0.15);
  });
}`,
    teach2: [
      "We create a new AudioContext and then schedule three short beeps at 0ms, 200ms, and 400ms apart. This creates a triple-beep pattern that's attention-grabbing but not obnoxious.",
      "Each beep is a sine wave oscillator at 880Hz — that's an A5 note, which is high enough to be noticeable without being harsh.",
      "The gain node controls volume starting at 0.3. We use exponentialRampToValueAtTime to fade each beep to near-silence over 150ms. This prevents the click artifact you get when abruptly stopping an oscillator.",
      "The entire sound system is 15 lines of code with zero external dependencies. The Web Audio API is incredibly powerful for procedural sound generation.",
      "And that's all our JavaScript! Let's test the app."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 16 — TESTING
  // ═══════════════════════════════════════════════════════════════
  {
    part: 16,
    title: "Testing the App",
    teach: [
      "We're done coding! Let's open this in a browser and test everything."
    ],
    do: "open index.html",
    teach2: [
      "The clock should be ticking with the current time, date, and analog hands all synced.",
      "Click the 24H button to switch to 12-hour mode — you should see AM or PM appear next to the time.",
      "Toggle the theme button — the entire app should smoothly transition between dark and light modes.",
      "Switch to the Stopwatch tab and hit Start. Watch the centiseconds fly. Hit Lap a few times — the fastest lap should turn green and the slowest red.",
      "Pause the stopwatch, then Resume. Hit Reset to clear everything.",
      "Go to the Timer tab. Try clicking a preset like '5 min' — the inputs should fill. Hit Start to see the SVG ring animate. Pause and resume it. Cancel to go back to setup.",
      "On the Alarm tab, set an alarm for a minute from now. Give it a label. You should see it appear in the list with a toggle switch.",
      "Go to the World tab and add a few cities — London, Tokyo, Sydney. They should all show the correct time with UTC offsets.",
      "Close and reopen the browser tab — your theme, alarms, and world clocks should persist thanks to localStorage.",
      "Everything working? Let's wrap up."
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  //  PART 17 — OUTRO
  // ═══════════════════════════════════════════════════════════════
  {
    part: 17,
    title: "Outro & Recap",
    teach: [
      "And there we go! We just built a fully-featured Digital Clock suite from scratch using only HTML, CSS, and JavaScript.",
      "Let's recap everything we implemented: a real-time digital clock with gradient text and blinking separators, a pure CSS analog clock with synced hands, 12/24 hour format toggle, a full stopwatch with start, pause, resume, lap tracking, and best/worst split highlighting, a countdown timer with custom inputs, quick presets, and an animated SVG ring progress indicator, an alarm system with labels, toggle switches, localStorage persistence, a dismissible modal overlay, and procedural sound using the Web Audio API, world clocks for 15 cities using the Intl API with dynamic UTC offset calculation, dark and light themes powered by CSS custom properties, and a fully responsive layout that works on mobile.",
      "All of that in three files with zero dependencies. This is the power of vanilla web development.",
      "This project demonstrates DOM manipulation, CSS animations, SVG animation, event handling, state management, the Intl API, the Web Audio API, localStorage persistence, and responsive design — all skills that employers look for.",
      "If you learned something new, hit that like button and subscribe for more projects like this.",
      "Drop a comment letting me know what project you'd like to see next. Until then — keep building. Peace."
    ]
  }
];

module.exports = script;
