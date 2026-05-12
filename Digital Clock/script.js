// ── State ──
const state = {
  is24Hour: true,
  theme: localStorage.getItem('clock-theme') || 'dark',
  stopwatch: { running: false, elapsed: 0, laps: [], interval: null, startTime: 0 },
  timer: { running: false, paused: false, total: 0, remaining: 0, interval: null },
  alarms: JSON.parse(localStorage.getItem('clock-alarms') || '[]'),
  worldClocks: JSON.parse(localStorage.getItem('clock-world') || '[]'),
};

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
};

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
}

// ── Theme ──
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('clock-theme', state.theme);
}

dom.themeToggle.addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
});

applyTheme();

// ── 12/24 Hour Toggle ──
dom.formatToggle.addEventListener('click', () => {
  state.is24Hour = !state.is24Hour;
  dom.formatToggle.textContent = state.is24Hour ? '24H' : '12H';
});

// ── Tabs ──
$$('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    $$('.tab').forEach((t) => t.classList.remove('active'));
    $$('.panel').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    $(`#panel-${tab.dataset.tab}`).classList.add('active');
  });
});

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

  dom.hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
  dom.minuteHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
  dom.secondHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;

  // Check alarms
  checkAlarms(now);

  // Update world clocks
  updateWorldClocks();
}

setInterval(updateClock, 1000);
updateClock();

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
}

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
}

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
      const timeStr = `${pad(splitMin)}:${pad(splitSec)}.${pad(splitMs)}`;

      let cls = '';
      if (sw.laps.length > 2) {
        if (lap.split === best) cls = 'lap-best';
        else if (lap.split === worst) cls = 'lap-worst';
      }

      return `<li class="${cls}"><span class="lap-num">Lap ${num}</span><span>${timeStr}</span></li>`;
    })
    .join('');
}

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
swDisplay.resetBtn.addEventListener('click', resetStopwatch);

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
  timerDom.remaining.textContent = `${pad(mins)}:${pad(secs)}`;

  const progress = t.total > 0 ? (t.total - t.remaining) / t.total : 0;
  timerDom.ring.style.strokeDashoffset = RING_CIRCUMFERENCE * progress;
}

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
}

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
timerDom.cancelBtn.addEventListener('click', cancelTimer);

// ── Alarms ──
function renderAlarms() {
  const list = $('#alarmList');
  if (state.alarms.length === 0) {
    list.innerHTML = '<li class="alarm-empty">No alarms set</li>';
    return;
  }

  list.innerHTML = state.alarms
    .map(
      (alarm, i) => `
    <li class="alarm-item">
      <div class="alarm-info">
        <span class="alarm-info-time">${alarm.time}</span>
        <span class="alarm-info-label">${alarm.label || 'Alarm'}</span>
      </div>
      <div class="alarm-actions">
        <button class="toggle ${alarm.active ? 'active' : ''}" data-alarm-toggle="${i}"></button>
        <button class="btn-delete" data-alarm-delete="${i}">&times;</button>
      </div>
    </li>
  `
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
}

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
}

function triggerAlarm(alarm) {
  playBeep();

  const overlay = document.createElement('div');
  overlay.className = 'alarm-overlay';
  overlay.innerHTML = `
    <div class="alarm-modal">
      <div class="alarm-ring-icon">&#128276;</div>
      <h2>${alarm.label || 'Alarm'}</h2>
      <p>${alarm.time}</p>
      <button class="btn btn-primary" id="dismissAlarm">Dismiss</button>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#dismissAlarm').addEventListener('click', () => {
    overlay.remove();
  });
}

renderAlarms();

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
  return `UTC${sign}${hours}${mins > 0 ? ':' + pad(mins) : ''}`;
}

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

      return `
      <div class="world-card">
        <div>
          <div class="world-card-city">${city}</div>
          <div class="world-card-offset">${offset}</div>
        </div>
        <div class="world-card-right">
          <span class="world-card-time">${time}</span>
          <button class="btn-delete" data-world-delete="${i}">&times;</button>
        </div>
      </div>
    `;
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
}

$('#addTimezone').addEventListener('click', () => {
  const select = $('#timezoneSelect');
  const tz = select.value;
  if (!tz || state.worldClocks.includes(tz)) return;

  state.worldClocks.push(tz);
  localStorage.setItem('clock-world', JSON.stringify(state.worldClocks));
  updateWorldClocks();
  select.value = '';
});

updateWorldClocks();

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
}
