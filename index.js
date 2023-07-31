import {hotelsInfo} from "./src/hotels-info.js";


const cardsContainer = document.getElementById("cardsContainer")
// cardsContainer.innerHTML = "test";
// cardsContainer.innerText = "probando texto"
// console.log(cardsContainer);

// Se crean las variables correspondientes a los elementos a utilizar.

// const h2 = document.createElement("h2");
// const img = document.createElement("img");
// const p = document.createElement("p");
// const button = document.createElement("button");

// se extrae la información y almacena en variable data.
const info = await hotelsInfo();
const data = await info.json();
console.log(data);

data.forEach((object) => {
    // console.log(object.country);
    // console.log(object.photo);
    const hotelCard = document.createElement("div");
    hotelCard.className = `hotel-card ${object.country} ${object.price}`;
    hotelCard.setAttribute("data-country", object.country);
    hotelCard.setAttribute("data-price", object.price );
    hotelCard.setAttribute("data-from", object.availabilityFrom);
    hotelCard.setAttribute("data-To", object.availabilityTo );
    // se crea una función para determinar el tamaño entre small(0-10rooms) medium(11 a 20) y large (20 o mas-)
    function size(object){
        if (object.rooms<10) {
            hotelCard.setAttribute("data-rooms", "10");
            
        } else if (object.rooms>=11 && object.rooms<20) {
                hotelCard.setAttribute("data-rooms", "20");
            } else{
                hotelCard.setAttribute("data-rooms", "30");            
            }
        
    } ;

    size(object);
    
    hotelCard.id = object.name;
    const url = object.photo;
    hotelCard.style.backgroundImage = `url(${url})`;
    cardsContainer.appendChild(hotelCard);
    
    const hotelTitle = document.createElement("h2");
    hotelTitle.innerText = object.name;
    hotelCard.appendChild(hotelTitle);
    
    const iconText = document.createElement("div");
    iconText.className = "icon-text";
    hotelCard.appendChild(iconText);
    
    const iconImg = document.createElement("img");
    iconImg.className = "card-img";
    switch (object.country) {
        case "Argentina":
            iconImg.setAttribute("src", "./styles/assets/flags/argentina.png");
            iconImg.setAttribute("alt", "argentina-icon");            
            break;    
        case "Brasil":
            iconImg.setAttribute("src", "./styles/assets/flags/brasil.png");
            iconImg.setAttribute("alt", "brasil-icon");
            break;    
        case "Uruguay":
            iconImg.setAttribute("src", "./styles/assets/flags/uruguay.png");
            iconImg.setAttribute("alt", "uruguay-icon");
            break;    
        case "Chile":
            iconImg.setAttribute("src", "./styles/assets/flags/chile.png");
            iconImg.setAttribute("alt", "chile-icon");
            break;    
        default:
            break;
    }

    iconText.appendChild(iconImg);
    
    const country = document.createElement("p");
    country.innerText = object.name;
    iconText.appendChild(country);
    
    const priceBtn = document.createElement("div");
    priceBtn.className = "price-btn";
    hotelCard.appendChild(priceBtn);
    
    const price = document.createElement("p");
    price.innerText = `${object.rooms} rooms - ${"$".repeat(object.price)}`;
    priceBtn.appendChild(price);
    
    const description = document.createElement("p");
    description.innerText = object.description;
    description.className = "card-description";
    priceBtn.appendChild(description);
    
    const button = document.createElement("button");
    button.innerText = "Book it!";
    button.className = "card-btn";
    priceBtn.appendChild(button);
    
});

// llamo y almaceno un HTMLCollection con todas las cards creadas
// Hay que trasnformar en HTMLCollection en un Array iterable.
const cardElement = document.querySelectorAll(".hotel-card");
// const cardElement = Array.from(collection);
console.log(cardElement[0].dataset.from, cardElement[0].dataset.to);
const cfd = new Date (parseInt(cardElement[0].dataset.from, 10));
// console.log(cfd, new Date (parseInt(cardElement[0].dataset.to, 10)) );

const countries = document.getElementById("countries");
const prices = document.getElementById("prices");
const datFrom = document.getElementById("dateFrom");
const datTo = document.getElementById("dateTo");
const sizes = document.getElementById("sizes");
const clear = document.getElementById("clearbtn");

let country = "";
let price = "";
let from = "";
let to = "";
let size = "";

countries.addEventListener("change", filter);    
prices.addEventListener("change", filter);    
datFrom.addEventListener("change", filter);    
datTo.addEventListener("change", filter);    
sizes.addEventListener("change", filter);   
clear.addEventListener("click", reset);   

function filter() {
    country = countries.value;
    price = prices.value;
    from = new Date(datFrom.value);
    to = new Date(datTo.value);
    size = sizes.value;
    console.log(from, to);
    console.log(datFrom.value, datTo.value);
    
    // Se evaluan las tarjetas creadas para ver de acuerdo a los atributos asignados si cumple la condición de los filtros
    cardElement.forEach(cards => {
        cards.style.display = "none";  
        
        let countryFil = cards.dataset.country === country || country == "All";
        let priceFil = cards.dataset.price === price || price == "All";
        let sizeFil = cards.dataset.rooms == size || size == "All";
        let fromFil = true;
        let toFil = true;
        let cardsFrom = new Date(parseInt(cards.dataset.from, 10));
        let cardsTo = new Date(parseInt(cards.dataset.to, 10));
        
        if (cardsFrom>from) {
            fromFil = true;
        } else if (cardsFrom<from) {
            fromFil = false;
        } else {
            fromFil = true;
        }
        if (cardsTo<to) {
            toFil = true;
        } else if (cardsTo>to) {
            toFil = false;
        } else {
            toFil = true;
        }    
        
        if (countryFil && priceFil && sizeFil && fromFil && toFil) {
            cards.style.display = "inline-block";            
        }
        console.log(cards.name, countryFil, priceFil, sizeFil,fromFil,toFil);
    });
}

function reset() {
    countries.selectedIndex = 0;
    prices.selectedIndex = 0;
    sizes.selectedIndex = 0;
    datFrom.value = "";
    datTo.value = "";
    
    datFrom.setAttribute("placeholder", "dd/mm/aaaa");
    datTo.setAttribute("placeholder", "dd/mm/aaaa");
    
    console.log("reset");

    console.log(country,price,from,to,size);
    console.log(countries,prices,datFrom,datTo,sizes);

    cardElement.forEach(cards => {
        cards.style.display = "inline-block";
    });
}


