// LizardTrail — форма «Прокат и Тренировки» (Экран 1.1).
(function () {
  LT.init();
  LT.attachPhoneMask(document.getElementById('phone'));

  // --- Counter ---
  let count = 1;
  const MIN = 1, MAX = 12;
  const countEl = document.getElementById('count');
  const countLabelEl = document.getElementById('count-label');

  function plural(n) {
    if (n % 10 === 1 && n % 100 !== 11) return 'райдер';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'райдера';
    return 'райдеров';
  }
  function renderCount() {
    countEl.textContent = count;
    countLabelEl.textContent = plural(count);
  }
  document.getElementById('inc').addEventListener('click', () => { if (count < MAX) { count++; renderCount(); } });
  document.getElementById('dec').addEventListener('click', () => { if (count > MIN) { count--; renderCount(); } });

  // --- Level radio cards ---
  const levelCards = Array.from(document.querySelectorAll('[data-level]'));
  levelCards.forEach((card) => {
    card.addEventListener('click', () => {
      levelCards.forEach((c) => c.classList.remove('is-active'));
      card.classList.add('is-active');
      card.querySelector('input').checked = true;
    });
  });
  function getLevel() {
    const checked = document.querySelector('input[name="level"]:checked');
    return checked ? checked.value : '';
  }

  // --- Rent segmented ---
  let rentBike = true;
  const rentYes = document.getElementById('rent-yes');
  const rentNo = document.getElementById('rent-no');
  function renderRent() {
    rentYes.classList.toggle('is-active', rentBike);
    rentNo.classList.toggle('is-active', !rentBike);
  }
  rentYes.addEventListener('click', () => { rentBike = true; renderRent(); });
  rentNo.addEventListener('click', () => { rentBike = false; renderRent(); });

  // --- Submit ---
  const form = document.getElementById('form');
  const submitBtn = document.getElementById('submit');
  const errorBox = document.getElementById('error');
  const overlay = document.getElementById('success-overlay');

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.add('is-visible');
  }
  function hideError() { errorBox.classList.remove('is-visible'); }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const name = document.getElementById('name').value.trim();
    const phoneInput = document.getElementById('phone');
    const phone = phoneInput.value.trim();
    const comment = document.getElementById('comment').value.trim();
    const desiredDate = document.getElementById('desired-date').value;
    const desiredTime = document.getElementById('desired-time').value;

    if (!name) { showError('Укажите ваше имя.'); return; }
    if (!LT.phoneValid(phoneInput)) { showError('Введите номер в формате +375 XX XXX XX XX.'); return; }

    const payload = {
      participants: count,
      level: getLevel(),
      rent_bike: rentBike,
      name: name,
      phone: phone,
      comment: comment,
      desired_date: desiredDate,
      desired_time: desiredTime,
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Синхронизация с CRM...';

    // ДЕМО-РЕЖИМ: имитируем сетевой запрос и задержку Google Sheets
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить заявку';
      LT.haptic('notificationOccurred');
      overlay.classList.add('is-visible');
    }, 1000);
  });

  document.getElementById('close-overlay').addEventListener('click', () => {
    overlay.classList.remove('is-visible');
    // В симуляторе возвращаем на экран выбора услуг
    window.location.href = '../index.html';
  });

  LT.hideLoader();
})();
