document.addEventListener("DOMContentLoaded",()=>{
 const w=wishlist(),grid=$("#wishlistGrid");$("#wishlistItems").textContent=`${w.length} saved`;
 if(!w.length){grid.innerHTML=`<div class="empty cart-empty"><div>♡</div><h2>Your wishlist is empty</h2><p>Save products you love for later.</p><a href="products.html" class="btn btn-dark">EXPLORE PRODUCTS</a></div>`;return}
 grid.innerHTML=w.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean).map(productCard).join("");
});