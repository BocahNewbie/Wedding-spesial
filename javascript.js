document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // 1. Inisialisasi Data dari config.js
    if (typeof CONFIG !== 'undefined') {
        if (CONFIG.backgrounds && CONFIG.backgrounds.globalPattern) {
            document.body.style.backgroundImage = `url('${CONFIG.backgrounds.globalPattern}')`;
        }

        if (document.getElementById('initBride')) document.getElementById('initBride').innerText = CONFIG.couple.brideInitial || CONFIG.couple.bride.charAt(0);
        if (document.getElementById('initGroom')) document.getElementById('initGroom').innerText = CONFIG.couple.groomInitial || CONFIG.couple.groom.charAt(0);
        if (document.getElementById('coupleTitle')) document.getElementById('coupleTitle').innerHTML = `<span class="font-script text-4xl sm:text-5xl font-normal text-cyan-300 block my-1">${CONFIG.wedding.pria.panggilan}</span> <span class="text-purple-400 font-serif text-xl">&amp;</span> <span class="font-script text-4xl sm:text-5xl font-normal text-cyan-300 block my-1">${CONFIG.wedding.wanita.panggilan}</span>`;
        if (document.getElementById('weddingQuote')) document.getElementById('weddingQuote').innerText = CONFIG.event.quote;
        if (document.getElementById('eventDateText')) document.getElementById('eventDateText').innerText = CONFIG.event.dateText;
        if (document.getElementById('btnCalendar')) document.getElementById('btnCalendar').href = CONFIG.googleCalendarUrl;
        
        const audioSource = document.getElementById('audioSource');
        const bgMusic = document.getElementById('bgMusic');
        if (audioSource && bgMusic) {
            audioSource.src = CONFIG.audioUrl;
            bgMusic.load();
        }
        
        renderBankCards();
        renderProfiles();
        renderLoveStory();
        renderSchedules();
        renderGallery();
        fetchComments();
    }

    // 2. Parse Parameter Nama Tamu dari Query String (?to=NamaTamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guest = urlParams.get('to');
    const guestNameEl = document.getElementById('guestName');
    if (guestNameEl) {
        if (guest) {
            guestNameEl.innerText = decodeURIComponent(guest.replace(/\+/g, ' '));
        } else {
            guestNameEl.innerText = "Tamu Undangan";
        }
    }

    // 3. Listener Tombol Buka Undangan
    const openBtn = document.getElementById('btnOpen');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            const cover = document.getElementById('sec-cover');
            const mainContent = document.getElementById('main-content');
            
            if (cover) cover.classList.add('opacity-0', 'scale-105', 'pointer-events-none');
            
            setTimeout(() => {
                if (cover) cover.style.display = 'none';
                if (mainContent) {
                    mainContent.classList.remove('hidden');
                    setTimeout(() => mainContent.classList.remove('opacity-0'), 50);
                }
            }, 800);

            playAudio();
        });
    }

    // 4. Jalankan Timer
    startCountdown();

    // 5. Setup RSVP Form Handler
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = rsvpForm.querySelector('button[type="submit"]');
            const name = document.getElementById('input-name').value;
            const status = document.getElementById('input-status').value;
            const msg = document.getElementById('input-message').value;

            if (typeof CONFIG === 'undefined' || !CONFIG.scriptUrl || CONFIG.scriptUrl.includes("PASTER_URL")) {
                showToast("URL Database Google Script belum dipasang!");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerText = "Mengirim...";

            const payload = { name: name, status: status, message: msg };

            fetch(CONFIG.scriptUrl, {
                method: 'POST',
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(res => {
                showToast('Terima kasih! Ucapan Anda telah tersimpan.');
                document.getElementById('input-message').value = '';
                submitBtn.disabled = false;
                submitBtn.innerText = "Kirim Ucapan";
                fetchComments();
            })
            .catch(err => {
                console.error("Gagal mengirim ucapan:", err);
                showToast('Terjadi kesalahan saat menyimpan ucapan.');
                submitBtn.disabled = false;
                submitBtn.innerText = "Kirim Ucapan";
            });
        });
    }
}

/* Render Profil Mempelai */
function renderProfiles() {
    const profileContainer = document.getElementById('profile-container');
    if (!profileContainer || !CONFIG.wedding) return;
    const p = CONFIG.wedding.pria;
    const w = CONFIG.wedding.wanita;

    profileContainer.innerHTML = `
        <div class="text-center space-y-3 mb-8">
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-cyan-300">Pasangan Mempelai</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-8 items-stretch">
            <div class="bg-slate-900/80 border border-cyan-500/30 p-6 rounded-3xl text-center shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between space-y-4">
                <div class="space-y-4">
                    <div class="relative w-36 h-36 mx-auto">
                        <img src="${p.foto}" class="w-full h-full rounded-full object-cover border-4 border-cyan-400 shadow-lg">
                        <div class="absolute inset-0 rounded-full border-2 border-purple-500/40 transform scale-105"></div>
                    </div>
                    <div class="min-h-[72px] flex items-center justify-center">
                        <h3 class="font-serif text-2xl font-bold text-slate-100 leading-snug">${p.nama}</h3>
                    </div>
                    <p class="text-xs text-slate-400 leading-relaxed">${p.orangTua}</p>
                </div>
                <div class="pt-2">
                    <a href="https://instagram.com/${p.instagram.replace('@','')}" target="_blank" class="inline-flex items-center space-x-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-950/60 px-3.5 py-1.5 rounded-full border border-cyan-500/30">
                        <i class="fa-brands fa-instagram text-cyan-400"></i><span>${p.instagram}</span>
                    </a>
                </div>
            </div>

            <div class="bg-slate-900/80 border border-purple-500/30 p-6 rounded-3xl text-center shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between space-y-4">
                <div class="space-y-4">
                    <div class="relative w-36 h-36 mx-auto">
                        <img src="${w.foto}" class="w-full h-full rounded-full object-cover border-4 border-purple-400 shadow-lg">
                        <div class="absolute inset-0 rounded-full border-2 border-cyan-500/40 transform scale-105"></div>
                    </div>
                    <div class="min-h-[72px] flex items-center justify-center">
                        <h3 class="font-serif text-2xl font-bold text-slate-100 leading-snug">${w.nama}</h3>
                    </div>
                    <p class="text-xs text-slate-400 leading-relaxed">${w.orangTua}</p>
                </div>
                <div class="pt-2">
                    <a href="https://instagram.com/${w.instagram.replace('@','')}" target="_blank" class="inline-flex items-center space-x-2 text-xs text-purple-400 hover:text-purple-300 transition-colors bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-500/30">
                        <i class="fa-brands fa-instagram text-purple-400"></i><span>${w.instagram}</span>
                    </a>
                </div>
            </div>
        </div>
    `;
}

/* Render Love Story Timeline */
function renderLoveStory() {
    const storyContainer = document.getElementById('story-container');
    if (!storyContainer || !CONFIG.loveStory) return;
    storyContainer.innerHTML = '<div id="journey-line" class="absolute top-0 left-[-2px] w-[2px] bg-gradient-to-b from-cyan-400 via-sky-500 to-purple-600 transition-all duration-300 ease-out h-0"></div>';
    CONFIG.loveStory.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'relative pl-2 space-y-2 group text-left';
        card.innerHTML = `
            <div class="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-sm group-hover:scale-125 transition-transform">
                <div class="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
            </div>
            <div class="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all space-y-2">
                <span class="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-bold rounded-full shadow-sm inline-block">${item.year}</span>
                <h3 class="font-serif text-lg font-bold text-slate-100">${item.title}</h3>
                <p class="text-xs text-slate-400 leading-relaxed pt-1">${item.description}</p>
            </div>
        `;
        storyContainer.appendChild(card);
    });
}

/* Render Jadwal Acara */
function renderSchedules() {
    const schedContainer = document.getElementById('schedule-container');
    if (!schedContainer || !CONFIG.schedules) return;
    schedContainer.innerHTML = '';
    CONFIG.schedules.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg text-center space-y-4 group transition-all duration-300 hover:border-cyan-500/50 flex flex-col justify-between';
        card.innerHTML = `
            <div>
                ${item.image ? `<div class="h-44 w-full overflow-hidden relative"><img src="${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"><div class="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div></div>` : ''}
                <div class="p-5 space-y-2">
                    <h3 class="font-serif text-2xl font-bold text-cyan-300">${item.name}</h3>
                    <p class="text-cyan-400 text-sm font-semibold border-y border-slate-800 py-1 inline-block px-3">${item.time}</p>
                    <p class="text-xs text-slate-400 leading-relaxed">${item.location}<br>${item.address}</p>
                </div>
            </div>
            <div class="p-5 pt-0">
                <a href="${item.mapsUrl || '#'}" target="_blank" class="inline-flex items-center justify-center space-x-2 w-full py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold text-xs rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all shadow-md">
                    <i class="fa-solid fa-map-location-dot text-xs"></i>
                    <span>Lokasi ${item.name}</span>
                </a>
            </div>
        `;
        schedContainer.appendChild(card);
    });
}

/* Render Galeri Foto */
function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid || !CONFIG.gallery) return;
    galleryGrid.innerHTML = '';
    CONFIG.gallery.forEach(url => {
        const wrap = document.createElement('div');
        wrap.className = 'overflow-hidden rounded-2xl border border-slate-800 shadow-md group cursor-pointer relative';
        wrap.innerHTML = `
            <img src="${url}" class="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500">
            <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-cyan-300 text-xl">
                <i class="fa-solid fa-magnifying-glass-plus"></i>
            </div>
        `;
        wrap.addEventListener('click', () => openGalleryModal(url));
        galleryGrid.appendChild(wrap);
    });
}

function openGalleryModal(url) {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    if (modal && modalImg) {
        modalImg.src = url;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

/* Render Kartu Rekening Bank */
function renderBankCards() {
    const container = document.getElementById('giftCardsContainer');
    if (!container || !CONFIG.bankAccounts) return;

    container.innerHTML = CONFIG.bankAccounts.map(acc => `
        <div class="gift-card">
            <div class="bank-badge">${acc.bankName || acc.bank}</div>
            <div class="account-number" id="${acc.id}">${acc.accountNumber || acc.number}</div>
            <div class="account-holder">${acc.accountHolder || ('a.n. ' + acc.owner)}</div>
            <button class="btn-copy" onclick="copyToClipboard('${acc.id}', '${acc.bankName || acc.bank}')">
                <svg viewBox="0 0 24 24">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                Salin Rekening
            </button>
        </div>
    `).join('');
}

/* Logika Hitung Mundur Waktu */
function startCountdown() {
    if (!CONFIG.event || !CONFIG.event.targetDateIso) return;
    const targetTime = new Date(CONFIG.event.targetDateIso).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetTime - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (document.getElementById("days")) document.getElementById("days").innerText = String(days).padStart(2, '0');
            if (document.getElementById("hours")) document.getElementById("hours").innerText = String(hours).padStart(2, '0');
            if (document.getElementById("minutes")) document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
            if (document.getElementById("seconds")) document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
        } else {
            if (document.getElementById("days")) document.getElementById("days").innerText = "00";
            if (document.getElementById("hours")) document.getElementById("hours").innerText = "00";
            if (document.getElementById("minutes")) document.getElementById("minutes").innerText = "00";
            if (document.getElementById("seconds")) document.getElementById("seconds").innerText = "00";
        }
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}

/* Logika Copy Rekening & Toast Notification */
function copyToClipboard(elementId, bankName) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const textToCopy = el.innerText.replace(/\s+/g, '');
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Rekening ${bankName} berhasil disalin!`);
        });
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`Rekening ${bankName} berhasil disalin!`);
    }
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => { toast.classList.remove("show"); }, 2500);
}

/* Logika Pemutar Audio Backsound */
const playIconPath = "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z";
const pauseIconPath = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";

function playAudio() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    const iconPath = document.getElementById('iconPath');
    
    if (!bgMusic) return;
    bgMusic.play().then(() => {
        if (musicBtn) musicBtn.classList.add('playing');
        if (iconPath) iconPath.setAttribute('d', pauseIconPath);
    }).catch(err => {
        console.log("Autoplay diblokir browser:", err);
    });
}

function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    const iconPath = document.getElementById('iconPath');
    
    if (!bgMusic) return;
    if (bgMusic.paused) {
        bgMusic.play();
        if (musicBtn) musicBtn.classList.add('playing');
        if (iconPath) iconPath.setAttribute('d', pauseIconPath);
    } else {
        bgMusic.pause();
        if (musicBtn) musicBtn.classList.remove('playing');
        if (iconPath) iconPath.setAttribute('d', playIconPath);
    }
}

/* Mengambil Komentar RSVP */
function fetchComments() {
    const commentsContainer = document.getElementById('comments-container');
    if (!commentsContainer) return;
    if (typeof CONFIG === 'undefined' || !CONFIG.scriptUrl || CONFIG.scriptUrl.includes("PASTER_URL")) {
        commentsContainer.innerHTML = '<p class="text-xs text-slate-500 text-center">Belum ada ucapan tersimpan.</p>';
        return;
    }

    commentsContainer.innerHTML = '<p class="text-xs text-cyan-400 text-center">Memuat ucapan...</p>';

    fetch(CONFIG.scriptUrl)
        .then(res => res.json())
        .then(data => {
            commentsContainer.innerHTML = '';
            if (!data || data.length === 0) {
                commentsContainer.innerHTML = '<p class="text-xs text-slate-500 text-center">Belum ada ucapan. Jadilah yang pertama!</p>';
                return;
            }

            data.forEach(item => {
                const el = document.createElement('div');
                el.className = 'bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl text-left space-y-1 shadow-sm';
                el.innerHTML = `
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-cyan-300 text-sm">${escapeHtml(item.name)}</span>
                        <span class="text-[10px] px-2 py-0.5 rounded-full ${item.status === 'Hadir' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'}">${item.status}</span>
                    </div>
                    <p class="text-xs text-slate-300">${escapeHtml(item.message)}</p>
                    <span class="text-[9px] text-slate-500 block pt-1">${item.date || ''}</span>
                `;
                commentsContainer.appendChild(el);
            });
        })
        .catch(err => {
            console.error("Gagal memuat ucapan:", err);
            commentsContainer.innerHTML = '<p class="text-xs text-red-400 text-center">Gagal memuat ucapan.</p>';
        });
}

function escapeHtml(text) {
    return text ? text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';
}
