(() => {
  const tiles = [...document.querySelectorAll('.photo-tile')];
  const viewer = document.querySelector('#viewer');
  if (!tiles.length || !viewer || typeof viewer.showModal !== 'function') return;
  const image = viewer.querySelector('.viewer-image');
  const counter = viewer.querySelector('.viewer-counter');
  let active = 0;
  function show(index) {
    active = (index + tiles.length) % tiles.length;
    image.src = tiles[active].dataset.full;
    image.alt = tiles[active].getAttribute('aria-label');
    counter.textContent = (active + 1) + ' / ' + tiles.length;
  }
  tiles.forEach((tile, index) => tile.addEventListener('click', event => {
    event.preventDefault();
    show(index);
    viewer.showModal();
  }));
  viewer.querySelector('.close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.previous').addEventListener('click', () => show(active - 1));
  viewer.querySelector('.next').addEventListener('click', () => show(active + 1));
  viewer.addEventListener('close', () => { image.removeAttribute('src'); tiles[active].focus(); });
  document.addEventListener('keydown', event => {
    if (!viewer.open) return;
    if (event.key === 'ArrowLeft') show(active - 1);
    if (event.key === 'ArrowRight') show(active + 1);
  });
  let touchStartX = 0;
  image.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
  image.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(distance) > 55) show(active + (distance < 0 ? 1 : -1));
  }, { passive: true });
})();
