const t={body:document.querySelector("body"),start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")};let e=null;t.start.addEventListener("click",(function(){t.start.setAttribute("disabled",!0),e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),t.stop.addEventListener("click",(function(){clearInterval(e),t.start.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.0a138045.js.map