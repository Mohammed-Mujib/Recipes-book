var modal = document.getElementById("model");
var single = document.getElementById("single");
var link = document.querySelectorAll(".nav-link");
var modalLabel = document.getElementById("exampleModalLabel");
var getMore = document.getElementById("getMore");
var input1 = document.getElementById("input1");
var searchWords = document.getElementById("searchWords");
var error = document.getElementById("error");
var rowData = document.getElementById("data");
let recipes = []; 
const items = [
    "carrot", "broccoli", "asparagus", "cauliflower", "corn", "cucumber",
    "green pepper", "lettuce", "mushrooms", "onion", "potato", "pumpkin", "red pepper",
    "tomato", "beetroot", "brussels sprouts", "peas", "zucchini", "radish",
    "sweet potato", "artichoke", "leek", "cabbage", "celery", "chili",
    "garlic", "basil", "coriander", "parsley", "dill", "rosemary",
    "oregano", "cinnamon", "saffron", "green bean", "bean", "chickpea",
    "lentil", "apple", "apricot", "avocado", "banana", "blackberry",
    "blackcurrant", "blueberry", "boysenberry", "cherry", "coconut", "fig",
    "grape", "grapefruit", "kiwifruit", "lemon", "lime", "lychee",
    "mandarin", "mango", "melon", "nectarine", "orange", "papaya",
    "passion fruit", "peach", "pear", "pineapple", "plum", "pomegranate",
    "quince", "raspberry", "strawberry", "watermelon", "salad", "pizza",
    "pasta", "popcorn", "lobster", "steak", "bbq", "pudding",
    "hamburger", "pie", "cake", "sausage", "tacos", "kebab", "poutine",
    "seafood", "chips", "fries", "masala", "paella", "som tam",
    "chicken", "toast", "marzipan", "tofu", "ketchup",
    "hummus", "maple syrup", "parma ham", "fajitas", "champ",
    "lasagna", "poke", "chocolate", "croissant", "arepas",
    "bunny chow", "pierogi", "donuts", "rendang", "sushi", "ice cream",
    "duck", "curry", "beef", "goat", "lamb", "turkey",
    "pork", "fish", "crab",
    "bacon", "ham", "pepperoni", "salami", "ribs"
];

for (let i = 0; i < link.length ; i++) {
    link[i].addEventListener('click',(e)=>{
        getAllRecipes(e.target.innerHTML);
    });
}

const lowercaseItems = items.map(item => item.toLowerCase());

//  get all the recipes from the server and use the displayRecipes function ----------------------------------------- get recipes function
async function getAllRecipes(item = "pizza") {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${item}`);
    let data = await response.json();
    recipes = data.recipes;
    // console.log(data.recipes);
    displayRecipes();
    input1.value = item;   
    searchWords.innerHTML = "";
}

// activate when the user search for some thing and display the available options and mark the match ---------------- serach function
function search(word) {
    let box = "";
    for (let i = 0; i < items.length; i++) {
        if (items[i].includes(word) && word !="") {
            box += `<li class="p-2" onclick = "getAllRecipes('${items[i]}')" >${items[i].replace(word,`<span class = "selection-color">${word}</span>`)} </li>` ;
        }
        if (box.length == 0) {
            error.classList.remove("d-none");
        } else {
            searchWords.innerHTML = box;
            error.classList.add("d-none");
        }
        if (input1.value == "") {
            error.classList.add("d-none");
        }
    }
    searchWords.innerHTML = box;
    searchWords.style.display= "block";
}

// activate the search function when the user search for some thing  ------------------------------------------------ event keyup
input1.addEventListener("keyup",()=>{
    search(input1.value.toLowerCase())
});

getAllRecipes('pizza');

// display all the recipes founded in the server --------------------------------------------------------------------- recipes display function
function displayRecipes() {
    let box = "";
    for (i of recipes) {
        box += `
        <div class="col-lg-4 col-md-6 col-sm-12 p-2 rounded">
            <div class="all p-3 rounded recipe-card">
                <div class=" rounded img-holder">
                    <img src="${i.image_url}" alt="" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = 'getSingleRecipe(${i.recipe_id})'>
                </div>
                <div class=" pt-2">
                    <h2 data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = 'getSingleRecipe(${i.recipe_id})'>${i.title}</h2>
                    <p>${i.publisher}</p>
                </div>
            </div>
        </div>
        `;
    }
    rowData.innerHTML = box;
}


let singleRecipe = {};

async function getSingleRecipe(id) {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
    let data = await response.json()
    singleRecipe =data.recipe
    console.log(data.recipe);
    displaySingleRecipe(singleRecipe)
}

getSingleRecipe()

// get a single recipe informationfrom the ser
function displaySingleRecipe(data) {
    let inger = "";
    for ( info of data.ingredients) {
        inger += `<li>${info}</li>`;
    }
    modalLabel.innerHTML = data.title
    modal.innerHTML = `<ul>${inger}</ul>`
}