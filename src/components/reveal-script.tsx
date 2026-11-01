/**
 * Fades every `[data-reveal]` block in as it enters the viewport.
 *
 * Plain inline JS, run while the HTML is parsed (before first paint and before
 * hydration), so there is no flash and no client bundle. Blocks are hidden
 * only after this script has set `html.reveal`: without JS, without
 * IntersectionObserver or with reduced motion everything stays visible.
 * Blocks that enter together are staggered in DOM order; the first batch
 * waits for the profile header to land.
 */
const script = `(function(){
var d=document.documentElement;
if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
d.classList.add("reveal");
var first=true;
var io=new IntersectionObserver(function(entries){
var i=0,base=first?180:0;first=false;
entries.forEach(function(e){
if(!e.isIntersecting)return;
var el=e.target;
el.style.setProperty("--reveal-delay",base+Math.min(i++,6)*70+"ms");
el.setAttribute("data-revealed","");
io.unobserve(el);
});
},{rootMargin:"0px 0px -6% 0px"});
document.querySelectorAll("[data-reveal]").forEach(function(el){io.observe(el)});
})()`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
