import {hotelsInfo} from "./hotels-info.js";

const cardsContainer = document.getElementsByClassName("cards-container");
// console.log(cardsContainer);

// Se crean las variables correspondientes a los elementos a utilizar.
const div = document.createElement("div");
const h2 = document.createElement("h2");
const img = document.createElement("img");
const p = document.createElement("p");
const button = document.createElement("button");

// se extrae la información y almacena en variable data.
const info = await hotelsInfo();
const data = await info.json();
console.log(data[0].name);
