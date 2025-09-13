// ===== Countdown =====
(function () {
  const root = document.getElementById('countdown');
  if (!root) return;

  // Set your launch date via data-launch on #countdown (ISO string)
  const targetStr = root.getAttribute('data-launch') || '2025-12-01T00:00:00Z';
  const target = new Date(targetStr).getTime();

  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, '0');

  function tick() {
    const now = Date.now();
    let delta = Math.max(0, Math.floor((target - now) / 1000));
    const d = Math.floor(delta / 86400); delta -= d * 86400;
    const h = Math.floor(delta / 3600);  delta -= h * 3600;
    const m = Math.floor(delta / 60);    delta -= m * 60;
    const s = delta;

    $('days').textContent  = d;
    $('hours').textContent = pad(h);
    $('mins').textContent  = pad(m);
    $('secs').textContent  = pad(s);
  }

  tick();
  setInterval(tick, 1000);
})();

// ===== Notify form (client-only demo) =====
(function () {
  const form = document.getElementById('notify-form');
  const input = document.getElementById('email');
  const msg = document.getElementById('form-msg');
  if (!form || !input) return;

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (!isValidEmail(email)) {
      msg.textContent = 'Please enter a valid email.';
      msg.style.color = '#ff7878';
      input.focus();
      return;
    }

    try {
      // Store locally as a placeholder. Replace with your backend or Formspree endpoint.
      const key = 'fcg_waitlist';
      const list = JSON.parse(localStorage.getItem(key) || '[]');
      if (!list.includes(email)) list.push(email);
      localStorage.setItem(key, JSON.stringify(list));
    } catch (_) {}

    msg.textContent = 'Thanks! You’ll be notified at ' + email + '.';
    msg.style.color = '#9aa0a6';
    form.reset();
  });
})();
