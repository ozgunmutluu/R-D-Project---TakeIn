function displayError(message, color, prefix = "Error: "){

    let content = document.getElementById("content")

    let errorEl = document.createElement("div")
    errorEl.classList.add("error-message")
    if(color) errorEl.style.background = color;
    errorEl.innerHTML = `
        ${prefix}${message}
    `

    content.appendChild(errorEl)
    setTimeout(() => errorEl.classList.add("active"), 100)
    setTimeout(() => errorEl.remove(), 5000)
}
