for (let item of document.getElementsByClassName("recipe-container")){
    item.addEventListener("click", (e) => {
        if(e.target.tagName != "I"){
            window.location = `/recipe?id=${item.id}`
        }
    })
};


document.getElementById("random-container").addEventListener("click", async (el) => {
    let refresher = el.target
    let container = document.getElementById("random-container")
    let overlay = document.getElementById("random-overlay")

    if(refresher.id != "regenerate-recipe") return 
    
    overlay.classList.toggle("active")
    overlay.classList.toggle("deactive")
    let response = await fetch("./recipe/random",{method: 'GET'})
    
    if(response.ok){
        let result = await response.json()
        while(container.lastChild.id != "regenerate-recipe"){
            container.lastChild.remove()
        }


        refresher.classList.remove("button-primary")
        refresher.classList.add("fa-solid", "fa-arrows-rotate", "refresher")
        refresher.innerHTML = ""
        let recipe = document.createElement('div')
        let imgString = result.image ? "data:image/jpeg;base64,"+result.image : "images/placeholder.png"
        let ratingString = ""

        for(i=0; i<5; i++) {
            if(i+1 <= result.rating){
                ratingString += "★"
            } else {
                ratingString += "☆"
            }
        }

        ratingString += `(${result.no_ratings})`

        container.innerHTML += `
        <img class="rPhoto"  src="${imgString}" alt="">
        <div class="random-info-container">
            <b class="rTitle"> ${result.title}</b>
            <p class="rRating"> ${ratingString}</p>
            <p class="rNutri"> Nutri-Score: ${result.nutriscore}/5</p>
            <p class="rDesc"> ${result.description}</p>
        </div>`

        container.appendChild(recipe)
        overlay = document.getElementById("random-overlay")
        setTimeout(() => { overlay.classList.toggle("active")}, 100)
        setTimeout(() => {overlay.classList.toggle("deactive")}, 300)

    }
})

document.getElementById("create-recipe").addEventListener("click", (el) => {
    if(el.target.tagName == "BUTTON") {
        window.location = "/recipe/submit?id=new"
    }
})