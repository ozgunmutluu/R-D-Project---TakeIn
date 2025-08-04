for (let item of document.getElementsByClassName("recipe-container")){
    item.addEventListener("click", async (e) => {
        if(e.target.tagName != "I"){
            window.location = `/recipe?id=${item.id}`
        }else {

            let response = await fetch("/cart", {
                method: "DELETE",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({recipeID: item.id})
            })
            if(response.ok){
                document.getElementById(item.id).remove()
            }else{
                displayError(response.statusText);
            }
        }
    })
};

