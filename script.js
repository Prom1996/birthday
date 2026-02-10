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

function showForever() {
  document.getElementById('surprise').classList.add('hidden');
  document.getElementById('forever').classList.remove('hidden');

  var noBtn = document.getElementById('noButton');
  if (noBtn && !noBtn._hasEscapeHandler) {
    // reset any previous movement
    noBtn.style.transform = 'translate(0px, 0px)';
    noBtn.dataset.x = '0';
    noBtn.dataset.y = '0';
    // store base position (without transform)
    noBtn._baseRect = noBtn.getBoundingClientRect();

    noBtn._hasEscapeHandler = true;
    noBtn.addEventListener('mouseenter', moveNoButton);
  }
}

function moveNoButton() {
  var btn = document.getElementById('noButton');
  var yes = document.getElementById('yesButton');
  if (!btn || !yes) return;

  // On first escape, detach from layout and make the button fixed to the viewport
  if (!btn._isFloating) {
    var startRect = btn.getBoundingClientRect();
    btn.style.position = 'fixed';
    btn.style.left = startRect.left + 'px';
    btn.style.top = startRect.top + 'px';
    btn.style.transform = 'none';
    btn._isFloating = true;
  }

  // Current positions (viewport-based)
  var btnRect = btn.getBoundingClientRect();
  var yesRect = yes.getBoundingClientRect();

  var margin = 40;
  var attempts = 25;

  for (var i = 0; i < attempts; i++) {
    // Compute safe horizontal range
    var minLeft = margin;
    var maxLeft = window.innerWidth - margin - btnRect.width;
    if (maxLeft < minLeft) {
      // Very small screen: allow closer to edges
      minLeft = 8;
      maxLeft = window.innerWidth - 8 - btnRect.width;
    }

    // Compute safe vertical range
    var minTop = margin;
    var maxTop = window.innerHeight - margin - btnRect.height;
    if (maxTop < minTop) {
      minTop = 8;
      maxTop = window.innerHeight - 8 - btnRect.height;
    }

    // Random target position for the top-left corner, clamped to screen
    var targetLeft = randomBetween(minLeft, Math.max(minLeft, maxLeft));
    var targetTop = randomBetween(minTop, Math.max(minTop, maxTop));

    var targetRight = targetLeft + btnRect.width;
    var targetBottom = targetTop + btnRect.height;

    // Check overlap with Yes button
    var horizontalOverlap = !(targetRight < yesRect.left || targetLeft > yesRect.right);
    var verticalOverlap = !(targetBottom < yesRect.top || targetTop > yesRect.bottom);
    if (horizontalOverlap && verticalOverlap) {
      continue; // try another spot
    }

    // Move button directly to new position
    btn.style.left = targetLeft + 'px';
    btn.style.top = targetTop + 'px';
    return;
  }

  // Fallback: put it near the top-center, still inside the screen
  var fallbackLeft = (window.innerWidth - btnRect.width) / 2 + (Math.random() < 0.5 ? -120 : 120);
  fallbackLeft = Math.max(margin, Math.min(fallbackLeft, window.innerWidth - margin - btnRect.width));

  var fallbackTop = window.innerHeight * 0.2;
  fallbackTop = Math.max(margin, Math.min(fallbackTop, window.innerHeight - margin - btnRect.height));

  btn.style.left = fallbackLeft + 'px';
  btn.style.top = fallbackTop + 'px';
}

function answerYes() {
  var msg = document.getElementById('foreverMessage');
  if (msg) {
    msg.classList.remove('hidden');
  }
  spawnCelebration();
}
