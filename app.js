const $=s=>document.querySelector(s);
const get=(k,d=[])=>JSON.parse(localStorage.getItem(k)||JSON.stringify(d));
const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function cart(){return get("styleSphereCart",[])}
function wishlist(){return get("styleSphereWishlist",[])}
function refreshCounts(){
  const c=cart(),w=wishlist();
  const cc=$("#cartCount"),wc=$("#wishCount");
  if(cc)cc.textContent=c.reduce((a,x)=>a+x.qty,0);
  if(wc)wc.textContent=w.length;
}
function toast(msg){const t=$("#toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function addToCart(id,size){
  const p=PRODUCTS.find(x=>x.id===id), c=cart(), s=size||p.sizes[0];
  const item=c.find(x=>x.id===id&&x.size===s);
  if(item)item.qty++;else c.push({id,size:s,qty:1});
  set("styleSphereCart",c);refreshCounts();toast("Added to bag ✓");
}
function toggleWish(id){
  const w=wishlist(),i=w.indexOf(id);
  if(i>-1){w.splice(i,1);toast("Removed from wishlist");}else{w.push(id);toast("Added to wishlist ♡")}
  set("styleSphereWishlist",w);refreshCounts();renderProductCards();
}
function productCard(p){
  const liked=wishlist().includes(p.id);
  return `<article class="product-card">
    <div class="product-img-wrap"><a href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name}"></a><button class="wish-btn ${liked?'liked':''}" onclick="toggleWish(${p.id})">${liked?'♥':'♡'}</button><span class="discount-tag">${p.discount}% OFF</span></div>
    <div class="product-info"><p class="brand">${p.brand}</p><a class="product-name" href="product.html?id=${p.id}">${p.name}</a><div class="rating">${p.rating} ★</div><div class="price">₹${p.price.toLocaleString('en-IN')} <del>₹${p.mrp.toLocaleString('en-IN')}</del> <em>(${p.discount}% OFF)</em></div><button class="bag-btn" onclick="addToCart(${p.id})">ADD TO BAG</button></div>
  </article>`;
}
function renderProductCards(){document.querySelectorAll("[data-product-id]").forEach(e=>{});refreshCounts()}
function initSearch(){
 const input=$("#globalSearch");if(!input)return;
 input.addEventListener("keydown",e=>{if(e.key==="Enter"&&input.value.trim())location.href="products.html?search="+encodeURIComponent(input.value.trim())});
}
document.addEventListener("DOMContentLoaded",()=>{refreshCounts();initSearch()});