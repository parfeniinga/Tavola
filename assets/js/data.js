// ===== SETĂRI =====
const WEB3FORMS_KEY = "PUNE_AICI_CHEIA_TA"; // de la https://web3forms.com (gratuit)
const GALLERY_IMGS = [];   // ex: ["assets/gallery/1.jpg","assets/gallery/2.jpg"]
const GALLERY_VIDEOS = []; // ex: ["assets/video/tavola.mp4"]
const CONTACT = {tel:"+373 00 000 000", email:"contact@tavola.md", adresa:"Str. Exemplu 1, Chișinău", program:"Luni–Sâmbătă, 09:00–19:00"};

const SERVICES = {
 catering:{titlu:"Servicii de catering",intro:"Meniuri complete, de la aperitive la deserturi, servite la masa ta, oriunde.",img:"catering.jpg",events:[
  ["Nunți","de la 450 lei / persoană","Meniu în 5 feluri, bar de deserturi și personal de servire.","nunti.jpg"],
  ["Cumătrii","de la 320 lei / persoană","Mese tradiționale, generoase, pentru familie și nași.","cumatrii.jpg"],
  ["Zile de naștere","de la 220 lei / persoană","Platouri, fel principal și tort la alegere.","zi-nastere.jpg"],
  ["Gender party","de la 180 lei / persoană","Finger food și deserturi în culorile surprizei.","gender.jpg"],
  ["Evenimente corporate","de la 200 lei / persoană","Coffee break, lunch box sau cocktail pentru echipă.","corporate.jpg"]]},
 charcuterie:{titlu:"Charcuterie",intro:"Platouri de mezeluri fine, fructe și tartine, aranjate cu grijă.",img:"charcuterie.jpg",events:[
  ["Nunți","de la 1800 lei / platou mare","Platou pentru 20–25 persoane, cu fructe de sezon.","nunti.jpg"],
  ["Cumătrii","de la 1200 lei / platou mare","Mezeluri afumate, brânzeturi și murături.","cumatrii.jpg"],
  ["Zile de naștere","de la 650 lei / platou mediu","Platou pentru 8–12 persoane.","zi-nastere.jpg"],
  ["Gender party","de la 550 lei / platou mediu","Aranjat în nuanțe roz sau albastru.","gender.jpg"],
  ["Seară cu prietenii","de la 380 lei / platou mic","Platou pentru 4–6 persoane.","prieteni.jpg"]]},
 cheese:{titlu:"Asorti de cașcavaluri",intro:"Cașcavaluri maturate, brânzeturi cu mucegai nobil, miere, nuci și struguri.",img:"cheese.jpg",events:[
  ["Nunți","de la 1500 lei / platou mare","8 tipuri de cașcaval, fructe uscate și miere.","nunti.jpg"],
  ["Cumătrii","de la 980 lei / platou mare","Cașcavaluri locale și de import, pâine proaspătă.","cumatrii.jpg"],
  ["Zile de naștere","de la 520 lei / platou mediu","5 tipuri de cașcaval, struguri și nuci.","zi-nastere.jpg"],
  ["Gender party","de la 450 lei / platou mediu","Cașcavaluri cu fructe în culorile petrecerii.","gender.jpg"],
  ["Degustare vin și cașcaval","de la 320 lei / platou mic","Selecție pentru 4–6 persoane.","prieteni.jpg"]]}
};
const EVENT_TYPES=["Nunți","Cumătrii","Zile de naștere","Gender party","Evenimente corporate","Seară cu prietenii","Degustare vin și cașcaval","Alt eveniment"];
const OPTIONS={
 catering:{"Meniu":["Aperitive reci","Aperitive calde","Fel principal – carne","Fel principal – pește","Garnituri","Salate","Deserturi","Băuturi"]},
 charcuterie:{"Mezeluri":["Prosciutto","Salam uscat","Pastramă de vită","Jambon afumat","Bacon crocant","Mortadella"],"Fructe":["Struguri","Smochine","Pere","Mere","Fructe de pădure","Fructe uscate"]},
 cheese:{"Cașcavaluri":["Gouda","Emmental","Parmezan","Brie","Camembert","Gorgonzola","Cheddar","Cașcaval afumat"],"Fructe":["Struguri","Smochine","Pere","Nuci","Miere","Gem de smochine"]}
};
