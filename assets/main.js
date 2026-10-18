(function(){var d=document,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var b=d.querySelector('.burger'),m=d.getElementById('menu');
b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded',false)}});
var pr=d.querySelector('.progress'),hd=d.querySelector('header.site'),tk=false;
function onS(){tk=false;var s=window.pageYOffset,mx=d.documentElement.scrollHeight-innerHeight;if(pr)pr.style.transform='scaleX('+(mx>0?s/mx:0)+')';hd.classList.toggle('stuck',s>40)}
window.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(onS)}},{passive:true});onS();
var els=d.querySelectorAll('.rv');
if(rm||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')})}else{
 d.querySelectorAll('.grid3,.grid4,.steps,.strip ul,.chips').forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){c.classList.add('rv');c.style.setProperty('--d',(i*0.1)+'s')})});
 els=d.querySelectorAll('.rv');var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});els.forEach(function(e){io.observe(e)})}
var TO='cleaningbyastrids@gmail.com';
d.querySelectorAll('form[data-mail]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var ok=true;f.querySelectorAll('[required]').forEach(function(x){var v=x.value.trim();if(!v||(x.type==='email'&&!/^\S+@\S+\.\S+$/.test(v))){ok=false;x.classList.add('bad')}else x.classList.remove('bad')});
 var msg=f.querySelector('.msg');msg.className='msg show';if(!ok){msg.textContent='Please complete the required fields.';return}
 var L=[f.dataset.mail];new FormData(f).forEach(function(v,k){if(String(v).trim())L.push(k+': '+v)});
 msg.textContent='Opening your email app...';location.href='mailto:'+TO+'?subject='+encodeURIComponent(f.dataset.mail)+'&body='+encodeURIComponent(L.join('\n'))})});
})();
