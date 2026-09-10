// ---------- Mobile nav ----------
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

// ---------- Mark active nav link ----------
(function markActive() {
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ---------- Booking modal ----------
const bookingOverlay = document.getElementById('booking-modal');
const bookingServiceSelect = document.getElementById('booking-service');

function openBooking(serviceName) {
  if (!bookingOverlay) return;
  bookingOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (serviceName && bookingServiceSelect) {
    const opt = Array.from(bookingServiceSelect.options).find(o => o.text.indexOf(serviceName) !== -1);
    if (opt) bookingServiceSelect.value = opt.value;
  }
  const successBox = bookingOverlay.querySelector('.form-success');
  const form = bookingOverlay.querySelector('form');
  if (successBox) successBox.classList.remove('show');
  if (form) form.style.display = 'grid';
}

function closeBooking() {
  if (!bookingOverlay) return;
  bookingOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-open-booking]').forEach(btn => {
  btn.addEventListener('click', () => openBooking(btn.getAttribute('data-service')));
});
document.querySelectorAll('[data-close-booking]').forEach(btn => {
  btn.addEventListener('click', closeBooking);
});
if (bookingOverlay) {
  bookingOverlay.addEventListener('click', (e) => {
    if (e.target === bookingOverlay) closeBooking();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBooking();
  });
}

// ---------- Generic form handler (booking + contact) ----------
function setMinDateForToday(input) {
  if (!input) return;
  const today = new Date().toISOString().split('T')[0];
  input.setAttribute('min', today);
}
setMinDateForToday(document.getElementById('booking-date'));

document.querySelectorAll('form[data-success-form]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const successBox = form.parentElement.querySelector('.form-success') || form.nextElementSibling;
    form.style.display = 'none';
    if (successBox && successBox.classList.contains('form-success')) {
      successBox.classList.add('show');
    }
    setTimeout(() => {
      if (form.id === 'booking-form') closeBooking();
    }, 2600);
  });
});

// ---------- Newsletter form ----------
document.querySelectorAll('.footer-form form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const original = btn.textContent;
    btn.textContent = "Yozildingiz ✓";
    form.querySelector('input').value = '';
    setTimeout(() => { btn.textContent = original; }, 2400);
  });
});

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-q').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.closest('.faq-item').querySelector('.faq-a').style.maxHeight = null;
      }
    });

    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
  });
});

// ---------- Testimonial slider (index page) ----------
const testiTrack = document.querySelector('.testi-track');
if (testiTrack) {
  const prevBtn = document.querySelector('.testi-prev');
  const nextBtn = document.querySelector('.testi-next');
  const cardWidth = () => testiTrack.querySelector('.testi-card').offsetWidth + 24;
  nextBtn && nextBtn.addEventListener('click', () => testiTrack.scrollBy({ left: cardWidth(), behavior: 'smooth' }));
  prevBtn && prevBtn.addEventListener('click', () => testiTrack.scrollBy({ left: -cardWidth(), behavior: 'smooth' }));
}

// ---------- Gallery filter (gallery page) ----------
const filterBtns = document.querySelectorAll('.gallery-filter button');
const galleryItems = document.querySelectorAll('.gallery-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.getAttribute('data-cat');
    galleryItems.forEach(item => {
      const show = cat === 'all' || item.getAttribute('data-cat') === cat;
      item.style.display = show ? 'flex' : 'none';
    });
  });
});

// ---------- Current year in footer ----------
document.querySelectorAll('.footer-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
