// ═══════════════════════════════════
//  TRANSLATIONS
// ═══════════════════════════════════
const T = {
  hr:{
    nav_rooms:"Smještaji",nav_location:"Lokacija",nav_book:"Rezervacija",nav_contact:"Kontakt",
    back:"← Natrag",
    apt:"Apartman",room:"Soba",to:"do",persons:"osoba",night:"noć",
    select_dates:"Odaberite datume",
    leg_free:"Slobodno",leg_booked:"Rezervirano",leg_sel:"Odabrano",
    checkin:"Dolazak",checkout:"Odlazak",nights:"Noći",total:"Ukupno",
    first_name:"Ime",last_name:"Prezime",phone:"Telefon",
    guests:"Gosti",country:"Država",note:"Napomena",
    send_request:"Pošalji zahtjev za rezervaciju",
    cal_inst:"Kliknite datum dolaska, zatim datum odlaska.",
    pick_dates:"Odaberite datume dolaska i odlaska.",
    fill_all:"Ispunite sva obavezna polja (Ime, Prezime, Email, Telefon).",
    conflict:"Odabrani period nije dostupan. Odaberite druge datume.",
    success_msg:"✓ Zahtjev primljen! Kontaktirat ćemo vas u najkraćem roku.",
    other_rooms:"Ostali smještaji",
    photo_guide_title:"Kako dodati fotografije:",
    photo_guide_body:"Uploadajte slike na Avalon (cPanel → File Manager → slike/) i zamijenite putanje u kodu.",
    months:["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"],
    days:["Po","Ut","Sr","Če","Pe","Su","Ne"],
  },
  en:{
    nav_rooms:"Rooms",nav_location:"Location",nav_book:"Book",nav_contact:"Contact",
    back:"← Back",
    apt:"Apartment",room:"Room",to:"up to",persons:"persons",night:"night",
    select_dates:"Select dates",
    leg_free:"Available",leg_booked:"Booked",leg_sel:"Selected",
    checkin:"Check-in",checkout:"Check-out",nights:"Nights",total:"Total",
    first_name:"First name",last_name:"Last name",phone:"Phone",
    guests:"Guests",country:"Country",note:"Note",
    send_request:"Send reservation request",
    cal_inst:"Click check-in date, then check-out date.",
    pick_dates:"Please select check-in and check-out dates.",
    fill_all:"Please fill in all required fields (Name, Surname, Email, Phone).",
    conflict:"Selected period is not available. Please choose other dates.",
    success_msg:"✓ Request received! We will contact you to confirm.",
    other_rooms:"Other accommodations",
    photo_guide_title:"How to add photos:",
    photo_guide_body:"Upload images to Avalon (cPanel → File Manager → slike/) and replace the paths in the code.",
    months:["January","February","March","April","May","June","July","August","September","October","November","December"],
    days:["Mo","Tu","We","Th","Fr","Sa","Su"],
  },
  de:{
    nav_rooms:"Zimmer",nav_location:"Lage",nav_book:"Buchen",nav_contact:"Kontakt",
    back:"← Zurück",
    apt:"Apartment",room:"Zimmer",to:"bis zu",persons:"Personen",night:"Nacht",
    select_dates:"Datum auswählen",
    leg_free:"Verfügbar",leg_booked:"Gebucht",leg_sel:"Ausgewählt",
    checkin:"Anreise",checkout:"Abreise",nights:"Nächte",total:"Gesamt",
    first_name:"Vorname",last_name:"Nachname",phone:"Telefon",
    guests:"Gäste",country:"Land",note:"Anmerkung",
    send_request:"Buchungsanfrage senden",
    cal_inst:"Klicken Sie auf Anreisedatum, dann Abreisedatum.",
    pick_dates:"Bitte wählen Sie An- und Abreisedatum.",
    fill_all:"Bitte füllen Sie alle Pflichtfelder aus (Vor-, Nachname, E-Mail, Telefon).",
    conflict:"Der gewählte Zeitraum ist nicht verfügbar. Bitte andere Daten wählen.",
    success_msg:"✓ Anfrage erhalten! Wir melden uns zur Bestätigung.",
    other_rooms:"Weitere Unterkünfte",
    photo_guide_title:"So fügen Sie Fotos hinzu:",
    photo_guide_body:"Laden Sie Bilder auf Avalon hoch (cPanel → File Manager → slike/) und ersetzen Sie die Pfade im Code.",
    months:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    days:["Mo","Di","Mi","Do","Fr","Sa","So"],
  }
};

let lang = localStorage.getItem('vh_lang') || 'hr';

function t(k){ return T[lang][k] || k; }

function setLang(l){
  lang = l;
  localStorage.setItem('vh_lang', l);
  document.documentElement.lang = l;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.textContent === l.toUpperCase()));
  document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if(T[lang][k]) el.textContent = T[lang][k]; });
  renderCalendar();
  if(typeof renderContent === 'function') renderContent();
}

// ═══════════════════════════════════
//  STORAGE
// ═══════════════════════════════════
function getBookings(){ try{ return JSON.parse(localStorage.getItem('vh_bookings')||'[]'); } catch(e){ return []; } }
function saveBookings(b){ localStorage.setItem('vh_bookings', JSON.stringify(b)); }

// ═══════════════════════════════════
//  CALENDAR
// ═══════════════════════════════════
let calYear, calMonth, selStart = null, selEnd = null, pickEnd = false;

function initCal(){
  const n = new Date();
  calYear = n.getFullYear();
  calMonth = n.getMonth();
}
initCal();

function getBookedRanges(roomId){
  return getBookings()
    .filter(b => b.roomId === roomId && b.status !== 'cancelled')
    .map(b => ({ start: new Date(b.checkin), end: new Date(b.checkout) }));
}
function isDateBooked(date, ranges){ return ranges.some(r => date >= r.start && date < r.end); }
function isRangeBooked(s, e, rid){
  const r = getBookedRanges(rid); let d = new Date(s);
  while(d < e){ if(isDateBooked(d, r)) return true; d.setDate(d.getDate()+1); }
  return false;
}
function fmt(d){ return d.toLocaleDateString('hr-HR',{day:'2-digit',month:'2-digit',year:'numeric'}); }

function renderCalendar(){
  const lbl = document.getElementById('calMonthLbl');
  if(!lbl) return;
  lbl.textContent = `${t('months')[calMonth]} ${calYear}`;
  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';
  t('days').forEach(d => { const e = document.createElement('div'); e.className='cal-dn'; e.textContent=d; grid.appendChild(e); });
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const offset = (firstDay + 6) % 7;
  for(let i = 0; i < offset; i++){ const e = document.createElement('div'); e.className='cal-d empty'; grid.appendChild(e); }
  const dim = new Date(calYear, calMonth+1, 0).getDate();
  const today = new Date(); today.setHours(0,0,0,0);
  const ranges = getBookedRanges(ROOM_ID);
  for(let d = 1; d <= dim; d++){
    const date = new Date(calYear, calMonth, d);
    const el = document.createElement('div');
    el.textContent = d; el.className = 'cal-d';
    const isPast = date < today;
    const isBooked = isDateBooked(date, ranges);
    const isToday = date.getTime() === today.getTime();
    if(isToday) el.classList.add('today');
    if(isPast || isBooked){ el.classList.add('disabled'); if(isBooked) el.classList.add('booked'); }
    else {
      if(selStart && date.getTime() === selStart.getTime()) el.classList.add('sel-start');
      else if(selEnd && date.getTime() === selEnd.getTime()) el.classList.add('sel-end');
      else if(selStart && selEnd && date > selStart && date < selEnd) el.classList.add('in-range');
      el.onclick = () => onDay(date);
    }
    grid.appendChild(el);
  }
}

function onDay(date){
  document.getElementById('errorNotice').classList.remove('visible');
  if(!pickEnd || !selStart){ selStart = date; selEnd = null; pickEnd = true; }
  else {
    if(date <= selStart){ selStart = date; selEnd = null; }
    else {
      selEnd = date; pickEnd = false;
      if(isRangeBooked(selStart, selEnd, ROOM_ID)){
        document.getElementById('calNotice').textContent = t('conflict');
        document.getElementById('calNotice').className = 'notice error visible';
        selStart = null; selEnd = null;
      } else {
        document.getElementById('calNotice').className = 'notice warning visible';
        document.getElementById('calNotice').textContent = '';
        updateSummary();
      }
    }
  }
  renderCalendar();
}

function updateSummary(){
  if(!selStart || !selEnd) return;
  const nights = Math.round((selEnd - selStart) / 86400000);
  document.getElementById('sCheckin').textContent = fmt(selStart);
  document.getElementById('sCheckout').textContent = fmt(selEnd);
  document.getElementById('sNights').textContent = nights;
  document.getElementById('sTotal').textContent = `${nights * ROOM_PRICE} EUR`;
  document.getElementById('dateSummary').classList.add('visible');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('calPrev').onclick = () => { calMonth--; if(calMonth<0){calMonth=11;calYear--;} renderCalendar(); };
  document.getElementById('calNext').onclick = () => { calMonth++; if(calMonth>11){calMonth=0;calYear++;} renderCalendar(); };
});

// ═══════════════════════════════════
//  SUBMIT
// ═══════════════════════════════════
function submitBooking(){
  const fn = document.getElementById('fFN').value.trim();
  const ln = document.getElementById('fLN').value.trim();
  const em = document.getElementById('fEM').value.trim();
  const ph = document.getElementById('fPH').value.trim();
  const gu = document.getElementById('fGU').value;
  const co = document.getElementById('fCO').value.trim();
  const no = document.getElementById('fNO').value.trim();
  const err = document.getElementById('errorNotice');
  const suc = document.getElementById('successNotice');
  err.classList.remove('visible'); suc.classList.remove('visible');
  if(!selStart || !selEnd){ err.textContent = t('pick_dates'); err.classList.add('visible'); return; }
  if(!fn || !ln || !em || !ph){ err.textContent = t('fill_all'); err.classList.add('visible'); return; }
  if(isRangeBooked(selStart, selEnd, ROOM_ID)){ err.textContent = t('conflict'); err.classList.add('visible'); return; }
  const nights = Math.round((selEnd - selStart) / 86400000);
  const bk = {
    id: 'VH-' + Date.now(), roomId: ROOM_ID, roomName: ROOM_NAME,
    checkin: selStart.toISOString().split('T')[0],
    checkout: selEnd.toISOString().split('T')[0],
    nights, total: nights * ROOM_PRICE,
    firstName: fn, lastName: ln, email: em, phone: ph,
    guests: gu, country: co, note: no,
    status: 'pending', createdAt: new Date().toISOString()
  };
  const bks = getBookings(); bks.push(bk); saveBookings(bks);
  suc.textContent = t('success_msg'); suc.classList.add('visible');
  document.getElementById('submitBtn').disabled = true;
  setTimeout(() => {
    selStart = null; selEnd = null; pickEnd = false;
    document.getElementById('dateSummary').classList.remove('visible');
    renderCalendar();
    ['fFN','fLN','fEM','fPH','fCO','fNO'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('fGU').value = '2';
    document.getElementById('submitBtn').disabled = false;
    suc.classList.remove('visible');
  }, 4500);
}

// ═══════════════════════════════════
//  INIT (called after DOM ready)
// ═══════════════════════════════════
function initPage(){
  // Apply saved lang
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.textContent === lang.toUpperCase()));
  document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if(T[lang][k]) el.textContent = T[lang][k]; });
  renderCalendar();
  document.getElementById('calNotice').textContent = t('cal_inst');
  document.getElementById('calNotice').className = 'notice warning visible';
  if(typeof renderContent === 'function') renderContent();
}
