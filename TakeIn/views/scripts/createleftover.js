document.getElementById("photo-upload").addEventListener("change", (e) => {
    const [file] = e.target.files
    if (file) {
      document.getElementById("photo-preview").src = URL.createObjectURL(file)
    }
})

document.getElementById("title-edit").addEventListener('keyup', (event) => {
    document.getElementById("title").value = event.target.innerHTML;
})