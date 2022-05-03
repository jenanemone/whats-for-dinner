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
    foodNameElement.style["font-size"] = "3 rem";
    foodNameElement.innerText = foodName;
    leftParent.appendChild(foodNameElement);
    document.querySelector('.topLeft').style['flex-direction'] = 'column';

    const drinkName = drinkData.drinks[0].strDrink;
    const drinkNameElement = document.createElement('h2');
    drinkNameElement.style['font-size'] = "3 rem";
    drinkNameElement.innerText = drinkName;
    rightParent.appendChild(drinkNameElement);
    document.querySelector('.topRight').style['flex-direction'] = 'column';


    const mealIngsUL = document.querySelector('.mealIngredientSet');
    const drinkIngsUL = document.querySelector('.drinkIngredientSet');

    let mealIngredients = [];
    let drinkIngredients = [];
    let tempDrIngredientStr = '';
    let tempMeIngredientStr = '';
    let tempDr = '';
    let tempMe = '';
    let tempMeasure = '';
    let tempMs = '';
    let temp = '';
    let tempMeasure2 = '';
    let tempMes2 = '';
    let temp2 = '';
    let tempMeLI;
    let tempDrLI;
    for (let i = 1; i <= 20; i++) {
        tempDrIngredientStr = `strIngredient${i}`;
        tempDr = drinkData.drinks[0][tempDrIngredientStr];
        tempMeasure = `strMeasure${i}`;
        tempMs = drinkData.drinks[0][tempMeasure];
        tempMeIngredientStr = `strIngredient${i}`;
        tempMe = mealData.meals[0][tempMeIngredientStr];
        tempMeasure2 = `strMeasure${i}`;
        tempMes2 = mealData.meals[0][tempMeasure2];
        if (tempMs && tempMs != ' ') {
            temp = `${tempMs} ${tempDr}`;
            drinkIngredients.push(temp);
            tempDrLI = document.createElement('li');
            tempDrLI.innerText = temp;
            drinkIngsUL.appendChild(tempDrLI);
        }
        else if (tempDr && !tempMs && tempDr != ' ') {
            temp = `${tempDr}`;
            drinkIngredients.push(temp);
            tempDrLI = document.createElement('li');
            tempDrLI.innerText = temp;
            drinkIngsUL.appendChild(tempDrLI);
        }
        if (tempMes2 && tempMes2 != ' ') {
            temp2 = `${tempMes2} ${tempMe}`
            mealIngredients.push(temp2);
            tempMeLI = document.createElement('li');
            tempMeLI.innerText = temp2;
            mealIngsUL.appendChild(tempMeLI);
        }
        else if (tempMe && !tempMes2 && tempMe != ' ') {
            temp2 = `${tempMe}`;
            mealIngredients.push(temp2);
            tempMeLI = document.createElement('li');
            tempMeLI.innerText = temp2;
            mealIngsUL.appendChild(tempMeLI);
        }

    }
    const allDrinkInstructions = drinkData.drinks[0].strInstructions.split('. ');
    const allMealInstructions = mealData.meals[0].strInstructions.split('. ');
    if (drinkData.drinks[0].strInstructions) {
        for (let i = 0; i < allDrinkInstructions.length; i++) {
            let child = document.createElement('li');
            let mom = document.querySelector('.drinkIngredientSet');
            child.innerText = allDrinkInstructions[i];
            mom.appendChild(child);
        }
    }
    if (mealData.meals[0].strInstructions) {
        for (let i = 0; allMealInstructions.length; i++) {
            let child = document.createElement('li');
            let mom = document.querySelector('.mealIngredienSet');
            child.innerText = allMealInstructions[i];
            mom.appendChild(child);
        }
    }
    console.log(mealIngredients);
    console.log(drinkIngredients);

}

function timer(ms) {
    console.log("Timer activated")
    return new Promise(res => setTimeout(res, ms));
}


