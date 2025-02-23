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



////////////////////////////////////////////////////////////////////////////

const API_URL = "https://cuadros.onrender.com/image"; // Cambia esto según tu backend

document.addEventListener("DOMContentLoaded", () => {
    loadCards(); // Cargar las cartas cuando la página se carga

    // Modal para ver imágenes en grande
    let modal = document.getElementById("modal");
    let modalImg = document.getElementById("modal-img");
    let closeModal = document.getElementById("close-modal"); // Asegurar un ID único

    if (!modal || !modalImg || !closeModal) {
        console.error("Uno o más elementos del modal no se encontraron en el DOM.");
        return;
    }

    // Delegación de eventos para manejar imágenes añadidas dinámicamente
    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("card-image")) {
            modal.style.display = "flex";
            modalImg.src = event.target.src; // Cargar la imagen en el modal
        }
    });

    // Cerrar modal al hacer clic en la "X"
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// 🔹 Función para cargar todas las tarjetas desde la API
async function loadCards() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            credentials: 'include'
        });




        if (!response.ok) {
            showToast('Error al cargar las tarjetas');
            throw new Error('Error al cargar las tarjetas');
        }
        const cards = await response.json();

        const container = document.querySelector(".container");
        container.innerHTML = ""; // Limpiar antes de renderizar

        // Renderizar las tarjetas
        cards.forEach(card => {
            container.appendChild(createCardElement(card));
        });
    } catch (error) {
        console.error("Error al cargar las tarjetas:", error);
    }
}

// PUT
// 🔹 Función para actualizar una tarjeta
async function updateCard(id, updatedData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData) // Convertir datos a JSON
        });

        if (!response.ok) throw new Error("Error al actualizar la tarjeta");

        // Recargar las cartas después de actualizar
        loadCards();
    } catch (error) {
        console.error("Error al actualizar la tarjeta:", error);
    }
}

// DELETE
// 🔹 Función para eliminar una tarjeta
async function deleteCard(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Error al eliminar la tarjeta");

        // Recargar las cartas después de eliminar
        loadCards();
    } catch (error) {
        console.error("Error al eliminar la tarjeta:", error);
    }
}

// 🔹 Función para crear el elemento HTML de cada tarjeta
function createCardElement(card) {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
        <img src="${card.imageUrl || './resources/pajarito.jpg'}" alt="Imagen de la tarjeta" class="card-image">
        <div class="card-content">
            <h2 class="card-title">${card.title}</h2>
            <p class="card-author">Autor: ${card.author}</p>
            <p class="card-description">${card.description || ''}</p>
        </div>
    `;

    return div;
}

