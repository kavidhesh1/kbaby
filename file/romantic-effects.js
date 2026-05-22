(function () {
  var heartChars = ['💕', '💖', '💗', '💓', '❤️', '✨', '🌸'];

  function createSparkles(container, count) {
    for (var i = 0; i < count; i++) {
      var s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
      s.style.setProperty('--delay', (Math.random() * 5) + 's');
      container.appendChild(s);
    }
  }

  function createFloatingHearts(container, count) {
    for (var i = 0; i < count; i++) {
      var h = document.createElement('div');
      h.className = 'floating-heart';
      h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
      h.style.left = Math.random() * 100 + '%';
      h.style.setProperty('--size', (14 + Math.random() * 16) + 'px');
      h.style.setProperty('--dur', (10 + Math.random() * 14) + 's');
      h.style.setProperty('--delay', (Math.random() * 12) + 's');
      h.style.setProperty('--rot', (-40 + Math.random() * 80) + 'deg');
      container.appendChild(h);
    }
  }

  function createButterfly() {
    var b = document.createElement('div');
    b.className = 'butterfly';
    b.innerHTML =
      '<div class="butterfly-inner">' +
        '<div class="antenna antenna-left"></div>' +
        '<div class="antenna antenna-right"></div>' +
        '<div class="wing wing-left"></div>' +
        '<div class="body"></div>' +
        '<div class="wing wing-right"></div>' +
      '</div>';
    var dur = 16 + Math.random() * 12;
    b.style.setProperty('--flight-dur', dur + 's');
    b.style.setProperty('--flight-delay', (Math.random() * 8) + 's');
    b.style.left = Math.random() * 80 + '%';
    b.style.top = Math.random() * 60 + '%';
    return b;
  }

  function initAmbient() {
    var sparkles = document.getElementById('sparkles');
    var hearts = document.getElementById('floating-hearts');
    var butterflies = document.getElementById('butterflies');
    if (sparkles) createSparkles(sparkles, 45);
    if (hearts) createFloatingHearts(hearts, 18);
    if (butterflies) {
      for (var i = 0; i < 6; i++) {
        butterflies.appendChild(createButterfly());
      }
    }
  }

  function initCursorGlow() {
    var glow = document.getElementById('cursor-glow');
    if (!glow) return;
    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
    document.body.classList.add('interactive');
  }

  function initMusicButton() {
    var btn = document.getElementById('music-btn');
    var audio = document.getElementById('myAudio');
    if (!btn || !audio) return;
    btn.addEventListener('click', function () {
      if (typeof playAudio === 'function') playAudio();
      btn.classList.add('playing');
      btn.textContent = '♪';
    });
  }

  function hideClickHint() {
    var hint = document.getElementById('click-hint');
    if (hint) hint.classList.add('hidden');
  }

  function burstHearts() {
    for (var i = 0; i < 24; i++) {
      var h = document.createElement('div');
      h.className = 'floating-heart';
      h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
      h.style.left = (30 + Math.random() * 40) + '%';
      h.style.top = (40 + Math.random() * 20) + '%';
      h.style.setProperty('--dur', '3s');
      h.style.setProperty('--delay', '0s');
      h.style.setProperty('--size', (20 + Math.random() * 24) + 'px');
      h.style.animation = 'float-up 3s ease-out forwards';
      document.body.appendChild(h);
      setTimeout(function (el) {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 3500, h);
    }
  }

  window.romanticEffects = {
    init: initAmbient,
    hideClickHint: hideClickHint,
    initCursorGlow: initCursorGlow,
    initMusicButton: initMusicButton,
    burstHearts: burstHearts
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAmbient();
      initCursorGlow();
      initMusicButton();
    });
  } else {
    initAmbient();
    initCursorGlow();
    initMusicButton();
  }
})();
