// LOGIN

const API_URL = "https://cuadros.onrender.com";


document.addEventListener("DOMContentLoaded", () => {

    // adds listener for load images
    document.getElementById("imgUrlButton").removeEventListener("click", imageUrl);
    document.getElementById("imgUrlButton").addEventListener("click", imageUrl)

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
            const response = await fetch(`${API_URL}/image/test`, { // Endpoint protegido
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


// shows the images that can be added
async function imageUrl() {
    const modalImgUrl = document.getElementById('modalImgUrl');
    const modalGallery = document.getElementById('modalGallery');
    const cardImageInput = document.getElementById('cardImage');

    try {


        try {
            const response = await fetch(`${API_URL}/image/imageUrl`, {
                method: "GET",
                credentials: 'include'
            });

            if (!response.ok) {
                showToast("Error al abrir las imageUrl")
                throw new Error("Error en la respuesta");
            }
            const imgUrls = await response.json();  // 2. Corregir nombre de variable

            console.log(imgUrls.length)

            // 3. Limpiar el modal antes de cargar nuevas imágenes
            modalGallery.innerHTML = '';

            // 4. Corregir forEach y creación de imágenes
            imgUrls.forEach(imgUrl => {

                if (!document.querySelector(`img[src="${imgUrl}"]`)) {
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'gallery-item';

                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = "Imagen disponible";
                    img.style.cursor = 'pointer';
                    img.style.maxWidth = '200px';
                    img.style.margin = '5px';

                    img.onclick = () => {
                        cardImageInput.value = imgUrl;  // 5. Usar variable cacheada


                        const imagePreview = document.getElementById("imagePreview");

                        if (imgUrl) {
                            imagePreview.src = imgUrl;
                            imagePreview.style.display = "block";  // Mostrar la imagen
                        } else {
                            imagePreview.style.display = "none";  // Ocultar la imagen si no hay URL
                        }

                        closeModalImgUrl();
                    };

                    imgContainer.appendChild(img);
                    modalGallery.appendChild(imgContainer)
                };
            });

            // 6. Mostrar el modal después de cargar contenido
            modalImgUrl.style.display = "block";

        } catch (error) {
            showToast("Error al cargar imágenes");
            console.error("Error:", error);
            closeModalImgUrl();
        }


    } catch (error) {
        showToast("Error al configurar el botón");
        console.error("Error crítico:", error);
    }
}

function closeModalImgUrl() {

    // close modal
    document.getElementById('modalImgUrl').style.display = "none";
}

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

document.getElementById("cardImage").addEventListener("change", function (event) {
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

    // available must be reversed
    const available = !document.getElementById("cardAvailable").checked;
    const technique = document.getElementById("cardTechnique").value;
    const size = document.getElementById("cardSize").value;
    const description = document.getElementById("cardDescription").value;
    const imageUrl = document.getElementById("cardImage").value;

    const newCard = { available, technique, size, imageUrl, description };

    console.log("card creada con tecnica : " + newCard.technique)

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





