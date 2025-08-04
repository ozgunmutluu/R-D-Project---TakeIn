let searchBar = document.getElementById("search")
let recipeList = document.getElementById("recipes-list")

searchBar.addEventListener("keyup", (event) =>{
    if(!(event.key == "Enter")) return;

    search()
})

document.getElementById("search-button").addEventListener("click", () => {
    search()
})



async function search() {
    let value = searchBar.value;
    recipeList.innerHTML = "";
    recipeList.classList.add("fa-spinner", "fa-solid", "fa-2xl")

    let response = await fetch("/recipe/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({value})
    })

    recipeList.classList.remove("fa-spinner", "fa-solid", "fa-2xl")
    if(response.ok){
        let result = await response.json();
        result.forEach(el => createRecipe(el))
    }else {
        displayError("An internal error occured.")
    }

}

function createRecipe(recipe){
    let container = document.createElement("div")
    container.id = recipe._id
    container.classList.add("recipe-container")

    let imgString = recipe.image ? "data:image/jpeg;base64,"+recipe.image : "images/placeholder.png"
    
    let ratingString = "";
    for(i=0; i<5; i++) {
        if(i+1 <= recipe.rating){
            ratingString += "★"
        } else {
            ratingString += "☆"
        }
    }
    ratingString += `(${recipe.no_ratings || 0})`

    container.innerHTML += `
    <img class="recipe-photo"  src="${imgString}" alt="">
    <div class="recipe-data">
        <p><b> ${recipe.title}</b></p>
        <p> ${ratingString}</p>
        <p> Nutri-Score: ${recipe.nutriscore}/5</p>
        <p> ${recipe.description}</p>
    </div>`

    container.addEventListener("click", (e) => {
        if(e.target.tagName != "I"){
            window.location = `/recipe?id=${recipe._id}`
        }
    })

    recipeList.appendChild(container)
}