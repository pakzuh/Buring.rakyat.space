// Logika Aplikasi Web Portal Buring Hub (buring.rakyat.space)

function safeGetJSON(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
}

// State
let state = {
  activeMerchant: "all",
  activeCategory: "all",
  searchQuery: "",
  cart: safeGetJSON("buring_cart", []),
  savedOrders: safeGetJSON("buring_orders", []),
  currentProductModal: null,
  activeView: "menu", // 'menu' | 'recap'
  buyerName: localStorage.getItem("buring_buyer_name") || "",
  buyerPhone: localStorage.getItem("buring_buyer_phone") || "",
  buyerAddress: localStorage.getItem("buring_buyer_address") || "",
  deliveryNotes: localStorage.getItem("buring_delivery_notes") || "",
  recapMerchantFilter: "all"
};

// Format Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}

// Inisialisasi aman
function initApp() {
  const data = window.BURING_MERCHANTS || (typeof BURING_MERCHANTS !== "undefined" ? BURING_MERCHANTS : null);
  if (!data || !Array.isArray(data)) {
    setTimeout(initApp, 50);
    return;
  }
  renderMerchantTabs();
  renderMerchantDirectory();
  renderCategoryPills();
  renderProducts();
  updateCartBadge();
  initEventListeners();
  renderRecap();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Event Listeners
function initEventListeners() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.toLowerCase();
      renderProducts();
    });
  }

  // Profile fields are now dynamically rendered in cart drawer with inline oninput
}

// Visual Data Warung Buring
function getMerchantVisuals(merchantId) {
  const visuals = {
    "warung-mbak-ita": {
      gradient: "from-amber-400 via-orange-500 to-amber-600",
      statusText: "● Buka",
      statusClass: "bg-amber-500 text-white",
      svgIllustration: `
        <svg class="absolute -right-3 -bottom-3 w-20 h-20 text-white/20 select-none pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      `
    },
    "warung-mak-jum": {
      gradient: "from-emerald-400 via-teal-500 to-emerald-600",
      statusText: "● Lauk Pagi",
      statusClass: "bg-emerald-500 text-white",
      svgIllustration: `
        <svg class="absolute -right-3 -bottom-3 w-20 h-20 text-white/20 select-none pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 6h8v2H8V6zm-4 4V8h2v2H4zm-2 2v-2h2v2H2zm22-2v2h-2v-2h2zm-2-2v2h-2V8h2zm-2-2v2h-2V6h2zM4 14v-2h16v2H4zm2 2v-2h12v2H6zm2 2v-2h8v2H8z"/>
        </svg>
      `
    }
  };
  return visuals[merchantId] || {
    gradient: "from-emerald-500 to-teal-500",
    statusText: "Buka",
    statusClass: "bg-emerald-500 text-white",
    svgIllustration: ""
  };
}

// Render Showcase Direktori Warung Buring
function renderMerchantDirectory() {
  const container = document.getElementById("merchant-directory-grid");
  if (!container) return;

  const merchants = window.BURING_MERCHANTS || BURING_MERCHANTS;
  if (!merchants) return;

  let html = "";
  merchants.forEach((m) => {
    const isActive = state.activeMerchant === m.id;
    const vis = getMerchantVisuals(m.id);
    const shortOwner = m.owner.replace(/\s*\(.*?\)/g, "").trim();

    html += `
      <div onclick="selectMerchant('${m.id}')" 
        class="cursor-pointer group relative bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 ${
          isActive 
            ? "border-emerald-500 ring-2 ring-emerald-500/50 shadow-md bg-emerald-50/20" 
            : "border-slate-200/90 shadow-xs hover:border-emerald-300"
        }">
        
        <!-- Header Visual Ilustrasi Bisnis -->
        <div class="h-20 sm:h-24 bg-gradient-to-tr ${vis.gradient} p-2.5 sm:p-3 flex flex-col justify-between relative overflow-hidden select-none">
          ${vis.svgIllustration}
          <div class="flex items-center justify-between z-10">
            <span class="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-xs flex items-center justify-center text-lg shadow-sm">
              ${m.avatar}
            </span>
            <span class="text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full ${vis.statusClass} shadow-xs">
              ${vis.statusText}
            </span>
          </div>
          <div class="z-10">
            <span class="text-[10px] sm:text-[11px] font-bold text-white/95 drop-shadow-xs block tracking-wide uppercase">
              PIC: ${shortOwner}
            </span>
          </div>
        </div>

        <!-- Body Info Usaha -->
        <div class="p-2.5 sm:p-3 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-emerald-600 transition-colors line-clamp-1">
              ${m.name}
            </h4>
            <p class="text-[10px] sm:text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              ${m.tagline}
            </p>
          </div>

          <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span class="text-[9px] sm:text-[10px] font-bold text-slate-500">
              ${m.products.length} Menu
            </span>
            <span class="text-[10px] sm:text-[11px] font-bold text-emerald-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              <span>${isActive ? "Aktif" : "Buka Menu"}</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </span>
          </div>
        </div>

      </div>
    `;
  });

  container.innerHTML = html;
}

// Render Tabs Merchant
function renderMerchantTabs() {
  const container = document.getElementById("merchant-tabs");
  if (!container) return;

  const merchants = window.BURING_MERCHANTS || BURING_MERCHANTS;
  if (!merchants) return;

  let html = `
    <button onclick="selectMerchant('all')" class="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
      state.activeMerchant === "all"
        ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
    }">
      <span>🌟</span> Semua Warung (${merchants.length})
    </button>
  `;

  merchants.forEach((m) => {
    const isActive = state.activeMerchant === m.id;
    html += `
      <button onclick="selectMerchant('${m.id}')" class="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
        isActive
          ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
      }">
        <span>${m.avatar}</span>
        <span>${m.name}</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

// Select Merchant
function selectMerchant(merchantId) {
  state.activeMerchant = merchantId;
  renderMerchantTabs();
  renderProducts();

  const el = document.getElementById("product-section-title");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Select Kategori
function selectCategory(catName) {
  state.activeCategory = catName;
  renderCategoryPills();
  renderProducts();
}

function renderCategoryPills() {
  const container = document.getElementById("category-pills");
  if (!container) return;

  const categories = [
    { id: "all", label: "Semua Kategori", icon: "🍽️" },
    { id: "Lauk Pagi", label: "Lauk & Sayur Pagi", icon: "🍲" },
    { id: "Lalapan & Sambal", label: "Lalapan & Sambal", icon: "🍗" },
    { id: "Mie", label: "Mie & Kwetiau", icon: "🍜" },
    { id: "Sate", label: "Sate Madura", icon: "🍢" },
    { id: "Cemilan", label: "Frozen & Cemilan", icon: "🥟" },
    { id: "Sayur", label: "Sayur & Dapur", icon: "🥬" }
  ];

  let html = "";
  categories.forEach(c => {
    const isActive = state.activeCategory === c.id;
    html += `
      <button onclick="selectCategory('${c.id}')" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
        isActive
          ? "bg-emerald-600 text-white shadow-xs"
          : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200"
      }">
        <span>${c.icon}</span>
        <span>${c.label}</span>
      </button>
    `;
  });

  container.innerHTML = html;
}

// Render Produk
function renderProducts() {
  const container = document.getElementById("products-container");
  const merchantBanner = document.getElementById("merchant-banner");
  if (!container) return;

  const merchants = window.BURING_MERCHANTS || BURING_MERCHANTS;
  if (!merchants) return;

  // Filter merchants
  const merchantsToDisplay = state.activeMerchant === "all"
    ? merchants
    : merchants.filter((m) => m.id === state.activeMerchant);

  // Update banner jika spesifik merchant
  if (merchantBanner) {
    if (state.activeMerchant !== "all") {
      const current = merchants.find((m) => m.id === state.activeMerchant);
      if (current) {
        merchantBanner.classList.remove("hidden");
        merchantBanner.innerHTML = `
          <div class="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div class="flex items-start gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0 border border-emerald-100">
                ${current.avatar}
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-bold text-slate-900 text-lg sm:text-xl">${current.name}</h3>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    ● Siap Diantar ke Rumah
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-slate-600 mt-0.5">Penjual: <span class="font-medium text-slate-800">${current.owner}</span> • ${current.tagline}</p>
                <div class="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span class="flex items-center gap-1">🕒 ${current.schedule}</span>
                  <span class="flex items-center gap-1 font-semibold text-emerald-700">📱 WhatsApp: ${current.phone}</span>
                </div>
              </div>
            </div>
            <a href="https://wa.me/${current.phone}?text=Halo%20${encodeURIComponent(current.owner)}%2C%20saya%20warga%20Buring%20mau%20tanya%20menu..." target="_blank" 
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all self-end sm:self-center">
              <span>Chat WhatsApp Penjual ↗</span>
            </a>
          </div>
        `;
      } else {
        merchantBanner.classList.add("hidden");
      }
    } else {
      merchantBanner.classList.add("hidden");
    }
  }

  let fullHtml = "";
  let totalMatches = 0;

  merchantsToDisplay.forEach((merchant) => {
    // Filter produk berdasarkan search & kategori
    const matchingProducts = merchant.products.filter((p) => {
      const q = state.searchQuery;
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      let matchesCat = true;
      if (state.activeCategory !== "all") {
        matchesCat =
          p.category.toLowerCase().includes(state.activeCategory.toLowerCase()) ||
          p.name.toLowerCase().includes(state.activeCategory.toLowerCase());
      }

      return matchesSearch && matchesCat;
    });

    if (matchingProducts.length === 0) return;
    totalMatches += matchingProducts.length;

    fullHtml += `
      <div class="mb-10">
        <div class="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-xl">${merchant.avatar}</span>
            <div>
              <h3 class="font-bold text-slate-900 text-base sm:text-lg">${merchant.name}</h3>
              <p class="text-xs text-slate-500">${merchant.owner} • ${merchant.schedule}</p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            ${matchingProducts.length} Menu
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
          ${matchingProducts
            .map((product) => renderProductCard(merchant, product))
            .join("")}
        </div>
      </div>
    `;
  });

  if (totalMatches === 0) {
    container.innerHTML = `
      <div class="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
        <div class="text-4xl mb-2">🔍</div>
        <h4 class="font-bold text-slate-800 text-base">Menu belum ditemukan</h4>
        <p class="text-xs text-slate-500 mt-1">Coba kata kunci lain atau pilih warung yang berbeda.</p>
        <button onclick="document.getElementById('search-input').value=''; state.searchQuery=''; state.activeCategory='all'; renderCategoryPills(); renderProducts();" class="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-medium">Reset Filter</button>
      </div>
    `;
    return;
  }

  container.innerHTML = fullHtml;
}

// Render Card Produk
function renderProductCard(merchant, product) {
  const hasCustomization = product.hasLevel || (product.options && product.options.length > 0);

  return `
    <div class="bg-white rounded-2xl border border-slate-200/80 p-2.5 sm:p-3.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-emerald-300">
      <div>
        <div class="flex items-start justify-between gap-1 mb-1.5 flex-wrap">
          <span class="inline-block px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-100 truncate max-w-[90px] sm:max-w-none">
            ${product.category}
          </span>
          ${
            product.hasLevel
              ? '<span class="inline-block px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold bg-red-100 text-red-700">🌶️ Request Cabai</span>'
              : ""
          }
        </div>
        <h4 class="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
          ${product.name}
        </h4>
        <p class="text-[10px] sm:text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          ${product.description}
        </p>
      </div>

      <div class="mt-2.5 pt-2 border-t border-slate-100 flex flex-col">
        <div class="flex items-baseline justify-between gap-1 mb-1.5">
          <span class="text-[9px] sm:text-[10px] text-slate-400 font-medium">Mulai</span>
          <span class="text-xs sm:text-sm font-extrabold text-slate-900">${formatRupiah(product.price)}</span>
        </div>
        <button onclick="handleProductClick('${merchant.id}', '${product.id}')" 
          class="w-full py-1.5 px-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs ${
            hasCustomization
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
              : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20"
          }">
          ${
            hasCustomization
              ? `<span>Pilih Opsi</span> <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`
              : `<span>+ Tambah</span>`
          }
        </button>
      </div>
    </div>
  `;
}

// Handle Klik Produk
function handleProductClick(merchantId, productId) {
  const merchants = window.BURING_MERCHANTS || BURING_MERCHANTS;
  const merchant = merchants.find((m) => m.id === merchantId);
  const product = merchant.products.find((p) => p.id === productId);

  const hasCustomization = product.hasLevel || (product.options && product.options.length > 0);

  if (!hasCustomization) {
    addToCartDirect(merchant, product);
  } else {
    openProductModal(merchant, product);
  }
}

// Buka Modal Kustomisasi
function openProductModal(merchant, product) {
  state.currentProductModal = {
    merchant,
    product,
    selectedOptions: {},
    spicyLevel: product.hasLevel ? 2 : null,
    notes: "",
    qty: 1
  };

  if (product.options) {
    product.options.forEach((opt) => {
      state.currentProductModal.selectedOptions[opt.name] = {
        choice: opt.choices[0],
        priceDiff: opt.priceDiff ? opt.priceDiff[0] : 0
      };
    });
  }

  const modal = document.getElementById("product-modal");
  if (!modal) return;

  renderModalContent();
  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeProductModal() {
  const modal = document.getElementById("product-modal");
  if (modal) modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
  state.currentProductModal = null;
}

// Render Isi Modal
function renderModalContent() {
  const modalContent = document.getElementById("product-modal-content");
  if (!modalContent || !state.currentProductModal) return;

  const { merchant, product, spicyLevel, selectedOptions, notes, qty } = state.currentProductModal;

  let itemPrice = product.price;
  Object.values(selectedOptions).forEach((opt) => {
    if (opt.priceDiff) itemPrice += opt.priceDiff;
  });

  const totalPrice = itemPrice * qty;

  let optionsHtml = "";

  if (product.options && product.options.length > 0) {
    product.options.forEach((opt) => {
      optionsHtml += `
        <div class="mb-4">
          <label class="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">${opt.name}</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${opt.choices
              .map((choice, idx) => {
                const diff = opt.priceDiff ? opt.priceDiff[idx] : 0;
                const diffText = diff > 0 ? ` (+${formatRupiah(diff)})` : diff < 0 ? ` (${formatRupiah(diff)})` : "";
                const isSelected = selectedOptions[opt.name] && selectedOptions[opt.name].choice === choice;

                return `
                  <button type="button" onclick="setModalOption('${opt.name}', '${choice}', ${diff})"
                    class="p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }">
                    <span>${choice}</span>
                    <span class="text-[11px] opacity-75">${diffText}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        </div>
      `;
    });
  }

  let spicyHtml = "";
  if (product.hasLevel) {
    spicyHtml = `
      <div class="mb-4 p-3.5 bg-red-50/70 border border-red-200/60 rounded-2xl">
        <div class="flex items-center justify-between mb-2">
          <label class="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
            <span>🌶️</span> Level Pedas / Jumlah Cabai
          </label>
          <span class="px-2 py-0.5 rounded-md bg-red-600 text-white font-extrabold text-xs">
            ${spicyLevel === 0 ? "Tidak Pedas" : `Cabai ${spicyLevel}`}
          </span>
        </div>
        <div class="flex items-center gap-1.5 mt-2 justify-between">
          ${[0, 1, 2, 3, 4, 5]
            .map(
              (lvl) => `
            <button type="button" onclick="setModalSpicyLevel(${lvl})"
              class="w-10 h-10 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                spicyLevel === lvl
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30 scale-105"
                  : "bg-white text-slate-700 border border-red-200 hover:bg-red-100"
              }">
              ${lvl === 0 ? "0" : `${lvl}🌶`}
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  modalContent.innerHTML = `
    <div class="p-4 sm:p-6">
      <div class="flex items-start justify-between gap-3 mb-3">
        <div>
          <span class="text-xs font-semibold text-slate-400">${merchant.name}</span>
          <h3 class="font-extrabold text-slate-900 text-lg sm:text-xl">${product.name}</h3>
          <p class="text-xs text-slate-500 mt-1">${product.description}</p>
        </div>
        <button onclick="closeProductModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500">✕</button>
      </div>

      <div class="my-4 max-h-[60vh] overflow-y-auto pr-1">
        ${spicyHtml}
        ${optionsHtml}

        <div class="mb-4">
          <label class="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Catatan Khusus</label>
          <input type="text" id="modal-notes" value="${notes}" oninput="state.currentProductModal.notes = this.value"
            placeholder="Contoh: jangan terlalu manis, kuah dipisah, bumbu banyak"
            class="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 bg-slate-50 focus:bg-white" />
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <div class="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
          <button type="button" onclick="changeModalQty(-1)" class="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-700 font-bold hover:bg-slate-100">−</button>
          <span class="w-8 text-center font-bold text-slate-900 text-sm">${qty}</span>
          <button type="button" onclick="changeModalQty(1)" class="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-700 font-bold hover:bg-slate-100">+</button>
        </div>

        <button type="button" onclick="saveModalToCart()"
          class="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-between transition-all">
          <span>Tambahkan ke Pesanan</span>
          <span>${formatRupiah(totalPrice)}</span>
        </button>
      </div>
    </div>
  `;
}

function setModalOption(optionName, choice, priceDiff) {
  if (!state.currentProductModal) return;
  state.currentProductModal.selectedOptions[optionName] = { choice, priceDiff };
  renderModalContent();
}

function setModalSpicyLevel(lvl) {
  if (!state.currentProductModal) return;
  state.currentProductModal.spicyLevel = lvl;
  renderModalContent();
}

function changeModalQty(delta) {
  if (!state.currentProductModal) return;
  const newQty = state.currentProductModal.qty + delta;
  if (newQty >= 1) {
    state.currentProductModal.qty = newQty;
    renderModalContent();
  }
}

function saveModalToCart() {
  if (!state.currentProductModal) return;

  const { merchant, product, spicyLevel, selectedOptions, notes, qty } = state.currentProductModal;

  let unitPrice = product.price;
  let optionsTextArr = [];

  if (spicyLevel !== null) {
    optionsTextArr.push(spicyLevel === 0 ? "Tidak Pedas" : `Cabai ${spicyLevel}`);
  }

  Object.entries(selectedOptions).forEach(([name, opt]) => {
    if (opt.priceDiff) unitPrice += opt.priceDiff;
    optionsTextArr.push(opt.choice);
  });

  const cartItem = {
    cartId: "buring-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
    merchantId: merchant.id,
    merchantName: merchant.name,
    merchantOwner: merchant.owner,
    merchantPhone: merchant.phone,
    productId: product.id,
    productName: product.name,
    unitPrice: unitPrice,
    qty: qty,
    optionsText: optionsTextArr.join(", "),
    notes: notes ? notes.trim() : ""
  };

  state.cart.push(cartItem);
  saveCart();
  closeProductModal();
  showToast(`${product.name} masuk ke keranjang!`);
  updateCartBadge();
}

function addToCartDirect(merchant, product) {
  const cartItem = {
    cartId: "buring-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
    merchantId: merchant.id,
    merchantName: merchant.name,
    merchantOwner: merchant.owner,
    merchantPhone: merchant.phone,
    productId: product.id,
    productName: product.name,
    unitPrice: product.price,
    qty: 1,
    optionsText: "",
    notes: ""
  };

  state.cart.push(cartItem);
  saveCart();
  showToast(`${product.name} masuk ke keranjang!`);
  updateCartBadge();
}

function saveCart() {
  localStorage.setItem("buring_cart", JSON.stringify(state.cart));
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count-badge");
  const floatingBar = document.getElementById("floating-cart-bar");
  const floatingTotal = document.getElementById("floating-cart-total");
  const floatingItems = document.getElementById("floating-cart-items");

  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  if (badge) {
    badge.innerText = totalQty;
    if (totalQty > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  if (floatingBar) {
    if (totalQty > 0) {
      floatingBar.classList.remove("hidden");
      floatingTotal.innerText = formatRupiah(totalPrice);
      floatingItems.innerText = `${totalQty} Menu Dipesan`;
    } else {
      floatingBar.classList.add("hidden");
    }
  }
}

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  renderCartDrawer();
  drawer.classList.remove("translate-x-full");
  document.getElementById("cart-overlay").classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  drawer.classList.add("translate-x-full");
  document.getElementById("cart-overlay").classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function renderCartDrawer() {
  const container = document.getElementById("cart-items-container");
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 px-4">
        <div class="text-5xl mb-3">🛒</div>
        <h4 class="font-bold text-slate-800 text-base">Keranjang Belanja Kosong</h4>
        <p class="text-xs text-slate-500 mt-1">Silakan pilih menu masakan atau lauk dari warga Buring.</p>
        <button onclick="closeCartDrawer()" class="mt-4 px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs">
          Mulai Belanja
        </button>
      </div>
    `;
    return;
  }

  const grouped = {};
  state.cart.forEach((item) => {
    if (!grouped[item.merchantId]) {
      grouped[item.merchantId] = {
        merchantId: item.merchantId,
        merchantName: item.merchantName,
        merchantOwner: item.merchantOwner,
        merchantPhone: item.merchantPhone,
        items: [],
        total: 0
      };
    }
    grouped[item.merchantId].items.push(item);
    grouped[item.merchantId].total += item.unitPrice * item.qty;
  });

  let html = `
    <!-- Formulir Pemesan -->
    <div class="bg-white rounded-2xl border border-slate-200/90 p-4 mb-4 shadow-xs">
      <div class="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
        <span>📍</span>
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700">Data Pengantaran Buring</h4>
      </div>
      <div class="space-y-3">
        <div>
          <label class="block text-[11px] font-semibold text-slate-600 mb-1">Nama Pemesan <span class="text-red-500">*</span></label>
          <input type="text" id="buyer-name-input" value="${state.buyerName || ''}" 
            oninput="state.buyerName = this.value; localStorage.setItem('buring_buyer_name', this.value);"
            placeholder="Contoh: Bu Rina, Mas Dika" 
            class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 font-medium" />
        </div>
        <div>
          <label class="block text-[11px] font-semibold text-slate-600 mb-1">No. WhatsApp <span class="text-slate-400 font-normal lowercase">(opsional)</span></label>
          <input type="tel" id="buyer-phone-input" value="${state.buyerPhone || ''}"
            oninput="state.buyerPhone = this.value; localStorage.setItem('buring_buyer_phone', this.value);"
            placeholder="Contoh: 08123456789" 
            class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 font-medium" />
        </div>
        <div>
          <label class="block text-[11px] font-semibold text-slate-600 mb-1">Alamat / Blok Rumah <span class="text-red-500">*</span></label>
          <input type="text" id="buyer-address-input" value="${state.buyerAddress || ''}"
            oninput="state.buyerAddress = this.value; localStorage.setItem('buring_buyer_address', this.value);"
            placeholder="Contoh: CitraGarden Blok B3/12" 
            class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 font-medium" />
        </div>
        <div>
          <label class="block text-[11px] font-semibold text-slate-600 mb-1">Catatan Jam Antar / Titip</label>
          <input type="text" id="delivery-notes-input" value="${state.deliveryNotes || ''}"
            oninput="state.deliveryNotes = this.value; localStorage.setItem('buring_delivery_notes', this.value);"
            placeholder="Contoh: Antar jam 11.30, titip satpam" 
            class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 font-medium" />
        </div>
      </div>
    </div>
  `;

  Object.values(grouped).forEach((group) => {
    html += `
      <div class="bg-white rounded-2xl border border-slate-200 p-4 mb-4 shadow-xs">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
          <div>
            <h4 class="font-bold text-slate-900 text-sm">${group.merchantName}</h4>
            <p class="text-[11px] text-slate-500">Penjual: ${group.merchantOwner}</p>
          </div>
          <span class="text-xs font-extrabold text-emerald-700">${formatRupiah(group.total)}</span>
        </div>

        <div class="space-y-3 mb-4">
          ${group.items
            .map(
              (item) => `
            <div class="flex items-start justify-between gap-2 text-xs border-b border-dashed border-slate-100 pb-2.5">
              <div class="flex-1">
                <div class="font-bold text-slate-800">${item.productName}</div>
                ${
                  item.optionsText
                    ? `<div class="text-[11px] text-emerald-700 font-medium mt-0.5">🔹 ${item.optionsText}</div>`
                    : ""
                }
                ${
                  item.notes
                    ? `<div class="text-[11px] text-slate-500 italic mt-0.5">📝 Catatan: "${item.notes}"</div>`
                    : ""
                }
                <div class="text-slate-500 font-semibold mt-1">${formatRupiah(item.unitPrice)} x ${item.qty}</div>
              </div>

              <div class="flex items-center gap-1.5 shrink-0">
                <div class="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                  <button onclick="updateCartItemQty('${item.cartId}', -1)" class="w-6 h-6 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200 rounded-l-lg">−</button>
                  <span class="w-6 text-center font-bold text-slate-800 text-xs">${item.qty}</span>
                  <button onclick="updateCartItemQty('${item.cartId}', 1)" class="w-6 h-6 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200 rounded-r-lg">+</button>
                </div>
                <button onclick="removeCartItem('${item.cartId}')" class="text-red-500 hover:text-red-700 p-1 text-sm font-bold">🗑️</button>
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        <button onclick="checkoutMerchant('${group.merchantId}')" 
          class="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all">
          <span>💬 Kirim Pesanan ke ${group.merchantOwner} via WhatsApp (${formatRupiah(group.total)})</span>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
}

function updateCartItemQty(cartId, delta) {
  const item = state.cart.find((i) => i.cartId === cartId);
  if (!item) return;

  const newQty = item.qty + delta;
  if (newQty <= 0) {
    removeCartItem(cartId);
  } else {
    item.qty = newQty;
    saveCart();
    renderCartDrawer();
    updateCartBadge();
  }
}

function removeCartItem(cartId) {
  state.cart = state.cart.filter((i) => i.cartId !== cartId);
  saveCart();
  renderCartDrawer();
  updateCartBadge();
  showToast("Menu dihapus dari keranjang");
}

function checkoutMerchant(merchantId) {
  const buyerName = (state.buyerName || "").trim();
  const buyerPhone = (state.buyerPhone || "").trim();
  const buyerAddress = (state.buyerAddress || "").trim();
  const deliveryNotes = (state.deliveryNotes || "").trim();

  if (!buyerName) {
    showToast("⚠️ Mohon isi Nama Pemesan terlebih dahulu!");
    const input = document.getElementById("buyer-name-input");
    if (input) input.focus();
    return;
  }

  if (!buyerAddress) {
    showToast("⚠️ Mohon isi Alamat / Blok Rumah di Buring!");
    const input = document.getElementById("buyer-address-input");
    if (input) input.focus();
    return;
  }

  const items = state.cart.filter((i) => i.merchantId === merchantId);
  if (items.length === 0) return;

  const sample = items[0];
  const merchantTotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  // Buat pesan teks WhatsApp rapi
  let message = `*PESANAN DARI WARGA BURING HUB*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Halo ${sample.merchantOwner} (${sample.merchantName}), saya mau pesan:\n\n`;
  message += `👤 *Nama:* ${buyerName}\n`;
  if (buyerPhone) message += `📱 *No HP:* ${buyerPhone}\n`;
  message += `🏠 *Alamat Antar:* ${buyerAddress}\n`;
  if (deliveryNotes) message += `⏰ *Waktu / Catatan:* _${deliveryNotes}_\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 *Rincian Menu:*\n`;

  items.forEach((item, idx) => {
    message += `${idx + 1}. *${item.productName}* (${item.qty}x)\n`;
    if (item.optionsText) {
      message += `   ▪ Varian: ${item.optionsText}\n`;
    }
    if (item.notes) {
      message += `   ▪ Catatan: _${item.notes}_\n`;
    }
    message += `   ▪ Subtotal: ${formatRupiah(item.unitPrice * item.qty)}\n`;
  });

  message += `\n💰 *Total Pembayaran:* ${formatRupiah(merchantTotal)}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `_Mohon info ketersediaan & ongkirnya ya. Terima kasih!_ 🙏✨`;

  // Simpan riwayat order
  const orderRecord = {
    orderId: "BURING-" + Date.now(),
    date: new Date().toISOString(),
    merchantId: sample.merchantId,
    merchantName: sample.merchantName,
    merchantOwner: sample.merchantOwner,
    buyerName: buyerName,
    buyerAddress: buyerAddress,
    items: items,
    total: merchantTotal
  };

  state.savedOrders.unshift(orderRecord);
  localStorage.setItem("buring_orders", JSON.stringify(state.savedOrders));

  // Hapus item merchant ini dari keranjang
  state.cart = state.cart.filter((i) => i.merchantId !== merchantId);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  renderRecap();

  // Buka WhatsApp
  const phone = sample.merchantPhone ? sample.merchantPhone.replace(/[^0-9]/g, "") : "";
  const waUrl = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(waUrl, "_blank");
}

function showToast(msg) {
  const toast = document.getElementById("toast-notification");
  const toastText = document.getElementById("toast-text");
  if (!toast || !toastText) return;

  toastText.innerText = msg;
  toast.classList.remove("translate-y-24", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.add("translate-y-24", "opacity-0");
    toast.classList.remove("translate-y-0", "opacity-100");
  }, 3000);
}

function switchView(viewName) {
  state.activeView = viewName;

  const menuView = document.getElementById("menu-view");
  const recapView = document.getElementById("recap-view");
  const tabMenuBtn = document.getElementById("tab-view-menu");
  const tabRecapBtn = document.getElementById("tab-view-recap");

  if (viewName === "menu") {
    menuView.classList.remove("hidden");
    recapView.classList.add("hidden");

    tabMenuBtn.classList.add("bg-emerald-700", "text-white");
    tabMenuBtn.classList.remove("bg-white", "text-slate-600");

    tabRecapBtn.classList.remove("bg-emerald-700", "text-white");
    tabRecapBtn.classList.add("bg-white", "text-slate-600");
  } else {
    menuView.classList.add("hidden");
    recapView.classList.remove("hidden");

    tabRecapBtn.classList.add("bg-emerald-700", "text-white");
    tabRecapBtn.classList.remove("bg-white", "text-slate-600");

    tabMenuBtn.classList.remove("bg-emerald-700", "text-white");
    tabMenuBtn.classList.add("bg-white", "text-slate-600");

    renderRecap();
  }
}

function renderRecap() {
  const container = document.getElementById("recap-container");
  if (!container) return;

  if (state.savedOrders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
        <div class="text-4xl mb-2">📋</div>
        <h4 class="font-bold text-slate-800 text-sm">Belum Ada Riwayat Pesanan</h4>
        <p class="text-xs text-slate-500 mt-1">Pesanan warga yang telah dikirim via WhatsApp akan tersimpan otomatis di sini.</p>
      </div>
    `;
    return;
  }

  const totalOmset = state.savedOrders.reduce((sum, o) => sum + o.total, 0);

  let html = `
    <div class="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div>
        <div class="text-xs text-emerald-800 font-semibold">Total Pesanan Warga Tercatat</div>
        <div class="text-xl font-extrabold text-emerald-950 mt-0.5">${formatRupiah(totalOmset)}</div>
        <div class="text-xs text-emerald-700 mt-0.5">${state.savedOrders.length} Transaksi Pemesanan</div>
      </div>
    </div>

    <div class="space-y-4">
      ${state.savedOrders
        .map(
          (order) => `
        <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div class="flex items-start justify-between border-b border-slate-100 pb-2.5 mb-2.5">
            <div>
              <div class="font-bold text-slate-900 text-sm">${order.buyerName}</div>
              <p class="text-[11px] text-slate-500 mt-0.5">Alamat: ${order.buyerAddress} • Warung: ${order.merchantName}</p>
            </div>
            <div class="text-right">
              <span class="font-bold text-sm text-emerald-800">${formatRupiah(order.total)}</span>
            </div>
          </div>

          <div class="space-y-1.5 text-xs text-slate-700">
            ${order.items
              .map(
                (item) => `
              <div class="flex items-start justify-between">
                <span>• ${item.productName} (${item.qty}x) ${item.optionsText ? `<span class="text-emerald-700 font-medium">[${item.optionsText}]</span>` : ""} ${item.notes ? `<span class="text-slate-400 italic">("${item.notes}")</span>` : ""}</span>
                <span class="font-medium text-slate-500">${formatRupiah(item.unitPrice * item.qty)}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  container.innerHTML = html;
}
