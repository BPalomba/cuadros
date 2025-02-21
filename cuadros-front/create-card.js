// LOGIN

document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("authModal");

    // Si el usuario no está autenticado, mostrar el modal
    if (!sessionStorage.getItem("authToken")) {
        loginModal.style.display = "flex";
    }

    document.getElementById("authForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("authUsername").value;
        const password = document.getElementById("authPassword").value;
        const credentials = btoa(username + ":" + password); // Codifica en Base64

        try {
            const response = await fetch("https://cuadros.onrender.com/image/test", { // Endpoint protegido
                method: "GET",
                headers: {
                    "Authorization": "Basic " + credentials,
                },
            });



            if (response.ok) {
                sessionStorage.setItem("authToken", credentials); // Guardar token
                showToast("Inicio de sesion exitoso")
                loginModal.style.display = "none"; // Ocultar modal
            } else {
                showToast("Credenciales incorrectas ❌")
                document.getElementById("authMessage").innerText = "Credenciales incorrectas ❌";
            }
        } catch (error) {
            showToast("Error en la conexión ❌")
            document.getElementById("authMessage").innerText = "Error en la conexión ❌";
        }
    });
});

// Logout
function logout() {
    sessionStorage.removeItem("authToken");
    location.reload(); // Recargar página para pedir login nuevamente
}






// Logica
// PREVIEW IMAGEN

document.getElementById("cardImage").addEventListener("input", function (event) {
    const imageUrl = event.target.value;
    const imagePreview = document.getElementById("imagePreview");

    if (imageUrl) {
        imagePreview.src = imageUrl;
        imagePreview.style.display = "block";  // Mostrar la imagen
    } else {
        imagePreview.style.display = "none";  // Ocultar la imagen si no hay URL
    }
});

// FETCH
document.getElementById("createCardForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("cardTitle").value;
    const author = document.getElementById("cardAuthor").value;
    const description = document.getElementById("cardDescription").value;
    const imageUrl = document.getElementById("cardImage").value || "./resources/pajarito.jpg";

    const newCard = { title, author, description, imageUrl };


    const credentials = sessionStorage.getItem("authToken");

    if (!credentials) {
        showToast("No estás logueado ❌");
        return; // Detener la ejecución si no hay credenciales
    }


    try {
        const response = await fetch("https://cuadros.onrender.com/image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + credentials,
            },
            body: JSON.stringify(newCard)
        });

        if (!response.ok) {
            showToast("Error al crear la tarjeta")
            throw new Error("Error al crear la tarjeta");
        } else {
            showToast("Tarjeta creada exitosamente");
        }
        // Cerrar la pestaña después de la creación
        window.opener.location.reload(); // Recargar la página principal
        window.close();
    } catch (error) {
        console.error("Error al crear la tarjeta:", error);
    }
});

// showed text is the param // TOAST
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hide");
    toast.classList.add("show");

    // time to go up 
    setTimeout(() => {
        toast.classList.add("hide");
    }, 2500);

    //Time to hide in ms
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

}

