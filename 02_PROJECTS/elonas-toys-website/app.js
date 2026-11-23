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
  filters: {
    age: 'all',
    category: 'all',
    keyword: ''
  },
  viewMode: 'grid' // 'grid' or 'list'
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
  ageFilterContainer: document.getElementById('ageFilterContainer'),
  categoryFilterContainer: document.getElementById('categoryFilterContainer'),
  productsGrid: document.getElementById('productsGrid'),
  viewGridBtn: document.getElementById('viewGridBtn'),
  viewListBtn: document.getElementById('viewListBtn'),
  toast: document.getElementById('toast'),
  whatsappCheckout: document.getElementById('whatsappCheckout'),
  copyNumberBtn: document.getElementById('copyNumberBtn')
};

// --- Init ---
async function init() {
  applyTheme();
  applyLang();
  updateCartUI();

  // Load products
  try {
    const res = await fetch('products.json');
    const data = await res.json();
    state.products = data.products;
    document.title = data.store.name;
  } catch (e) {
    console.error('Failed to load products:', e);
  }

  renderFilters();
  renderProducts();

  // --- Event Listeners ---
  els.themeToggle.addEventListener('click', toggleTheme);
  els.langToggle.addEventListener('click', toggleLang);
  els.cartBadge.addEventListener('click', () => els.cartDrawer.classList.toggle('open'));

  // Search modal
  const searchTrigger = document.getElementById('searchTrigger');
  const modalClose = document.getElementById('modalClose');
  searchTrigger.addEventListener('click', () => els.modalOverlay.classList.add('open'));
  modalClose.addEventListener('click', () => els.modalOverlay.classList.remove('open'));
  els.modalOverlay.addEventListener('click', (e) => {
    if (e.target === els.modalOverlay) els.modalOverlay.classList.remove('open');
  });

  // Search input
  els.searchInput.addEventListener('input', (e) => {
    state.filters.keyword = e.target.value.toLowerCase();
    renderProducts();
  });

  // View toggle
  els.viewGridBtn.addEventListener('click', () => setViewMode('grid'));
  els.viewListBtn.addEventListener('click', () => setViewMode('list'));

  // WhatsApp checkout
  els.whatsappCheckout.addEventListener('click', whatsappCheckout);
  els.copyNumberBtn.addEventListener('click', copyNumber);

  // Close cart when clicking outside (optional)
  document.addEventListener('click', (e) => {
    if (!els.cartBadge.contains(e.target) && !els.cartDrawer.contains(e.target)) {
      els.cartDrawer.classList.remove('open');
    }
  });
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
      'filter.age': 'تصفية حسب العمر', 'filter.category': 'تصفية حسب القسم',
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
  // Age chips
  els.ageFilterContainer.innerHTML = '<button class="chip active" data-filter="age" data-value="all">' + (state.lang === 'ar' ? 'جميع الأعمار' : 'All Ages') + '</button>';
  state.ageBrackets.forEach(age => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.filter = 'age';
    btn.dataset.value = age;
    btn.textContent = age;
    els.ageFilterContainer.appendChild(btn);
  });
  // Category chips
  els.categoryFilterContainer.innerHTML = '<button class="chip active" data-filter="category" data-value="all">' + (state.lang === 'ar' ? 'جميع الأقسام' : 'All Categories') + '</button>';
  state.categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.dataset.filter = 'category';
    btn.dataset.value = cat;
    btn.textContent = cat;
    els.categoryFilterContainer.appendChild(btn);
  });

  // Chip click handlers
  els.ageFilterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
      const val = e.target.dataset.value;
      state.filters.age = val;
      els.ageFilterContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      renderProducts();
    }
  });
  els.categoryFilterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
      const val = e.target.dataset.value;
      state.filters.category = val;
      els.categoryFilterContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      renderProducts();
    }
  });
}

// --- Products ---
window.renderProducts = function renderProducts() {
  const filtered = state.products.filter(p => {
    const ageMatch = state.filters.age === 'all' || p.ageBracket === state.filters.age;
    const catMatch = state.filters.category === 'all' || p.category === state.filters.category;
    const kwMatch = state.filters.keyword === '' ||
      p.name.toLowerCase().includes(state.filters.keyword) ||
      (p.nameAr && p.nameAr.toLowerCase().includes(state.filters.keyword));
    return ageMatch && catMatch && kwMatch;
  });

  if (state.viewMode === 'grid') {
    els.productsGrid.className = 'grid grid-cols-4';
    els.productsGrid.innerHTML = filtered.map(p => productCardHTML(p)).join('');
  } else {
    els.productsGrid.className = 'list-view';
    els.productsGrid.innerHTML = filtered.map(p => productListHTML(p)).join('');
  }
}

function productCardHTML(p) {
  const name = state.lang === 'ar' && p.nameAr ? p.nameAr : p.name;
  const stockClass = p.stock.toLowerCase().replace(' ', '-');
  return `
    <article class="card product-card fade-in" data-id="${p.id}">
      <div class="product-image">🧸</div>
      <span class="product-badge">${p.ageBracket}</span>
      <div class="product-name">${escapeHtml(name)}</div>
      <div class="product-stock ${stockClass}">${p.stock}</div>
      <div class="product-price">$${p.price}</div>
      <div class="product-actions">
        <button class="btn btn-accent btn-sm w-full" onclick="addToCart('${p.id}')">${state.lang === 'ar' ? 'إضافة إلى السلة' : 'Add to WhatsApp'}</button>
      </div>
    </article>
  `;
}

function productListHTML(p) {
  const name = state.lang === 'ar' && p.nameAr ? p.nameAr : p.name;
  const stockClass = p.stock.toLowerCase().replace(' ', '-');
  return `
    <div class="card product-card fade-in" style="display:flex; align-items:center; gap:16px;" data-id="${p.id}">
      <div class="product-image" style="width:80px; height:80px; font-size:2.5rem;">🧸</div>
      <div style="flex:1;">
        <span class="product-badge">${p.ageBracket}</span>
        <div class="product-name" style="font-size:1rem;">${escapeHtml(name)}</div>
        <div class="product-stock ${stockClass}" style="font-size:0.8rem;">${p.stock}</div>
      </div>
      <div class="product-price">$${p.price}</div>
      <button class="btn btn-accent btn-sm" onclick="addToCart('${p.id}')">${state.lang === 'ar' ? 'إضافة' : 'Add'}</button>
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

// Make cart functions global for inline onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQty = changeQty;

// --- Start ---
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
