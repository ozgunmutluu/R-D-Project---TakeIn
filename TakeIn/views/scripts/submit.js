const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);

const inputDelegate = delegate('input[type=text]');

stepContainer = document.getElementById("steps")
stepContainer.addEventListener('input', inputDelegate((el) => {
    if("step-"+stepContainer.childElementCount == el.target.name){
        let newInput = document.createElement("input")
        newInput.type = "text" 
        newInput.name = `step-${stepContainer.childElementCount+1}`
        newInput.placeholder = "Add a new step"

        stepContainer.appendChild(newInput)

        el.target.placeholder = ""
    }
}));

stepContainer.addEventListener('focusout', inputDelegate((el) => { 
    if(el.target.value == "" && el.target.placeholder == ""){
        el.target.remove();

        
        for(i=0;i<stepContainer.childElementCount; i++) {
            stepContainer.children[i].name=`step-${i+1}`
        }
    }
}))

ingredientContainer = document.getElementById("ingredients")
ingredientContainer.addEventListener('input', inputDelegate((el) => {
    if(el.target.placeholder.includes("New")){
        for(child of el.target.parentElement.children){
            child.placeholder = "";
        }
        let newInput  = document.createElement("div");
        newInput.innerHTML = `
        <input type="text" name="name-${ingredientContainer.childElementCount+1}" placeholder="New ingredient">
        <input type="text" name="link-${ingredientContainer.childElementCount+1}" placeholder="New product">
        `

        ingredientContainer.appendChild(newInput)
    }
}));


ingredientContainer.addEventListener('focusout', inputDelegate((el) => { 
    if(!el.target.placeholder.includes("New")){
        let children = el.target.parentElement.children
        if(children[0].value=="" && children[1].value==""){
            el.target.parentElement.remove()

            for(i=0;i<ingredientContainer.childElementCount; i++) {
                ingredientContainer.children[i].id=`ingredient-${i+1}`
                ingredientContainer.children[i].children[0].name = `name-${i+1}`
                ingredientContainer.children[i].children[1].name = `link-${i+1}`
            }
        }


    }
}))

document.getElementById("photo-upload").addEventListener("change", (e) => {
        const [file] = e.target.files
        if (file) {
          document.getElementById("photo-preview").src = URL.createObjectURL(file)
        }
})


document.getElementById("title-edit").addEventListener('keyup', (event) => {
    document.getElementById("title").value = event.target.innerHTML;
})