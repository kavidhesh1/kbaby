(function () {
  // Set your relationship start date here (YYYY-MM-DD)
  var RELATIONSHIP_START = new Date('2025-10-22');

  function updateCounter() {
    var now = new Date();
    var diff = now - RELATIONSHIP_START;
    if (diff < 0) diff = 0;
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var months = Math.floor(days / 30.44);

    var elDays = document.getElementById('stat-days');
    var elHours = document.getElementById('stat-hours');
    var elMins = document.getElementById('stat-minutes');
    var elMonths = document.getElementById('stat-months');
    if (elDays) elDays.textContent = days;
    if (elHours) elHours.textContent = hours;
    if (elMins) elMins.textContent = minutes;
    if (elMonths) elMonths.textContent = months >= 7 ? 7 : months;
  }

  function initNav() {
    var sections = document.querySelectorAll('#intro, #tree-section, #letter-section, #timeline-section, #reasons-section, #counter-section, #promises-section, #surprise-section');
    var navLinks = document.querySelectorAll('#site-nav a');
    if (!navLinks.length || sections.length !== navLinks.length) return;

    function setActive() {
      var scrollY = window.scrollY + 150;
      var active = 0;
      sections.forEach(function (sec, i) {
        if (scrollY >= sec.offsetTop) active = i;
      });
      navLinks.forEach(function (a, i) {
        a.classList.toggle('active', i === active);
      });
    }

    window.addEventListener('scroll', setActive);
    setActive();
  }

  function initTimeline() {
    var items = document.querySelectorAll('.timeline-item');
    if (!items.length || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.2 });
    items.forEach(function (el) { obs.observe(el); });
  }

  function initReasonCards() {
    document.querySelectorAll('.reason-card').forEach(function (card) {
      card.addEventListener('click', function () {
        card.classList.toggle('flipped');
      });
    });
  }

  function initSurprise() {
    var btn = document.getElementById('surprise-btn');
    var msg = document.getElementById('surprise-message');
    if (!btn || !msg) return;
    btn.addEventListener('click', function () {
      msg.classList.add('show');
      btn.style.display = 'none';
      if (window.romanticEffects && romanticEffects.burstHearts) {
        romanticEffects.burstHearts();
      }
    });
  }

  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  window.siteApp = {
    scrollToSection: scrollToSection,
    startLetterTypewriter: function () {
      var letter = $('#full-letter');
      if (letter.length && !letter.data('typed')) {
        letter.data('typed', true);
        letter.show().typewriter();
      }
    },
    goToTree: function () {
      scrollToSection('tree-section');
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    updateCounter();
    setInterval(updateCounter, 60000);
    initNav();
    initTimeline();
    initReasonCards();
    initSurprise();

    var enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
      enterBtn.addEventListener('click', function () {
        siteApp.goToTree();
      });
    }
  });
})();
