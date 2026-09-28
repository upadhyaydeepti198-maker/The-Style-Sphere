document.addEventListener("DOMContentLoaded",()=>{
 $("#loginForm").onsubmit=e=>{e.preventDefault();const id=$("#loginId").value.trim();localStorage.setItem("styleSphereUser",id);$("#loginMessage").textContent="Login successful! Welcome to The Style Sphere.";setTimeout(()=>location.href="index.html",900)}
});