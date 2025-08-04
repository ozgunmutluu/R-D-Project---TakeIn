let recipeID = window.location.search.substr(1).split("=")[1]

document.getElementById("leave-review")?.addEventListener("click", (e) => {
    if(e.target.hasAttribute("canEdit")){
        window.location = `http://localhost:8000/recipe/submit?id=${recipeID}`
    }else {
        document.getElementById("write-review").classList.toggle("active")
    }
})

let stars = document.getElementById("star-ratings")
let rating = 1;

stars.addEventListener("click", (e) =>{
    if(e.target.tagName = "SPAN"){

        for(let star of stars.children){
            rating = e.target.getAttribute("number")
            if(rating >= star.getAttribute("number")){
                star.classList.add('checked');
            }else {
                star.classList.remove('checked');
            }
        }
    }
})

stars.addEventListener("hover", (e) =>{
    if(e.target.tagName = "SPAN"){

        for(let star of stars.children){
            rating = e.target.getAttribute("number")
            if(rating >= star.getAttribute("number")){
                star.classList.add('checked');
            }else {
                star.classList.remove('checked');
            }
        }
    }
})

document.getElementById("submit-review").addEventListener("click", async () => {
    let description = document.getElementById("review-text").value;
    let response = await fetch("/recipe/review", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify({recipeID, rating, description})
    })
    if(response.ok){
        window.location.reload();
        
    }else{
        displayError(response.statusText);
    }
})

document.getElementById("write-review").addEventListener("click", (el) => {
    if(el.target.id == "write-review"){
        document.getElementById("write-review").classList.toggle("active")
    }
})

document.getElementById("star-recipe").addEventListener("click",async  (el) => {
    let star = el.target
    if(!star.classList.contains("fa-star")) return;
    let liked = star.classList.contains("checked")
    let method = liked ? "DELETE" : "POST" 

    star.classList.remove("fa-star")
    star.classList.add("fa-spinner")
    let response = await fetch("/profile/favourite", {
        method: method,
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({recipeID})
    })

    if(response.ok){
        star.classList.toggle("checked")
        star.classList.add("fa-star")
        star.classList.remove("fa-spinner")
    }else {
        displayError("An error occured")
    }
})

let people= document.getElementById("no_people")
document.getElementById("add-people").addEventListener("click", () => changePeople(1))
document.getElementById("minus-people").addEventListener("click", () => changePeople(-1))

function changePeople(n){
    if(people.innerHTML - -n > 0) people.innerHTML =  (people.innerHTML - -n);
}

document.getElementById("add-cart")?.addEventListener("click", async (el) => {
    let value = --(people.innerHTML)

    let response = await fetch("/cart", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({recipeID, people: value})
    })

    if(response.ok){
        el.target.remove()
    }else {
        displayError(response.statusText);
    }
})