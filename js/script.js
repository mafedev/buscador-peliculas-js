let url = "https://www.omdbapi.com/";
let api_key = API_KEY;

const input = document.getElementById("input").value;

// Obtiene el valor del input
document.getElementById("btn-busqueda").addEventListener("click", () => {
  console.log(input);
});

// Evitar que se recargue la página
document.getElementById("btn-busqueda").addEventListener("click", (event) => {
  event.preventDefault(); // Evita que el formulario se envíe y recargue la página
  const value = document.getElementById("input").value;
  fetchPelicula(value);
});

// FETCH
function fetchPelicula(pelicula) {
  fetch(`${url}?s=${pelicula}&apikey=${api_key}`) // Realiza la petición a la API
    .then((response) => response.json()) // Convierte la respuesta a JSON
    .then((response) => mostrarDatosPelicula(response)); // Muestra los datos de la película
}

function mostrarDatosPelicula(data) {
  console.log(data);
  const divDatosPelicula = document.getElementById("result");
  divDatosPelicula.innerHTML = ""; // Limpia el contenido previo

  // Recorre las películas y crea elementos HTML
  data.Search.forEach((pelicula) => {
    // Crear tarjeta
    const card = document.createElement("div");
    card.classList.add("card");

    // Imagen de la película
    const poster = document.createElement("img");
    poster.src = pelicula.Poster;
    poster.alt = pelicula.Title;

    // Contenedor de la información
    const content = document.createElement("div");
    content.classList.add("content");

    const titulo = document.createElement("h3");
    titulo.classList.add("heading");
    titulo.textContent = pelicula.Title;

    const anio = document.createElement("p");
    anio.classList.add("para");
    anio.textContent = `Año: ${pelicula.Year}`;

    const btnCard = document.createElement("button");
    btnCard.classList.add("btn");
    btnCard.textContent = "Ver más";

    // Guardar ID de película
    const idPelicula = pelicula.imdbID;

    // Evento para el botón
    btnCard.addEventListener("click", () => {
      window.location.href = `datosPelicula.html?id=${idPelicula}`;
    });

    // Click en la tarjeta completa
    card.addEventListener("click", () => {
      window.location.href = `datosPelicula.html?id=${idPelicula}`;
    });

    // AGREGAR ELEMENTOS
    content.appendChild(poster);
    content.appendChild(titulo);
    content.appendChild(anio);
    content.appendChild(btnCard);
    card.appendChild(content);

    divDatosPelicula.appendChild(card);
  });
}
