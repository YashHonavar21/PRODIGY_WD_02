let timer = null;
let startTime = 0;
let elapsedTime = 0;
let running = false;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function updateDisplay() {
  const now = Date.now();
  const diff = elapsedTime + (running ? now - startTime : 0);
  document.getElementById('display').textContent = formatTime(diff);
}

function start() {
  if (!running) {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    running = true;
  }
}

function pause() {
  if (running) {
    elapsedTime += Date.now() - startTime;
    clearInterval(timer);
    running = false;
  }
}

function reset() {
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  running = false;
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('laps').innerHTML = '';
}

function lap() {
  if (!running) return;
  const now = Date.now();
  const lapTime = formatTime(elapsedTime + now - startTime);
  const lapElement = document.createElement('div');
  lapElement.className = 'lap';
  lapElement.textContent = `Lap: ${lapTime}`;
  document.getElementById('laps').appendChild(lapElement);
}
