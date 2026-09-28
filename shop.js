let filtered=[];
function qs(){return new URLSearchParams(location.search)}
function applyFilters(){
 const q=(qs().get("search")||"").toLowerCase(), urlCat=qs().get("category");
 const cats=[...document.querySelectorAll(".catFilter:checked")].map(x=>x.value);
 const types=[...document.querySelectorAll(".typeFilter:checked")].map(x=>x.value);
 const price=document.querySelector('input[name="price"]:checked')?.value;
 const disc=Number(document.querySelector('input[name="discount"]:checked')?.value||0);
 filtered=PRODUCTS.filter(p=>{
   const text=(p.name+" "+p.brand+" "+p.category+" "+p.type).toLowerCase();
   if(q&&!text.includes(q))return false;
   if(urlCat&&!cats.length&&p.category!==urlCat)return false;
   if(cats.length&&!cats.includes(p.category))return false;
   if(types.length&&!types.includes(p.type))return false;
   if(price){const [a,b]=price.split("-").map(Number);if(p.price<a||p.price>b)return false}
   if(disc&&p.discount<disc)return false;
   return true;
 });
 sortProducts();
}
function sortProducts(){
 const s=$("#sortSelect").value;
 filtered.sort((a,b)=>s==="low"?a.price-b.price:s==="high"?b.price-a.price:s==="rating"?b.rating-a.rating:s==="discount"?b.discount-a.discount:s==="new"?b.id-a.id: a.id-b.id);
 render();
}
function render(){
 const grid=$("#productGrid"), empty=$("#emptyState");
 $("#resultCount").textContent=`${filtered.length} products`;
 grid.innerHTML=filtered.map(productCard).join("");
 empty.classList.toggle("hidden",filtered.length>0);
}
document.addEventListener("DOMContentLoaded",()=>{
 const q=qs(), cat=q.get("category"), search=q.get("search");
 if(cat){$("#pageTitle").textContent=cat+" Fashion";$("#crumb").textContent=cat}
 if(search){$("#pageTitle").textContent=`Search results for "${search}"`;$("#crumb").textContent="Search"}
 document.querySelectorAll(".catFilter").forEach(x=>x.addEventListener("change",applyFilters));
 document.querySelectorAll(".typeFilter").forEach(x=>x.addEventListener("change",applyFilters));
 document.querySelectorAll('input[name="price"],input[name="discount"]').forEach(x=>x.addEventListener("change",applyFilters));
 $("#sortSelect").addEventListener("change",sortProducts);
 $("#clearFilters").onclick=()=>{document.querySelectorAll("input[type=checkbox],input[type=radio]").forEach(x=>x.checked=false);location.href="products.html"};
 $("#emptyClear").onclick=()=>location.href="products.html";
 applyFilters();
});