const drawer = document.getElementById('drawerMenu');
      const backdrop = document.getElementById('drawerBackdrop');
      const openBtn = document.getElementById('navbarToggleBtn');
      const closeBtn = document.getElementById('drawerCloseBtn');
      const navLinks = drawer.querySelectorAll('.nav-link');

      openBtn.addEventListener('click', () => {
        drawer.classList.add('open');
        backdrop.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
      closeBtn.addEventListener('click', closeDrawer);
      backdrop.addEventListener('click', closeDrawer);

      function closeDrawer() {
        drawer.classList.remove('open');
        backdrop.classList.remove('show');
        document.body.style.overflow = '';
      }

      // Close drawer when clicking nav-link and scroll to section
      navLinks.forEach(link => {
        link.addEventListener('click', function(e){

          // Scroll to top jika klik Home
          if (this.getAttribute('href') === '#top' || this.getAttribute('href') === '#') {
            closeDrawer();
            setTimeout(() => {
              window.scrollTo({top: 0, behavior: 'smooth'});
            }, 150);
            e.preventDefault();
            return;
          }

          if (this.getAttribute('href').startsWith('#')) {
            closeDrawer();
            setTimeout(() => {
              const target = document.querySelector(this.getAttribute('href'));
              if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
            e.preventDefault();
          }
        });
      });

      // SCROLLSPY drawer: auto active saat scroll
      document.addEventListener('DOMContentLoaded', function() {
        // Gabungkan nav-link dari drawer dan desktop, kalau mau sekalian nav desktop auto-active juga.
        const allNavLinks = document.querySelectorAll('.nav-link[href^="#"]');
        const sectionIds = Array.from(allNavLinks).map(link => link.getAttribute('href')).filter(href => href.startsWith('#') && href.length > 1);
        const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);

        function onScrollSpy() {
          let scrollPos = window.scrollY + 130; // 130 = offset sticky navbar, sesuaikan jika perlu
          let found = false;
          for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].offsetTop <= scrollPos) {
              // Remove all .active
              allNavLinks.forEach(l => l.classList.remove('active'));
              // Add .active ke SEMUA link yang mengarah ke id section ini
              document.querySelectorAll('.nav-link[href="' + sectionIds[i] + '"]').forEach(l => l.classList.add('active'));
              found = true;
              break;
            }
          }
          // Jika di paling atas, aktifkan "Home"
          if (!found) {
            allNavLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.nav-link[href="#top"], .nav-link[href="#"]').forEach(l => l);
          }
        }

        window.addEventListener('scroll', onScrollSpy, { passive: true });
        window.addEventListener('resize', onScrollSpy);
        onScrollSpy(); // initial check
      });

const testimonials = [
      {
        rating: 4,
        text: "Sangat puas dengan layanan Nymgo! Telepon ke keluarga di luar negeri sekarang jauh lebih jernih, mudah, dan hemat biaya. Koneksi lancar tanpa drama. Terbaik untuk Thank you, Nymgo!",
        photo: "./assets/img/avatar-2.png",
        name: "Alessia Romano",
        job: "Pengusaha"
      },
      {
        rating: 5,
        text: "Pengalaman luar biasa pakai Nymgo. Dari awal daftar sampai telepon ke luar negeri semuanya lancar. Suara jernih dan biaya lebih murah dari aplikasi lain. Layanan customer service-nya juga responsif!",
        photo: "./assets/img/avatar-5.png",
        name: "Carlos Mendez",
        job: "Pengusaha"
      },
      {
        rating: 4,
        text: "Sangat puas dengan layanan Nymgo! Telepon bisnis ke luar negeri jadi lebih efisien, kualitas suara stabil, dan biaya super hemat. Nggak nyangka bisa sebagus ini. Terima kasih, Nymgo!",
        photo: "./assets/img/avatar-4.png",
        name: "Antonio Ricci",
        job: "Pengusaha"
      },
      {
        rating: 4,
        text: "Nymgo benar-benar solusi terbaik! Sekarang saya bisa ngobrol rutin dengan orang tua di kampung halaman tanpa takut tagihan membengkak. Jernih, cepat, dan gampang banget dipakai. ",
        photo: "./assets/img/avatar-1.png",
        name: "Hendra Wijaya",
        job: "Pengusaha"
      }
    ];
    let currentTesti = 0;

    function getStars(rating) {
      let stars = '';
      for(let i=0; i<5; i++) {
        if(i < rating) stars += `<i class="bi bi-star-fill text-warning"></i>`;
        else stars += `<i class="bi bi-star text-warning"></i>`;
      }
      return stars;
    }

    // mode: 'left' (geser kiri), 'right' (geser kanan)
    function showTestimonial(idx, mode='right') {
      const t = testimonials[idx];
      const html = `
        <div class="testimonial-card bg-white p-4 px-md-5 position-absolute start-0 top-0 w-100" style="min-height: 330px; z-index:1; display: flex; flex-direction: column; justify-content: flex-end;">
          <div class="testimonial-content" style="flex: 1 1 auto;">
            <div class="mb-2">${getStars(t.rating)}</div>
            <div class="mb-4 text-secondary fs-5">${t.text}</div>
          </div>
          <div class="testimonial-profile d-flex align-items-center gap-3 mt-4" style="margin-top: 2rem;">
            <img src="${t.photo}" class="rounded-circle" width="55" height="55" alt="${t.name}">
            <div>
              <span class="fw-bold fs-6 d-block">${t.name}</span>
              <small class="text-muted">${t.job}</small>
            </div>
          </div>
        </div>
      `;
      const box = document.querySelector('.testimonial-carousel');
      const oldCard = box.querySelector('.testimonial-card');

      // Jika belum ada card (awal), langsung tampil
      if(!oldCard) {
        box.innerHTML = html;
        box.firstElementChild.classList.add('anim-in-right');
        return;
      }

      // anim out ke arah berlawanan
      oldCard.classList.add(mode==='right' ? 'anim-out-left' : 'anim-out-right');
      
      setTimeout(() => {
        box.innerHTML = html;
        const newCard = box.firstElementChild;
        newCard.classList.add(mode==='right' ? 'anim-in-right' : 'anim-in-left');
      }, 450); // sesuai durasi transition/animation
    }

    document.querySelector('.testi-next').onclick = function() {
      let prev = (currentTesti-1+testimonials.length)%testimonials.length;
      showTestimonial(prev, 'left');
      currentTesti = prev;
    };
    document.querySelector('.testi-prev').onclick = function() {
      let next = (currentTesti+1)%testimonials.length;
      showTestimonial(next, 'right');
      currentTesti = next;
    };
    // initial
    showTestimonial(currentTesti, 'right');

document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function() {
          const parent = btn.parentElement;
          const answer = parent.querySelector('.faq-answer');
          const alreadyActive = parent.classList.contains('faq-item-active');
          
          // Tutup semua
          document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('faq-item-active');
            item.querySelector('.faq-question').classList.remove('active');
            // ubah icon ke plus
            const iconSpan = item.querySelector('.faq-icon');
            iconSpan.innerHTML = `<svg width="24" height="24"><path d="M12 7v10M7 12h10" stroke="#19c287" stroke-width="2" stroke-linecap="round"/></svg>`;
            // Smoothly collapse
            const ans = item.querySelector('.faq-answer');
            ans.style.maxHeight = null;
          });

          if (!alreadyActive) {
            parent.classList.add('faq-item-active');
            btn
            // ubah icon ke minus
            const iconSpan = btn.querySelector('.faq-icon');
            iconSpan.innerHTML = `<svg width="24" height="24"><path d="M7 12h10" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`;
            // Smoothly expand
            answer.style.maxHeight = answer.scrollHeight + "px";
          }
        });
      });

      // Set default open (jika ada)
      window.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.faq-item.faq-item-active .faq-answer').forEach(ans => {
          ans.style.maxHeight = ans.scrollHeight + "px";
        });
      });

AOS.init({
        once: true,          // animasi hanya jalan sekali
        duration: 800,       // durasi animasi (ms)
        offset: 100          // jarak scroll sebelum aktif (px)
      });


document.addEventListener('DOMContentLoaded', function () {
  const allNavLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sectionIds = Array.from(allNavLinks).map(link => link.getAttribute('href')).filter(h => h.length > 1);
  const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);

  let isScrolling = false;

  // CLICK NAV-LINK (tanpa .active manual)
  allNavLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        isScrolling = true;
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
        // Bersihkan hash dari URL
        history.replaceState(null, '', window.location.pathname);
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    });
  });

  // SCROLLSPY
  function onScrollSpy() {
          let scrollPos = window.scrollY + 130; // 130 = offset sticky navbar, sesuaikan jika perlu
          let found = false;
          for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].offsetTop <= scrollPos) {
              // Remove all .active
              allNavLinks.forEach(l => l.classList.remove('active'));
              // Add .active ke SEMUA link yang mengarah ke id section ini
              document.querySelectorAll('.nav-link[href="' + sectionIds[i] + '"]').forEach(l => l.classList.add('active'));
              found = true;
              break;
            }
    }

    if (!found) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.nav-link[href="#top"], .nav-link[href="#"]').forEach(l => l);
    }
  }

  window.addEventListener('scroll', onScrollSpy, { passive: true });
  window.addEventListener('resize', onScrollSpy);
  onScrollSpy();
});


document.addEventListener('DOMContentLoaded', function () {
  const allNavLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sectionIds = Array.from(allNavLinks).map(link => link.getAttribute('href')).filter(h => h.length > 1);
  const sections = sectionIds.map(id => document.querySelector(id)).filter(Boolean);

  let isScrolling = false;

  // Klik nav-link → scroll saja, tanpa aktif
  allNavLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        isScrolling = true;
        window.scrollTo({
          top: target.offsetTop - 130,
          behavior: 'smooth'
        });
        history.replaceState(null, '', window.location.pathname); // hapus hash
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    });
  });

  // SCROLLSPY
  function onScrollSpy() {
    if (isScrolling) return;
    const scrollPos = window.scrollY + 130;
    let found = false;

    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= scrollPos) {
        allNavLinks.forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.nav-link[href="' + sectionIds[i] + '"]').forEach(l => l.classList.add('active'));
        found = true;
        break;
      }
    }

    if (!found) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.nav-link[href="#top"], .nav-link[href="#"]').forEach(l => l.classList.add('active'));
    }
  }

  window.addEventListener('scroll', onScrollSpy, { passive: true });
  window.addEventListener('resize', onScrollSpy);
  onScrollSpy();
});

document.addEventListener('DOMContentLoaded', function () {
  const scrollBtn = document.getElementById('scrollToTopBtn');

  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 300);
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
