var arr = [];
var fav = [];

// getting 10 random meals to display
async function meals() {
  for (let i = 0; i < 12; i++) {
    var meal = await fetch('https:www.themealdb.com/api/json/v1/1/random.php')
    var meallist = await meal.json();
    var ok = meallist.meals[0];
    arr.push(ok);
  }

}
meals().then(showMeal);

function showMeal() {

  for (var n = 0; n < arr.length; n++) {
    var currentMeal = arr[n];
    var l = currentMeal;

    var div = document.getElementById('meals');

    div.innerHTML += `<div class="card mycards" style="width: 18rem;">
        <img src="${l.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${l.strMeal}</h5>
          <button type="submit" class="favbtn" id="${l.idMeal}">Fav</button>
          <a href="${l.strYoutube}" class="btn">You Tube</a>
          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          About
        </button>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">${l.strMeal}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-dialog modal-dialog-scrollable">
                  ${l.strInstructions
      }
                </div>
              <div class="modal-footer">
                <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
               
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>`;
  }
}

// Rendering list

function renderingListToADD() {
  let favlist = document.getElementById('my-fav-list')
  favlist.innerHTML = "";


  for (let i = 0; i < fav.length; i++) {
    let obj = fav[i];

    favlist.innerHTML += `<div class="card mycards" data-id="${obj.idMeal}" style="width: 18rem;">
        <img src="${obj.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${obj.strMeal}</h5>
          <button type="submit" class="favbtn" id="${obj.idMeal}" data-id="1">Remove</button>
          <a href="${obj.strYoutube}" class="btn">You Tube</a>`;
  }
}

// add meals into FAV

document.addEventListener('click', function (e) {
  for (let n = 0; n < arr.length; n++) {
    if (arr[n].idMeal == e.target.id) {
      if (!fav.includes(arr[n])) {
        fav.push(arr[n]);
        renderingListToADD();
        alert("Meal added successfully into your FAV list");
        return;
      }
      else {
        if (e.target.dataset.id != "1") {
          alert("This Meal is already into your FAV list")
          return;
        }
      }
    }


  }
});


//deleting meal from fav

document.addEventListener('click', function (e) {
  if (e.target.dataset.id == "1") {
    let idofelement = e.target.id;
    for (let n = 0; n < fav.length; n++) {
      if (fav[n].idMeal === idofelement) {
        fav.pop(fav[n]);
      }
    }
    renderingListToADD();
    alert("Meal deleted successfully");
  }
})

//show meal by searching name

let searchBtn = document.getElementById('btn');
searchBtn.addEventListener('click', function () {
  let input = document.getElementById('input');
  let text = input.value;
  input.value = "";
  if (text.length > 0) {
    searchMEAL(text);
  }
  else {
    alert("Empty String cant be searched");
  }
})

async function searchMEAL(text) {
  let searchedMeal = await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
  let resultSearchedMeal = await searchedMeal.json();
  if (resultSearchedMeal.meals != null) {
    let serObj = resultSearchedMeal.meals[0];
    showMealIntoDIV(serObj);
    arr.push(serObj);
  }
  else {
    alert("Can not find this MEAL!!!");
  }

}

function showMealIntoDIV(obj) {
  let showDIV = document.getElementById('searchByName');
  showDIV.innerHTML += `<div class="card mycards"  style="width: 18rem;" id="${obj.idMeal}">
    <img src="${obj.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${obj.strMeal}</h5>
      <button type="submit" class="favbtn" id="${obj.idMeal}">Fav</button>
      <button type="submit" class="favbtn" id="delete" data-id="${obj.idMeal}">Remove</button>


      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    About
  </button>
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">${obj.strMeal}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-dialog modal-dialog-scrollable">
            ${obj.strInstructions
    }
          </div>
        <div class="modal-footer">
          <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
         
        </div>
      </div>
    </div>
  </div>




      <a href="${obj.strYoutube}" class="btn">You Tube</a>
    </div>
  </div>`;
}

document.addEventListener('click', function (e) {
  if (e.target.id === 'delete') {
    let parent = document.getElementById('searchByName')
    let abc = document.getElementById(`${e.target.dataset.id}`);

    parent.removeChild(abc);

  }
})



//show suggestion

let suggestion = document.getElementById('input');
suggestion.addEventListener('keyup', function () {
  let list = document.getElementById('suggestionList');
  list.innerHTML = '';
  let string = suggestion.value;
  if (string.length != 0) {
    fetchAPI(string);
  }
})

async function fetchAPI(text) {
  let list = document.getElementById('suggestionList');
  let q;
  if (text.length === 1) {
    q = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`)
  }
  else {
    q = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
  }
  let object = await q.json();
  if (object != null) {
    for (let i = 0; i < object.meals.length; i++) {
      let name = object.meals[i].strMeal;
      list.innerHTML += `<li class="list">${name}</li>`
    }
  }

}

document.addEventListener('click', function (e) {

  if (e.target.id != "suggestionList") {
    let list = document.getElementById('suggestionList');
    list.innerHTML = '';
    document.getElementById("suggestionList").style.visibility = "hidden";

  }


  if (e.target.className === 'list') {
    let input = document.getElementById('input');
    input.value = e.target.innerHTML;
  }

  if (e.target.id === 'input') {
    document.getElementById("suggestionList").style.visibility = "visible";
  }


})








