// ================= SETĂRI =================
const WEB3FORMS_KEY = "907328bd-e265-4989-a2e6-a9fdfc479ef6"; // gratuit de la https://web3forms.com
const CONTACT = {tel:"+373 067432616", email:"contact@tavola.md", adresa:"Str. Alexei Mateevici, or. Cahul", program:"Luni–Duminică, 06:00–02:00"};

// ========= IMAGINI (linkuri provizorii – înlocuiește cu ale tale) =========
// Poți pune linkuri https://... sau căi locale, ex: "assets/img/hero1.jpg"
const IMG = (seed,w=800,h=600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Carousel din pagina principală (4–5 imagini)
const HERO_SLIDES = [
  "./assets/gallery/1.jpg",
  "./assets/gallery/2.jpg",
  "./assets/gallery/3.jpg",
  "./assets/gallery/4.jpg",
  "./assets/gallery/5.jpg"
];

// GALERIE – amestecat (Cașcaval -> Catering -> Vin -> Catering)
const GALLERY_IMGS = [
  "./assets/gallery/c21.jpg",
  "./assets/gallery/cat10.jpg",
  "./assets/gallery/w1.jpg",
  "./assets/gallery/cat11.jpg",
  "./assets/gallery/c22.jpg",
  "./assets/gallery/cat12.jpg",
  "./assets/gallery/w2.jpg",
  "./assets/gallery/cat13.jpg",
  "./assets/gallery/c23.jpg",
  "./assets/gallery/cat14.jpg",
  "./assets/gallery/w3.jpg",
  "./assets/gallery/cat15.jpg",
  "./assets/gallery/c24.jpg",
  "./assets/gallery/cat16.jpg",
  "./assets/gallery/w4.jpg",
  "./assets/gallery/cat17.jpg",
  "./assets/gallery/cat18.jpg",
  "./assets/gallery/cat19.jpg"
];

const GALLERY_VIDEOS = [
  "./assets/video/1.mp4",
  "./assets/video/2.mp4",
  "./assets/video/3.mp4",
  "./assets/video/4.mp4",
  "./assets/video/5.mp4",
  "./assets/video/6.mp4",
  "./assets/video/7.mp4",
  "./assets/video/8.mp4",
  "./assets/video/9.mp4"
];

// ========= SERVICII: [nume, preț, descriere, imagine] =========
const SERVICES = {
 catering:{titlu:"Servicii de catering",intro:"Meniuri complete, de la aperitive la deserturi, servite la masa ta, oriunde.",img:"./assets/img/tavola-catering.jpg",offers:[
  ["Nunți","de la 450 lei / persoană","Meniu în 5 feluri, bar de deserturi și personal de servire.","./assets/img/cat1.jpg"],
  ["Cumătrii","de la 320 lei / persoană","Mese tradiționale, generoase, pentru familie și nași.","./assets/img/cat2.jpg"],
  ["Botez","de la 280 lei / persoană","Meniu festiv, delicat, cu tort și candy bar.","./assets/img/cat3.jpg"],
  ["Zile de naștere","de la 220 lei / persoană","Platouri, fel principal și tort la alegere.","./assets/img/cat4.jpg"],
  ["Gender party","de la 180 lei / persoană","Finger food și deserturi în culorile surprizei.","./assets/img/cat5.jpg"],
  ["Evenimente corporate","de la 200 lei / persoană","Cocktail sau cină pentru echipă și parteneri.","./assets/img/cat6.jpg"],
  ["Cocktail party","de la 190 lei / persoană","Canapé-uri, mini-burgeri și băuturi servite în picioare.","./assets/img/cat7.jpg"],
  ["Coffee break","de la 90 lei / persoană","Cafea, patiserie proaspătă și fructe pentru conferințe.","./assets/img/cat8.jpg"],
  ["Lunch box","de la 85 lei / persoană","Prânz individual, ambalat, livrat la birou sau la eveniment.","./assets/img/cat9.jpg"]]},
 charcuterie:{titlu:"Charcuterie",intro:"Platouri de mezeluri fine, fructe și tartine, aranjate cu grijă.",img:"./assets/img/tavola-charcuterie.jpg", offers:[
  ["Platou mic","de la 380 lei","Pentru 4–6 persoane: mezeluri, fructe și tartine.","./assets/img/ch1.jpg"],
  ["Platou mediu","de la 650 lei","Pentru 8–12 persoane, ideal pentru zile de naștere.","./assets/img/ch2.jpg"],
  ["Platou mare","de la 1200 lei","Pentru 20–25 persoane, cu fructe de sezon.","./assets/img/ch3.jpg"],
  ["Platou XL pentru nuntă","de la 1800 lei","Pentru 40+ persoane, cu mezeluri premium și decor floral.","./assets/img/ch4.jpg"],
  ["Grazing table","de la 2500 lei","Masă întreagă de gustări, aranjată la locația ta.","./assets/img/ch5.jpg"],
  ["Cutie cadou","de la 290 lei","Mezeluri, tartine și dulceață într-o cutie elegantă.","./assets/img/ch6.jpg"],
  ["Platou pentru cumătrie","de la 1200 lei","Mezeluri afumate, brânzeturi și murături.","./assets/img/ch7.jpg"],
  ["Platou gender party","de la 550 lei","Aranjat în nuanțe de roz sau albastru.","./assets/img/ch8.jpg"],
  ["Platou corporate","de la 700 lei","Servire rapidă, ambalaj individual opțional.","./assets/img/ch9.jpg"]]},
 cheese:{titlu:"Asorti de cașcavaluri",intro:"Cașcavaluri maturate, brânzeturi cu mucegai nobil, miere, nuci și struguri.",img:"./assets/img/tavola-cheese.jpg"}
};

// ========= CAȘCAVALURI: [nume, descriere, preț / 100 g, imagine] =========
const CHEESES = [
 ["Gouda","Olanda · semi-tare, dulceag",32,"./assets/img/c1.jpg"],
 ["Emmental","Elveția · găuri mari, nucă",38,"./assets/img/c2.jpg"],
 ["Parmezan","Italia · tare, maturat 24 luni",58,"./assets/img/c3.jpg"],
 ["Brie","Franța · cremos, coajă albă",45,"./assets/img/c4.jpg"],
 ["Camembert","Franța · moale, aromat",42,"./assets/img/c5.jpg"],
 ["Gorgonzola","Italia · mucegai albastru",52,"./assets/img/c6.jpg"],
 ["Cheddar","Anglia · maturat, intens",36,"./assets/img/c7.jpg"],
 ["Cașcaval afumat","Local · afumat natural",28,"./assets/img/c8.jpg"], // Am corectat ../ în ./
 ["Mozzarella","Italia · proaspătă, fragedă",30,"./assets/img/c9.jpg"],
 ["Provolone","Italia · picant, filat",40,"./assets/img/c10.jpg"],
 ["Manchego","Spania · oi, sărat",55,"./assets/img/c11.jpg"],
 ["Pecorino","Italia · oi, tare",50,"./assets/img/c12.jpg"],
 ["Gruyère","Elveția · complex, nucă",56,"./assets/img/c13.jpg"],
 ["Edam","Olanda · blând, coajă roșie",30,"./assets/img/c14.jpg"],
 ["Maasdam","Olanda · dulce, găuri",34,"./assets/img/c15.jpg"],
 ["Roquefort","Franța · mucegai, cremos",65,"./assets/img/c16.jpg"],
 ["Halloumi","Cipru · la grătar",35,"./assets/img/c17.jpg"],
 ["Feta","Grecia · sărată, sfărâmicioasă",26,"./assets/img/c18.jpg"],
 ["Taleggio","Italia · moale, aromat",48,"./assets/img/c19.jpg"],
 ["Fontina","Italia · topit, de munte",46,"./assets/img/c20.jpg"]
];
const SETS = [{nume:"Set Mini",n:3,pret:350},{nume:"Set Clasic",n:5,pret:520},{nume:"Set Premium",n:7,pret:740}];
const WINES = [{nume:"Roșu sec – Fetească Neagră",pret:180},{nume:"Alb sec – Chardonnay",pret:160},{nume:"Rosé – Cabernet",pret:150},
 {nume:"Spumant brut",pret:210},{nume:"Roșu demidulce",pret:140},{nume:"Fără vin (doar cașcavaluri)",pret:0}];

// ========= PLATOU CHARCUTERIE PERSONALIZAT =========
const PLATTER_SIZES = [
 {nume:"Platou mic (4–6 persoane)",pret:380},
 {nume:"Platou mediu (8–12 persoane)",pret:650},
 {nume:"Platou mare (20–25 persoane)",pret:1200}
];
const PLATTER_ITEMS = {
 "Mezeluri":["Prosciutto","Salam uscat","Pastramă de vită","Jambon afumat","Bacon crocant","Mortadella","Chorizo","Bresaola"],
 "Cașcavaluri":CHEESES.map(c=>c[0]),
 "Legume":["Roșii cherry","Castraveți","Ardei gras","Măsline","Murături asortate","Morcovi baby","Ridichi","Anghinare"],
 "Fructe":["Struguri","Smochine","Pere","Mere","Fructe de pădure","Kiwi","Caise uscate","Curmale"],
 "Nucșoare":["Nuci","Migdale","Alune de pădure","Fistic","Caju","Semințe de dovleac"],
 "Gemuri și sosuri":["Gem de smochine","Gem de ardei iute","Miere","Muștar dijon","Sos de afine","Hummus","Sos pesto","Dulceață de trandafiri"]
};
const EVENT_TYPES=["Nunți","Cumătrii","Botez","Zile de naștere","Gender party","Evenimente corporate","Seară cu prietenii","Alt eveniment"];
const OPTIONS={
 catering:{"Meniu":["Aperitive reci","Aperitive calde","Fel principal – carne","Fel principal – pește","Garnituri","Salate","Deserturi","Băuturi"]},
 charcuterie:{"Mezeluri":["Prosciutto","Salam uscat","Pastramă de vită","Jambon afumat","Bacon crocant","Mortadella"],"Fructe":["Struguri","Smochine","Pere","Mere","Fructe de pădure","Fructe uscate"]},
 cheese:{"Cașcavaluri":CHEESES.map(c=>c[0]),"Fructe":["Struguri","Smochine","Pere","Nuci","Miere","Gem de smochine"]}
};