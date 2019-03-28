/*function go(name, age){
    alert(name);
    alert(age);
}
go("Bender", "39");
go("Alban", "20");

function add(first, second) {
    return first+second;
}
var sum = add(1, 2);
alert(sum);


//EVENT LISTENERS #1

var myList ['apples', 'oranges', 'bananas'];
var numOne = document.getElementById("num-one");
var numTwo = document.getElementById("num-two");
var addSum = document.getElementById("add-sum");

numOne.addEventListener("input", add);
numTwo.addEventListener("input", add);
function add(){
    var one = parseFloat(numOne.value) || 0;
    var two = parseFloat(numTwo.value) || 0;
    var sum = one+two;
    addSum.innerHTML = "your sum is: "+sum;
};*/

//EVENT LISTENERS #2

/*var simon = document.getElementById("simon");
var bruce = document.getElementById("bruce");
var ben = document.getElementById("ben");

simon.addEventListener("click", picLink);
bruce.addEventListener("click", picLink);
ben.addEventListener("click", picLink);

var allImages = document.querySelectorAll("img");

function picLink() {

    var picId = this.attributes["data-img"].value;
    alert(this);
    console.log(this);
    var pic = document.getElementById(picId);
    if (pic.style.display === "none") {
        for (var i = 0; i < allImages.length; i++) {
        allImages[i].style.display = "none";
        }
        pic.style.display="block";
    }
    else if (pic.style.display === "block"){
    pic.style.display="none";
    }    
}*/

/*var checklist = document.getElementById("checklist");

var items = checklist.querySelectorAll("li");
var inputs = checklist.querySelectorAll("input");

for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", editItem);
  inputs[i].addEventListener("blur", updateItem);
  inputs[i].addEventListener("keypress", itemKeypress);
}

function editItem() {
  this.className = "edit";
  var input = this.querySelector("input");
  input.focus();
  input.setSelectionRange(0, input.value.length);
}

function updateItem() {
  this.previousElementSibling.innerHTML = this.value;
  this.parentNode.className = "";
}

function itemKeypress(event) {
  if (event.which === 13) {
    updateItem.call(this);
  }
}*/

import $ from "jquery";

function showError(e) {
  console.warn("Error", e);
}

function updateUI(info) {
  $("#app").text(JSON.stringify(info));
}

function getLocationURL([city, state]) {
  return `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%2C%20${state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: `https://api.github.com/users/${id}`,
      success: resolve,
      error: reject
    });
  });
}

function getWeather(user) {
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: getLocationURL(user.location.split(",")),
      success(weather) {
        resolve({ user, weather: weather.query.results });
      },
      error: reject
    });
  });
}

$("#btn").on("click", () => {
  getUser("tylermcginnis")
    .then(getWeather)
    .then(data => {
      updateUI(data);
    })
    .catch(showError);
});
