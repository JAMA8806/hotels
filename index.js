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
const collection = document.getElementsByClassName("hotel-card");
const cardElement = Array.from(collection);
console.log(cardElement);

// Ahora vamos a obtener el elemento del primer filtro y crear la función para filtrar cards por este parametro.
const countries = document.getElementById("countries");
countries.addEventListener("change", function() {
    cardElement.forEach(cards=> {
        cards.style.display = "none";               
    });
    
    const country = countries.value;
    console.log(country);
    
    const hideCard = cardElement.filter(card => card.classList.contains(country));
    console.log(hideCard);

    hideCard.forEach(cards=> {
        cards.style.display = "inline-block";               
    });
    
    if (country=="All") {
        cardElement.forEach(cards => {
            cards.style.display = "inline-block";               
        });
    }
    
})

const prices = document.getElementById("prices");
prices.addEventListener("change", function() {
    
    cardElement.forEach(cards=> {
        cards.style.display = "none";               
    });
    
    const price = prices.value;
    console.log(price);
    
    const hideCard = cardElement.filter(card => card.classList.contains(price));
    console.log(hideCard);

    hideCard.forEach(cards=> {
        cards.style.display = "inline-block";               
    });
    
    if (price=="All") {
        cardElement.forEach(cards => {
            cards.style.display = "inline-block";               
        });
    }
    
})
console.log(cardElement[2]);

const dateFrom = document.getElementById("dateFrom");
dateFrom.addEventListener("change",function(){
    console.log(dateFrom.value);
})



