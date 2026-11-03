document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // 1. Inisialisasi Data dari config.js
    if (typeof CONFIG !== 'undefined') {
        document.getElementById('initBride').innerText = CONFIG.couple.brideInitial || CONFIG.couple.bride.charAt(0);
        document.getElementById('initGroom').innerText = CONFIG.couple.groomInitial || CONFIG.couple.groom.charAt(0);
        document.getElementById('coupleTitle').innerText = `${CONFIG.couple.bride} & ${CONFIG.couple.groom}`;
        document.getElementById('weddingQuote').innerText = CONFIG.couple.quote;
        document.getElementById('eventDateText').innerText = CONFIG.couple.dateString;
        document.getElementById('btnCalendar').href = CONFIG.googleCalendarUrl;
        document.getElementById('audioSource').src = CONFIG.audioUrl;
        document.getElementById('bgMusic').load();
        
        renderBankCards();
    }

    // 2. Parse Parameter Nama Tamu dari Query String (?to=NamaTamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guest = urlParams.get('to');
    if (guest) {
        document.getElementById('guestName').innerText = guest;
    }

    // 3. Listener Tombol Buka Undangan
    const openBtn = document.getElementById('btnOpen');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            playAudio();
        });
    }

    // 4. Jalankan Timer
    startCountdown();
}

/* Render Kartu Rekening Bank */
function renderBankCards() {
    const container = document.getElementById('giftCardsContainer');
    if (!container || !CONFIG.bankAccounts) return;

    container.innerHTML = CONFIG.bankAccounts.map(acc => `
        <div class="gift-card">
            <div class="bank-badge">${acc.bankName}</div>
            <div class="account-number" id="${acc.id}">${acc.accountNumber}</div>
            <div class="account-holder">${acc.accountHolder}</div>
            <button class="btn-copy" onclick="copyToClipboard('${acc.id}', '${acc.bankName}')">
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
    const targetTime = new Date(CONFIG.couple.targetDateIso).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetTime - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = String(days).padStart(2, '0');
            document.getElementById("hours").innerText = String(hours).padStart(2, '0');
            document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
            document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
        } else {
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
        }
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}

/* Logika Copy Rekening & Toast Notification */
function copyToClipboard(elementId, bankName) {
    const textToCopy = document.getElementById(elementId).innerText.replace(/\s+/g, '');
    
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
    
    bgMusic.play().then(() => {
        musicBtn.classList.add('playing');
        document.getElementById('iconPath').setAttribute('d', pauseIconPath);
    }).catch(err => {
        console.log("Autoplay diblokir browser.");
    });
}

function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    
    if (bgMusic.paused) {
        playAudio();
    } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        document.getElementById('iconPath').setAttribute('d', playIconPath);
    }
}