/* The Unenshittifiable License — shared behaviour */

/* The warden goose honks when you poke it. It only attacks toll booths. */
function honk(e){
  e.preventDefault();
  e.stopPropagation();
  var img = e.currentTarget;
  if (img.dataset.honking) return;
  img.dataset.honking = "1";
  var origSrc = img.getAttribute("src");
  var origAnim = img.style.animation;
  img.style.animation = "none";
  img.style.transition = "transform .15s cubic-bezier(.34,1.56,.64,1)";
  img.style.transformOrigin = "center top";
  img.style.zIndex = "60";
  img.style.position = "relative";
  img.src = "assets/goose_honk.png";
  img.style.transform = "scale(1.28) rotate(-7deg)";
  setTimeout(function(){ img.style.transform = "scale(1.24) rotate(8deg)"; }, 150);
  setTimeout(function(){ img.style.transform = "scale(1.24) rotate(-3deg)"; }, 330);
  setTimeout(function(){
    img.src = origSrc;
    img.style.transform = "";
    img.style.animation = origAnim;
    delete img.dataset.honking;
  }, 950);
}

/* FAQ accordion — a single panel open at a time. */
function setFaqSign(item, open){
  var sign = item.querySelector("[data-faq-sign]");
  if (!sign) return;
  sign.textContent = open ? "−" : "+";
  sign.style.background = open ? "#ffce3a" : "#221f2c";
  sign.style.color = open ? "#13121b" : "#cfc9da";
}
function toggleFaq(btn){
  var item = btn.closest("[data-faq]");
  var willOpen = item.getAttribute("data-open") !== "1";
  document.querySelectorAll("[data-faq]").forEach(function(el){
    if (el === item) return;
    el.setAttribute("data-open", "0");
    var a = el.querySelector("[data-faq-answer]");
    if (a) a.style.display = "none";
    setFaqSign(el, false);
  });
  item.setAttribute("data-open", willOpen ? "1" : "0");
  var ans = item.querySelector("[data-faq-answer]");
  if (ans) ans.style.display = willOpen ? "block" : "none";
  setFaqSign(item, willOpen);
}
