const P=document.body.dataset.page, Q=new URLSearchParams(location.search), app=document.getElementById('app');
const cur=P==='service'?Q.get('s'):P;
const NAV=[['index.html','Home','home'],['service.html?s=catering','Catering','catering'],['service.html?s=charcuterie','Charcuterie','charcuterie'],['service.html?s=cheese','Cheese','cheese'],['gallery.html','Galerie','gallery'],['contact.html','Contact us','contact']];
const card=(img,t,body,btn)=>`<article class="card"><div class="ph" style="background-image:url('assets/img/${img}')"></div><div class="pad"><h3>${t}</h3>${body}${btn}</div></article>`;
let main='';
if(P==='home'){
 main=`<section class="hero" style="background-image:linear-gradient(rgba(89,55,0,.45),rgba(2,103,110,.55)),url('assets/img/hero.jpg')"><h1>Tavola</h1><p class="moto">Sapori d'Oro</p><a class="btn" href="contact.html">Cere o ofertă</a></section>
 <section class="wrap"><h2>Ce îți pregătim</h2><div class="grid3">${Object.entries(SERVICES).map(([k,s])=>card(s.img,s.titlu,`<p>${s.intro}</p>`,`<a class="btn small" href="service.html?s=${k}">Vezi detalii</a>`)).join('')}</div></section>`;
}else if(P==='service'){
 const s=SERVICES[cur]; if(!s){location.replace('index.html')}
 else{document.title='Tavola – '+s.titlu;
 main=`<section class="pagehead"><h1>${s.titlu}</h1><p>${s.intro}</p></section><section class="wrap"><div class="grid3">${s.events.map(e=>card(e[3],e[0],`<p class="price">${e[1]}</p><p>${e[2]}</p>`,`<a class="btn small" href="contact.html?service=${cur}&event=${encodeURIComponent(e[0])}#formular">Comandă</a>`)).join('')}</div></section>`;}
}else if(P==='gallery'){
 main=`<section class="pagehead"><h1>Galerie</h1><p>Câteva dintre mesele pe care le-am pregătit.</p></section><section class="wrap"><h2>Fotografii</h2>
 ${GALLERY_IMGS.length?'':'<p class="empty">Adaugă pozele în <b>assets/gallery</b> și listează-le în <b>assets/js/data.js</b>.</p>'}
 <div class="masonry">${GALLERY_IMGS.map(i=>`<img src="${i}" alt="Platou Tavola" loading="lazy">`).join('')}</div><h2>Video</h2>
 ${GALLERY_VIDEOS.length?'':'<p class="empty">Adaugă filme .mp4 în <b>assets/video</b> și listează-le în <b>data.js</b>.</p>'}
 <div class="grid3">${GALLERY_VIDEOS.map(v=>`<video controls preload="metadata" src="${v}"></video>`).join('')}</div></section>`;
}else if(P==='contact'){
 main=`<section class="pagehead"><h1>Contact us</h1><p>Spune-ne ce eveniment organizezi și revenim cu o ofertă în 24 de ore.</p></section>
 <section class="wrap two"><div class="info"><h2>Datele noastre</h2><p><b>Telefon</b><br><a href="tel:${CONTACT.tel.replace(/\s/g,'')}">${CONTACT.tel}</a></p><p><b>Email</b><br><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p><p><b>Adresă</b><br>${CONTACT.adresa}</p><p><b>Program</b><br>${CONTACT.program}</p></div>
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
<footer><div class="logo">Tavola</div><p>Sapori d'Oro</p><p>© ${new Date().getFullYear()} Tavola. Toate drepturile rezervate.</p></footer>`;
const b=document.querySelector('.burger'),m=document.getElementById('menu');
b.onclick=()=>{b.setAttribute('aria-expanded',m.classList.toggle('open'))};

const form=document.getElementById('orderForm');
if(form){
 const dyn=document.getElementById('dynamic'),serv=document.getElementById('serviciu'),dateEl=document.getElementById('data'),errEl=document.getElementById('errmsg');
 dateEl.min=new Date().toISOString().split('T')[0];
 const build=()=>{dyn.innerHTML='';const g=OPTIONS[serv.value];if(!g)return;
  Object.entries(g).forEach(([n,list],i)=>{const f=document.createElement('fieldset');
   f.innerHTML=`<legend>${n}</legend>`+list.map(o=>`<label class="chk"><input type="checkbox" name="g${i}" value="${o}" data-g="${n}"> ${o}</label>`).join('');dyn.appendChild(f)})};
 serv.onchange=build;
 if(Q.get('service')){serv.value=Q.get('service');build()}
 if(Q.get('event'))document.getElementById('eveniment').value=Q.get('event');
 form.onsubmit=async e=>{e.preventDefault();const f=form.elements,err=[];
  if(!f.serviciu.value)err.push('Alege serviciul.');
  if(!f.eveniment.value)err.push('Alege evenimentul.');
  dyn.querySelectorAll('fieldset').forEach(fs=>{if(!fs.querySelector(':checked'))err.push(`Selectează cel puțin o opțiune la „${fs.querySelector('legend').textContent}”.`)});
  if(!f.data.value||f.data.value<dateEl.min)err.push('Alege o dată validă, din viitor.');
  if(!(f.persoane.value>=1))err.push('Introdu numărul de persoane.');
  if(f.nume.value.trim().length<3)err.push('Introdu numele complet.');
  if(!/^\+?[0-9\s\-]{8,16}$/.test(f.telefon.value.trim()))err.push('Telefon invalid (ex. +373 69 123 456).');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim()))err.push('Email invalid.');
  errEl.textContent=err.join(' ');if(err.length)return;
  const det={};dyn.querySelectorAll(':checked').forEach(c=>(det[c.dataset.g]=det[c.dataset.g]||[]).push(c.value));
  const body={access_key:WEB3FORMS_KEY,subject:`Comandă Tavola – ${f.serviciu.value} / ${f.eveniment.value}`,from_name:'Site Tavola',
   name:f.nume.value,email:f.email.value,telefon:f.telefon.value,serviciu:f.serviciu.value,eveniment:f.eveniment.value,
   data_eveniment:f.data.value,persoane:f.persoane.value,detalii:Object.entries(det).map(([k,v])=>k+': '+v.join(', ')).join(' | '),mesaj:f.mesaj.value,botcheck:f.botcheck.checked};
  const msg=document.getElementById('msg'),btn=form.querySelector('button');btn.disabled=true;
  try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)});
   const j=await r.json();if(!j.success)throw 0;
   msg.innerHTML='<div class="alert good">Mulțumim! Comanda a fost trimisă, te contactăm curând.</div>';form.reset();dyn.innerHTML='';
  }catch{msg.innerHTML=`<div class="alert bad">Nu am putut trimite comanda. Sună-ne la ${CONTACT.tel}.</div>`}
  btn.disabled=false;msg.scrollIntoView({behavior:'smooth'})};
}
