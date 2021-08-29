
const callMealDB = () => {
    const inputValue = document.getElementById("input").value
    console.log(inputValue)

    const mealdbUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
    fetch(mealdbUrl).then(res => res.json()).then(data => console.log(data)).catch(error => console.log(error));
}