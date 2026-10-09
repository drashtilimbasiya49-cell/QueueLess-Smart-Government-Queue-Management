/* QueueLess - Smart Government Office Application Logic */

class QueueLessApp {
  constructor() {
    this.state = {
      role: 'landing',
      lang: 'en',
      highContrast: false,
      largeText: false,
      
      // User Token State
      userToken: {
        id: 'A-104',
        service: 'Driving License Renewal',
        office: 'Regional Transport Office (RTO)',
        counterId: 3,
        counterName: 'Counter 03',
        peopleAhead: 7,
        estWaitMin: 24,
        status: 'in_queue', // 'in_queue', 'approaching', 'serving', 'completed'
        priority: 'normal',
        priorityLabel: 'Normal Queue',
        docsCompletePct: 75,
        date: 'Today',
        time: '10:45 AM'
      },
      
      servingToken: 'A-097',
      adminTimeFilter: 'today',
      
      // Hackathon Live Demo Simulator State
      demo: {
        active: false,
        speed: 1,
        timer: null,
        step: 0
      },
      
      // Counters Data
      counters: [
        { id: 1, name: 'Counter 01', dept: 'Driving License', officer: 'M. Patel', serving: 'A-101', next: 'A-102', status: 'active', totalServed: 54 },
        { id: 2, name: 'Counter 02', dept: 'Certificates', officer: 'K. Shah', serving: 'B-045', next: 'B-046', status: 'active', totalServed: 62 },
        { id: 3, name: 'Counter 03', dept: 'RTO & Aadhaar', officer: 'R. Sharma', serving: 'A-097', next: 'A-098', status: 'active', totalServed: 48 },
        { id: 4, name: 'Counter 04', dept: 'Municipal Tax', officer: 'S. Verma', serving: 'C-012', next: 'C-013', status: 'active', totalServed: 39 },
        { id: 5, name: 'Counter 05', dept: 'Senior & Express', officer: 'A. Joshi', serving: 'S-008', next: 'S-009', status: 'active', totalServed: 45 }
      ],

      // Document checklist state
      documents: [
        { id: 'doc-aadhaar', name: 'Aadhaar Card / Govt Photo ID', desc: 'Valid government identity proof', checked: true, required: true },
        { id: 'doc-address', name: 'Address Proof (Utility Bill / Rent Agreement)', desc: 'Issued within the last 6 months', checked: true, required: true },
        { id: 'doc-photo', name: 'Passport Size Photograph', desc: 'White background JPG photo', checked: true, required: true },
        { id: 'doc-form', name: 'Application Form-7', desc: 'Duly filled and signed copy', checked: false, required: true }
      ],
      
      // Notifications List
      notifications: [
        { id: 1, title: 'Token Generated', msg: 'Your digital token A-104 has been issued for Driving License Renewal.', time: '10:15 AM', type: 'info', read: false },
        { id: 2, title: 'Queue Update', msg: 'Token A-095 served. 9 citizens ahead of you.', time: '10:25 AM', type: 'info', read: false },
        { id: 3, title: 'AI Prediction Alert', msg: 'Current estimated wait time is 24 minutes.', time: '10:35 AM', type: 'warning', read: false }
      ],
      
      // Booking Wizard State
      wizardStep: 1,
      bookingData: {
        office: 'RTO',
        service: 'Driving License Renewal',
        date: 'Today',
        time: '10:45 AM',
        priority: 'normal'
      },

      // Dictionary translations
      i18n: {
        en: {
          tagline: "Government Services, Without the Queue.",
          navHome: "Home",
          navCitizen: "Citizen Portal",
          navStaff: "Staff Counter",
          navAdmin: "Admin Analytics",
          heroTitle: "Skip the Queue. Get Government Services Smarter.",
          heroSubtitle: "Book your service online, verify your documents with AI assistance, track your live queue position from home, and visit the office only when your turn is near.",
          bookBtn: "Book a Service",
          trackBtn: "Track My Token",
          activeToken: "Active Token",
          peopleAhead: "People Ahead",
          estWait: "Estimated Wait",
          servingNow: "Currently Serving"
        },
        hi: {
          tagline: "सरकारी सेवाएं, बिना कतार के।",
          navHome: "होम",
          navCitizen: "नागरिक पोर्टल",
          navStaff: "कर्मचारी काउंटर",
          navAdmin: "एडमिन एनालिटिक्स",
          heroTitle: "कतार छोड़ें। सरकारी सेवाएं स्मार्ट तरीके से पाएं।",
          heroSubtitle: "ऑनलाइन सेवा बुक करें, लाइव टोकन ट्रैक करें और अपनी बारी आने पर ही कार्यालय जाएं।",
          bookBtn: "सेवा बुक करें",
          trackBtn: "टोकन ट्रैक करें",
          activeToken: "सक्रिय टोकन",
          peopleAhead: "आगे नागरिक",
          estWait: "अनुमानित समय",
          servingNow: "वर्तमान सेवा"
        },
        gu: {
          tagline: "સરકારી સેવાઓ, લાઇન વગર.",
          navHome: "હોમ",
          navCitizen: "નાગરિક પોર્ટલ",
          navStaff: "સ્ટાફ કાઉન્ટર",
          navAdmin: "એડમિન એનાલિટિક્સ",
          heroTitle: "લાઇન સ્કીપ કરો. સરકારી સેવાઓ સ્માર્ટ રીતે મેળવો.",
          heroSubtitle: "તમારી સેવા ઓનલાઇન બુક કરો, લાઇવ ક્યૂ ટ્રેક કરો અને તમારો વારો આવે ત્યારે જ મુલાકાત લો.",
          bookBtn: "સેવા બુક કરો",
          trackBtn: "ટોકન ટ્રેક કરો",
          activeToken: "એક્ટિવ ટોકન",
          peopleAhead: "આગળ નાગરિકો",
          estWait: "અંદાજિત સમય",
          servingNow: "હાલમાં સેવા"
        }
      }
    };

    this.init();
  }

  init() {
    this.loadFromLocalStorage();
    this.switchRole('landing');
    this.renderQueueTimeline();
    this.renderStaffCounters();
    this.renderStaffQueueTable();
    this.renderAdminCharts();
    this.renderNotifications();
    this.renderDocChecklist();
    this.updateUserTokenUI();
    this.applyTranslations();

    console.log("QueueLess App Initialized with Data Persistence.");
  }

  // LOCAL STORAGE PERSISTENCE
  saveToLocalStorage() {
    try {
      const dataToSave = {
        userToken: this.state.userToken,
        servingToken: this.state.servingToken,
        notifications: this.state.notifications,
        documents: this.state.documents,
        lang: this.state.lang,
        highContrast: this.state.highContrast,
        largeText: this.state.largeText
      };
      localStorage.setItem('queueless_state', JSON.stringify(dataToSave));
    } catch (e) {
      // LocalStorage fallback
    }
  }

  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('queueless_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userToken) this.state.userToken = parsed.userToken;
        if (parsed.servingToken) this.state.servingToken = parsed.servingToken;
        if (parsed.notifications) this.state.notifications = parsed.notifications;
        if (parsed.documents) this.state.documents = parsed.documents;
        if (parsed.lang) this.state.lang = parsed.lang;
        if (parsed.highContrast !== undefined) {
          this.state.highContrast = parsed.highContrast;
          document.body.classList.toggle('high-contrast', this.state.highContrast);
        }
        if (parsed.largeText !== undefined) {
          this.state.largeText = parsed.largeText;
          document.body.classList.toggle('large-text', this.state.largeText);
        }
        const langSel = document.getElementById('lang-selector');
        if (langSel) langSel.value = this.state.lang;
      }
    } catch (e) {
      // Ignore invalid cache
    }
  }

  // Audio Beeper using Web Audio API
  playChime(type = 'normal') {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'turn') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.6);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {}
  }

  // ROLE SWITCHER
  switchRole(role) {
    this.state.role = role;
    
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
    const target = document.getElementById(`view-${role}`);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.role-nav-btn, .mobile-nav-item').forEach(btn => {
      if (btn.getAttribute('data-role') === role) {
        btn.classList.add('bg-white', 'text-blue-700', 'shadow-sm', 'active');
        btn.classList.remove('text-slate-700');
      } else {
        btn.classList.remove('bg-white', 'text-blue-700', 'shadow-sm', 'active');
        btn.classList.add('text-slate-700');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.showToast(`Switched to ${role.toUpperCase()} mode`, 'info');
  }

  scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  toggleHighContrast() {
    this.state.highContrast = !this.state.highContrast;
    document.body.classList.toggle('high-contrast', this.state.highContrast);
    this.saveToLocalStorage();
    this.showToast(this.state.highContrast ? 'High Contrast Mode Enabled' : 'Normal Contrast Mode', 'info');
  }

  toggleLargeText() {
    this.state.largeText = !this.state.largeText;
    document.body.classList.toggle('large-text', this.state.largeText);
    this.saveToLocalStorage();
    this.showToast(this.state.largeText ? 'Large Text Mode Enabled' : 'Normal Text Size', 'info');
  }

  changeLanguage(lang) {
    this.state.lang = lang;
    this.saveToLocalStorage();
    this.applyTranslations();
    this.showToast(`Language set to ${lang === 'hi' ? 'हिंदी' : lang === 'gu' ? 'ગુજરાતી' : 'English'}`, 'info');
  }

  applyTranslations() {
    const t = this.state.i18n[this.state.lang] || this.state.i18n.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.innerText = t[key];
      }
    });
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-circle-info text-blue-600';
    if (type === 'success') icon = 'fa-circle-check text-emerald-600';
    if (type === 'warning') icon = 'fa-triangle-exclamation text-amber-500';
    if (type === 'danger') icon = 'fa-circle-xmark text-red-500';

    toast.innerHTML = `
      <i class="fa-solid ${icon} text-lg shrink-0 mt-0.5"></i>
      <div class="flex-grow">
        <span class="font-bold text-xs text-slate-900 block">${message}</span>
      </div>
      <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-600 font-bold text-sm ml-2">&times;</button>
    `;

    container.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 4000);
  }

  // =========================================================================
  // DEMO MODE & REAL-TIME QUEUE SIMULATION
  // =========================================================================

  startLiveDemo() {
    if (this.state.demo.active) {
      this.stopLiveDemo();
      return;
    }

    // Reset to exact Hackathon judge scenario
    this.state.userToken.peopleAhead = 7;
    this.state.userToken.estWaitMin = 24;
    this.state.userToken.status = 'in_queue';
    this.state.servingToken = 'A-097';
    this.updateUserTokenUI();
    this.renderQueueTimeline();

    this.state.demo.active = true;
    this.state.demo.step = 0;
    
    const btn = document.getElementById('btn-start-demo');
    if (btn) {
      btn.innerHTML = `<i class="fa-solid fa-pause"></i> PAUSE DEMO`;
      btn.classList.replace('bg-blue-600', 'bg-amber-600');
    }

    document.getElementById('demo-status-text').innerText = 'Simulating Queue Movement...';
    this.showToast('🚀 Hackathon Live Demo Started! Watch tokens move automatically.', 'success');

    this.switchRole('citizen');

    const runStep = () => {
      if (!this.state.demo.active) return;

      this.advanceQueueSim();

      if (this.state.userToken.peopleAhead === 0) {
        if (typeof confetti === 'function') {
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        }
        this.stopLiveDemo();
        document.getElementById('demo-status-text').innerText = 'Completed – NOW SERVING!';
      } else {
        const delay = 2500 / this.state.demo.speed;
        this.state.demo.timer = setTimeout(runStep, delay);
      }
    };

    const delay = 2000 / this.state.demo.speed;
    this.state.demo.timer = setTimeout(runStep, delay);
  }

  stopLiveDemo() {
    this.state.demo.active = false;
    if (this.state.demo.timer) clearTimeout(this.state.demo.timer);

    const btn = document.getElementById('btn-start-demo');
    if (btn) {
      btn.innerHTML = `<i class="fa-solid fa-play"></i> START HACKATHON DEMO`;
      btn.classList.replace('bg-amber-600', 'bg-blue-600');
    }
  }

  setDemoSpeed(speed) {
    this.state.demo.speed = speed;
    document.querySelectorAll('.demo-speed-btn').forEach(btn => {
      if (parseInt(btn.getAttribute('data-speed')) === speed) {
        btn.className = 'px-1.5 py-0.5 rounded text-[11px] font-bold demo-speed-btn bg-blue-600 text-white';
      } else {
        btn.className = 'px-1.5 py-0.5 rounded text-[11px] font-semibold demo-speed-btn text-slate-300 hover:text-white';
      }
    });
    this.showToast(`Simulation Speed: ${speed}x`, 'info');
  }

  advanceQueueSim() {
    if (this.state.userToken.peopleAhead > 0) {
      this.state.userToken.peopleAhead -= 1;
      this.state.userToken.estWaitMin = Math.max(0, Math.round(this.state.userToken.peopleAhead * 3.5));
      
      const currentNum = 104 - this.state.userToken.peopleAhead;
      this.state.servingToken = `A-0${currentNum < 100 ? '0' + currentNum : currentNum}`;
      
      const c3 = this.state.counters.find(c => c.id === 3);
      if (c3) {
        c3.serving = this.state.servingToken;
        c3.totalServed += 1;
      }

      this.playChime(this.state.userToken.peopleAhead <= 3 ? 'turn' : 'normal');

      if (this.state.userToken.peopleAhead === 3) {
        this.state.userToken.status = 'approaching';
        this.addNotification('⚡ Your turn is approaching!', 'Only 3 citizens ahead. Please start moving towards Counter 03.', 'warning');
      } else if (this.state.userToken.peopleAhead === 0) {
        this.state.userToken.status = 'serving';
        this.addNotification('🔔 NOW SERVING!', 'Your turn has arrived! Please proceed to Counter 03 immediately.', 'success');
      } else {
        this.addNotification('Queue Movement', `Token ${this.state.servingToken} served. ${this.state.userToken.peopleAhead} people ahead.`, 'info');
      }

      this.saveToLocalStorage();
      this.updateUserTokenUI();
      this.renderQueueTimeline();
      this.renderStaffCounters();
      this.renderStaffQueueTable();
    } else {
      this.showToast('Token A-104 is already being served at Counter 03!', 'success');
    }
  }

  resetDemoData() {
    this.stopLiveDemo();
    this.state.userToken.peopleAhead = 7;
    this.state.userToken.estWaitMin = 24;
    this.state.userToken.status = 'in_queue';
    this.state.servingToken = 'A-097';
    
    document.getElementById('demo-status-text').innerText = 'Ready';
    this.saveToLocalStorage();
    this.updateUserTokenUI();
    this.renderQueueTimeline();
    this.renderStaffCounters();
    this.renderStaffQueueTable();
    this.showToast('Demo data reset to default (7 people ahead).', 'info');
  }

  // UPDATE USER TOKEN UI ACROSS APP
  updateUserTokenUI() {
    const t = this.state.userToken;

    // Hero mockup updates
    const heroToken = document.getElementById('hero-user-token-id');
    const heroService = document.getElementById('hero-user-service-name');
    const heroCounter = document.getElementById('hero-user-counter-name');
    const heroAhead = document.getElementById('hero-people-ahead');
    const heroWait = document.getElementById('hero-est-wait');
    const heroServing = document.getElementById('hero-serving-token');
    const heroLabel = document.getElementById('hero-user-label');
    const heroProgress = document.getElementById('hero-progress-bar');

    if (heroToken) heroToken.innerText = t.id;
    if (heroService) heroService.innerText = t.service;
    if (heroCounter) heroCounter.innerText = t.counterName;
    if (heroAhead) heroAhead.innerText = t.peopleAhead;
    if (heroWait) heroWait.innerText = `${t.estWaitMin} min`;
    if (heroServing) heroServing.innerText = this.state.servingToken;
    if (heroLabel) heroLabel.innerText = `${t.id} (You)`;
    if (heroProgress) {
      const pct = Math.round(((12 - t.peopleAhead) / 12) * 100);
      heroProgress.style.width = `${pct}%`;
    }

    // Citizen Dashboard Updates
    const cToken = document.getElementById('citizen-token-id');
    const cService = document.getElementById('citizen-service-name');
    const cOffice = document.getElementById('citizen-office-name');
    const cServing = document.getElementById('live-serving-token');
    const cAhead = document.getElementById('live-people-ahead');
    const cWait = document.getElementById('live-est-wait');
    const cBadge = document.getElementById('active-token-status-badge');
    const cPct = document.getElementById('queue-completion-pct');

    if (cToken) cToken.innerText = t.id;
    if (cService) cService.innerText = t.service;
    if (cOffice) cOffice.innerText = `${t.office} • ${t.counterName}`;
    if (cServing) cServing.innerText = this.state.servingToken;
    if (cAhead) cAhead.innerText = t.peopleAhead;
    if (cWait) cWait.innerText = `${t.estWaitMin} min`;

    // Appointments summary widget updates
    const apptDate = document.getElementById('appointment-date-display');
    const apptCounter = document.getElementById('appointment-counter-display');
    const apptService = document.getElementById('appointment-service-display');
    const apptOffice = document.getElementById('appointment-office-display');

    if (apptDate) apptDate.innerText = `${t.date}, ${t.time}`;
    if (apptCounter) apptCounter.innerText = t.counterName;
    if (apptService) apptService.innerText = t.service;
    if (apptOffice) apptOffice.innerHTML = `<i class="fa-solid fa-location-dot text-blue-600"></i> ${t.office}`;

    // AI Prediction widget updates
    const aiEstWait = document.getElementById('ai-est-wait-display');
    if (aiEstWait) aiEstWait.innerText = `${t.estWaitMin} Minutes`;

    const compPct = Math.min(100, Math.round(((12 - t.peopleAhead) / 12) * 100));
    if (cPct) cPct.innerText = `${compPct}% Complete`;

    // Telemetry footer labels
    const telCounter = document.getElementById('telemetry-counter');
    const telPriority = document.getElementById('telemetry-priority');
    if (telCounter) telCounter.innerText = t.counterName;
    if (telPriority) telPriority.innerText = t.priorityLabel;

    // Alert Callout Banner
    const alertTitle = document.getElementById('alert-title');
    const alertDesc = document.getElementById('alert-desc');
    const alertBox = document.getElementById('citizen-turn-alert');

    if (alertTitle && alertDesc && alertBox) {
      if (t.peopleAhead === 0) {
        alertTitle.innerText = `🔔 NOW SERVING – PROCEED TO ${t.counterName.toUpperCase()}`;
        alertDesc.innerText = `Please present your documents at ${t.counterName} immediately.`;
        alertBox.className = "p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500 flex items-start gap-3 animate-pulse";
        if (cBadge) {
          cBadge.innerText = "NOW SERVING";
          cBadge.className = "px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-extrabold uppercase";
        }
      } else if (t.peopleAhead <= 3) {
        alertTitle.innerText = "⚡ YOUR TURN IS APPROACHING!";
        alertDesc.innerText = `Only ${t.peopleAhead} citizens ahead. Please head towards ${t.counterName} inside the building.`;
        alertBox.className = "p-4 rounded-xl bg-amber-50 border-2 border-amber-500 flex items-start gap-3";
        if (cBadge) {
          cBadge.innerText = "APPROACHING";
          cBadge.className = "px-3 py-1 bg-amber-500 text-amber-950 rounded-full text-xs font-extrabold uppercase";
        }
      } else {
        alertTitle.innerText = "Your turn is approaching";
        alertDesc.innerText = `${t.peopleAhead} citizens are ahead of you. Estimated wait time is approx ${t.estWaitMin} minutes.`;
        alertBox.className = "p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3";
        if (cBadge) {
          cBadge.innerText = "IN QUEUE";
          cBadge.className = "px-3 py-1 bg-amber-400 text-amber-950 rounded-full text-xs font-extrabold uppercase";
        }
      }
    }
  }

  // RENDER DYNAMIC QUEUE TIMELINE NODES
  renderQueueTimeline() {
    const container = document.getElementById('queue-timeline-container');
    if (!container) return;

    const userTokenId = this.state.userToken.id;
    const tokens = ['A-097', 'A-098', 'A-099', 'A-100', 'A-101', 'A-102', 'A-103', userTokenId];
    const currentNum = parseInt(this.state.servingToken.replace('A-', ''));
    
    let html = `
      <div class="queue-timeline-line"></div>
      <div id="queue-timeline-progress" class="queue-timeline-progress" style="width: ${Math.round(((12 - this.state.userToken.peopleAhead) / 12) * 100)}%;"></div>
    `;

    tokens.forEach(tok => {
      const tokNum = parseInt(tok.replace('A-', ''));
      let statusClass = '';
      let label = tok;

      if (tok === userTokenId) {
        statusClass = 'user';
        label = `${userTokenId} (YOU)`;
      } else if (tokNum < currentNum) {
        statusClass = 'completed';
      } else if (tokNum === currentNum) {
        statusClass = 'active';
      }

      html += `
        <div class="queue-node ${statusClass}">
          <div class="queue-node-circle">
            ${tokNum < currentNum ? '<i class="fa-solid fa-check"></i>' : tok.substring(2)}
          </div>
          <span class="queue-node-label">${label}</span>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // RENDER STAFF COUNTER CARDS
  renderStaffCounters() {
    const container = document.getElementById('staff-counters-grid');
    if (!container) return;

    let html = '';
    this.state.counters.forEach(c => {
      const isUserCounter = (c.id === 3);

      html += `
        <div class="p-6 bg-white rounded-2xl border ${isUserCounter ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20' : 'border-slate-200'} shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase">${c.dept}</span>
              <h3 class="font-extrabold text-slate-900 text-base">${c.name}</h3>
            </div>
            <span class="px-2.5 py-1 ${c.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'} font-bold text-[10px] rounded-full uppercase">
              ${c.status === 'active' ? '● Active' : 'Offline'}
            </span>
          </div>

          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
            <div>
              <span class="text-[11px] text-slate-500 block uppercase font-bold">Currently Serving</span>
              <span class="text-2xl font-extrabold text-blue-700">${c.serving}</span>
            </div>
            <div class="text-right">
              <span class="text-[11px] text-slate-500 block uppercase font-bold">Next Token</span>
              <span class="text-base font-bold text-slate-700">${c.next}</span>
            </div>
          </div>

          <div class="space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <button onclick="app.callNextStaffToken(${c.id})" class="btn-primary py-2 text-xs w-full">
                <i class="fa-solid fa-bullhorn"></i> Call Next
              </button>
              <button onclick="app.completeStaffService(${c.id})" class="btn-secondary py-2 text-xs w-full bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100">
                <i class="fa-solid fa-check"></i> Complete
              </button>
            </div>

            <div class="grid grid-cols-2 gap-2 text-[11px]">
              <button onclick="app.showToast('Token skipped', 'warning')" class="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-center">
                <i class="fa-solid fa-forward mr-1"></i> Skip
              </button>
              <button onclick="app.showToast('Token reassigned to Counter 05', 'info')" class="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-center">
                <i class="fa-solid fa-right-left mr-1"></i> Transfer
              </button>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
            <span>Officer: <strong>${c.officer}</strong></span>
            <span>Served Today: <strong>${c.totalServed}</strong></span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // RENDER STAFF QUEUE MANAGEMENT TABLE
  renderStaffQueueTable() {
    const body = document.getElementById('staff-queue-table-body');
    if (!body) return;

    const queueData = [
      { token: 'A-097', service: 'DL Renewal', counter: 'Counter 03', priority: 'Normal', status: 'Serving' },
      { token: 'A-098', service: 'DL Renewal', counter: 'Counter 03', priority: 'Normal', status: 'Next' },
      { token: 'A-099', service: 'DL Renewal', counter: 'Counter 03', priority: 'Senior Citizen', status: 'Waiting' },
      { token: 'A-100', service: 'DL Renewal', counter: 'Counter 03', priority: 'Normal', status: 'Waiting' },
      { token: this.state.userToken.id, service: this.state.userToken.service, counter: this.state.userToken.counterName, priority: this.state.userToken.priorityLabel, status: this.state.userToken.status === 'serving' ? 'Serving' : 'Waiting' }
    ];

    let html = '';
    queueData.forEach(item => {
      let statusBadge = '<span class="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded text-[10px]">Waiting</span>';
      if (item.status === 'Serving') statusBadge = '<span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">● Serving</span>';
      if (item.status === 'Next') statusBadge = '<span class="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">Next</span>';

      html += `
        <tr class="hover:bg-slate-50 transition">
          <td class="p-3 font-extrabold text-blue-700">${item.token}</td>
          <td class="p-3 font-medium text-slate-800">${item.service}</td>
          <td class="p-3 text-slate-600">${item.counter}</td>
          <td class="p-3"><span class="px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 font-semibold rounded text-[10px]">${item.priority}</span></td>
          <td class="p-3">${statusBadge}</td>
          <td class="p-3 text-right">
            <button onclick="app.callNextStaffToken(3)" class="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded transition">
              Call
            </button>
            <button onclick="app.completeStaffService(3)" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded transition ml-1">
              Done
            </button>
          </td>
        </tr>
      `;
    });
    body.innerHTML = html;
  }

  callNextStaffToken(counterId) {
    const c = this.state.counters.find(ctr => ctr.id === counterId);
    if (!c) return;

    if (counterId === 3) {
      this.advanceQueueSim();
    } else {
      const num = parseInt(c.serving.substring(2)) + 1;
      const prefix = c.serving.substring(0, 2);
      c.serving = `${prefix}${num < 100 ? '0' + num : num}`;
      c.totalServed += 1;
      this.renderStaffCounters();
      this.showToast(`${c.name} called next citizen: ${c.serving}`, 'info');
    }
  }

  completeStaffService(counterId) {
    const c = this.state.counters.find(ctr => ctr.id === counterId);
    if (c) {
      c.totalServed += 1;
      this.showToast(`Service completed at ${c.name} for ${c.serving}!`, 'success');
      this.callNextStaffToken(counterId);
    }
  }

  openExtraCounter() {
    this.showToast('⚡ Counter 05 activated & Certificate Services queue re-allocated!', 'success');
    const c5 = this.state.counters.find(c => c.id === 5);
    if (c5) {
      c5.dept = 'Certificates (Overflow)';
      c5.status = 'active';
    }
    const activeCount = document.getElementById('staff-metric-counters');
    if (activeCount) activeCount.innerText = '5 / 5';

    this.renderStaffCounters();
  }

  // RENDER ADMIN ANALYTICS CHARTS (SVG BASED DYNAMIC RENDERER)
  changeAdminTimeFilter(val) {
    this.state.adminTimeFilter = val;
    this.renderAdminCharts();
    this.showToast(`Analytics filtered for: ${val.toUpperCase()}`, 'info');
  }

  renderAdminCharts() {
    const totalServedEl = document.getElementById('admin-total-served');
    const avgWaitEl = document.getElementById('admin-avg-wait');

    if (this.state.adminTimeFilter === '7days') {
      if (totalServedEl) totalServedEl.innerText = '9,840';
      if (avgWaitEl) avgWaitEl.innerText = '15.1 min';
    } else if (this.state.adminTimeFilter === '30days') {
      if (totalServedEl) totalServedEl.innerText = '42,150';
      if (avgWaitEl) avgWaitEl.innerText = '16.4 min';
    } else {
      if (totalServedEl) totalServedEl.innerText = '1,420';
      if (avgWaitEl) avgWaitEl.innerText = '14.2 min';
    }

    // 1. Hourly Footfall SVG Chart
    const hourlyContainer = document.getElementById('chart-hourly-container');
    if (hourlyContainer) {
      const hours = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'];
      let footfall = [45, 110, 185, 210, 160, 95, 130, 90, 40];
      let waitTimes = [8, 14, 28, 32, 22, 12, 18, 10, 5];

      if (this.state.adminTimeFilter === '7days') {
        footfall = [310, 780, 1420, 1650, 1200, 720, 940, 680, 310];
      }

      let svg = `
        <svg viewBox="0 0 700 200" class="w-full h-full overflow-visible">
          <line x1="40" y1="30" x2="680" y2="30" stroke="#e2e8f0" stroke-dasharray="4" />
          <line x1="40" y1="80" x2="680" y2="80" stroke="#e2e8f0" stroke-dasharray="4" />
          <line x1="40" y1="130" x2="680" y2="130" stroke="#e2e8f0" stroke-dasharray="4" />
          <line x1="40" y1="170" x2="680" y2="170" stroke="#cbd5e1" stroke-width="2" />
      `;

      const maxVal = Math.max(...footfall);
      hours.forEach((h, idx) => {
        const x = 70 + idx * 72;
        const val = footfall[idx];
        const barH = (val / maxVal) * 130;
        const y = 170 - barH;

        svg += `
          <rect x="${x - 18}" y="${y}" width="36" height="${barH}" rx="6" fill="#3b82f6" opacity="0.85" />
          <text x="${x}" y="190" text-anchor="middle" font-size="11" font-weight="600" fill="#64748b">${h}</text>
          <text x="${x}" y="${y - 6}" text-anchor="middle" font-size="10" font-weight="700" fill="#1e40af">${val}</text>
        `;
      });

      let pathD = '';
      hours.forEach((h, idx) => {
        const x = 70 + idx * 72;
        const wY = 170 - (waitTimes[idx] / 35) * 130;
        pathD += (idx === 0 ? `M ${x} ${wY}` : ` L ${x} ${wY}`);
      });

      svg += `<path d="${pathD}" fill="none" stroke="#f59e0b" stroke-width="3.5" />`;
      hours.forEach((h, idx) => {
        const x = 70 + idx * 72;
        const wY = 170 - (waitTimes[idx] / 35) * 130;
        svg += `<circle cx="${x}" cy="${wY}" r="4.5" fill="#d97706" stroke="#ffffff" stroke-width="2" />`;
      });

      svg += `</svg>`;
      hourlyContainer.innerHTML = svg;
    }

    // 2. Services Breakdown Container
    const servicesContainer = document.getElementById('chart-services-container');
    if (servicesContainer) {
      const services = [
        { name: 'Driving License Services', pct: 35, count: '497 tokens', color: 'bg-blue-600' },
        { name: 'Income & Caste Certificates', pct: 28, count: '398 tokens', color: 'bg-emerald-500' },
        { name: 'Aadhaar Biometric Updates', pct: 20, count: '284 tokens', color: 'bg-indigo-600' },
        { name: 'Property Tax & Registration', pct: 17, count: '241 tokens', color: 'bg-amber-500' }
      ];

      let html = '';
      services.forEach(s => {
        html += `
          <div class="space-y-1 text-xs">
            <div class="flex justify-between font-bold text-slate-800">
              <span>${s.name}</span>
              <span class="text-slate-500">${s.pct}% (${s.count})</span>
            </div>
            <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div class="${s.color} h-full rounded-full" style="width: ${s.pct}%;"></div>
            </div>
          </div>
        `;
      });

      servicesContainer.innerHTML = html;
    }

    // 3. Admin Counter Performance Table
    const tableBody = document.getElementById('admin-counter-table-body');
    if (tableBody) {
      let html = '';
      this.state.counters.forEach(c => {
        html += `
          <tr class="hover:bg-slate-50 transition">
            <td class="p-3 font-bold text-slate-900">${c.name}</td>
            <td class="p-3 text-slate-600">${c.dept}</td>
            <td class="p-3 font-bold text-blue-700">${c.totalServed} Citizens</td>
            <td class="p-3 text-slate-700">3.4 min</td>
            <td class="p-3"><span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">Optimal</span></td>
            <td class="p-3 font-bold text-emerald-600">98% Efficient</td>
          </tr>
        `;
      });
      tableBody.innerHTML = html;
    }
  }

  triggerSmartLoadBalance() {
    this.showToast('✨ AI Load Balancer Executed: Counter queues re-allocated automatically.', 'success');
  }

  exportAnalyticsReport() {
    this.showToast('📄 PDF Analytics Report generated and downloaded.', 'success');
  }

  // =========================================================================
  // NOTIFICATIONS ENGINE
  // =========================================================================
  addNotification(title, msg, type = 'info') {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.state.notifications.unshift({
      id: Date.now(),
      title,
      msg,
      time,
      type,
      read: false
    });
    this.renderNotifications();
  }

  renderNotifications() {
    const badge = document.getElementById('notif-badge');
    const container = document.getElementById('notifications-list-container');

    const unreadCount = this.state.notifications.filter(n => !n.read).length;
    if (badge) {
      badge.innerText = unreadCount;
      badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }

    if (container) {
      if (this.state.notifications.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">No notifications yet.</p>`;
        return;
      }

      let html = '';
      this.state.notifications.forEach(n => {
        let borderClass = 'border-blue-500';
        if (n.type === 'success') borderClass = 'border-emerald-500';
        if (n.type === 'warning') borderClass = 'border-amber-500';

        html += `
          <div class="p-3 bg-slate-50 border-l-4 ${borderClass} border border-slate-200 rounded-lg text-xs space-y-1">
            <div class="flex justify-between items-center font-bold text-slate-900">
              <span>${n.title}</span>
              <span class="text-[10px] text-slate-400 font-normal">${n.time}</span>
            </div>
            <p class="text-slate-600">${n.msg}</p>
          </div>
        `;
      });
      container.innerHTML = html;
    }
  }

  openNotificationsModal() {
    this.state.notifications.forEach(n => n.read = true);
    this.renderNotifications();
    this.openModal('modal-notifications');
  }

  // =========================================================================
  // DOCUMENT PRE-CHECK COMPLETENESS CALCULATOR
  // =========================================================================
  renderDocChecklist() {
    const container = document.getElementById('doccheck-interactive-list');
    if (!container) return;

    let total = this.state.documents.length;
    let checkedCount = this.state.documents.filter(d => d.checked).length;
    let pct = Math.round((checkedCount / total) * 100);

    const textEl = document.getElementById('modal-readiness-text');
    const subEl = document.getElementById('modal-readiness-sub');
    const circleEl = document.getElementById('modal-readiness-circle');

    if (textEl) textEl.innerText = `${pct}% ${pct === 100 ? 'Ready for Appointment ✓' : 'Complete'}`;
    if (subEl) subEl.innerText = pct === 100 ? 'All required documents pre-checked.' : `${total - checkedCount} document pending upload`;
    if (circleEl) {
      circleEl.innerText = `${pct}%`;
      if (pct === 100) {
        circleEl.className = "w-16 h-16 rounded-full border-4 border-emerald-400 text-emerald-400 flex items-center justify-center font-extrabold text-lg";
      } else {
        circleEl.className = "w-16 h-16 rounded-full border-4 border-amber-400 text-amber-400 flex items-center justify-center font-extrabold text-lg";
      }
    }

    let html = '';
    this.state.documents.forEach(d => {
      html += `
        <div class="p-4 ${d.checked ? 'bg-slate-50 border-slate-200' : 'bg-amber-50 border-amber-200'} rounded-xl border flex items-center justify-between">
          <div class="flex items-center gap-3">
            <input type="checkbox" ${d.checked ? 'checked' : ''} onchange="app.toggleDocCheck('${d.id}')" class="w-4 h-4 text-blue-600 rounded cursor-pointer">
            <div>
              <span class="font-bold text-slate-900 text-xs block">${d.name}</span>
              <span class="text-[10px] text-slate-500">${d.desc}</span>
            </div>
          </div>
          <span class="px-2.5 py-1 ${d.checked ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'} font-bold text-[10px] rounded-full">
            ${d.checked ? '✓ Pre-Verified' : '⚠ Action Required'}
          </span>
        </div>
      `;
    });

    container.innerHTML = html;

    // Update AI widget doc score
    const aiDocScore = document.getElementById('ai-doc-score-display');
    if (aiDocScore) {
      aiDocScore.innerHTML = pct === 100 ? `<i class="fa-solid fa-check-circle mr-1"></i> 100% Pre-Verified` : `<i class="fa-solid fa-triangle-exclamation mr-1"></i> ${pct}% Pre-Checked`;
    }
  }

  toggleDocCheck(id) {
    const doc = this.state.documents.find(d => d.id === id);
    if (doc) {
      doc.checked = !doc.checked;
      this.saveToLocalStorage();
      this.renderDocChecklist();
      this.showToast(`${doc.name} status updated`, 'info');
    }
  }

  // =========================================================================
  // MULTI-STEP BOOKING WIZARD HANDLER
  // =========================================================================

  openBookingModal() {
    this.state.wizardStep = 1;
    this.updateWizardUI();
    this.openModal('modal-booking');
  }

  nextWizardStep() {
    if (this.state.wizardStep < 5) {
      this.state.wizardStep += 1;
      
      // If entering Step 5, generate the token immediately so Step 5 displays the real generated token!
      if (this.state.wizardStep === 5) {
        const selOffice = document.querySelector('input[name="booking-office"]:checked')?.value || 'RTO';
        const selService = document.querySelector('input[name="booking-service"]:checked')?.value || 'Driving License Renewal';
        const selDate = document.getElementById('booking-date')?.value || 'Today';
        const selTime = document.getElementById('booking-time')?.value || '10:45 AM';
        const selPriorityKey = document.getElementById('booking-priority')?.value || 'normal';

        let priorityText = 'Normal Queue';
        if (selPriorityKey === 'senior') priorityText = 'Senior Citizen (60+)';
        if (selPriorityKey === 'pwd') priorityText = 'Specially Abled (PwD)';
        if (selPriorityKey === 'pregnant') priorityText = 'Pregnant Woman Priority';
        if (selPriorityKey === 'emergency') priorityText = 'Emergency Express';

        const randomNum = Math.floor(Math.random() * 80) + 110;
        this.state.userToken = {
          id: `A-${randomNum}`,
          service: selService,
          office: selOffice === 'RTO' ? 'Regional Transport Office (RTO)' : selOffice === 'Revenue Office' ? 'Revenue Office' : selOffice === 'Municipal Corporation' ? 'Municipal Corporation' : 'Citizen Service Center',
          counterId: 3,
          counterName: 'Counter 03',
          peopleAhead: 7,
          estWaitMin: 24,
          status: 'in_queue',
          priority: selPriorityKey,
          priorityLabel: priorityText,
          docsCompletePct: 100,
          date: selDate,
          time: selTime
        };

        this.saveToLocalStorage();
        this.updateUserTokenUI();
        this.renderQueueTimeline();
        this.renderStaffQueueTable();
      }

      this.updateWizardUI();
    } else {
      // Step 5 Finish Button -> Direct to Citizen Live Queue
      this.closeModal('modal-booking');
      this.switchRole('citizen');
      this.showToast(`🎉 Token ${this.state.userToken.id} issued for ${this.state.userToken.service}!`, 'success');
      
      if (typeof confetti === 'function') {
        confetti({ particleCount: 120, spread: 70 });
      }
    }
  }

  prevWizardStep() {
    if (this.state.wizardStep > 1) {
      this.state.wizardStep -= 1;
      this.updateWizardUI();
    }
  }

  updateWizardUI() {
    const step = this.state.wizardStep;

    document.querySelectorAll('.wizard-step').forEach(ws => {
      const wsStep = parseInt(ws.getAttribute('data-step'));
      ws.classList.remove('active', 'completed');
      if (wsStep === step) ws.classList.add('active');
      if (wsStep < step) ws.classList.add('completed');
    });

    document.querySelectorAll('.wizard-panel').forEach(p => p.classList.add('hidden'));
    const currentPanel = document.getElementById(`wizard-step-${step}`);
    if (currentPanel) currentPanel.classList.remove('hidden');

    if (step === 2) {
      const selectedOffice = document.querySelector('input[name="booking-office"]:checked')?.value || 'RTO';
      this.renderServiceOptions(selectedOffice);
    }

    if (step === 3) {
      this.renderWizardDocList();
    }

    if (step === 5) {
      const genToken = document.getElementById('generated-token-id');
      const genServ = document.getElementById('generated-service-name');
      if (genToken) genToken.innerText = this.state.userToken.id;
      if (genServ) genServ.innerText = this.state.userToken.service;
      
      if (typeof confetti === 'function') {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }

    const btnPrev = document.getElementById('btn-wizard-prev');
    const btnNext = document.getElementById('btn-wizard-next');

    if (btnPrev) btnPrev.disabled = (step === 1);
    if (btnNext) {
      if (step === 5) {
        btnNext.innerHTML = `Track Live Queue <i class="fa-solid fa-arrow-right"></i>`;
      } else {
        btnNext.innerHTML = `Next Step <i class="fa-solid fa-arrow-right"></i>`;
      }
    }
  }

  quickBookService(office, service) {
    this.state.bookingData.office = office;
    this.state.bookingData.service = service;
    this.openBookingModal();
  }

  renderServiceOptions(office) {
    const container = document.getElementById('booking-service-options');
    if (!container) return;

    let services = [];
    if (office === 'RTO') {
      services = ['Driving License Renewal', 'New Learner License', 'Vehicle RC Transfer', 'Fitness Certificate'];
    } else if (office === 'Revenue Office') {
      services = ['Income Certificate', 'Caste Certificate', 'Non-Creamy Layer Cert', 'Domicile Certificate'];
    } else if (office === 'Municipal Corporation') {
      services = ['Birth Certificate', 'Death Certificate', 'Trade License Renewal', 'Property Tax Payment'];
    } else {
      services = ['Aadhaar Services', 'PAN Card Application', 'Passport Token & Verification', 'Senior Citizen ID Card'];
    }

    let html = '';
    services.forEach((s, idx) => {
      html += `
        <label class="p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl cursor-pointer transition flex items-center gap-3">
          <input type="radio" name="booking-service" value="${s}" ${idx === 0 ? 'checked' : ''} class="text-blue-600">
          <span class="font-bold text-slate-900 text-xs">${s}</span>
        </label>
      `;
    });
    container.innerHTML = html;
  }

  renderWizardDocList() {
    const container = document.getElementById('wizard-doc-list');
    if (!container) return;

    let html = '';
    this.state.documents.forEach(d => {
      html += `
        <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
          <div class="flex items-center gap-2.5">
            <i class="fa-solid fa-circle-check text-emerald-600 text-base"></i>
            <div>
              <span class="font-bold text-slate-900 block">${d.name}</span>
              <span class="text-[10px] text-slate-500">${d.desc}</span>
            </div>
          </div>
          <span class="px-2 py-0.5 bg-emerald-200 text-emerald-900 font-bold text-[10px] rounded">Pre-Checked</span>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // MODAL CONTROLS
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('has-active-modal');
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      const anyActive = document.querySelector('.modal-overlay.active');
      if (!anyActive) {
        document.body.classList.remove('has-active-modal');
      }
    }
  }

  openDocCheckModal() {
    this.renderDocChecklist();
    this.openModal('modal-doccheck');
  }

  openFeedbackModal() {
    this.openModal('modal-feedback');
  }

  openHistoryModal() {
    this.openModal('modal-history');
  }

  setRating(stars) {
    document.querySelectorAll('.rating-star').forEach((star, idx) => {
      if (idx < stars) {
        star.classList.add('text-amber-400');
        star.classList.remove('text-slate-300');
      } else {
        star.classList.remove('text-amber-400');
        star.classList.add('text-slate-300');
      }
    });
    this.showToast(`Rated ${stars} Stars`, 'info');
  }

  submitFeedback() {
    this.closeModal('modal-feedback');
    this.showToast('Thank you! Your feedback has been submitted to the department head.', 'success');
    if (typeof confetti === 'function') {
      confetti({ particleCount: 60, spread: 50 });
    }
  }

  requestPriorityQueue() {
    this.showToast('Priority Queue request submitted according to government accessibility rules.', 'info');
  }

  downloadTokenPass() {
    this.showToast(`Digital Token Pass ${this.state.userToken.id} downloaded to device.`, 'success');
  }

  addToCalendar() {
    this.showToast('Appointment reminder added to system calendar.', 'success');
  }

  toggleStaffCounterStatus() {
    const btn = document.getElementById('btn-counter-toggle');
    const c3 = this.state.counters.find(c => c.id === 3);
    if (!c3) return;

    if (c3.status === 'active') {
      c3.status = 'offline';
      if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-power-off"></i> Counter Paused`;
        btn.className = 'btn-secondary text-xs bg-slate-700 text-white hover:bg-slate-600';
      }
      this.showToast('Counter 03 paused temporarily.', 'warning');
    } else {
      c3.status = 'active';
      if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-power-off"></i> Counter Active`;
        btn.className = 'btn-primary text-xs bg-emerald-600 hover:bg-emerald-500';
      }
      this.showToast('Counter 03 activated and serving live queue.', 'success');
    }
    this.renderStaffCounters();
  }
}

// Global App Instance
let app;
function initQueueLessApp() {
  if (!window.app) {
    app = new QueueLessApp();
    window.app = app;
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQueueLessApp);
} else {
  initQueueLessApp();
}
