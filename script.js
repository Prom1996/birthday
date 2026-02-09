var FLOWERS_AND_POPPERS = ['🌸', '🌺', '🌷', '🌻', '💐', '🪷', '🌼', '🎉', '🎊', '🎉', '🎊', '✨', '💖'];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function spawnCelebration() {
  var container = document.getElementById('celebration');
  container.innerHTML = '';
  var count = 75;

  for (var i = 0; i < count; i++) {
    var el = document.createElement('span');
    el.className = 'celebration-item';
    el.textContent = pickRandom(FLOWERS_AND_POPPERS);
    el.style.left = randomBetween(0, 100) + '%';
    el.style.top = randomBetween(-10, 100) + '%';
    el.style.fontSize = (randomBetween(14, 32)) + 'px';
    el.style.animationDuration = (randomBetween(3, 5.5)) + 's';
    el.style.animationDelay = (randomBetween(0, 0.8)) + 's';

    if (Math.random() < 0.35) {
      el.classList.add('pop');
      el.style.left = randomBetween(5, 95) + '%';
      el.style.top = randomBetween(10, 90) + '%';
      el.style.animationDuration = (randomBetween(0.8, 1.4)) + 's';
      el.style.animationDelay = (randomBetween(0, 0.5)) + 's';
    }

    container.appendChild(el);
  }
}

function showSurprise() {
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('surprise').classList.remove('hidden');
  spawnCelebration();
}
