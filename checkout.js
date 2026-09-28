document.addEventListener("DOMContentLoaded",()=>{
 const c=cart(),summary=$("#checkoutSummary");
 if(!c.length){summary.innerHTML="<h3>Your bag is empty.</h3><a class='btn btn-dark' href='products.html'>SHOP NOW</a>";$("#checkoutForm").style.display="none";return}
 let sub=0;c.forEach(x=>{const p=PRODUCTS.find(z=>z.id===x.id);sub+=p.price*x.qty});
 const delivery=sub>=999?0:99,total=sub+delivery;
 summary.innerHTML=`<h3>ORDER SUMMARY</h3>${c.map(x=>{const p=PRODUCTS.find(z=>z.id===x.id);return `<div class="mini-product"><img src="${p.img}"><span>${p.name}<small>Qty: ${x.qty}</small></span><b>₹${(p.price*x.qty).toLocaleString('en-IN')}</b></div>`}).join("")}<hr><div><span>Bag Total</span><b>₹${sub.toLocaleString('en-IN')}</b></div><div><span>Delivery</span><b>${delivery?'₹99':'FREE'}</b></div><hr><div class="grand"><span>Amount Payable</span><b>₹${total.toLocaleString('en-IN')}</b></div>`;
 $("#checkoutForm").onsubmit=e=>{e.preventDefault();localStorage.setItem("styleSphereLastOrder",JSON.stringify({items:c,total,date:new Date().toISOString()}));location.href="order-success.html"};
});