// LizardTrail — общие хелперы Telegram Web App.
window.LT = (function () {
  const tg = window.Telegram && window.Telegram.WebApp;

  function init() {
    if (tg) {
      tg.ready();
      tg.expand();
    }
    return tg;
  }

  function isInTelegram() { return !!tg; }
  function initData() { return tg ? (tg.initData || '') : ''; }

  function haptic(type) {
    if (tg && tg.HapticFeedback && tg.HapticFeedback[type]) {
      try { tg.HapticFeedback[type]('light'); } catch (e) {}
    }
  }

  // Демо-данные для админки и сервиса
  function getMockAdminData() {
    const pad = (n) => String(n).padStart(2, '0');
    const toISO = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

    const todayStr = toISO(new Date());
    const tomorrowStr = toISO(addDays(new Date(), 1));
    const dayAfterStr = toISO(addDays(new Date(), 2));

    return {
      entries: [
        {
          id: 'demo-1',
          date: todayStr,
          time_start: '10:00',
          time_end: '12:00',
          name: 'Дмитрий Волков',
          phone: '+375 29 111 22 33',
          service: 'Прокат и Тренировка',
          participants: { count: 2, level: 'Есть опыт', rent_bike: true },
          status: 'Подтверждено',
          comment: 'Нужны 2 шлема M и L',
          color: '#d81324'
        },
        {
          id: 'demo-2',
          date: todayStr,
          time_start: '14:30',
          time_end: '16:00',
          name: 'Сергей К.',
          phone: '+375 29 444 55 66',
          service: 'Обучение новичков (с нуля)',
          participants: { count: 1, level: 'Новичок', rent_bike: true },
          status: 'Подтверждено',
          comment: 'Первый раз на эндуро',
          color: '#005989'
        },
        {
          id: 'demo-3',
          date: tomorrowStr,
          time_start: '11:00',
          time_end: '13:00',
          name: 'Алексей (Группа PRO)',
          phone: '+375 29 777 88 99',
          service: 'Прокат и Тренировка',
          participants: { count: 4, level: 'Уверенный / PRO', rent_bike: false },
          status: 'Подтверждено',
          comment: 'Свои мотоциклы, нужен гид на хард-трек',
          color: '#d81324'
        },
        {
          id: 'demo-4',
          date: dayAfterStr,
          time_start: '15:00',
          time_end: '16:00',
          name: 'Игорь Васильев',
          phone: '+375 29 333 22 11',
          service: 'Сервис и Ремонт',
          participants: { count: 1 },
          status: 'В работе',
          comment: 'KTM EXC 300 - замена масла и прокачка тормозов',
          color: '#575e70'
        }
      ],
      services: [
        { id: '1', name: 'Прокат и Тренировка', duration_min: 120, price: 180, color: '#d81324' },
        { id: '2', name: 'Обучение новичков (с нуля)', duration_min: 90, price: 140, color: '#005989' },
        { id: '3', name: 'Сервис и Ремонт', duration_min: 60, price: 90, color: '#575e70' }
      ],
      clients: [
        { id: 'c1', name: 'Дмитрий Волков', phone: '+375 29 111 22 33', rides_count: 5, note: 'Постоянный клиент' },
        { id: 'c2', name: 'Алексей Морозов', phone: '+375 29 777 88 99', rides_count: 12, note: 'PRO райдер' },
        { id: 'c3', name: 'Сергей Ковалев', phone: '+375 29 444 55 66', rides_count: 1, note: 'Новичок' }
      ],
      serviceRequests: [
        { id: 'sr1', bike: 'KTM EXC 300', problem: 'Замена масла и фильтров', status: 'В работе', desired_date: todayStr, name: 'Игорь В.', phone: '+375 29 333 22 11' },
        { id: 'sr2', bike: 'Husqvarna TE 250', problem: 'Люфт маятника, диагностика', status: 'Новые', desired_date: tomorrowStr, name: 'Максим', phone: '+375 29 999 00 11' }
      ],
      managers: [{ id: 'm1', name: 'Администратор (Демо)', telegram_id: '12345678', role: 'Owner' }],
      notifications: []
    };
  }

  // Универсальный запрос к нашему API с initData в заголовке или эмуляция в демо-режиме.
  async function api(path, opts) {
    if (window.DEMO_MODE || !window.API_BASE) {
      if (path === '/api/admin/data') return getMockAdminData();
      if (path === '/api/me') return { is_manager: true, name: 'Администратор (Демо)' };
      if (path.startsWith('/api/admin/entries')) return { id: 'demo-entry-' + Date.now(), notify: 'none' };
      return { status: 'ok', id: 'demo-' + Date.now() };
    }

    opts = opts || {};
    const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
    const id = initData();
    if (id) headers['X-Telegram-Init-Data'] = id;

    const base = (window.API_BASE || '');
    try {
      const resp = await fetch(base + path, Object.assign({}, opts, { headers }));
      const text = await resp.text();
      let body = null;
      try { body = text ? JSON.parse(text) : null; } catch (e) { body = text; }

      if (!resp.ok) {
        const msg = (body && (body.detail || body.message)) || ('Ошибка ' + resp.status);
        throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
      }
      return body;
    } catch (e) {
      if (path === '/api/admin/data') return getMockAdminData();
      return { status: 'ok', id: 'demo-' + Date.now() };
    }
  }

  async function checkRole() {
    if (window.DEMO_MODE) return { is_manager: true, is_owner: true, name: 'Администратор (Демо)', role: 'Owner' };
    if (!initData()) return { no_tg: true, is_manager: false };
    try { return await api('/api/me'); }
    catch (e) { return { error: e.message, is_manager: false }; }
  }

  function close() { if (tg && tg.close) tg.close(); }

  // Маска телефона: +375 + 9 цифр (формат +375 XX XXX XX XX).
  function formatPhone(raw) {
    let d = String(raw || '').replace(/\D/g, '');
    if (d.startsWith('375')) d = d.slice(3);
    d = d.slice(0, 9);
    let out = '+375';
    if (d.length > 0) out += ' ' + d.slice(0, 2);
    if (d.length > 2) out += ' ' + d.slice(2, 5);
    if (d.length > 5) out += ' ' + d.slice(5, 7);
    if (d.length > 7) out += ' ' + d.slice(7, 9);
    return out;
  }

  function attachPhoneMask(input) {
    if (!input) return;
    const apply = () => { input.value = formatPhone(input.value); };
    input.addEventListener('input', apply);
    input.addEventListener('focus', () => { if (!input.value) input.value = '+375 '; });
    input.addEventListener('blur', () => { if (input.value.trim() === '+375') input.value = ''; });
    if (!input.value) input.value = '+375 ';
  }

  function phoneValid(input) {
    return (input.value || '').replace(/\D/g, '').length === 12; // +375 + 9 цифр
  }

  function openExternal(url) {
    try {
      if (tg && tg.openLink) tg.openLink(url);
      else window.open(url, '_blank');
    } catch (e) {
      try { window.open(url, '_blank'); } catch (e2) {}
    }
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }

  // Любая ссылка с классом .js-ext-link открывается во внешнем браузере
  // (в Telegram — через tg.openLink): адрес базы, «Powered by» и т.п.
  document.addEventListener('click', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a.js-ext-link') : null;
    if (!a) return;
    e.preventDefault();
    openExternal(a.href);
  });

  // Заставка загрузки: прячем, когда приложение готово.
  // Держим на экране минимум MIN_MS, чтобы не было «мигания».
  const LOADER_MIN_MS = 420;
  const _t0 = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
  const _now = () => ((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now());

  function hideLoader() {
    const el = document.getElementById('lt-loader');
    if (!el || el.dataset.hidden) return;
    el.dataset.hidden = '1';
    const wait = Math.max(0, LOADER_MIN_MS - (_now() - _t0));
    setTimeout(() => {
      el.classList.add('is-hiding');
      setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
    }, wait);
  }
  // Страховка: если что-то пошло не так — прячем через 8 секунд.
  setTimeout(hideLoader, 8000);

  return { tg, init, isInTelegram, initData, haptic, api, checkRole, close, attachPhoneMask, phoneValid, formatPhone, openExternal, copyToClipboard, hideLoader };
})();
