const mainContainer = document.querySelector('.main-search-container');
const foodItem = document.querySelector(".food-item")
const ingredients = document.getElementById('ingredients')
const cuisine = document.getElementById('cuisine')
const foodForm = document.querySelector('.form-container')


const handleSubmit = e => {
    console.log('hello')
      e.preventDefault();
      const data = new FormData(foodForm);
      const stringified = stringifyFormData(data);
      console.log(stringified);
      const userInput = JSON.parse(stringified)
      getRecipes(userInput)
    };
    
    foodForm.addEventListener('submit', handleSubmit);
  
  function stringifyFormData(fd) {
      const data = {};
      for (let key of fd.keys()) {
        if (data[key]) {
          data[key] = fd.getAll(key);
        } else {
          data[key] = fd.get(key);
        }
      }
      return JSON.stringify(data, null, 4);
    }


//API CALL
getRecipes = async (formData) => {

    const ingredients = formData.ingredients
    const cuisine = formData.search
    const dietaryChoice = formData.dietaryChoices
    const intolerances = formData.allergies

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?number=10&${ingredients?`query=${ingredients}&`:''}${cuisine?`cuisine=${cuisine}&`:''}${dietaryChoice?`diet=${dietaryChoice}&`:''}${intolerances?`intolerances=${intolerances}&`:''}addRecipeInformation=true&addRecipeNutrition=true&apiKey=13a4aae35e96427686c99768c8c8f9c5`
      
    const response = await fetch(apiUrl)
    const jsonData = await response.json()
    console.log(jsonData)
    const complexResult = jsonData.results

  const resultsContainer = document.getElementById('wrapper-grid')
    resultsContainer.innerHTML = ''
    for(let recipe of complexResult) {
        const recipeInfo = document.createElement('div')
        recipeInfo.className = 'resultContainer'
        recipeInfo.innerHTML = 
        `<div class='banner-img'></div>
            <img src="${recipe.image}" alt='profile image' class="profile-img">
            <h1 class="recipeName">${recipe.title}</h1>
            <h3 class='cook-time'>Prep time: ${recipe.readyInMinutes} min </h3>
            <a target="_blank" href=${recipe.sourceUrl} type='submit' class='viewRecipeBtn'>View Recipe</a>
        `
        if (complexResult[11]) {break;}
        resultsContainer.append(recipeInfo);
    }
}

//SEARCH BTN
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', handleSubmit)
