// Simple JS to populate products, drive banner and product carousel interactions
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  // --- Banner slider ---
  const banners = Array.from(document.querySelectorAll('.banner-slider .banner'));
  const dotsWrap = document.getElementById('bannerDots');
  let bannerIndex = 0;

  function renderBannerDots(){
    dotsWrap.innerHTML = '';
    banners.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'banner-dot';
      dot.setAttribute('aria-label', `Slide ${i+1}`);
      dot.addEventListener('click', () => goToBanner(i));
      dotsWrap.appendChild(dot);
    });
    updateBanner();
  }

  function updateBanner(){
    banners.forEach((b, i) => b.classList.toggle('active', i === bannerIndex));
    Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === bannerIndex));
  }

  function goToBanner(i){
    bannerIndex = (i + banners.length) % banners.length;
    updateBanner();
  }

  renderBannerDots();
  setInterval(() => { goToBanner(bannerIndex + 1); }, 5000);

  // --- Product data (sample) ---
  const products = [
    { id:1, title:"LEGO Build And Stick: Space", price:"RM 49.90", old:"RM 119.94", off:"58% OFF", img:"https://via.placeholder.com/200x300/ffffff/111?text=LEGO" },
    { id:2, title:"My Big First Learn-To-Write Workbook", price:"RM 39.90", old:"RM 89.95", off:"56% OFF", img:"https://via.placeholder.com/200x300/ffffff/111?text=Workbook" },
    { id:3, title:"The 48 Laws Of Power", price:"RM 44.90", old:"RM 69.90", off:"36% OFF", img:"https://via.placeholder.com/200x300/ffffff/111?text=Power" },
    { id:4, title:"Mastery", price:"RM 44.90", old:"RM 69.90", off:"36% OFF", img:"https://via.placeholder.com/200x300/ffffff/111?text=Mastery" },
    { id:5, title:"Encyclopedia Of Animals", price:"RM 34.90", old:"RM 79.95", off:"56% OFF", img:"https://via.placeholder.com/200x300/ffffff/111?text=Animals" },
    { id:6, title:"A Treasury Of Tales For Four Year Olds", price:"RM 59.90", old:"RM 114.95", off:"48% OFF", img:"https://via.placeholder.com/200x300/ffffff/111?text=Treasury" },
    { id:7, title:"The Ashes & The Star-Cursed King", price:"RM 39.90", old:"RM 99.95", off:"60% OFF", img:"https://via.placeholder.com/200x300/ffffff/111?text=Ashes" }
  ];

  const productCarousel = document.getElementById('productCarousel');

  function renderProducts(){
    productCarousel.innerHTML = '';
    products.forEach(p => {
      const el = document.createElement('article');
      el.className = 'product';
      el.innerHTML = `
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
        <div class="prod-title">${p.title}</div>
        <div class="price-row">
          <div class="price">${p.price}</div>
          <div class="old-price">${p.old}</div>
        </div>
        <div class="discount-badge">${p.off}</div>
        <button class="add-btn" data-id="${p.id}">ADD TO CART</button>
      `;
      productCarousel.appendChild(el);
    });
  }

  renderProducts();

  // Carousel next/prev (scroll by width of a product)
  const prodNext = document.getElementById('prodNext');
  const prodPrev = document.getElementById('prodPrev');

  function scrollCarousel(dir=1){
    const card = productCarousel.querySelector('.product');
    if(!card) return;
    const cardWidth = card.getBoundingClientRect().width + parseFloat(getComputedStyle(productCarousel).gap || 16);
    productCarousel.scrollBy({ left: cardWidth * dir * 2, behavior: 'smooth' }); // two cards at a time
  }

  prodNext && prodNext.addEventListener('click', () => scrollCarousel(1));
  prodPrev && prodPrev.addEventListener('click', () => scrollCarousel(-1));

  // Add to cart demo
  let cartCount = 0;
  productCarousel.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-btn');
    if(!btn) return;
    cartCount++;
    const bubble = document.querySelector('.cart-bubble');
    bubble.textContent = cartCount;
    // tiny confirmation
    btn.textContent = 'ADDED ✓';
    setTimeout(() => btn.textContent = 'ADD TO CART', 1200);
  });

  // Keyboard accessibility: left/right arrow for product carousel
  productCarousel.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') scrollCarousel(1);
    if(e.key === 'ArrowLeft') scrollCarousel(-1);
  });
});
