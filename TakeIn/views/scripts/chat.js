let recieverID = window.location.search.substr(1).split("=")[1]
let chatBar = document.getElementById("chat")

document.getElementById("profile").addEventListener("click", () => {
    window.location = `/profile?id=${recieverID}`
})

chatBar.addEventListener("keyup", (event) =>{
    if(!(event.key == "Enter")) return;

    sendMessage()
})

document.getElementById("chat-button").addEventListener("click", () => {
    sendMessage()
})

async function sendMessage() {
    let message = chatBar.value;
    let response = await fetch("/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({reciever: recieverID, message})
    })
    if(response.ok){
        chatBar.value = "";
        renderMessage(message)
    }else{
        displayError("Couldn't send message")
    }
}


function renderMessage(message){
    let messageContainer = document.createElement("div")
    messageContainer.classList.add("message", "send")
    var d = new Date(Date.now()),
    dformat = [d.getHours(),d.getMinutes()].join(':')+' '+
                [d.getDate(),
                d.getMonth()+1,
                d.getFullYear()].join('/');
    messageContainer.innerHTML = 
       `
        <p>${message}</p>
        <p class="time">${dformat}</p>
        `

    document.getElementById("messages").appendChild(messageContainer)


}