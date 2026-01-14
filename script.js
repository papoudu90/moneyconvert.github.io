// ================= CONFIG =================
const API_KEY = 'd486c06cbf07337e62ea1127';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const DEFAULT_FROM = 'EUR';
const DEFAULT_TO = 'XOF';

// ================= DOM =================
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const form = document.getElementById('converter-form');

const resultSection = document.getElementById('result-section');
const resultText = document.getElementById('conversion-result');
const rateInfo = document.getElementById('rate-info');

const errorSection = document.getElementById('error-section');
const errorMessage = document.getElementById('error-message');

const swapBtn = document.getElementById('swap-btn');
const themeBtn = document.getElementById('toggle-theme');

// ================= DEVISES =================
const currencies = [
  { code: 'USD', name: 'Dollar américain' },
  { code: 'EUR', name: 'Euro' },
  { code: 'XOF', name: 'Franc CFA (UEMOA)' },
  { code: 'XAF', name: 'Franc CFA (CEMAC)' },
  { code: 'GBP', name: 'Livre sterling' },
  { code: 'JPY', name: 'Yen japonais' },
  { code: 'CAD', name: 'Dollar canadien' },
  { code: 'CHF', name: 'Franc suisse' },
  { code: 'CNY', name: 'Yuan chinois' },
  { code: 'AUD', name: 'Dollar australien' },
  { code: 'AED', name: 'Dirham des Émirats arabes unis' },
  { code: 'AFN', name: 'Afghani afghan' },
  { code: 'ALL', name: 'Lek albanais' },
  { code: 'AMD', name: 'Dram arménien' },
  { code: 'ANG', name: 'Florin des Antilles néerlandaises' },
  { code: 'AOA', name: 'Kwanza angolais' },
  { code: 'ARS', name: 'Peso argentin' },
  { code: 'AWG', name: 'Florin arubais' },
  { code: 'AZN', name: 'Manat azerbaïdjanais' },
  { code: 'BAM', name: 'Mark convertible bosniaque' },
  { code: 'BBD', name: 'Dollar barbadien' },
  { code: 'BDT', name: 'Taka bangladais' },
  { code: 'BGN', name: 'Lev bulgare' },
  { code: 'BHD', name: 'Dinar bahreïni' },
  { code: 'BIF', name: 'Franc burundais' },
  { code: 'BMD', name: 'Dollar bermudien' },
  { code: 'BND', name: 'Dollar brunéien' },
  { code: 'BOB', name: 'Boliviano bolivien' },
  { code: 'BRL', name: 'Real brésilien' },
  { code: 'BSD', name: 'Dollar bahaméen' },
  { code: 'BTN', name: 'Ngultrum bhoutanais' },
  { code: 'BWP', name: 'Pula botswanais' },
  { code: 'BYN', name: 'Rouble biélorusse' },
  { code: 'BZD', name: 'Dollar bélizéen' },
  { code: 'CDF', name: 'Franc congolais' },
  { code: 'CLP', name: 'Peso chilien' },
  { code: 'COP', name: 'Peso colombien' },
  { code: 'CZK', name: 'Couronne tchèque' },
  { code: 'DKK', name: 'Couronne danoise' },
  { code: 'DOP', name: 'Peso dominicain' },
  { code: 'DZD', name: 'Dinar algérien' },
  { code: 'EGP', name: 'Livre égyptienne' },
  { code: 'ETB', name: 'Birr éthiopien' },
  { code: 'GHS', name: 'Cedi ghanéen' },
  { code: 'GMD', name: 'Dalasi gambien' },
  { code: 'GNF', name: 'Franc guinéen' },
  { code: 'HKD', name: 'Dollar de Hong Kong' },
  { code: 'HUF', name: 'Forint hongrois' },
  { code: 'INR', name: 'Roupie indienne' },
  { code: 'KES', name: 'Shilling kényan' },
  { code: 'KRW', name: 'Won sud-coréen' },
  { code: 'KWD', name: 'Dinar koweïtien' },
  { code: 'MAD', name: 'Dirham marocain' },
  { code: 'MXN', name: 'Peso mexicain' },
  { code: 'NGN', name: 'Naira nigérian' },
  { code: 'NOK', name: 'Couronne norvégienne' },
  { code: 'NZD', name: 'Dollar néo-zélandais' },
  { code: 'PKR', name: 'Roupie pakistanaise' },
  { code: 'PLN', name: 'Zloty polonais' },
  { code: 'QAR', name: 'Riyal qatari' },
  { code: 'RUB', name: 'Rouble russe' },
  { code: 'SAR', name: 'Riyal saoudien' },
  { code: 'SEK', name: 'Couronne suédoise' },
  { code: 'SGD', name: 'Dollar de Singapour' },
  { code: 'THB', name: 'Baht thaïlandais' },
  { code: 'TRY', name: 'Livre turque' },
  { code: 'TWD', name: 'Dollar taïwanais' },
  { code: 'TZS', name: 'Shilling tanzanien' },
  { code: 'UAH', name: 'Hryvnia ukrainienne' },
  { code: 'UGX', name: 'Shilling ougandais' },
  { code: 'UYU', name: 'Peso uruguayen' },
  { code: 'VND', name: 'Dong vietnamien' },
  { code: 'XCD', name: 'Dollar des Caraïbes orientales' },
  { code: 'XPF', name: 'Franc pacifique' },
  { code: 'ZAR', name: 'Rand sud-africain' },
  { code: 'ZMW', name: 'Kwacha zambien' }
];

// ================= INIT =================
initTheme();
populateCurrencySelects();

// ================= THEME =================
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem(
      'theme',
      document.body.classList.contains('dark-mode') ? 'dark' : 'light'
    );
  });
}

// ================= UI =================
function populateCurrencySelects() {
  currencies.forEach(cur => {
    const optFrom = document.createElement('option');
    optFrom.value = cur.code;
    optFrom.textContent = `${cur.code} - ${cur.name}`;
    fromSelect.appendChild(optFrom);

    const optTo = document.createElement('option');
    optTo.value = cur.code;
    optTo.textContent = `${cur.code} - ${cur.name}`;
    toSelect.appendChild(optTo);
  });

  fromSelect.value = DEFAULT_FROM;
  toSelect.value = DEFAULT_TO;
}

swapBtn.addEventListener('click', () => {
  [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
});

// ================= FORM =================
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError();
  resultSection.style.display = 'none';

  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amount || amount <= 0) {
    showError('Veuillez entrer un montant valide.');
    return;
  }

  if (from === to) {
    showError('Veuillez choisir deux devises différentes.');
    return;
  }

  try {
    showLoading();
    const data = await fetchRates(from);

    if (!data.rates[to]) {
      showError('Taux indisponible pour cette devise.');
      return;
    }

    const rate = data.rates[to];
    const converted = amount * rate;

    displayResult(amount, from, converted, to, rate, data.date);
  } catch (err) {
    showError('Erreur lors de la récupération des taux.');
  }
});

// ================= API =================
async function fetchRates(base) {
  const response = await fetch(`${API_URL}${base}`);
  if (!response.ok) throw new Error('API error');

  const data = await response.json();
  if (data.result !== 'success') throw new Error('API error');

  return {
    rates: data.conversion_rates,
    date: data.time_last_update_utc
  };
}

// ================= DISPLAY =================
function displayResult(amount, from, converted, to, rate, date) {
  const locale = navigator.language || 'fr-FR';

  const formattedFrom = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: from
  }).format(amount);

  const formattedTo = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: to
  }).format(converted);

  resultText.innerHTML = `${formattedFrom} = ${formattedTo}`;
  rateInfo.textContent =
    `1 ${from} = ${rate.toFixed(4)} ${to} • ${new Date(date).toLocaleString()}`;

  resultSection.style.display = 'block';
}

// ================= FEEDBACK =================
function showError(message) {
  errorMessage.textContent = message;
  errorSection.style.display = 'block';
}

function hideError() {
  errorSection.style.display = 'none';
}

function showLoading() {
  resultText.textContent = 'Conversion en cours…';
  rateInfo.textContent = '';
  resultSection.style.display = 'block';
}
