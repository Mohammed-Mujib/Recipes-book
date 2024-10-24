// let myobject = {
//     title:"saitama",
//     body: 'of steel',
//     userId: 1,
// }
// async function getData(params) {
//     let response = await fetch("https://jsonplaceholder.typicode.com/posts",{
//         method:"POST",
//         body: JSON.stringify(myobject),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     });
//     let data = await response.json()
//     console.log(data);
    
// }
// getData()

// let upobject = {
//     userId : 1,
//     title :"chapter 1",
//     body :"the ultimit gatcha",
//     id : 1,
// }

// async function updateData() {
//     let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${upobject.id}`,{
//         method:"PUT",
//         body: JSON.stringify(upobject),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     });
//     let data = await response.json()
//     console.log(data);
    
// }

// updateData()
// async function DeleteData() {
//     let response = await fetch(`https://jsonplaceholder.typicode.com/posts/1`,{
//         method:"DELETE",
        
//     });
//     let data = await response.json()
//     if (data.ok) {
//         console.log("data has been deleted");   
//     }
// }
// DeleteData()

// let request = new XMLHttpRequest;

var modal=document.getElementById("model");
var single=document.getElementById("single");
var link=document.querySelectorAll(".nav-link");
var exampleModalLabel=document.getElementById("exampleModalLabel");
var getMore=document.getElementById("getMore");
var input1=document.getElementById("input1");
var searchWords=document.getElementById("searchWords");
var error=document.getElementById("error");
var rowData=document.getElementById("data");
// console.log(link);
for (let i = 0; i < link.length ; i++) {
    link[i].addEventListener('click',(e)=>{
        getAllRecipes(e.target.innerHTML)
    });
}
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
const lowercaseItems = items.map(item => item.toLowerCase());

console.log(lowercaseItems);
let recipes = []; 
async function getAllRecipes(item = "pizza") {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${item}`);
    let data = await response.json()
    recipes = data.recipes;
    console.log(data.recipes);
    displayRecipes()
    input1.value = item;   
    searchWords.innerHTML = "";
    
}

function search(word) {
    let box = "";
    for (let i = 0; i < items.length; i++) {
        if (items[i].includes(word) && word !="") {
            box += `<li class="p-2" onclick = "getAllRecipes('${items[i]}')" >${items[i].replace(word,`<span class = "span">${word}</span>`)} </li>` ;
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

input1.addEventListener("keyup",()=>{
    search(input1.value.toLowerCase())
})

getAllRecipes('pizza');

function displayRecipes() {
    let box = "";
    for (i of recipes) {
        box += `
        <div class="col-lg-4 col-md-6 col-sm-12 p-2 rounded">
            <div class="all p-2 bg-white rounded mycard_re">
                <div class="p-2 rounded img-holder">
                    <img src="${i.image_url}" alt="" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = 'getSingleRecipe(${i.recipe_id})'>
                </div>
                <div class="p-2">
                    <h2>${i.title}</h2>
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
    displaySingleRecipe()
    
}
getSingleRecipe()
function displaySingleRecipe() {
    let inger = "";
    for ( info of singleRecipe.ingerdients) {
        inger += `<li>${i}</li>`;
    }
    let box = `
    
    `;
}