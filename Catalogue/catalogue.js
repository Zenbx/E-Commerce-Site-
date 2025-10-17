// Données produit d'exemple — remplace par ton backend/API si besoin
      const PRODUCTS = [
        { id: 1, title: "Airpods Pro", category: "Écouteurs", price: 25000, stock: 12, img: "icones/moi.png", featured: true, new: false, desc: "Écouteurs sans fil avec réduction de bruit active." },
        { id: 2, title: "Galaxy S25", category: "Smartphones", price: 420000, stock: 6, img: "icones/phone.png", featured: true, new: true, desc: "Smartphone haut de gamme, écran 6.8\"." },
        { id: 3, title: "MacBook Pro 16", category: "Laptops", price: 2200000, stock: 3, img: "icones/laptop.png", featured: false, new: true, desc: "Puissance pour créateurs et développeurs." },
        { id: 4, title: "Montre X100", category: "Montres", price: 120000, stock: 15, img: "icones/watch.png", featured: false, new: false, desc: "Montre connectée avec suivi santé." },
        { id: 5, title: "Chargeur Rapide 65W", category: "Accessoires", price: 8000, stock: 50, img: "icones/charger.png", featured: false, new: false, desc: "Charge rapide USB-C." },
        { id: 6, title: "Casque Gamer V2", category: "Écouteurs", price: 45000, stock: 7, img: "icones/headset.png", featured: true, new: false, desc: "Son surround et micro amovible." },
        { id: 7, title: "Airpods Pro", category: "Écouteurs", price: 25000, stock: 12, img: "icones/moi.png", featured: true, new: false, desc: "Écouteurs sans fil avec réduction de bruit active." },
        { id: 8, title: "Galaxy S25", category: "Smartphones", price: 420000, stock: 6, img: "icones/phone.png", featured: true, new: true, desc: "Smartphone haut de gamme, écran 6.8\"." },
        { id: 9, title: "MacBook Pro 16", category: "Laptops", price: 2200000, stock: 3, img: "icones/laptop.png", featured: false, new: true, desc: "Puissance pour créateurs et développeurs." },
        { id: 10, title: "Montre X100", category: "Montres", price: 120000, stock: 15, img: "icones/watch.png", featured: false, new: false, desc: "Montre connectée avec suivi santé." },
        { id: 11, title: "Chargeur Rapide 65W", category: "Accessoires", price: 8000, stock: 50, img: "icones/charger.png", featured: false, new: false, desc: "Charge rapide USB-C." },
        { id: 12, title: "Casque Gamer V2", category: "Écouteurs", price: 45000, stock: 7, img: "icones/headset.png", featured: true, new: false, desc: "Son surround et micro amovible." },
        { id: 13, title: "Galaxy S25", category: "Smartphones", price: 420000, stock: 6, img: "icones/phone.png", featured: true, new: true, desc: "Smartphone haut de gamme, écran 6.8\"." },
        { id: 14, title: "MacBook Pro 16", category: "Laptops", price: 2200000, stock: 3, img: "icones/laptop.png", featured: false, new: true, desc: "Puissance pour créateurs et développeurs." },
        { id: 15, title: "Montre X100", category: "Montres", price: 120000, stock: 15, img: "icones/watch.png", featured: false, new: false, desc: "Montre connectée avec suivi santé." },
        { id: 16, title: "Chargeur Rapide 65W", category: "Accessoires", price: 8000, stock: 50, img: "icones/charger.png", featured: false, new: false, desc: "Charge rapide USB-C." },
        { id: 17, title: "Casque Gamer V2", category: "Écouteurs", price: 45000, stock: 7, img: "icones/headset.png", featured: true, new: false, desc: "Son surround et micro amovible." },
       
        // Ajoute autant de produits que nécessaire...
      ];

      // Config pagination
      const PAGE_SIZE = 6;
      let currentPage = 1;
      let filtered = [...PRODUCTS];

      // DOM elements
      const cardsEl = document.getElementById('cards');
      const shownCountEl = document.getElementById('shown-count');
      const productCountEl = document.getElementById('product-count');
      const sortEl = document.getElementById('sort');
      const searchEl = document.getElementById('search');
      const priceRangeEl = document.getElementById('price-range');
      const priceMaxEl = document.getElementById('price-max');
      const categoryFiltersEl = document.getElementById('category-filters');
      const prevPageBtn = document.getElementById('prev-page');
      const nextPageBtn = document.getElementById('next-page');
      const pagesEl = document.getElementById('pages');
      const applyFiltersBtn = document.getElementById('apply-filters');
      const resetFiltersBtn = document.getElementById('reset-filters');
      const cartCountEl = document.getElementById('cart-count');

      // Panier simple (compteur)
      let cartCount = 0;

      // Helpers
      function formatPrice(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
      }

      function renderCards(items) {
        cardsEl.innerHTML = '';
        const start = (currentPage - 1) * PAGE_SIZE;
        const pageItems = items.slice(start, start + PAGE_SIZE);

        if (pageItems.length === 0) {
          cardsEl.innerHTML = `<div class="empty">Aucun produit trouvé. Essayez d'élargir vos filtres.</div>`;
        } else {
          for (const p of pageItems) {
            const article = document.createElement('article');
            article.className = 'card';
            article.setAttribute('data-id', p.id);
            article.innerHTML = `
              <div class="card-thumb">
                <img src="${p.img}" alt="${p.title}" />
              </div>
              <div class="card-body">
                <h4>${p.title}</h4>
                <div class="meta">
                  <div class="qty"><span>${p.stock}</span></div>
                  <div class="price"><span>${formatPrice(p.price)}</span><small>FCFA</small></div>
                </div>
                <div class="card-actions">
                  <button class="btn-add" data-id="${p.id}">Ajouter au panier</button>
                  <button class="btn-quiet quickview" data-id="${p.id}">Aperçu</button>
                </div>
              </div>
            `;
            cardsEl.appendChild(article);
          }
        }

        shownCountEl.textContent = items.length;
        renderPagination(items.length);
        attachCardEvents();
      }

      function renderPagination(totalItems) {
        const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
        pagesEl.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement('button');
          btn.className = 'page-btn';
          btn.textContent = i;
          if (i === currentPage) btn.classList.add('active');
          btn.addEventListener('click', () => { currentPage = i; renderCards(filtered); });
          pagesEl.appendChild(btn);
        }
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
      }

      prevPageBtn.addEventListener('click', () => { if (currentPage>1) { currentPage--; renderCards(filtered); }});
      nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
        if (currentPage < totalPages) { currentPage++; renderCards(filtered); }
      });

      function applyFilters() {
        const query = searchEl.value.trim().toLowerCase();
        const maxPrice = parseInt(priceRangeEl.value, 10);
        const checkedCats = Array.from(categoryFiltersEl.querySelectorAll('input:checked')).map(i => i.value);

        filtered = PRODUCTS.filter(p => {
          if (p.price > maxPrice) return false;
          if (checkedCats.length && !checkedCats.includes(p.category)) return false;
          if (query && !(p.title.toLowerCase().includes(query) || (p.desc && p.desc.toLowerCase().includes(query)))) return false;
          return true;
        });

        // Tri
        const sortVal = sortEl.value;
        if (sortVal === 'price-asc') filtered.sort((a,b)=>a.price-b.price);
        else if (sortVal === 'price-desc') filtered.sort((a,b)=>b.price-a.price);
        else if (sortVal === 'new') filtered.sort((a,b)=> (b.new?1:0) - (a.new?1:0));
        else filtered.sort((a,b)=> (b.featured?1:0) - (a.featured?1:0));

        currentPage = 1;
        renderCards(filtered);
      }

      // Events pour boutons dans chaque carte
      function attachCardEvents() {
        // Add to cart
        document.querySelectorAll('.btn-add').forEach(btn => {
          btn.removeEventListener('click', onAddClick);
          btn.addEventListener('click', onAddClick);
        });

        // Quickview
        document.querySelectorAll('.quickview').forEach(btn => {
          btn.removeEventListener('click', onQuickView);
          btn.addEventListener('click', onQuickView);
        });
      }

      function onAddClick(e) {
        const id = Number(this.dataset.id || e.currentTarget.dataset.id);
        cartCount++;
        cartCountEl.textContent = cartCount;
        // Simple feedback visuel
        this.textContent = 'Ajouté ✓';
        setTimeout(()=> this.textContent = 'Ajouter au panier', 900);
      }

      function onQuickView(e) {
        const id = Number(this.dataset.id || e.currentTarget.dataset.id);
        const product = PRODUCTS.find(p=>p.id===id);
        openQuickView(product);
      }

      // Quick view modal
      const modal = document.getElementById('quickview');
      const modalBody = document.getElementById('quickview-body');
      document.querySelector('.modal-close').addEventListener('click', closeModal);
      modal.addEventListener('click', (ev)=> { if (ev.target === modal) closeModal(); });

      function openQuickView(p) {
        modalBody.innerHTML = `
          <div class="product-container">
          <!-- Galerie d'images produit -->
          <div class="product-gallery">
            <div class="main-image">
              <img src="icones/moi.png" alt="Casque BT 300" id="mainProductImage" />
            </div>
            <div class="thumbnail-gallery">
              <div class="thumbnail active" onclick="changeImage(this, 'icones/moi.png')">
                <img src="icones/moi.png" alt="Vue 1" />
              </div>
              <div class="thumbnail" onclick="changeImage(this, 'icones/moi.png')">
                <img src="icones/moi.png" alt="Vue 2" />
              </div>
              <div class="thumbnail" onclick="changeImage(this, 'icones/moi.png')">
                <img src="icones/moi.png" alt="Vue 3" />
              </div>
              <div class="thumbnail" onclick="changeImage(this, 'icones/moi.png')">
                <img src="icones/moi.png" alt="Vue 4" />
              </div>
            </div>
          </div>

          <!-- Informations produit -->
          <div class="product-info">
            <h1 class="product-title">Casque BT 300</h1>
            
          <div class="product-category">
            <span>Technologie</span>
            <span class="separator">.</span>
            <span>Casque 2025</span>
          </div>

            <div class="product-rating">
              <div class="stars">
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star filled">★</span>
                <span class="star partial">★</span>
              </div>
              <span class="rating-score">4.8/5</span>
              <span class="rating-count">(320 avis)</span>
            </div>

            <div class="product-price">
              <span class="current-price">12000 FCFA</span>
              <span class="old-price">15000 FCFA</span>
            </div>

            <div class="product-description">
              <p>Le Casque BT 300 offre une expérience audio immersive avec réduction de bruit active. Conçu pour le confort, il dispose d'une autonomie de 30 heures et d'une connexion Bluetooth 5.0 stable. Parfait pour vos déplacements quotidiens et vos sessions d'écoute prolongées.</p>
            </div>

            <div class="product-actions">
              <button class="btn-add-cart">AJOUTER AU PANIER</button>
              <button class="btn-buy-now">Acheter maintenant</button>
            </div>
          </div>
        </div>

        `;
        attachCardEvents(); // attacher bouton ajouter du modal
        modal.setAttribute('aria-hidden','false');
        modal.classList.add('open');
      }

      function closeModal() {
        modal.setAttribute('aria-hidden','true');
        modal.classList.remove('open');
      }

      // Price range UI
      priceRangeEl.addEventListener('input', ()=> {
        priceMaxEl.textContent = formatPrice(priceRangeEl.value);
      });

      // Recherche en "enter"
      searchEl.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') applyFilters();
      });

      // Buttons apply / reset
      applyFiltersBtn.addEventListener('click', applyFilters);
      resetFiltersBtn.addEventListener('click', () => {
        searchEl.value = '';
        priceRangeEl.value = priceRangeEl.max;
        priceMaxEl.textContent = formatPrice(priceRangeEl.max);
        categoryFiltersEl.querySelectorAll('input').forEach(i => i.checked = false);
        sortEl.value = 'featured';
        applyFilters();
      });

      // tri change
      sortEl.addEventListener('change', applyFilters);

      // initial render
      (function init() {
        priceMaxEl.textContent = formatPrice(priceRangeEl.value);
        filtered = [...PRODUCTS];
        renderCards(filtered);
      })();

      // Accessibilité: focus trap simple (optionnel)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });
    