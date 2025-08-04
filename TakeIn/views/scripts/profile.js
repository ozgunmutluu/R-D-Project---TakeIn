for (let item of document.getElementsByClassName("recipe-container")){
    item.addEventListener("click", async (e) => {
        if(e.target.tagName != "I"){
            window.location = `/recipe?id=${item.id}`
        }else {

            let response = await fetch("/profile/favourite", {
                method: "DELETE",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({recipeID: item.id})
            })
            if(response.ok){
                document.getElementById(item.id).remove()
                document.getElementById(item.id).remove()
            }else{
                displayError(response.statusText);
            }
        }
    })
};

let overlayFavourites = document.getElementById("overlay-favourites")
let overlayFriends = document.getElementById("overlay-friends")



document.getElementById("viewFavourites")?.addEventListener("click", (e) => {
    overlayFavourites.classList.toggle("active")
})
overlayFavourites.addEventListener("click", (el) => {
    if(el.target == overlayFavourites){
        overlayFavourites.classList.toggle("active")
    }
})


document.getElementById("friendslist")?.addEventListener("click", (e) => {
    overlayFriends.classList.toggle("active")
})
overlayFriends.addEventListener("click", (el) => {
    if(el.target == overlayFriends){
        overlayFriends.classList.toggle("active")
    }
})


document.getElementById("settings")?.addEventListener("click", ()=>{
    window.location = "./profile/settings"
})

document.getElementById("leftover")?.addEventListener("click", ()=>{
    window.location = "./leftover/submit?id=new"
})

document.getElementById("follow")?.addEventListener("click", async (e)=>{
    let method = e.target.dataset.method;
    let el = e.target

    let response = await fetch("/profile/follow", {
        method: method,
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({friendId: window.location.search.substr(1).split("=")[1]})
    })
    if(response.ok){
        if(method == "POST") {
            displayError("Added to followers", "#A9C1A0", "");
            el.dataset.method = "DELETE"; el.innerHTML = "Unfollow"
        }
        else {
            el.dataset.method = "POST"; el.innerHTML = "Follow"
            displayError("Removed from followers", "#A9C1A0", "");
        }
        
    }else{
        displayError(response.statusText);
    }
})