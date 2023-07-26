import {hotelsInfo} from "./hotels-info.js";


const cardsContainer = document.getElementById("cardsContainer")
// cardsContainer.innerHTML = "test";
// cardsContainer.innerText = "probando texto"
console.log(cardsContainer);

// Se crean las variables correspondientes a los elementos a utilizar.

const h2 = document.createElement("h2");
const img = document.createElement("img");
const p = document.createElement("p");
const button = document.createElement("button");

// se extrae la información y almacena en variable data.
const info = await hotelsInfo();
const data = await info.json();
console.log(data);

data.forEach((object) => {
    console.log(object.country);
    console.log(object.photo);
    const hotelCard = document.createElement("div");
    hotelCard.className = "hotel-card";
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
            iconImg.setAttribute("scr", "./styles/assets/flags/argentina.png");
            iconImg.setAttribute("alt", "argentina-icon");            
            break;    
        case "Brasil":
            iconImg.setAttribute("scr", "./styles/assets/flags/brasil.png");
            iconImg.setAttribute("alt", "brasil-icon");
            break;    
        case "Uruguay":
            iconImg.setAttribute("scr", "./styles/assets/flags/uruguay.png");
            iconImg.setAttribute("alt", "uruguay-icon");
            break;    
        case "Chile":
            iconImg.setAttribute("scr", "./styles/assets/flags/chile.png");
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


