(function(){var d=document,f=d.getElementById('bk');if(!f)return;
var step=1,panes=[].slice.call(f.querySelectorAll('.pane')),dots=[].slice.call(f.querySelectorAll('.stepper li')),back=d.getElementById('back'),next=d.getElementById('next'),files=[],MAX=6,LIM=10*1024*1024;
var NAMES={res:'Residential cleaning',str:'Short-term rental cleaning',move:'Move-in / move-out cleaning'};
var d1=d.getElementById('d1'),d2=d.getElementById('d2');var t=new Date();t.setDate(t.getDate()+1);var iso=function(x){return x.getFullYear()+'-'+('0'+(x.getMonth()+1)).slice(-2)+'-'+('0'+x.getDate()).slice(-2)};d1.min=d2.min=iso(t);
function svcs(){return [].map.call(f.querySelectorAll('input[name=svc]:checked'),function(x){return x.value})}
function items(){var o=[];var fr=f.querySelector('[name=Frequency]');if(fr&&fr.value&&svcs().indexOf('res')>-1)o.push('Frequency: '+fr.value);[].forEach.call(f.querySelectorAll('.qty'),function(q){var n=+q.querySelector('output').textContent;if(n>0)o.push(q.dataset.k+': '+n)});var ex=[].map.call(f.querySelectorAll('input[name=extra]:checked'),function(x){return x.value});if(ex.length)o.push('Extras: '+ex.join(', '));return o}
function fmt(v){if(!v)return '';var a=v.split('-');return new Date(a[0],a[1]-1,a[2]).toLocaleDateString('en-CA',{weekday:'short',month:'short',day:'numeric',year:'numeric'})}
function sum(){var s=svcs();d.getElementById('s1').textContent=s.length?s.map(function(k){return NAMES[k]}).join('\n'):'Not chosen yet';var it=items();d.getElementById('s2').textContent=it.length?it.join('\n'):'-';var tm=f.querySelector('[name=Time]:checked');d.getElementById('s3').textContent=d1.value?fmt(d1.value)+(tm?', '+tm.value:''):'-'}
function show(n){step=n;panes.forEach(function(p,i){p.hidden=(i+1)!==n});dots.forEach(function(x,i){x.classList.toggle('on',i+1===n);x.classList.toggle('done',i+1<n)});back.hidden=n===1;next.textContent=n===4?'Request booking':'Next →';sum();if(n>1){var top=f.getBoundingClientRect().top+window.pageYOffset-130;window.scrollTo({top:top,behavior:'smooth'})}}
function err(n,m){var e=panes[n-1].querySelector('.err');e.textContent=m||'';e.classList.toggle('show',!!m)}
function ok(n){err(n,'');if(n===1&&!svcs().length){err(1,'Please choose at least one service.');return false}
 if(n===3&&!d1.value){err(3,'Please pick a preferred date.');d1.classList.add('bad');return false}
 if(n===4){var bad=0;[].forEach.call(panes[3].querySelectorAll('[required]'),function(x){var v=x.value.trim();if(!v||(x.type==='email'&&!/^\S+@\S+\.\S+$/.test(v))){x.classList.add('bad');bad++}else x.classList.remove('bad')});if(bad){err(4,'Please complete your name, a valid email, phone and address.');return false}}return true}
f.addEventListener('change',sum);f.addEventListener('input',sum);
f.addEventListener('click',function(e){var b=e.target.closest('.qty button');if(!b)return;var o=b.parentNode.querySelector('output'),n=+o.textContent;n=b===b.parentNode.firstElementChild?Math.max(0,n-1):Math.min(30,n+1);o.textContent=n;sum()});
back.onclick=function(){show(step-1)};
next.onclick=function(){if(!ok(step))return;if(step<4)return show(step+1);submit()};
var th=f.querySelector('.thumbs'),inp=d.getElementById('ph');
function draw(){th.innerHTML='';files.forEach(function(file,i){var li=d.createElement('li'),im=d.createElement('img'),bt=d.createElement('button');im.src=URL.createObjectURL(file);im.alt=file.name;bt.type='button';bt.setAttribute('aria-label','Remove '+file.name);bt.innerHTML='&times;';bt.onclick=function(){files.splice(i,1);draw()};li.appendChild(im);li.appendChild(bt);th.appendChild(li)})}
inp.addEventListener('change',function(){var skip=0;[].forEach.call(inp.files,function(x){if(x.type.indexOf('image/')!==0||x.size>LIM||files.length>=MAX)skip++;else files.push(x)});inp.value='';draw();err(2,skip?'Some files were skipped. Use images under 10 MB, up to '+MAX+' photos.':'')});
function submit(){var L=['Online booking request'],s=svcs().map(function(k){return NAMES[k]});L.push('Services: '+s.join(', '));items().forEach(function(x){L.push(x)});var n=f.querySelector('#nt').value.trim();if(n)L.push('Notes: '+n);
 L.push('Preferred date: '+fmt(d1.value)+' ('+f.querySelector('[name=Time]:checked').value+')');if(d2.value)L.push('Backup date: '+fmt(d2.value));
 ['Name','Email','Phone','Address'].forEach(function(k){L.push(k+': '+f.querySelector('[name='+k+']').value.trim())});
 var text=L.join('\n'),msg=panes[3].querySelector('.msg');msg.className='msg show';
 if(files.length&&navigator.canShare&&navigator.canShare({files:files})){msg.textContent='Choose your email app to send your request and photos...';navigator.share({files:files,text:text,title:'Online booking request'}).then(thanks).catch(function(){msg.textContent='Sharing was cancelled. You can try again.'});return}
 if(files.length)text+='\nPhotos: '+files.length+' to attach';
 msg.textContent=files.length?'Opening your email. Please attach your '+files.length+' photo(s) there.':'Opening your email app...';
 location.href='mailto:cleaningbyastrids@gmail.com?subject='+encodeURIComponent('Online booking request')+'&body='+encodeURIComponent(text);setTimeout(thanks,1200)}
function thanks(){var c=d.createElement('div');c.className='done';c.setAttribute('role','status');c.innerHTML='<div class="tick">&#10003;</div><h2>Thank you!</h2><p>Send the email that just opened and we will confirm your estimate and booking by phone or email. You can also call <a href="tel:14037140060"><b>(403) 714-0060</b></a>.</p><a class="btn" href="index.html">Back to home</a>';f.innerHTML='';f.appendChild(c)}
show(1);
})();
