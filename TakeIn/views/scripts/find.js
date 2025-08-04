document.getElementById("search").addEventListener("keyup", (e) => {
    let value = e.target.value
    
    for(child of document.getElementsByClassName("leftover-container")){
       let name = child.dataset.name;

       if(name.includes(value)){
        child.classList.remove("hidden")
       }else {
        child.classList.add("hidden")
       }
    }
})

document.getElementById("create").addEventListener("click",() => window.location = "/leftover/submit?id=new")

for(child of document.getElementsByClassName("leftover-container")){
    child.addEventListener("click", (el) => {
        window.location = `/leftover?id=${child.id}`
    })
 }