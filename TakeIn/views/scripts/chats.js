let overlay = document.getElementById("overlay")

overlay.addEventListener("click", (el) => {
    if(el.target.id == "overlay"){
       overlay.classList.toggle("active")
    }
})

document.getElementById("activate-search").addEventListener("click", (el) => {
    overlay.classList.toggle("active")
})

document.getElementById("search-button").addEventListener("click", async () => {
    let username = document.getElementById("search-bar").value.trim();

    let response = await fetch("/profile/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username})
    })

    if(response.ok){
        let result = await response.json()
        window.location = `/chat?id=${result.id}`
    }else {
        document.getElementById("error-message").innerHTML = response.statusText
    }
})