const P=document.body.dataset.page, Q=new URLSearchParams(location.search), app=document.getElementById('app');
const cur=P==='service'?Q.get('s'):P;
const NAV=[['index.html','Home','home'],['service.html?s=catering','Catering','catering'],['service.html?s=charcuterie','Charcuterie','charcuterie'],['service.html?s=cheese','Cheese','cheese'],['gallery.html','Galerie','gallery'],['contact.html','Contact us','contact']];
const card=(img,t,body,btn)=>`<article class="card"><div class="ph"><img src="${img}" alt="${t}" loading="lazy"></div><div class="pad"><h3>${t}</h3>${body}${btn}</div></article>`;
const V={tel:s=>/^\+?[0-9\s\-]{8,16}$/.test(s.trim()),mail:s=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim())};
const today=new Date().toISOString().split('T')[0];
async function send(body,form,msg){
 const btn=form.querySelector('button[type=submit]');btn.disabled=true;
 try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:WEB3FORMS_KEY,from_name:'Site Tavola',...body})});
  if(!(await r.json()).success)throw 0;
  msg.innerHTML='<div class="alert good">Mulțumim! Comanda a fost trimisă, te contactăm curând.</div>';form.reset();form.dispatchEvent(new Event('reset'));
 }catch{msg.innerHTML=`<div class="alert bad">Nu am putut trimite comanda. Sună-ne la ${CONTACT.tel}.</div>`}
 btn.disabled=false;msg.scrollIntoView({behavior:'smooth',block:'center'});
}
const infoBlock=`<p><b>Telefon</b><br><a href="tel:${CONTACT.tel.replace(/\s/g,'')}">${CONTACT.tel}</a></p><p><b>Email</b><br><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p><p><b>Adresă</b><br>${CONTACT.adresa}</p><p><b>Program</b><br>${CONTACT.program}</p>`;

const platterHTML=`<section class="wrap" id="platou"><h2>Creează-ți platoul charcuterie</h2><div id="platmsg"></div>
<form id="platForm" class="builder" novalidate>
 <label>Mărimea platoului<select name="marime"><option value="">Alege mărimea</option>${PLATTER_SIZES.map((x,i)=>`<option value="${i}">${x.nume} – de la ${x.pret} lei</option>`).join('')}</select></label>
 <p>Alege doar ce îți place. <b>Primele 2 opțiuni din fiecare categorie sunt incluse în preț.</b> Fiecare opțiune suplimentară adaugă <b>+10 lei</b>. Selectate: <b id="platCount">0</b></p>
 ${Object.entries(PLATTER_ITEMS).map(([g,l])=>`<fieldset><legend>${g}</legend>${l.map(o=>`<label class="chk"><input type="checkbox" name="pi" data-g="${g}" value="${o}"> ${o}</label>`).join('')}</fieldset>`).join('')}
 <label>Alergii sau alte dorințe (opțional)<textarea name="mesaj" rows="2" maxlength="500"></textarea></label>
 <label class="chk"><input type="checkbox" name="gift"> Este cadou</label>
 <div id="platGift" hidden><div class="row"><label>Numele destinatarului<input type="text" name="dest" maxlength="100"></label><label>Mesaj pe felicitare<input type="text" name="felicitare" maxlength="200"></label></div></div>
 <div class="row"><label>Nume și prenume<input type="text" name="nume" maxlength="100"></label><label>Telefon<input type="tel" name="telefon" placeholder="+373 69 123 456"></label></div>
 <div class="row"><label>Email<input type="email" name="email"></label><label>Data livrării<input type="date" name="data" min="${today}"></label></div>
 <label>Adresa de livrare<input type="text" name="adresa" maxlength="200"></label>
 <p class="total">Total estimat: <span id="platTotal">0 lei</span></p><p class="errmsg" id="platerr" role="alert"></p>
 <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off"><button class="btn" type="submit">Comandă platoul</button>
</form></section>`;

let main='';
if(P==='home'){
 main=`<section class="hero"><div class="slides">${HERO_SLIDES.map((s,i)=>`<div class="slide${i?'':' on'}" style="background-image:url('${s}')"></div>`).join('')}</div><div class="shade"></div>
 <h1>Tavola</h1><p class="moto">Sapori d'Oro</p><a class="btn" href="contact.html">Cere o ofertă</a>
 <div class="dots">${HERO_SLIDES.map((_,i)=>`<button aria-label="Imaginea ${i+1}" data-i="${i}" class="${i?'':'on'}"></button>`).join('')}</div></section>
 <section class="wrap"><h2>Ce îți pregătim</h2><div class="grid3">${Object.entries(SERVICES).map(([k,s])=>card(s.img,s.titlu,`<p>${s.intro}</p>`,`<a class="btn small" href="service.html?s=${k}">Vezi detalii</a>`)).join('')}</div></section>`;
}else if(P==='service'){
 const s=SERVICES[cur];
 if(!s)location.replace('index.html');
 else if(cur==='cheese'){
   // --- PAGINA CHEESE ---
   document.title='Tavola – '+s.titlu;
   main=`<section class="pagehead"><h1>${s.titlu}</h1><p>${s.intro}</p><p><a class="btn small" href="#set">Creează-ți setul cu vin</a></p></section>
   <section class="wrap"><h2>Cașcavaluri la porție</h2><div class="grid4">${CHEESES.map((c,i)=>card(c[3]||IMG('cheese'+i,500,400),c[0],`<p>${c[1]}</p>`,`<p class="price">${c[2]} lei / 100 g</p>`)).join('')}</div></section>
   <section class="wrap" id="set"><h2>Creează-ți setul: cașcavaluri + vin</h2><div id="setmsg"></div>
   <form id="setForm" class="builder" novalidate>
    <div class="row"><label>Mărimea setului<select name="marime"><option value="">Alege mărimea</option>${SETS.map((x,i)=>`<option value="${i}">${x.nume} – ${x.n} cașcavaluri (${x.pret} lei)</option>`).join('')}</select></label>
    <label>Sticla de vin<select name="vin"><option value="">Alege vinul</option>${WINES.map((x,i)=>`<option value="${i}">${x.nume}${x.pret?' (+'+x.pret+' lei)':''}</option>`).join('')}</select></label></div>
    <fieldset><legend id="cnt">Alege mai întâi mărimea setului</legend>${CHEESES.map(c=>`<label class="chk"><input type="checkbox" name="chs" value="${c[0]}"> ${c[0]}</label>`).join('')}</fieldset>
    <label class="chk"><input type="checkbox" name="gift"> Este cadou</label>
    <div id="giftFields" hidden><div class="row"><label>Numele destinatarului<input type="text" name="dest" maxlength="100"></label><label>Mesaj pe felicitare<input type="text" name="felicitare" maxlength="200"></label></div></div>
    <div class="row"><label>Nume și prenume<input type="text" name="nume" maxlength="100"></label><label>Telefon<input type="tel" name="telefon" placeholder="+373 69 123 456"></label></div>
    <div class="row"><label>Email<input type="email" name="email"></label><label>Data livrării<input type="date" name="data" min="${today}"></label></div>
    <label>Adresa de livrare<input type="text" name="adresa" maxlength="200"></label>
    <p class="total">Total: <span id="total">0 lei</span></p><p class="errmsg" id="seterr" role="alert"></p>
    <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off"><button class="btn" type="submit">Comandă setul</button></form></section>`;
 } else {
   // --- PAGINA CATERING & CHARCUTERIE ---
   document.title='Tavola – '+s.titlu;
   main=`<section class="pagehead"><h1>${s.titlu}</h1><p>${s.intro}</p>${cur==='charcuterie'?'<p><a class="btn small" href="#platou">Creează-ți platoul</a></p>':''}</section>
   <section class="wrap"><div class="grid3">${s.offers.map(o=>card(o[3],o[0],`<p class="price">${o[1]}</p><p>${o[2]}</p>`,`<a class="btn small" href="contact.html?service=${cur}&oferta=${encodeURIComponent(o[0])}#formular">Comandă</a>`)).join('')}</div></section>
   ${cur==='charcuterie'?platterHTML:''}`;
 }
}else if(P==='gallery'){
 main=`<section class="pagehead"><h1>Galerie</h1><p>Câteva dintre mesele pe care le-am pregătit.</p></section><section class="wrap"><h2>Fotografii</h2>
 <div class="masonry">${GALLERY_IMGS.map(i=>`<img src="${i}" alt="Platou Tavola" loading="lazy">`).join('')}</div><h2>Video</h2>
 <div class="grid3">${GALLERY_VIDEOS.map(v=>`<video controls preload="metadata" src="${v}"></video>`).join('')}</div></section>`;
}else if(P==='contact'){
 main=`<section class="pagehead"><h1>Contact us</h1><p>Spune-ne ce eveniment organizezi și revenim cu o ofertă în 24 de ore.</p></section>
 <section class="wrap two"><div class="info"><h2>Datele noastre</h2>${infoBlock}</div>
 <div id="formular"><div id="msg"></div><form id="orderForm" novalidate>
 <label>Serviciu<select name="serviciu" id="serviciu"><option value="">Alege serviciul</option><option value="catering">Catering</option><option value="charcuterie">Charcuterie</option><option value="cheese">Cheese</option></select></label>
 <label>Eveniment<select name="eveniment" id="eveniment"><option value="">Alege evenimentul</option>${EVENT_TYPES.map(t=>`<option>${t}</option>`).join('')}</select></label>
 <div id="dynamic"></div>
 <div class="row"><label>Data evenimentului<input type="date" name="data" id="data"></label><label>Număr de persoane<input type="number" name="persoane" min="1" max="1000"></label></div>
 <label>Nume și prenume<input type="text" name="nume" maxlength="100"></label>
 <div class="row"><label>Telefon<input type="tel" name="telefon" placeholder="+373 69 123 456"></label><label>Email<input type="email" name="email"></label></div>
 <label>Mesaj (opțional)<textarea name="mesaj" rows="3" maxlength="1000"></textarea></label>
 <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off">
 <p class="errmsg" id="errmsg" role="alert"></p><button class="btn" type="submit">Trimite comanda</button></form></div></section>`;
}
app.innerHTML=`<header class="nav"><a class="logo" href="index.html">Tavola</a><button class="burger" aria-label="Meniu" aria-expanded="false">☰</button><nav id="menu">${NAV.map(n=>`<a href="${n[0]}" class="${n[2]===cur?'on':''}">${n[1]}</a>`).join('')}</nav></header>${main}
<footer><div class="foot"><div><div class="logo">Tavola</div><p>Sapori d'Oro</p></div><div>${infoBlock}</div><div><p><b>Servicii</b></p>${NAV.slice(1,4).map(n=>`<p><a href="${n[0]}">${n[1]}</a></p>`).join('')}</div></div><p class="copy">© ${new Date().getFullYear()} Tavola. Toate drepturile rezervate.</p></footer>`;
const b=document.querySelector('.burger'),m=document.getElementById('menu');
b.onclick=()=>b.setAttribute('aria-expanded',m.classList.toggle('open'));

// ---- Carousel ----
const sl=[...document.querySelectorAll('.slide')],dt=[...document.querySelectorAll('.dots button')];
if(sl.length){let n=0,t;const go=i=>{n=(i+sl.length)%sl.length;sl.forEach((s,k)=>s.classList.toggle('on',k===n));dt.forEach((d,k)=>d.classList.toggle('on',k===n))};
 const play=()=>{clearInterval(t);t=setInterval(()=>go(n+1),5000)};dt.forEach(d=>d.onclick=()=>{go(+d.dataset.i);play()});play();}

// ---- Formular set cașcavaluri + vin ----
const sf=document.getElementById('setForm');
if(sf){
 const cf=[...sf.querySelectorAll('[name=chs]')],gf=document.getElementById('giftFields'),el=sf.elements,sel=()=>cf.filter(c=>c.checked);
 const upd=()=>{const S=SETS[el.marime.value],W=WINES[el.vin.value];
  document.getElementById('total').textContent=((S?S.pret:0)+(W?W.pret:0))+' lei';
  document.getElementById('cnt').textContent=S?`Alege ${S.n} cașcavaluri (${sel().length}/${S.n})`:'Alege mai întâi mărimea setului';gf.hidden=!el.gift.checked};
 cf.forEach(c=>c.onchange=()=>{const S=SETS[el.marime.value];if(!S||sel().length>S.n){c.checked=false}upd()});
 el.marime.onchange=()=>{const S=SETS[el.marime.value];cf.forEach(c=>c.checked=false);upd()};
 el.vin.onchange=el.gift.onchange=upd;sf.addEventListener('reset',()=>setTimeout(upd));
 sf.onsubmit=e=>{e.preventDefault();const err=[],S=SETS[el.marime.value],W=WINES[el.vin.value];
  if(!S)err.push('Alege mărimea setului.');else if(sel().length!==S.n)err.push(`Alege exact ${S.n} cașcavaluri.`);
  if(!W)err.push('Alege sticla de vin.');
  if(el.gift.checked&&el.dest.value.trim().length<2)err.push('Introdu numele destinatarului.');
  if(el.nume.value.trim().length<3)err.push('Introdu numele complet.');
  if(!V.tel(el.telefon.value))err.push('Telefon invalid.');
  if(!V.mail(el.email.value))err.push('Email invalid.');
  if(!el.data.value||el.data.value<today)err.push('Alege o dată de livrare validă.');
  if(el.adresa.value.trim().length<5)err.push('Introdu adresa de livrare.');
  document.getElementById('seterr').textContent=err.join(' ');if(err.length)return;
  send({subject:`Set cașcavaluri + vin – ${S.nume}`,name:el.nume.value,email:el.email.value,telefon:el.telefon.value,set:S.nume,
   cascavaluri:sel().map(c=>c.value).join(', '),vin:W.nume,cadou:el.gift.checked?'DA':'nu',destinatar:el.dest.value,felicitare:el.felicitare.value,
   data_livrare:el.data.value,adresa:el.adresa.value,total:(S.pret+W.pret)+' lei',botcheck:el.botcheck.checked},sf,document.getElementById('setmsg'))};
}

// ---- Formular contact ----
const form=document.getElementById('orderForm');
if(form){
 const dyn=document.getElementById('dynamic'),serv=document.getElementById('serviciu'),dateEl=document.getElementById('data'),errEl=document.getElementById('errmsg');
 dateEl.min=today;
 const build=()=>{dyn.innerHTML='';const g=OPTIONS[serv.value];if(!g)return;
  Object.entries(g).forEach(([n,list],i)=>{const f=document.createElement('fieldset');
   f.innerHTML=`<legend>${n}</legend>`+list.map(o=>`<label class="chk"><input type="checkbox" name="g${i}" value="${o}" data-g="${n}"> ${o}</label>`).join('');dyn.appendChild(f)})};
 serv.onchange=build;form.addEventListener('reset',()=>setTimeout(build));
 if(Q.get('service')){serv.value=Q.get('service');build()}
 const of=Q.get('oferta');
 if(of){const ev=document.getElementById('eveniment');ev.value=EVENT_TYPES.includes(of)?of:'Alt eveniment';form.mesaj.value='Ofertă aleasă: '+of}
 form.onsubmit=e=>{e.preventDefault();const f=form.elements,err=[];
  if(!f.serviciu.value)err.push('Alege serviciul.');
  if(!f.eveniment.value)err.push('Alege evenimentul.');
  dyn.querySelectorAll('fieldset').forEach(fs=>{if(!fs.querySelector(':checked'))err.push(`Selectează cel puțin o opțiune la „${fs.querySelector('legend').textContent}”.`)});
  if(!f.data.value||f.data.value<today)err.push('Alege o dată validă, din viitor.');
  if(!(f.persoane.value>=1))err.push('Introdu numărul de persoane.');
  if(f.nume.value.trim().length<3)err.push('Introdu numele complet.');
  if(!V.tel(f.telefon.value))err.push('Telefon invalid (ex. +373 69 123 456).');
  if(!V.mail(f.email.value))err.push('Email invalid.');
  errEl.textContent=err.join(' ');if(err.length)return;
  const det={};dyn.querySelectorAll(':checked').forEach(c=>(det[c.dataset.g]=det[c.dataset.g]||[]).push(c.value));
  send({subject:`Comandă Tavola – ${f.serviciu.value} / ${f.eveniment.value}`,name:f.nume.value,email:f.email.value,telefon:f.telefon.value,serviciu:f.serviciu.value,eveniment:f.eveniment.value,
   data_eveniment:f.data.value,persoane:f.persoane.value,detalii:Object.entries(det).map(([k,v])=>k+': '+v.join(', ')).join(' | '),mesaj:f.mesaj.value,botcheck:f.botcheck.checked},form,document.getElementById('msg'))};
}

// ---- Formular platou charcuterie ----
const pf=document.getElementById('platForm');
if(pf){
 const pe=pf.elements,items=[...pf.querySelectorAll('[name=pi]')],sel=()=>items.filter(c=>c.checked);
 
 const upd=()=>{
   const S=PLATTER_SIZES[pe.marime.value];
   const checkedItems = sel();
   
   const counts = {};
   checkedItems.forEach(c => {
       const g = c.dataset.g;
       counts[g] = (counts[g] || 0) + 1;
   });

   let extraCost = 0;
   for (const g in counts) {
       if (counts[g] > 2) {
           extraCost += (counts[g] - 2) * 10;
       }
   }

   const totalPrice = (S ? S.pret : 0) + extraCost;

   document.getElementById('platTotal').textContent = totalPrice + ' lei';
   document.getElementById('platCount').textContent = checkedItems.length;
   document.getElementById('platGift').hidden = !pe.gift.checked;
 };

 pe.marime.onchange=pe.gift.onchange=upd;
 items.forEach(c=>c.onchange=upd);
 pf.addEventListener('reset',()=>setTimeout(upd));

 pf.onsubmit=ev=>{
   ev.preventDefault();
   const err=[],S=PLATTER_SIZES[pe.marime.value],checkedItems=sel();
   
   if(!S)err.push('Alege mărimea platoului.');
   if(!checkedItems.length)err.push('Alege cel puțin un produs pentru platou.');
   if(pe.gift.checked&&pe.dest.value.trim().length<2)err.push('Introdu numele destinatarului.');
   if(pe.nume.value.trim().length<3)err.push('Introdu numele complet.');
   if(!V.tel(pe.telefon.value))err.push('Telefon invalid.');
   if(!V.mail(pe.email.value))err.push('Email invalid.');
   if(!pe.data.value||pe.data.value<today)err.push('Alege o dată de livrare validă.');
   if(pe.adresa.value.trim().length<5)err.push('Introdu adresa de livrare.');
   document.getElementById('platerr').textContent=err.join(' ');
   if(err.length)return;

   const counts = {};
   checkedItems.forEach(c => {
       const g = c.dataset.g;
       counts[g] = (counts[g] || 0) + 1;
   });
   let extraCost = 0;
   for (const g in counts) {
       if (counts[g] > 2) {
           extraCost += (counts[g] - 2) * 10;
       }
   }
   const totalPrice = S.pret + extraCost;

   const g={};
   checkedItems.forEach(c=>(g[c.dataset.g]=g[c.dataset.g]||[]).push(c.value));

   send({
     subject:'Platou charcuterie personalizat – '+S.nume,
     name:pe.nume.value,
     email:pe.email.value,
     telefon:pe.telefon.value,
     marime:S.nume,
     continut:Object.entries(g).map(([k,v])=>k+': '+v.join(', ')).join(' | '),
     extra_pret:extraCost > 0 ? extraCost + ' lei (' + (extraCost/10) + ' optiuni suplimentare)' : '0 lei',
     dorinte:pe.mesaj.value,
     cadou:pe.gift.checked?'DA':'nu',
     destinatar:pe.dest.value,
     felicitare:pe.felicitare.value,
     data_livrare:pe.data.value,
     adresa:pe.adresa.value,
     pret_total:totalPrice+' lei',
     botcheck:pe.botcheck.checked
   },pf,document.getElementById('platmsg'))
 };
}