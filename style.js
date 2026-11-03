:root {
    --bg-dark: #0f172a;
    --card-bg: rgba(30, 41, 59, 0.75);
    --accent-cyan: #06b6d4;
    --accent-gold: #d97706;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-main);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Mobile Container Wrapper */
.mobile-container {
    width: 100%;
    max-width: 480px;
    min-height: 100vh;
    position: relative;
    background: radial-gradient(circle at top, #1e293b 0%, #0f172a 100%);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    overflow-x: hidden;
}

/* SECTION 1: COVER V2 (Bella-Deni-174 Style) */
.cover-section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 3rem 1.5rem 2.5rem 1.5rem;
    text-align: center;
    position: relative;
}

.decor-glow {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, transparent 70%);
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
}

/* Initial Monogram Badge (B & D) */
.initials-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
}

.initial-circle {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid var(--accent-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--accent-gold);
    background: rgba(217, 119, 6, 0.05);
}

.initial-amp {
    font-size: 1.1rem;
    color: var(--accent-cyan);
    font-weight: 600;
}

.wedding-label {
    font-size: 0.8rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-cyan);
    font-weight: 600;
}

.couple-names {
    font-family: 'Playfair Display', serif;
    font-size: 2.75rem;
    font-weight: 700;
    color: var(--text-main);
    line-height: 1.2;
    margin: 0.75rem 0 1.25rem 0;
}

.wedding-quote {
    font-size: 0.825rem;
    color: var(--text-muted);
    font-style: italic;
    line-height: 1.6;
    max-width: 380px;
    margin: 0 auto 1.5rem auto;
}

.guest-box {
    background: var(--card-bg);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    border-radius: 16px;
    padding: 1.25rem 1.75rem;
    width: 100%;
    margin-bottom: 1.5rem;
}

.guest-box p {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 0.3rem;
}

.guest-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 0.3rem;
}

.guest-note {
    font-size: 0.7rem !important;
    font-style: italic;
    opacity: 0.8;
}

.btn-open {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    padding: 0.85rem 2rem;
    border-radius: 50px;
    box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
    transition: all 0.3s ease;
}

.btn-open:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(6, 182, 212, 0.6);
}

.btn-open svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
}

/* SECTION 2: COUNTDOWN TIMER */
.countdown-section {
    padding: 4rem 1.5rem;
    text-align: center;
    background: rgba(15, 23, 42, 0.6);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.section-title {
    font-size: 0.85rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--accent-gold);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.event-date {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 2rem;
}

.timer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    margin-bottom: 2rem;
}

.timer-box {
    background: var(--card-bg);
    border: 1px solid rgba(6, 182, 212, 0.2);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    padding: 0.85rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.timer-val {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent-cyan);
    line-height: 1;
}

.timer-unit {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-muted);
    margin-top: 0.4rem;
}

.btn-calendar {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: 1px solid var(--accent-cyan);
    color: var(--accent-cyan);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.65rem 1.25rem;
    border-radius: 50px;
    transition: all 0.3s ease;
}

.btn-calendar:hover {
    background: rgba(6, 182, 212, 0.1);
    transform: translateY(-2px);
}

/* SECTION 3: AMPLOP DIGITAL */
.digital-gift-section {
    padding: 4rem 1.5rem;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.section-subtitle {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 0.75rem;
}

.section-desc {
    font-size: 0.825rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin-bottom: 2rem;
}

.gift-cards-container {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.gift-card {
    background: var(--card-bg);
    border: 1px solid rgba(6, 182, 212, 0.2);
    backdrop-filter: blur(8px);
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: border-color 0.3s ease;
}

.gift-card:hover {
    border-color: var(--accent-cyan);
}

.bank-badge {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--accent-cyan);
    letter-spacing: 1px;
    margin-bottom: 0.75rem;
}

.account-number {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text-main);
    letter-spacing: 1.5px;
    margin-bottom: 0.25rem;
}

.account-holder {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 1.25rem;
}

.btn-copy {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid var(--accent-cyan);
    color: var(--accent-cyan);
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.65rem 1rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.25s ease;
}

.btn-copy:hover {
    background: var(--accent-cyan);
    color: #ffffff;
}

.btn-copy svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
}

/* FLOATING MUSIC CONTROL */
.music-control-btn {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--card-bg);
    border: 1px solid var(--accent-cyan);
    color: var(--accent-cyan);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    z-index: 9999;
    transition: all 0.3s ease;
}

.music-control-btn:hover {
    transform: scale(1.1);
    background: var(--accent-cyan);
    color: #ffffff;
}

.music-control-btn svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
}

.music-control-btn.playing {
    animation: spin 4s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Toast Notification */
.toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: var(--accent-cyan);
    color: #ffffff;
    padding: 0.65rem 1.5rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(6, 182, 212, 0.4);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    pointer-events: none;
    z-index: 9999;
}

.toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}