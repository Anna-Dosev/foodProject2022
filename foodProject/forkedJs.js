const form = document.querySelector('.form-container');
const mainContainer = document.querySelector('.main-search-container');
const foodItem = document.querySelector(".food-item")
const ingredients = document.getElementById('ingredients')
const cuisinie = document.getElementById('cuisine')
const allFoodSearchButton = document.querySelector('.search-btn')

//AUTOSEARCH
const itemsContent = [
    'African',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Jewish',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese'
];
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector(".input-box");
const suggBox = searchWrapper.querySelector(".autocom-box");

inputBox.addEventListener('keyup', e => {
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){
        // inputBox.onclick = ()=>{
        //     linkTag.click();
        // }
        emptyArray = itemsContent.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            return data = `<li class="list-style">${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    } else{
        searchWrapper.classList.remove("active"); //show autocomplete box
    }
});

     //clicking on suggestion puts it in input box
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    // inputBox.onclick = ()=>{
    //     linkTag.click();
    // }
    searchWrapper.classList.remove("active");
}

     //shows suggestions when start to type
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li class="list-style">${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}



getRecipes = async (formData) => {
    const ingredients = formData.ingredients
    const cuisine = formData.search
    const dietaryChoice = formData.dietaryChoices
    const intolerances = formData.allergies
    const lowCarb = formData.lowCarb

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=pasta`
    //?${ingredients?`query=${ingredients}&`:''}${cuisine?`cuisine=${cuisine}&`:''}${dietaryChoice?`diet=${dietaryChoice}&`:''}${intolerances?`intolerances=${intolerances}&`:''}addRecipeInformation=true&addRecipeNutrition=true${lowCarb?"&maxCarbs=10":''}${allottedTime?`&maxReadyTime=${allottedTime}`:''}${recipeQuantity?`&number=${recipeQuantity}`:''}&apiKey=13a4aae35e96427686c99768c8c8f9c5`
      
    
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '5a61fdea5cmsh897482afa700670p1c35bajsnf5b82c3a86de',
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'X-Requested-With' : '13a4aae35e96427686c99768c8c8f9c5',
          'Content-Type' : 'application/json'
        }
        
    });

    const jsonData = await response.json()
    console.log(jsonData)
    const complexResult = jsonData.results
    

    foodItem.innerText = ''
    
    for(let comRes of complexResult) {
        const titDis = comRes.title //title display
        const imDis = comRes.image //image display
        const cookTime = comRes.readyInMinutes // time display
        const ingDis = comRes.nutrition.ingredients //ingredients
        const nuDis = comRes.nutrition // nutrition
        const sumDis = comRes.summary // summary of dish
        
        
        const comResInfo = document.createElement('div')
        comResInfo.className = 'recipe-container'
        // TODO determine whether to include ingDis, sumDis and nuDis in the HTML below (@Oscar)
        comResInfo.innerHTML = 
        `<div class="wrapper-grid" class="entireBox">
            <div class="resultContainer" class="boxBody">
                <div class='banner-img'></div>
                <img src="${imDis}" alt='profile image' class="profile-img">
                <h1 class="recipeName">${titDis}</h1>
                <h3 class='cook-time'>${cookTime} min </h3>
                <br>
            <button class='viewRecipeBtn'>View Recipe</button>
            </div>
          </div>
        `

  const resultsContainer = document.getElementById('food-result')
    for(let recipe of complexResult) {
        const recipeInfo = document.createElement('div')
        recipeInfo.className = 'recipe-container'
        recipeInfo.innerHTML = 
        `<div class="wrapper-grid" class="entireBox">
            <div class="resultContainer" class="boxBody">
                <div class='banner-img'></div>
                <img src="${recipe.image}" alt='profile image' class="profile-img">
                <h1 class="recipeName">${recipe.title}</h1>
                <h3 class='cook-time'>${recipe.cookTime} min </h3>
                <br>
            <button class='viewRecipeBtn'>View Recipe</button>
        </div>
        `
        resultsContainer.append(recipeInfo);
    }
}
}


allFoodSearchButton.addEventListener('click',getRecipes)







//SEARCH BTN
const searchBtn = document.querySelector('.search-btn');

searchBtn.onclick = function() {
 console.log('button enabled')
}
