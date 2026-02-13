var FLOWERS_AND_POPPERS = ['🌸', '🌺', '🌷', '🌻', '💐', '🪷', '🌼', '🎉', '🎊', '🎉', '🎊', '✨', '💖'];
var BALLOONS_AND_FIRECRACKERS = ['🎈', '🎈', '🎈', '🎈', '🎈', '🧨', '🧨', '🧨', '🎆', '🎇', '✨', '💥', '🎉', '🎊'];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function spawnCelebration(useBalloons) {
  var container = document.getElementById('celebration');
  if (!container) return;

  container.innerHTML = '';

  var items = useBalloons ? BALLOONS_AND_FIRECRACKERS : FLOWERS_AND_POPPERS;
  var count = useBalloons ? 90 : 60;

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < count; i++) {
    var el = document.createElement('span');
    el.className = 'celebration-item';
    el.textContent = items[(Math.random() * items.length) | 0];

    el.style.left = Math.random() * 100 + '%';
    el.style.top = (-10 + Math.random() * 110) + '%';
    el.style.fontSize = (16 + Math.random() * 16) + 'px';

    if (Math.random() < 0.4) el.classList.add('pop');

    fragment.appendChild(el);
  }

  container.appendChild(fragment);
}


function openGift() {
  playBirthdayMusic();

   var gift = document.querySelector('.gift-box');
  if (gift) gift.style.transform = 'scale(0.9)';

  requestAnimationFrame(function () {
     spawnCelebration(true);
   });

  setTimeout(function () {
    document.getElementById('gift-screen').classList.add('hidden');
    document.getElementById('intro').classList.remove('hidden');
  }, 900);
}



function playBirthdayMusic() {
  var music = document.getElementById('birthdayMusic');
  if (!music) return;

  music.volume = 0;
  music.currentTime = 0;
  music.play().catch(function () {});

  var vol = 0;
  var fade = setInterval(function () {
    vol += 0.05;
    music.volume = Math.min(vol, 0.5);
    if (vol >= 0.5) clearInterval(fade);
  }, 120);
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
