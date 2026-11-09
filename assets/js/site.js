/* Omar Alieh portfolio: scroll reveal, ledger preview, and a CV-backed Q&A.
   The Q&A is keyword matching over facts from Omar's CV and LinkedIn, not a live AI model.
   It says so in the interface. Without JavaScript the form falls back to a prefilled email. */
(function () {
  'use strict';

  var EMAIL = 'aliehomar9@hotmail.com';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- anchor smooth scroll (only on click, never globally) ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href') === '#') return;
    var t = document.getElementById(a.getAttribute('href').slice(1));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (history.pushState) history.pushState(null, '', a.getAttribute('href'));
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Ledger: side preview on hover / focus (desktop) ---------- */
  var ledger = document.getElementById('ledger');
  var preview = document.getElementById('preview');
  if (ledger && preview) {
    var rows = ledger.querySelectorAll('.row');
    var panels = [];
    rows.forEach(function (r) {
      var memo = r.parentNode.querySelector('.memo');
      var panel = document.createElement('div');
      panel.className = 'panel';
      panel.hidden = true;
      panel.innerHTML = memo.innerHTML;
      preview.appendChild(panel);
      panels.push(panel);
    });
    var current = -1;
    var show = function (i) {
      if (i === current) return;
      current = i;
      rows.forEach(function (r, k) { r.classList.toggle('on', k === i); });
      panels.forEach(function (p, k) {
        p.hidden = k !== i;
        if (k === i && !reduce) { p.classList.remove('in'); void p.offsetWidth; p.classList.add('in'); }
      });
    };
    rows.forEach(function (r, i) {
      r.addEventListener('mouseenter', function () { show(i); });
      r.addEventListener('focus', function () { show(i); });
    });
    show(0);
  }

  /* ---------- Dubai local time ---------- */
  var tEl = document.getElementById('dubai-time');
  if (tEl && window.Intl) {
    var tick = function () {
      var d = new Date();
      tEl.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Dubai' }).format(d) + ' GST';
      tEl.setAttribute('datetime', d.toISOString());
    };
    tick(); window.setInterval(tick, 30000);
  }

  /* ---------- Q&A ---------- */
  var form = document.getElementById('ask-form');
  var input = document.getElementById('ask-input');
  var dlg = document.getElementById('answer');
  var thread = document.getElementById('thread');
  var aForm = document.getElementById('a-form');
  var aInput = document.getElementById('a-input');
  var closeBtn = document.getElementById('answer-close');
  if (!form || !dlg || typeof dlg.showModal !== 'function') return;

  var KB = [
    { k: ['pwc', 'current', 'now', 'today', 'currently', 'present', 'job', 'role', 'senior associate', 'tax'],
      a: ['I am a Senior Associate at PwC Middle East in Dubai, working in tax technology since February 2026. I advise UAE businesses on eInvoicing compliance, turn regulatory requirements into implementation roadmaps, and use my ERP background to guide clients through the system changes involved.'] },
    { k: ['einvoicing', 'e-invoicing', 'invoice', 'invoicing', 'zatca', 'egypt', 'saudi', 'compliance', 'mandate', 'regulation', 'regulatory', 'fta'],
      a: ['eInvoicing is my specialism. At Odoo I led implementations under Saudi Arabia\'s ZATCA framework and Egypt\'s national mandate. At PwC I now advise UAE businesses on compliance, the processes needed to meet the mandates, and the operational impact on their systems.'] },
    { k: ['odoo', 'erp', 'implementation', 'implementations', 'implemented', 'go live', 'go-live', 'projects delivered', 'companies'],
      a: ['From 2021 to 2026 at Odoo Middle East I moved from functional consultant to project manager, presales solutions engineer and professional services team lead. I guided 50+ implementations for 40+ companies across food and beverage, retail, eCommerce, services and trading.'] },
    { k: ['ai', 'automation', 'tool', 'tools', 'built', 'build', 'streamlit', 'python', 'gen ai', 'genai', 'llm', 'automate'],
      a: ['I build the tools I wish existed. An AI appraisal report generator cut a six-hour reporting job to thirty minutes. A monthly team-analytics app produces performance insights with an action plan. An AI presales scope builder reduced scope creation time by 62% and estimation time by 47%.', 'They were internal Odoo tools, so I can walk you through them on a call rather than link to a demo.'] },
    { k: ['lead', 'leadership', 'team', 'teams', 'manage', 'management', 'mentor', 'mentoring', 'onboarding', 'people', 'manager'],
      a: ['As Professional Services Team Lead at Odoo I led 10 functional consultants. I built the onboarding programme, cut average delivery time by 30% with agile methods and held a 96% client satisfaction rate. I also turned one at-risk client relationship from 2/5 satisfaction to 5/5.'] },
    { k: ['presales', 'solutions engineer', 'solution', 'rfp', 'demo', 'demos', 'gap', 'sales', 'workshop', 'workshops', 'revenue'],
      a: ['As presales consultant I was the lead technical consultant on 30+ enterprise accounts: GAP analysis workshops, tailored demos and complex RFPs. That work enabled $250K+ in new sales. I also wrote the company\'s first industry white paper, on point of sale for food and beverage.'] },
    { k: ['education', 'degree', 'university', 'studied', 'study', 'school', 'master', 'masters', 'bachelor', 'ie ', 'aub', 'gpa', 'scholarship'],
      a: ['I hold an MSc in Computer Science and Business Technology from IE School of Human Sciences and Technology in Madrid (2019 to 2020, GPA 3.6/4.0, IE Foundation Scholarship), and a BA in Economics from the American University of Beirut (2016 to 2019).'] },
    { k: ['certification', 'certifications', 'certified', 'ccna', 'tableau', 'analytics', 'cisco', 'certificate'],
      a: ['Cisco CCNA (Enterprise Networking, Security and Automation), Fundamentals of Visualization with Tableau, the Advanced Google Analytics Qualification, and Cambridge English C1.'] },
    { k: ['language', 'languages', 'speak', 'arabic', 'english', 'french'],
      a: ['Arabic (native), English (full professional) and French (professional working).'] },
    { k: ['skill', 'skills', 'stack', 'tech', 'technology', 'expertise', 'strengths', 'good at'],
      a: ['ERP and eInvoicing delivery, solutions engineering, process design, API integration (REST, webhooks), SQL, Python and Streamlit, Tableau, and team leadership with agile delivery.'] },
    { k: ['industry', 'industries', 'sector', 'sectors', 'food', 'beverage', 'retail', 'ecommerce'],
      a: ['Food and beverage is my deepest sector, followed by retail, eCommerce, services and trading. I also authored the retail market-entry plan that raised project inflow by 35% in six months.'] },
    { k: ['kaktus', 'partnership', 'partnerships', 'market entry', 'mena', 'go-to-market'],
      a: ['In 2020 and 2021 I was Regional Partnerships Manager at Kaktus AI in London, building the MENA partner network and go-to-market plans that grew the regional customer base by 20%.'] },
    { k: ['project', 'projects', 'portfolio', 'startup', 'realista', 'iberia', 'deliveroo', 'chime'],
      a: ['At IE I built a full-stack web app for the Realista startup (capstone), an IT monitoring app for Iberia, took part in the Deliveroo sustainability challenge as a finalist, and worked on the Chime In startup, runner-up at IE Venture Labs.'] },
    { k: ['where', 'location', 'based', 'dubai', 'relocate', 'uae', 'city', 'country'],
      a: ['I am based in Dubai, UAE.'] },
    { k: ['contact', 'email', 'phone', 'call', 'reach', 'linkedin', 'hire', 'hiring', 'available', 'availability', 'opportunity', 'opportunities', 'recruit', 'interview', 'salary', 'compensation', 'notice', 'start date'],
      a: ['The quickest way is email: ' + EMAIL + ', or call +971 52 909 0442. I am glad to talk about roles in tech consulting, solutions engineering and digital transformation. Compensation and timing are best discussed directly.'], go: true },
    { k: ['who', 'about', 'background', 'summary', 'introduce', 'yourself', 'omar'],
      a: ['I am a tax technology consultant at PwC Middle East in Dubai with a background in ERP delivery, presales and team leadership at Odoo. I like problems where regulation, enterprise systems and AI meet, and I build tools to fix the ones others accept as normal.'] }
  ];
  var GREET = /^(hi|hello|hey|good (morning|afternoon|evening)|salam|marhaba)\b/i;
  var FALLBACK = ['I do not have a written answer for that, and I would rather not guess. The best route is to ask Omar directly.', 'You can also try: eInvoicing, AI tools, leadership, education, or certifications.'];

  function answerFor(q) {
    var text = ' ' + q.toLowerCase().replace(/[^a-z0-9\-\s]/g, ' ') + ' ';
    if (GREET.test(q.trim()) && q.trim().split(/\s+/).length <= 3) {
      return { a: ['Hello. I can answer questions about Omar\'s work at PwC and Odoo, eInvoicing, the AI tools he built, leadership, education and how to reach him. What would you like to know?'] };
    }
    var best = null, bestScore = 0;
    KB.forEach(function (item) {
      var score = 0;
      item.k.forEach(function (kw) {
        if (text.indexOf(' ' + kw.trim() + ' ') !== -1) score += kw.indexOf(' ') !== -1 ? 3 : 2;
        else if (kw.length > 4 && text.indexOf(kw.trim()) !== -1) score += 1;
      });
      if (score > bestScore) { bestScore = score; best = item; }
    });
    return best ? best : { a: FALLBACK, go: true, miss: true };
  }

  function mailto(q) {
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Question from your portfolio') +
      '&body=' + encodeURIComponent(q ? 'Hi Omar,\n\nI was on your site and wanted to ask: ' + q + '\n' : 'Hi Omar,\n');
  }

  function add(type, paras, opts) {
    var div = document.createElement('div');
    div.className = 'msg ' + type;
    paras.forEach(function (t) { var p = document.createElement('p'); p.textContent = t; div.appendChild(p); });
    if (opts && opts.go) {
      var a = document.createElement('a');
      a.className = 'go'; a.href = mailto(opts.q); a.textContent = 'Email Omar about this';
      div.appendChild(a);
    }
    thread.appendChild(div);
    thread.scrollTop = thread.scrollHeight;
  }

  function ask(q, topic) {
    q = (q || '').trim();
    if (!q) return;
    if (!dlg.open) dlg.showModal();
    add('you', [q]);
    var r = null;
    if (topic) KB.forEach(function (item) { if (!r && item.k.indexOf(topic) !== -1) r = item; });
    r = r || answerFor(q);
    add('bot', r.a, { go: r.go, q: r.miss ? q : '' });
    aInput.value = '';
    aInput.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value;
    if (!q.trim()) { input.focus(); return; }
    input.value = '';
    ask(q);
  });
  aForm.addEventListener('submit', function (e) { e.preventDefault(); ask(aInput.value); });
  document.querySelectorAll('.chip').forEach(function (c) {
    c.addEventListener('click', function () { ask(c.getAttribute('data-q')); });
  });
  closeBtn.addEventListener('click', function () { dlg.close(); });

  // "Ask about this" buttons (experience previews) and the sticky pill
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.ask-this');
    if (b) ask(b.getAttribute('data-q'), b.getAttribute('data-topic'));
  });
  var pill = document.getElementById('float-ask');
  if (pill) {
    var hero = document.querySelector('.hero');
    // The pill stays out of the way: hidden on the hero, on sections that carry their own
    // "Ask about this" buttons or contact details, and while the dialog is open.
    var zones = ['#work', '.built', '#contact', '.foot'].map(function (s) { return document.querySelector(s); }).filter(Boolean);
    var inZone = {};
    var update = function () {
      var past = hero && hero.getBoundingClientRect().bottom < 0;
      var blocked = false;
      Object.keys(inZone).forEach(function (k) { if (inZone[k]) blocked = true; });
      var want = past && !blocked && !dlg.open;
      if (want && pill.hidden) { pill.hidden = false; pill.classList.add('pre'); requestAnimationFrame(function () { pill.classList.remove('pre'); }); }
      else if (!want && !pill.hidden) { pill.hidden = true; }
    };
    if ('IntersectionObserver' in window) {
      var zio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { inZone[e.target.className + e.target.id] = e.isIntersecting; });
        update();
      }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
      zones.forEach(function (z) { zio.observe(z); });
    }
    window.addEventListener('scroll', update, { passive: true }); update();
    dlg.addEventListener('close', update);
    pill.addEventListener('click', function () { if (!dlg.open) dlg.showModal(); aInput.focus(); });
  }
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
})();
