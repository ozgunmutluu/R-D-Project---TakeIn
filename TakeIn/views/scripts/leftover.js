let leftoverID = window.location.search.substr(1).split("=")[1]

document.getElementById("chat").addEventListener("click",() => {
    window.location = `/chat?id=${owner}`
})

document.getElementById("pickup").addEventListener("click", async () => {
    let response = await fetch("/leftover/pickup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({leftoverID, owner})
    })
    if(!response.ok) displayError(response.statusText)
    else window.location = `/chat?id=${owner}`
})