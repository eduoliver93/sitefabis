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
        startX = t.clientX
