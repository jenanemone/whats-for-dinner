document.getElementById('srchBtn').addEventListener('click', getBoth);

let mealUrl;
let drinkUrl;

let mealData;
let drinkData;
let drink;
let meal;

async function getBoth() {

    drink = document.querySelector('.drinkInput').value;
    if (drink) {
        drinkUrl = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;
    }
    else {
        drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
    }
    meal = document.querySelector('.eatInput').value;
    if (meal) {
        mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
    }
    else {
        mealUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;
    }
    drinkData = await getDrink(drinkUrl);
    mealData = await getMeal(mealUrl);
    displayData(drinkData, mealData);
}

function getMeal(mealUrl) {
    return fetch(mealUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log('get meal fired')
            mealData = data;
            console.log(mealData);
            return mealData;
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}
function getDrink(drinkUrl) {
    return fetch(drinkUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log('get drink fired')
            drinkData = data;
            console.log(drinkData);
            return drinkData;
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

function displayData(drinkData, mealData) {
    // if (document.querySelector('li')) {
    //     foodName.innerText = '';
    //     drinkName.innerText = '';
    //     document.querySelector('.mealInstructionSet').removeChild('li');
    // }
    console.log('inside displayData() with: ');
    console.log(drinkData, mealData);
    document.querySelector('.mainDrinkImg').src = drinkData.drinks[0].strDrinkThumb;
    document.querySelector('.mainMealImg').src = mealData.meals[0].strMealThumb;
    const leftParent = document.querySelector('.topLeft');
    const rightParent = document.querySelector('.topRight');
    rightParent.style["justify-content"] = "space-evenly";
    leftParent.style["justify-content"] = "space-evenly";
    const foodName = mealData.meals[0].strMeal;
    const foodNameElement = document.createElement('h2');
    foodNameElement.innerText = foodName;
    leftParent.appendChild(foodNameElement);
    document.querySelector('.topLeft').style['flex-direction'] = 'column';

    const drinkName = drinkData.drinks[0].strDrink;
    const drinkNameElement = document.createElement('h2');
    document.querySelector('.fa-utensils').style.transform = "rotate(0deg)";
    drinkNameElement.innerText = drinkName;
    rightParent.appendChild(drinkNameElement);
    document.querySelector('.topRight').style['flex-direction'] = 'column';
    document.querySelector('.fa-martini-glass').style.transform = "rotate(0deg)";


    const mealIngsUL = document.querySelector('.mealIngredientSet');
    const ingredientHeaders = document.querySelectorAll('.header')
    ingredientHeaders.forEach(elem => {
        elem.innerText = "Ingredients";
        elem.classList.add("headerStyling");
        elem.classList.add("headerStyling::before");
        elem.classList.add("headerStyling::after");
    });
    mealIngsUL.classList.add("notepaper");
    const drinkIngsUL = document.querySelector('.drinkIngredientSet');
    drinkIngsUL.classList.add("notepaper");

    let mealIngredients = [];
    let drinkIngredients = [];
    let tempLI;
    let tempLI2;

    for (let i = 1; i <= 20; i++) {
        let drinkIngredient = drinkData.drinks[0][`strIngredient${i}`];
        let drinkMeasure = drinkData.drinks[0][`strMeasure${i}`];
        let mealIngredient = mealData.meals[0][`strIngredient${i}`];
        let mealMeasure = mealData.meals[0][`strMeasure${i}`];
        if (drinkIngredient && drinkMeasure) {
            tempLI = document.createElement('li');
            tempLI.innerText = `${drinkIngredient} ${drinkMeasure}`;
            drinkIngsUL.appendChild(tempLI);
        }
        else if (drinkIngredient && !drinkMeasure) {
            tempLI = document.createElement('li');
            tempLI.innerText = `${drinkIngredient}`;
            drinkIngsUL.appendChild(tempLI);
        }
        if (mealIngredient && mealMeasure) {
            tempLI2 = document.createElement('li');
            tempLI2.innerText = `${mealIngredient} ${mealMeasure}`;
            mealIngsUL.appendChild(tempLI2);
        }
        else if (mealIngredient && !mealMeasure) {
            tempLI2 = document.createElement('li');
            tempLI2.innerText = `${mealIngredient}`;
            mealIngsUL.appendChild(tempLI2);
        }

    }

    const allDrinkInstructions = drinkData.drinks[0].strInstructions.split('. ');
    const allMealInstructions = mealData.meals[0].strInstructions.split('. ');
    console.log(allDrinkInstructions);
    console.log(allMealInstructions);
   
    const drinkInstrUL = document.querySelector('.drinkInstructionSet');
    const mealInstrUL = document.querySelector('.mealInstructionSet');
    if (allDrinkInstructions) {
        for (let i = 0; i < allDrinkInstructions.length; i++) {
            console.log(allDrinkInstructions[i])
            tempLI = document.createElement('li');
            tempLI.innerText = `${allDrinkInstructions[i]}`;
            drinkInstrUL.appendChild(tempLI);
        }
    }
    if (allMealInstructions) {
        for (let i = 0; i < allMealInstructions.length; i++) {
            console.log(allMealInstructions[i])
            let tempLI2 = document.createElement('li');
            tempLI2.innerText = allMealInstructions[i];
            mealInstrUL.appendChild(tempLI2);
        }   
    }
    console.log(mealIngredients);
    console.log(drinkIngredients);

}

function timer(ms) {
    console.log("Timer activated")
    return new Promise(res => setTimeout(res, ms));
}


