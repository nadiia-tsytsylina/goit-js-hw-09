var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("iQIUW");document.querySelector("input[name = delay]"),document.querySelector("input[name = step]"),document.querySelector("input[name = amount]");function i(e,t){return new Promise(((n,o)=>{const r=Math.random()>.3;setTimeout((()=>{r?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();const{elements:{delay:t,step:n,amount:o}}=e.currentTarget;let u=Number(t.value),l=Number(n.value),a=Number(o.value);for(let e=1;e<=a;e+=1)i(e,u).then((({position:e,delay:t})=>r.Notify.success(`✅ Fulfilled a promise ${e} in ${t}ms`))).catch((({position:e,delay:t})=>r.Notify.failure(`❌ Rejected a promise ${e} in ${t}ms`))),u+=l;e.currentTarget.reset()}));
//# sourceMappingURL=03-promises.570f2e60.js.map
