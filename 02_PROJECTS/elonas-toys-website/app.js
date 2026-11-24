// =========================================
// Elona's Toys — Frontend Application
// Static HTML + vanilla JS (no build step)
// =========================================

// --- State ---
let state = {
  lang: localStorage.getItem('elona-lang') || 'en',
  theme: localStorage.getItem('elona-theme') || 'light',
  cart: JSON.parse(localStorage.getItem('elona-cart') || '[]'),
  products: [],
  ageBrackets: [
    "0–12 Months",
    "1–3 Years",
    "3–5 Years",
    "6–8 Years",
    "9+ Years"
  ],
  categories: [
    "Baby & Toddler",
    "Dolls & Pretend Play",
    "Cars & Action",
    "Educational & STEM",
    "Board Games & Puzzles",
    "Outdoor & Ride-Ons",
    "Kids Essentials"
  ],
  filters: {
    age: 'all',
    category: 'all',
    keyword: '',
    budget: 'all'
  },
  budgetRanges: [
    { label: '0–25$', min: null, max: 25 },
    { label: '25–50$', min: 25, max: 50 },
    { label: '50–100$', min: 50, max: 100 },
    { label: '100+ $', min: 100, max: null }
  ],
  viewMode: 'grid', // 'grid' or 'list',
  whatsapp: '+96178702712',
  store: null
};

// --- DOM Elements ---
const els = {
  html: document.documentElement,
  themeToggle: document.getElementById('themeToggle'),
  langToggle: document.getElementById('langToggle'),
  cartBadge: document.getElementById('cartBadge'),
  cartCount: document.getElementById('cartCount'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartItems: document.getElementById('cartItems'),
  cartTotal: document.getElementById('cartTotal'),
  modalOverlay: document.getElementById('modalOverlay'),
  searchInput: document.getElementById('searchInput'),
  productsGrid: document.getElementById('productsGrid'),
  viewGridBtn: document.getElementById('viewGridBtn'),
  viewListBtn: document.getElementById('viewListBtn'),
  toast: document.getElementById('toast'),
  whatsappCheckout: document.getElementById('whatsappCheckout'),
  copyNumberBtn: document.getElementById('copyNumberBtn')
};

// --- Init ---
async function init() {
  // 1. Apply theme and language immediately (no dependencies)
  applyTheme();
  applyLang();
  updateCartUI();

  // 2. Attach ALL event listeners immediately — buttons work even if product fetch fails.
  // Guard each against missing elements so init() never crashes on pages that
  // don't have every control (e.g. index.html has no view-grid/list buttons).
  if (els.themeToggle) els.themeToggle.addEventListener('click', toggleTheme);
  if (els.langToggle) els.langToggle.addEventListener('click', toggleLang);
  if (els.cartBadge && els.cartDrawer) {
    els.cartBadge.addEventListener('click', () => els.cartDrawer.classList.toggle('open'));
  }

  const searchTrigger = document.getElementById('searchTrigger');
  const modalClose = document.getElementById('modalClose');
  if (searchTrigger && els.modalOverlay) {
    searchTrigger.addEventListener('click', () => els.modalOverlay.classList.add('open'));
  }
  if (modalClose && els.modalOverlay) {
    modalClose.addEventListener('click', () => els.modalOverlay.classList.remove('open'));
  }
  if (els.modalOverlay) {
    els.modalOverlay.addEventListener('click', (e) => {
      if (e.target === els.modalOverlay) els.modalOverlay.classList.remove('open');
    });
  }

  if (els.searchInput) {
    els.searchInput.addEventListener('input', (e) => {
      state.filters.keyword = e.target.value.toLowerCase();
      renderProducts();
    });
  }

  if (els.viewGridBtn) els.viewGridBtn.addEventListener('click', () => setViewMode('grid'));
  if (els.viewListBtn) els.viewListBtn.addEventListener('click', () => setViewMode('list'));

  if (els.whatsappCheckout) els.whatsappCheckout.addEventListener('click', whatsappCheckout);
  if (els.copyNumberBtn) els.copyNumberBtn.addEventListener('click', copyNumber);

  // Close cart when clicking outside
  if (els.cartBadge && els.cartDrawer) {
    document.addEventListener('click', (e) => {
      if (!els.cartBadge.contains(e.target) && !els.cartDrawer.contains(e.target)) {
        els.cartDrawer.classList.remove('open');
      }
    });
  }

  // 3. Load products (async, non-blocking — won't break buttons if it fails)
  try {
    const res = await fetch('products.json');
    const data = await res.json();
    state.products = data.products;
    state.store = data.store;
    document.title = data.store.name;
  } catch (e) {
    console.error('Failed to load products:', e);
  }

  // 4. Apply pre-selected filters from URL params (?age=...&category=...)
  applyUrlFilters();

  renderFilters();
  renderProducts();
  renderSpecialOffers();
}

// --- URL filter params ---
function applyUrlFilters() {
  const params = new URLSearchParams(window.location.search);
  const ageParam = params.get('age');
  const catParam = params.get('category');

  if (ageParam) {
    const decoded = decodeURIComponent(ageParam);
    const match = state.ageBrackets.find(a => a === decoded);
    if (match) state.filters.age = match;
  }
  if (catParam) {
    const decoded = decodeURIComponent(catParam);
    const match = state.categories.find(c => c === decoded);
    if (match) state.filters.category = match;
  }
}

// --- Theme ---
function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('elona-theme', state.theme);
  applyTheme();
}
function applyTheme() {
  els.html.setAttribute('data-theme', state.theme);
  els.themeToggle.textContent = state.theme === 'light' ? '🌙' : '☀️';
}

// --- Language ---
function toggleLang() {
  state.lang = state.lang === 'en' ? 'ar' : 'en';
  localStorage.setItem('elona-lang', state.lang);
  applyLang();
  renderProducts();
}
function applyLang() {
  els.html.setAttribute('lang', state.lang);
  els.html.setAttribute('dir', state.lang === 'ar' ? 'rtl' : 'ltr');
  els.langToggle.textContent = state.lang === 'en' ? 'EN / AR' : 'AR / EN';

  // Translate static strings
  const translations = {
    en: {
      'nav.home': 'Home', 'nav.catalog': 'Catalog', 'nav.about': 'About Us',
      'nav.contact': 'Contact', 'nav.delivery': 'Delivery Info',
      'hero.title': "Elona's Toys", 'hero.tagline': "Your One-Stop Kids Store — Toys & Essentials — Quality You Can Trust",
      'hero.shop': 'Shop Toys', 'hero.whatsapp': 'WhatsApp Us',
      'section.special': 'Special Offers', 'section.categories': 'Categories',
      'section.socials': 'Follow Us', 'section.feedback': "Customer Feedbacks",
      'section.location': 'Visit Us', 'footer.rights': '© 2026 Elona\'s Toys — Khaldeh, Lebanon',
      'cart.title': 'Your Cart', 'cart.empty': 'Your cart is waiting 🧸', 'cart.checkout': 'Checkout via WhatsApp',
      'filter.age': 'Filter by Age', 'filter.category': 'Filter by Category',
      'view.grid': 'Grid', 'view.list': 'List',
      'copy.success': 'Number copied!', 'toast.added': 'Added to cart 🧸'
    },
    ar: {
      'nav.home': 'الرئيسية', 'nav.catalog': 'المتجر', 'nav.about': 'معلومات عنا',
      'nav.contact': 'اتصل بنا', 'nav.delivery': 'معلومات التوصيل',
      'hero.title': "ألعابilonا", 'hero.tagline': "متجرك الشامل للأطفال — ألعاب ومستلزمات — جودة تثق بها",
      'hero.shop': 'تسوق الألعاب', 'hero.whatsapp': 'واتساب',
      'section.special': 'عروض خاصة', 'section.categories': 'الأقسام',
      'section.socials': 'تابعونا', 'section.feedback': 'آراء العملاء',
      'section.location': 'قم بزيارتنا', 'footer.rights': '© 2026 ألعابilonا — خلدة، لبنان',
      'cart.title': 'عربة التسوق', 'cart.empty': 'عربتك في انتظارك 🧸', 'cart.checkout': 'الدفع عبر واتساب',
      'filter.age': 'تصفية حسب العمر', 'filter.category': 'تصفية حسب القسم', 'filter.budget': 'تصفية حسب الميزانية',
      'view.grid': 'عرض شبكي', 'view.list': 'عرض قائمة',
      'copy.success': 'تم نسخ الرقم!', 'toast.added': 'أضيف إلى السلة 🧸'
    }
  };
  const t = translations[state.lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.title = state.lang === 'ar' ? 'ألعابilonا' : "Elona's Toys";
}

// --- Filters ---
function renderFilters() {
  // Query fresh to avoid duplicate-ID issues between main area and modal
  const ageContainer = document.getElementById('ageFilterContainer');
  const catContainer = document.getElementById('categoryFilterContainer');
  if (!ageContainer || !catContainer) return;

  // Age chips
  ageContainer.innerHTML = '<button class="chip active" data-filter="age" data-value="all">' + (state.lang === 'ar' ? 'جميع الأعمار' : 'All Ages') + '</button>';
  (state.ageBrackets || []).forEach(age => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.filter = 'age';
    btn.dataset.value = age;
    btn.textContent = age;
    ageContainer.appendChild(btn);
  });
  // Category chips
  catContainer.innerHTML = '<button class="chip active" data-filter="category" data-value="all">' + (state.lang === 'ar' ? 'جميع الأقسام' : 'All Categories') + '</button>';
  (state.categories || []).forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.filter = 'category';
    btn.dataset.value = cat;
    btn.textContent = cat;
    catContainer.appendChild(btn);
  });
  // Budget chips
  const budgetContainer = document.getElementById('budgetFilterContainer');
  if (budgetContainer) {
    budgetContainer.innerHTML = '<button class="chip active" data-filter="budget" data-value="all">' + (state.lang === 'ar' ? 'جميع الميزانيات' : 'All Budgets') + '</button>';
    (state.budgetRanges || []).forEach(range => {
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.dataset.filter = 'budget';
      btn.dataset.value = range.label;
      btn.textContent = range.label;
      budgetContainer.appendChild(btn);
    });
    budgetContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('chip')) {
        const val = e.target.dataset.value;
        state.filters.budget = val;
        budgetContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts();
      }
    });
  }

  // Chip click handlers
  ageContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
      const val = e.target.dataset.value;
      state.filters.age = val;
      ageContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      renderProducts();
    }
  });
  catContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
      const val = e.target.dataset.value;
      state.filters.category = val;
      catContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      renderProducts();
    }
  });
}

// --- Products ---
window.renderProducts = function renderProducts() {
  if (!els.productsGrid) return;

  const filtered = state.products.filter(p => {
    const ageMatch = state.filters.age === 'all' || p.ageBracket === state.filters.age;
    const catMatch = state.filters.category === 'all' || p.category === state.filters.category;
    const kwMatch = state.filters.keyword === '' ||
      p.name.toLowerCase().includes(state.filters.keyword) ||
      (p.nameAr && p.nameAr.toLowerCase().includes(state.filters.keyword));
    let budgetMatch = true;
    if (state.filters.budget !== 'all') {
      const range = state.budgetRanges.find(r => r.label === state.filters.budget);
      if (range) {
        if (range.min !== null && p.price < range.min) budgetMatch = false;
        if (range.max !== null && p.price > range.max) budgetMatch = false;
      }
    }
    return ageMatch && catMatch && kwMatch && budgetMatch;
  });

  if (state.viewMode === 'grid') {
    els.productsGrid.className = 'grid grid-cols-4';
    els.productsGrid.innerHTML = filtered.map(p => productCardHTML(p)).join('');
  } else {
    els.productsGrid.className = 'list-view';
    els.productsGrid.innerHTML = filtered.map(p => productListHTML(p)).join('');
  }
}

function renderSpecialOffers() {
  const container = document.getElementById('specialOffers');
  if (!container || !state.store?.specialOffers) return;

  const offers = state.store.specialOffers
    .map(id => state.products.find(p => p.id === id))
    .filter(Boolean);

  container.innerHTML = offers.map(p => productCardHTML(p)).join('');
}

function productCardHTML(p) {
  const name = state.lang === 'ar' && p.nameAr ? p.nameAr : p.name;
  const stockClass = p.stock.toLowerCase().replace(' ', '-');
  const desc = state.lang === 'ar' && p.descriptionAr ? p.descriptionAr : p.description;
  return `
    <article class="card product-card fade-in" data-id="${p.id}">
      <div class="product-image">🧸</div>
      <span class="product-badge">${p.ageBracket}</span>
      <div class="product-info">
        <div class="product-name">${escapeHtml(name)}</div>
        <div class="product-stock ${stockClass}">${p.stock}</div>
        <div class="product-price">$${p.price}</div>
        <p class="product-desc" style="font-size:0.85rem; color:var(--color-text-muted); margin:10px 0; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${escapeHtml(desc)}</p>
      </div>
      <div class="product-actions">
        <button class="btn btn-accent btn-sm w-full mb-8" onclick="addToCart('${p.id}')">${state.lang === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}</button>
        <button class="btn btn-ghost btn-sm w-full" onclick="openProductModal('${p.id}')" style="color:var(--color-text); border-color:var(--color-border);">${state.lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}</button>
      </div>
    </article>
  `;
}

function productListHTML(p) {
  const name = state.lang === 'ar' && p.nameAr ? p.nameAr : p.name;
  const stockClass = p.stock.toLowerCase().replace(' ', '-');
  const desc = state.lang === 'ar' && p.descriptionAr ? p.descriptionAr : p.description;
  return `
    <div class="card product-card fade-in" style="display:flex; align-items:center; gap:16px;" data-id="${p.id}">
      <div class="product-image" style="width:80px; height:80px; font-size:2.5rem;">🧸</div>
      <div style="flex:1;">
        <span class="product-badge">${p.ageBracket}</span>
        <div class="product-name" style="font-size:1rem;">${escapeHtml(name)}</div>
        <div class="product-stock ${stockClass}" style="font-size:0.8rem;">${p.stock}</div>
        <p class="product-desc" style="font-size:0.8rem; color:var(--color-text-muted); margin:6px 0;">${escapeHtml(desc)}</p>
      </div>
      <div class="product-price">$${p.price}</div>
      <div style="display:flex; gap:8px; flex-direction:column;">
        <button class="btn btn-accent btn-sm" onclick="addToCart('${p.id}')">${state.lang === 'ar' ? 'إضافة' : 'Add'}</button>
        <button class="btn btn-ghost btn-sm" onclick="openProductModal('${p.id}')" style="color:var(--color-text); border-color:var(--color-border);">${state.lang === 'ar' ? 'تفاصيل' : 'Details'}</button>
      </div>
    </div>
  `;
}

function setViewMode(mode) {
  state.viewMode = mode;
  els.viewGridBtn.classList.toggle('active', mode === 'grid');
  els.viewListBtn.classList.toggle('active', mode === 'list');
  renderProducts();
}

// --- Cart ---
function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id: productId, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(state.lang === 'ar' ? 'أضيف إلى السلة 🧸' : 'Added to cart 🧸');
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function changeQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else {
    saveCart();
    updateCartUI();
    renderCartItems();
  }
}

function saveCart() {
  localStorage.setItem('elona-cart', JSON.stringify(state.cart));
}

function updateCartUI() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  els.cartCount.textContent = totalQty;
  els.cartCount.style.display = totalQty > 0 ? 'flex' : 'none';
  renderCartItems();
}

function renderCartItems() {
  if (state.cart.length === 0) {
    els.cartItems.innerHTML = `<div class="cart-empty">${state.lang === 'ar' ? 'عربتك في انتظارك 🧸' : 'Your cart is waiting 🧸'}</div>`;
    els.cartTotal.textContent = '$0';
    return;
  }
  els.cartItems.innerHTML = state.cart.map(item => {
    const p = state.products.find(prod => prod.id === item.id);
    if (!p) return '';
    const name = state.lang === 'ar' && p.nameAr ? p.nameAr : p.name;
    const lineTotal = p.price * item.qty;
    return `
      <div class="cart-item">
        <div class="bear">🧸</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${escapeHtml(name)}</div>
          <div class="cart-item-price">$${p.price} × ${item.qty}</div>
          <div class="cart-item-qty">${state.lang === 'ar' ? 'الكمية' : 'Qty'}: ${item.qty}</div>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          <button class="btn btn-ghost btn-sm" onclick="changeQty('${p.id}', -1)">−</button>
          <button class="btn btn-ghost btn-sm" onclick="changeQty('${p.id}', 1)">+</button>
          <button class="btn btn-ghost btn-sm" style="color:#C62828;" onclick="removeFromCart('${p.id}')">🗑️</button>
        </div>
      </div>
    `;
  }).join('');
  const total = state.cart.reduce((sum, item) => {
    const p = state.products.find(prod => prod.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  els.cartTotal.textContent = `$${total}`;
}

// --- WhatsApp Checkout ---
function whatsappCheckout() {
  if (state.cart.length === 0) {
    showToast(state.lang === 'ar' ? 'عربتك فارغة' : 'Your cart is empty');
    return;
  }
  const lines = state.cart.map(item => {
    const p = state.products.find(prod => prod.id === item.id);
    if (!p) return '';
    return `- ${p.name} ×${item.qty} = $${(p.price * item.qty).toFixed(2)}`;
  }).join('\n');
  const total = state.cart.reduce((sum, item) => {
    const p = state.products.find(prod => prod.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  const message = `New order from Elona's Toys 🧸\n\n${lines}\n\nTotal: $${total.toFixed(2)}\nPayment: Whish Money or Pay Upon Delivery`;
  const url = `https://wa.me/${state.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// --- Copy Number ---
function copyNumber() {
  navigator.clipboard.writeText(state.whatsapp).then(() => {
    showToast(state.lang === 'ar' ? 'تم نسخ الرقم!' : 'Number copied!');
  });
}

// --- Toast ---
function showToast(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  setTimeout(() => els.toast.classList.remove('show'), 2500);
}

// --- Utility ---
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// --- Product Detail Modal ---
function openProductModal(productId) {
  const p = state.products.find(prod => prod.id === productId);
  if (!p) return;
  const name = state.lang === 'ar' && p.nameAr ? p.nameAr : p.name;
  const desc = state.lang === 'ar' && p.descriptionAr ? p.descriptionAr : p.description;
  const stockClass = p.stock.toLowerCase().replace(' ', '-');
  const content = document.getElementById('productModalContent');
  content.innerHTML = `
    <div style="text-align:center;">
      <div style="font-size:4rem; margin-bottom:16px;">🧸</div>
      <h2 style="font-family:var(--font-heading); color:var(--color-primary); margin-bottom:8px;">${escapeHtml(name)}</h2>
      <span class="product-badge">${p.ageBracket}</span>
      <span class="product-stock ${stockClass}" style="margin-left:8px;">${p.stock}</span>
    </div>
    <p style="color:var(--color-text-muted); line-height:1.7; margin:20px 0;">${escapeHtml(desc)}</p>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding:16px; background:var(--color-surface); border-radius:var(--radius-sm); border:1px solid var(--color-border);">
      <div>
        <div style="font-size:0.85rem; color:var(--color-text-muted);">Price</div>
        <div style="font-size:1.5rem; font-weight:700; color:var(--color-primary);">$${p.price}</div>
      </div>
      <div>
        <div style="font-size:0.85rem; color:var(--color-text-muted);">Category</div>
        <div style="font-size:1rem; font-weight:600;">${escapeHtml(p.category)}</div>
      </div>
    </div>
    <div style="display:flex; gap:12px;">
      <button class="btn btn-accent" style="flex:1;" onclick="addToCart('${p.id}')">${state.lang === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}</button>
      <a href="https://wa.me/${state.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(`I want to order ${name} for $${p.price} from Elona's Toys`)}" class="btn btn-primary" target="_blank">${state.lang === 'ar' ? 'طلب عبر واتساب' : 'Order via WhatsApp'}</a>
    </div>
  `;
  document.getElementById('productModalOverlay').classList.add('open');
}

document.getElementById('productModalClose')?.addEventListener('click', () => {
  document.getElementById('productModalOverlay')?.classList.remove('open');
});
document.getElementById('productModalOverlay')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('productModalOverlay')) {
    document.getElementById('productModalOverlay')?.classList.remove('open');
  }
});

// Make cart functions global for inline onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQty = changeQty;
window.openProductModal = openProductModal;

// --- Start ---
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
