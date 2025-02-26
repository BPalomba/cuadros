// LOGIN

API_URL = "https://cuadros.onrender.com";
API_URL = "http://localhost:8080"


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
            const response = await fetch(`${API_URL}/image/test `, { // Endpoint protegido
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



// FETCH POST
document.getElementById("createCardForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const available = document.getElementById("cardAvailable").checked;
    const technique = document.getElementById("cardTechnique").value;
    const size = document.getElementById("cardSize").value;
    const description = document.getElementById("cardDescription").value;
    const imageUrl = document.getElementById("cardImage").value;


    const newCard = { available, technique, size, imageUrl, description };


    const credentials = sessionStorage.getItem("authToken");

    if (!credentials) {
        showToast("No estás logueado ❌");
        return; // Detener la ejecución si no hay credenciales
    }

    // CREATE NEW CARD
    try {
        const response = await fetch(`${API_URL}/image`, {
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
            document.getElementById("createCardForm").reset();
        }

    } catch (error) {
        console.error("Error al crear la tarjeta:", error);
    }
});



