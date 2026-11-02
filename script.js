/* ============================================================
   FABI'S GRILL - SCRIPT GLOBAL
   Este arquivo é compartilhado por index.html e menu.html
   ============================================================ */

/* === SIDEBAR === */
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const openMenuBtn = document.getElementById('openMenu');
const closeMenuBtn = document.getElementById('closeMenu');

let sidebarCloseTimer = null;

function openSidebar() {
    if (!sidebarMenu || !sidebarOverlay) return;
    clearTimeout(sidebarCloseTimer);
    sidebarMenu.style.transform = '';
    sidebarOverlay.style.opacity = '';
    sidebarMenu.style.transition = '';
    sidebarOverlay.style.transition = '';
    sidebarMenu.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    if (!sidebarMenu || !sidebarOverlay) return;
    sidebarMenu.style.transform = '';
    sidebarOverlay.style.opacity = '';
    sidebarMenu.style.transition = '';
    sidebarOverlay.style.transition = '';
    sidebarMenu.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    clearTimeout(sidebarCloseTimer);
    sidebarCloseTimer = setTimeout(function () {
        document.body.style.overflow = '';
    }, 450);
}

if (openMenuBtn) openMenuBtn.addEventListener('click', openSidebar);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

/* === SWIPE PARA FECHAR A SIDEBAR === */
(function () {
    if (!sidebarMenu) return;
    let startX = 0, startY = 0, currentX = 0, startTime = 0;
    let dragging = false, locked = null;
    const sidebarWidth = () => sidebarMenu.offsetWidth;

    sidebarMenu.addEventListener('touchstart', function (e) {
        if (!sidebarMenu.classList.contains('active')) return;
        const t = e.touches[0];
        startX = t.clientX; startY = t.clientY;
        currentX = 0;
        startTime = Date.now();
        dragging = true; locked = null;
        sidebarMenu.style.transition = 'none';
        sidebarOverlay.style.transition = 'none';
    }, { passive: true });

    sidebarMenu.addEventListener('touchmove', function (e) {
        if (!dragging) return;
        const t = e.touches[0];
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;

        if (!locked) {
            if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
            locked = (Math.abs(dx) > Math.abs(dy)) ? 'h' : 'v';
        }

        if (locked === 'v') {
            dragging = false;
            sidebarMenu.style.transition = '';
            sidebarOverlay.style.transition = '';
            return;
        }

        if (locked === 'h') {
            e.preventDefault();
            currentX = Math.max(0, Math.abs(dx));
            const w = sidebarWidth();
            const percent = currentX / w;
            sidebarMenu.style.transform = 'translateX(' + currentX + 'px)';
            sidebarOverlay.style.opacity = Math.max(0, 1 - percent);
        }
    }, { passive: false });

    function endDrag() {
        if (!dragging) return;
        dragging = false;
        if (locked !== 'h') {
            sidebarMenu.style.transition = '';
            sidebarOverlay.style.transition = '';
            return;
        }

        const w = sidebarWidth();
        const elapsed = Math.max(1, Date.now() - startTime);
        const velocity = currentX / elapsed;
        const shouldClose = currentX > w * 0.25 || velocity > 0.4;

        sidebarMenu.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        sidebarOverlay.style.transition = 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)';

        if (shouldClose) {
            sidebarMenu.style.transform = 'translateX(100%)';
            sidebarOverlay.style.opacity = 0;
            setTimeout(function () {
                sidebarMenu.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                sidebarMenu.style.transform = '';
                sidebarOverlay.style.opacity = '';
                sidebarMenu.style.transition = '';
                sidebarOverlay.style.transition = '';
                document.body.style.overflow = '';
            }, 450);
        } else {
            sidebarMenu.style.transform = 'translateX(0)';
            sidebarOverlay.style.opacity = 1;
            setTimeout(function () {
                sidebarMenu.style.transform = '';
                sidebarOverlay.style.opacity = '';
                sidebarMenu.style.transition = '';
                sidebarOverlay.style.transition = '';
            }, 450);
        }
    }

    sidebarMenu.addEventListener('touchend', endDrag);
    sidebarMenu.addEventListener('touchcancel', endDrag);
})();

/* === LIGHTBOX === */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

/* === MODAIS === */
function openDeliveryModal() {
    const m = document.getElementById('deliveryModal');
    if (!m) return;
    m.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeDeliveryModal() {
    const m = document.getElementById('deliveryModal');
    if (!m) return;
    m.classList.remove('active');
    document.body.style.overflow = '';
}
function closeDeliveryModalOnClick(event) {
    if (event.target === document.getElementById('deliveryModal')) closeDeliveryModal();
}

function openBookingModal() {
    const m = document.getElementById('bookingModal');
    if (!m) return;
    m.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeBookingModal() {
    const m = document.getElementById('bookingModal');
    if (!m) return;
    m.classList.remove('active');
    document.body.style.overflow = '';
}
function closeBookingModalOnClick(event) {
    if (event.target === document.getElementById('bookingModal')) closeBookingModal();
}

/* === ESC fecha tudo === */
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeDeliveryModal();
        closeBookingModal();
        closeSidebar();
        closeLightbox();
    }
});

/* === ABRIR GOOGLE MAPS (compatível com mobile) === */
function openGoogleMaps() {
    const address = "13 Crown Alley, Temple Bar, Dublin 2, D02 KW83, Ireland";
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    closeSidebar();

    setTimeout(function () {
        if (isMobile) {
            window.location.href = googleMapsUrl;
        } else {
            window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
        }
    }, 50);
}

/* === NAVEGAÇÃO ENTRE PÁGINAS === */
function showFullMenu() {
    closeSidebar();
    window.location.href = 'menu.html';
}

function showMainPage() {
    closeSidebar();
    window.location.href = 'index.html';
}
