// Auto-redirect to home after 5 seconds with a live countdown
(function () {
  const el = document.getElementById('counter');
  if (!el) return;
  let t = 5;

  function tick() {
    el.textContent = String(t);
    if (t <= 0) {
      window.location.href = '/';
      return;
    }
    t -= 1;
    setTimeout(tick, 1000);
  }

  tick();
})();
