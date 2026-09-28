function renderCart(){
 const c=cart(),wrap=$("#cartLayout");
 $("#bagItems").textContent=`${c.reduce((a,x)=>a+x.qty,0)} items`;
 if(!c.length){wrap.innerHTML=`<div class="empty cart-empty"><div>🛍</div><h2>Your bag is empty</h2><p>Add something you love and it will appear here.</p><a href="products.html" class="btn btn-dark">START SHOPPING</a></div>`;return}
 let subtotal=0;
 const rows=c.map((x,i)=>{const p=PRODUCTS.find(z=>z.id===x.id);const total=p.price*x.qty;subtotal+=total;return `<div class="cart-item"><img src="${p.img}"><div class="cart-item-info"><p class="brand">${p.brand}</p><h3>${p.name}</h3><p>Size: <b>${x.size}</b></p><div class="qty"><button onclick="changeQty(${i},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${i},1)">+</button></div></div><div class="cart-item-right"><b>₹${total.toLocaleString('en-IN')}</b><button onclick="removeItem(${i})">Remove</button></div></div>`}).join("");
 const delivery=subtotal>=999?0:99,grand=subtotal+delivery;
 wrap.innerHTML=`<section class="cart-items">${rows}</section><aside class="summary-card"><h3>PRICE DETAILS</h3><div><span>Bag Total</span><b>₹${subtotal.toLocaleString('en-IN')}</b></div><div><span>Discount</span><b class="green">- ₹${(c.reduce((a,x)=>{let p=PRODUCTS.find(z=>z.id===x.id);return a+(p.mrp-p.price)*x.qty},0)).toLocaleString('en-IN')}</b></div><div><span>Delivery</span><b>${delivery?'₹99':'FREE'}</b></div><hr><div class="grand"><span>Total Amount</span><b>₹${grand.toLocaleString('en-IN')}</b></div><input id="coupon" class="coupon" placeholder="Enter coupon code"><button id="applyCoupon" class="coupon-btn">APPLY</button><a class="btn btn-dark full" href="checkout.html">PLACE ORDER →</a><p class="secure-note">🔒 Safe and secure payments. Demo checkout.</p></aside>`;
 $("#applyCoupon").onclick=()=>{const v=$("#coupon").value.trim().toUpperCase();if(v==="STYLE10")toast("Coupon applied! 10% demo discount");else toast("Try coupon STYLE10")};
}
function changeQty(i,d){const c=cart();c[i].qty+=d;if(c[i].qty<=0)c.splice(i,1);set("styleSphereCart",c);refreshCounts();renderCart()}
function removeItem(i){const c=cart();c.splice(i,1);set("styleSphereCart",c);refreshCounts();renderCart();toast("Item removed")}
document.addEventListener("DOMContentLoaded",renderCart);