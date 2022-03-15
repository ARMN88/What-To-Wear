eruda.init();

let con = document.querySelector("#con");

fetch("https://api.weather.gov/gridpoints/LOT/68,58/forecast/")
  .then(response => response.json())
  .then(data => {
  if(data.properties.periods) {
    document.querySelector("#account").innerHTML += ` (${data.properties.periods[0].name}: ${data.properties.periods[0].temperature}ºF, ${data.properties.periods[1].name}: ${data.properties.periods[1].temperature}ºF, ${data.properties.periods[2].name}: ${data.properties.periods[2].temperature}ºF)`;
}
  });

class Cloth {
  constructor(worn = 0) {
    this.worn = worn;
  }
  wearing() {
    this.worn++;
  }
}
let json;
let lowest = [];
let lowNum = 10000;
if(localStorage.jsn) {
    json = JSON.parse(localStorage.jsn);
}else {
    json = {
    };
}
localStorage.setItem("jsn", JSON.stringify(json));
//con.innerHTML = localStorage.jsn;

for (const [key, value] of Object.entries(json)) {
  let element = document.createElement("option");
  element.appendChild(document.createTextNode(key.replaceAll("-", " ")));
  document.getElementById('clothing').appendChild(element); 
  
  document.querySelector("#items").innerHTML += `${key.replaceAll("-", " ")}: ${value.worn} Time(s) <br/>`;
}

document.querySelector("#enter").onclick = function() {
    json[document.querySelector("select").value].worn++;
    localStorage.setItem("jsn", JSON.stringify(json));
    //con.innerHTML = localStorage.jsn;
  document.querySelector("#items").innerHTML = "";
  for (const [key, value] of Object.entries(json)) {
  //con.innerText += `<option value="${key}">${key.replaceAll("-", " ")}</option>`;
  document.querySelector("#items").innerHTML += `${key.replaceAll("-", " ")}: ${value.worn} Time(s) <br/>`;
}
}

document.querySelector("#get").onclick = function() {
  for(const [key, value] of Object.entries(json)) {
    if(value.worn <= lowNum) {
      lowNum = value.worn;
    }
  }
  for(const [key, value] of Object.entries(json)) {
    if(value.worn <= lowNum) {
      lowest.push(key);
    }
  }
  document.querySelector("#out").innerHTML = lowest[Math.floor(Math.random() * lowest.length)].replaceAll("-", " ");
  lowest = [];
  lowNum = 1000;
}

const average = (array) => array.reduce((a, b) => a + b) / array.length;

let hue = 0;
setInterval(function() {
  document.querySelector("html").style.background = `hsl(${hue}, 40%, 50%)`;
  document.querySelector("body").style.background = `hsl(${hue}, 40%, 50%)`;
  hue++;
  if(hue > 360) {
    hue = 0;
  }
}, 400); 
// Get the element
let elem = document.querySelector('#bubble');

// Create a copy of it
for(let i = 0;i < 50; i++) {
  let clone = elem.cloneNode(true);
  clone.id = 'elem' + i;
  elem.after(clone);
  clone.style = `
  position: fixed; 
  left: ${Math.floor(Math.random() * innerWidth) - 400}px; 
  right: auto; 
  top: ${Math.floor(Math.random() * innerHeight)-250}px; 
  bottom:auto;
  z-index: -2;
  animation-duration: ${Math.floor(Math.random() * 7)+10}s;
  fill: lightblue;
  `;
}

document.querySelector("#add").onclick = function() {
  if(document.querySelector("#inp").value) {
    let element = document.createElement("option");
    element.appendChild(document.createTextNode(document.querySelector("#inp").value));
    document.getElementById('clothing').appendChild(element); 
    json[document.querySelector("#inp").value.replaceAll(" ", "-")] = new Cloth();
    localStorage.setItem("jsn", JSON.stringify(json));
    document.querySelector("#items").innerHTML = '';
    for (const [key, value] of Object.entries(json)) {
  document.querySelector("#items").innerHTML += `${key.replaceAll("-", " ")}: ${value.worn} Time(s) <br/>`;
}
  }
}
