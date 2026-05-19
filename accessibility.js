// ══════════════════════════════════
//  ACCESSIBILITY TOGGLE
//  Dodaj ovaj script na svaku stranicu
// ══════════════════════════════════

(function(){
  const KEY = 'vh_accessible';

  const CSS = `
    body.accessible {
      font-size: 20px !important;
      line-height: 1.8 !important;
      background: #ffffff !important;
      color: #000000 !important;
      font-family: Arial, Helvetica, sans-serif !important;
    }
    body.accessible * {
      font-family: Arial, Helvetica, sans-serif !important;
      letter-spacing: 0.02em !important;
    }
    /* Navigacija */
    body.accessible .topbar {
      background: #ffffff !important;
      border-bottom: 3px solid #000000 !important;
      padding: 1rem 2rem !important;
      box-shadow: none !important;
    }
    body.accessible .logo-text,
    body.accessible .logo-text em {
      color: #000000 !important;
      font-size: 1.4rem !important;
    }
    body.accessible .nav-links a {
      color: #000080 !important;
      font-size: 1rem !important;
      font-weight: bold !important;
      text-decoration: underline !important;
    }
    body.accessible .lang-btn {
      color: #000000 !important;
      border: 2px solid #000000 !important;
      font-size: 0.9rem !important;
      font-weight: bold !important;
      padding: 0.4rem 0.8rem !important;
    }
    body.accessible .lang-btn.active {
      background: #000000 !important;
      color: #ffffff !important;
    }
    /* Hero */
    body.accessible .hero {
      background: #f0f0f0 !important;
      min-height: auto !important;
      padding: 7rem 2rem 3rem !important;
      border-bottom: 3px solid #000 !important;
    }
    body.accessible .hero::before,
    body.accessible .hero::after { display: none !important; }
    body.accessible .hero-logo svg text,
    body.accessible .hero-logo svg { filter: grayscale(1) contrast(10) !important; }
    body.accessible .badge {
      background: #ffffff !important;
      border: 2px solid #000000 !important;
      color: #000000 !important;
      font-size: 1rem !important;
      font-weight: bold !important;
      padding: 0.6rem 1.2rem !important;
    }
    body.accessible .btn-primary {
      background: #000000 !important;
      color: #ffffff !important;
      font-size: 1.1rem !important;
      font-weight: bold !important;
      padding: 1.2rem 2.5rem !important;
      border-radius: 8px !important;
      border: 3px solid #000000 !important;
    }
    body.accessible .btn-outline {
      background: #ffffff !important;
      color: #000000 !important;
      font-size: 1.1rem !important;
      font-weight: bold !important;
      padding: 1.2rem 2.5rem !important;
      border-radius: 8px !important;
      border: 3px solid #000000 !important;
    }
    /* Sekcije */
    body.accessible section,
    body.accessible .amenities-bg,
    body.accessible .loc-bg,
    body.accessible .booking-bg,
    body.accessible .other-rooms-section,
    body.accessible .admin-section {
      background: #ffffff !important;
      border-top: 2px solid #cccccc !important;
    }
    body.accessible .sec-label {
      color: #000000 !important;
      font-size: 1rem !important;
      font-weight: bold !important;
      letter-spacing: 0.05em !important;
    }
    body.accessible .sec-title,
    body.accessible .sec-title em,
    body.accessible h1,h2,h3 {
      color: #000000 !important;
      font-size: 2rem !important;
      font-weight: bold !important;
    }
    body.accessible .sec-desc,
    body.accessible .room-desc-text {
      color: #111111 !important;
      font-size: 1.1rem !important;
      max-width: 100% !important;
    }
    /* Amenity kartice */
    body.accessible .amenity-card {
      background: #ffffff !important;
      border: 2px solid #000000 !important;
      border-radius: 8px !important;
    }
    body.accessible .amenity-name {
      color: #000000 !important;
      font-size: 1rem !important;
      font-weight: bold !important;
    }
    body.accessible .amenity-icon { font-size: 2rem !important; }
    /* Room kartice */
    body.accessible .room-info-card,
    body.accessible .other-card {
      border: 3px solid #000000 !important;
      border-radius: 8px !important;
      box-shadow: none !important;
    }
    body.accessible .ric-top,
    body.accessible .oc-top {
      background: #000000 !important;
      padding: 1.5rem !important;
    }
    body.accessible .ric-name,
    body.accessible .oc-name {
      font-size: 2rem !important;
      color: #ffffff !important;
      font-weight: bold !important;
    }
    body.accessible .ric-type,
    body.accessible .oc-type {
      color: #ffff00 !important;
      font-size: 0.9rem !important;
      font-weight: bold !important;
    }
    body.accessible .ric-badge,
    body.accessible .oc-cap {
      background: #ffffff !important;
      color: #000000 !important;
      font-weight: bold !important;
      font-size: 0.85rem !important;
    }
    body.accessible .ric-features li,
    body.accessible .room-features li {
      color: #000000 !important;
      font-size: 1rem !important;
    }
    body.accessible .ric-features li::before,
    body.accessible .room-features li::before { color: #000000 !important; }
    body.accessible .ric-price,
    body.accessible .oc-price,
    body.accessible .price-amount,
    body.accessible .price-big { color: #000000 !important; font-size: 2rem !important; }
    body.accessible .ric-unit,
    body.accessible .oc-unit,
    body.accessible .price-night,
    body.accessible .price-sm { color: #333333 !important; font-size: 0.9rem !important; }
    body.accessible .view-room-btn,
    body.accessible .book-now-btn,
    body.accessible .select-btn {
      background: #000000 !important;
      color: #ffffff !important;
      font-size: 1rem !important;
      font-weight: bold !important;
      padding: 0.7rem 1.4rem !important;
      border-radius: 6px !important;
    }
    /* Lokacija */
    body.accessible .loc-item {
      background: #ffffff !important;
      border: 2px solid #000000 !important;
    }
    body.accessible .loc-text,
    body.accessible .loc-text strong,
    body.accessible .loc-text span {
      color: #000000 !important;
      font-size: 1rem !important;
    }
    body.accessible .loc-text strong { font-weight: bold !important; }
    body.accessible .map-box {
      background: #f0f0f0 !important;
      border: 2px solid #000000 !important;
      color: #000000 !important;
    }
    /* Booking */
    body.accessible .booking-panel-wrap,
    body.accessible .booking-card {
      background: #ffffff !important;
      border: 2px solid #000000 !important;
      box-shadow: none !important;
    }
    body.accessible .room-tab {
      background: #ffffff !important;
      border: 2px solid #000000 !important;
      color: #000000 !important;
      font-size: 1rem !important;
      font-weight: bold !important;
      padding: 0.7rem 1.4rem !important;
    }
    body.accessible .room-tab.active {
      background: #000000 !important;
      color: #ffffff !important;
    }
    body.accessible .cal-month-lbl,
    body.accessible .cal-month-label { color: #000000 !important; font-size: 1.2rem !important; font-weight: bold !important; }
    body.accessible .cal-nav {
      background: #ffffff !important;
      border: 2px solid #000000 !important;
      color: #000000 !important;
      width: 36px !important; height: 36px !important;
      font-size: 1rem !important; font-weight: bold !important;
    }
    body.accessible .cal-dn { color: #000000 !important; font-size: 0.75rem !important; font-weight: bold !important; }
    body.accessible .cal-d { font-size: 0.9rem !important; }
    body.accessible .cal-d.sel-start,
    body.accessible .cal-d.sel-end { background: #000000 !important; color: #ffffff !important; }
    body.accessible .cal-d.booked { background: #dddddd !important; color: #666666 !important; }
    body.accessible .cal-d.in-range { background: #e0e0e0 !important; color: #000000 !important; }
    body.accessible .cal-d.today { color: #000080 !important; font-weight: bold !important; }
    body.accessible .leg-item span { color: #000000 !important; font-size: 0.85rem !important; }
    body.accessible .dot-s { background: #000000 !important; }
    body.accessible .dot-a { background: #dddddd !important; border: 1px solid #000 !important; }
    body.accessible .dot-b { background: #999999 !important; }
    /* Forma */
    body.accessible .fg label { color: #000000 !important; font-size: 0.9rem !important; font-weight: bold !important; letter-spacing: 0 !important; text-transform: none !important; }
    body.accessible .fg input,
    body.accessible .fg textarea,
    body.accessible .fg select,
    body.accessible .of-input,
    body.accessible .of-select {
      background: #ffffff !important;
      border: 2px solid #000000 !important;
      color: #000000 !important;
      font-size: 1rem !important;
      padding: 0.8rem 1rem !important;
      border-radius: 6px !important;
    }
    body.accessible .date-sum,
    body.accessible .date-sum.visible { background: #f0f0f0 !important; border: 2px solid #000 !important; }
    body.accessible .ds-row,
    body.accessible .ds-total { color: #000000 !important; font-size: 1rem !important; }
    body.accessible .submit-btn {
      background: #000000 !important;
      color: #ffffff !important;
      font-size: 1.1rem !important;
      font-weight: bold !important;
      padding: 1.1rem !important;
      border-radius: 8px !important;
      letter-spacing: 0 !important;
      text-transform: none !important;
    }
    body.accessible .notice.success { background: #e6ffe6 !important; border: 2px solid #006600 !important; color: #004400 !important; font-size: 1rem !important; }
    body.accessible .notice.error { background: #ffe6e6 !important; border: 2px solid #cc0000 !important; color: #880000 !important; font-size: 1rem !important; }
    body.accessible .notice.warning { background: #fff8e6 !important; border: 2px solid #996600 !important; color: #664400 !important; font-size: 1rem !important; }
    /* Kontakt */
    body.accessible .contact-card {
      background: #ffffff !important;
      border: 2px solid #000000 !important;
      box-shadow: none !important;
    }
    body.accessible .cc-icon { background: #000000 !important; }
    body.accessible .cc-info strong { color: #000000 !important; font-size: 1rem !important; }
    body.accessible .cc-info span { color: #333333 !important; font-size: 0.9rem !important; }
    /* Admin */
    body.accessible .admin-toggle {
      border: 2px solid #000000 !important;
      color: #000000 !important;
      font-size: 1rem !important;
      font-weight: bold !important;
      padding: 0.7rem 1.4rem !important;
    }
    body.accessible .export-btn {
      background: #000000 !important;
      color: #ffffff !important;
      font-size: 1rem !important;
      font-weight: bold !important;
    }
    body.accessible .res-table th { color: #000000 !important; font-size: 0.8rem !important; background: #f0f0f0 !important; }
    body.accessible .res-table td { color: #000000 !important; font-size: 0.9rem !important; }
    body.accessible .sbadge { font-size: 0.75rem !important; font-weight: bold !important; }
    body.accessible .sp { background: #fff3cc !important; color: #663300 !important; border: 1px solid #996600 !important; }
    body.accessible .sc { background: #e6ffe6 !important; color: #004400 !important; border: 1px solid #006600 !important; }
    body.accessible .sx { background: #ffe6e6 !important; color: #880000 !important; border: 1px solid #cc0000 !important; }
    /* Room hero (sobe) */
    body.accessible .room-hero { min-height: 40vh !important; }
    body.accessible .room-hero-name { font-size: 2.5rem !important; }
    body.accessible .room-hero-sub { font-size: 1.1rem !important; }
    body.accessible .room-price-tag { background: #000000 !important; font-size: 1rem !important; }
    body.accessible .feat-item {
      border: 2px solid #000000 !important;
      background: #ffffff !important;
    }
    body.accessible .feat-text { color: #000000 !important; font-size: 1rem !important; }
    body.accessible .feat-icon { font-size: 1.5rem !important; }
    /* Footer */
    body.accessible footer {
      background: #000000 !important;
      color: #ffffff !important;
      font-size: 1rem !important;
      border-top: 3px solid #000000 !important;
    }
    body.accessible footer strong { color: #ffffff !important; }
    /* Accessibility toggle button itself */
    #a11yBtn {
      position: fixed !important;
      bottom: 1.5rem !important;
      right: 1.5rem !important;
      z-index: 9999 !important;
      background: #1e3545 !important;
      color: #ffffff !important;
      border: none !important;
      border-radius: 50px !important;
      padding: 0.7rem 1.2rem !important;
      font-family: Arial, sans-serif !important;
      font-size: 0.85rem !important;
      font-weight: bold !important;
      cursor: pointer !important;
      box-shadow: 0 4px 16px rgba(0,0,0,0.25) !important;
      display: flex !important;
      align-items: center !important;
      gap: 0.5rem !important;
      transition: background 0.2s !important;
      white-space: nowrap !important;
    }
    #a11yBtn:hover { background: #2a6b7c !important; }
    body.accessible #a11yBtn {
      background: #000000 !important;
      color: #ffffff !important;
      border: 3px solid #000000 !important;
      font-size: 1rem !important;
    }
  `;

  function inject(){
    // Add CSS
    const style = document.createElement('style');
    style.id = 'a11y-style';
    style.textContent = CSS;
    document.head.appendChild(style);

    // Add toggle button
    const btn = document.createElement('button');
    btn.id = 'a11yBtn';
    btn.setAttribute('aria-label', 'Uključi/isključi način za slabovidne');
    btn.innerHTML = '👁 <span id="a11yBtnTxt">Za slabovidne</span>';
    document.body.appendChild(btn);

    // Apply saved preference
    const saved = localStorage.getItem(KEY);
    if(saved === '1'){
      document.body.classList.add('accessible');
      document.getElementById('a11yBtnTxt').textContent = 'Normalan prikaz';
    }

    // Toggle on click
    btn.addEventListener('click', function(){
      const isOn = document.body.classList.toggle('accessible');
      localStorage.setItem(KEY, isOn ? '1' : '0');
      document.getElementById('a11yBtnTxt').textContent = isOn ? 'Normalan prikaz' : 'Za slabovidne';
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
