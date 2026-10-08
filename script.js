/* =========================================================
   ROYAL BARBER - script.js
   1. Meniul de pe telefon  2. Banda de galerie
   3. Ziua de azi în program  4. Plasă de siguranță pentru imagini
   ========================================================= */

/* ---------- 1. MENIUL DE PE TELEFON ---------- */
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav');

function setMenu(open) {
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Închide meniul' : 'Deschide meniul');
}
menuButton.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* ---------- 2. BANDA DE GALERIE ---------- */
// Butoanele stânga/dreapta derulează banda cu aproape o imagine
const strip = document.querySelector('.strip');
document.querySelectorAll('.strip__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    strip.scrollBy({ left: Number(btn.dataset.dir) * 360, behavior: 'smooth' });
  });
});

/* ---------- 3. ZIUA DE AZI ÎN PROGRAM ---------- */
// Ziua se ia după ora din România; 0 = duminică, 1 = luni ... 6 = sâmbătă
const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Bucharest' })).getDay();
document.querySelectorAll('.hours tr').forEach((row) => {
  if (row.dataset.days.split(',').includes(String(today))) row.classList.add('today');
});

/* ---------- 4. PLASĂ DE SIGURANȚĂ PENTRU IMAGINI ---------- */
// Dacă o imagine nu se încarcă, o ascundem; fundalul închis rămâne în loc.
document.querySelectorAll('img').forEach((img) => {
  const hide = () => img.classList.add('is-broken');
  img.addEventListener('error', hide);
  if (img.complete && img.naturalWidth === 0 && img.src) hide();
});
