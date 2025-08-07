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
    const card = document.createElement("div");
    card.classList.add("pelicula");

    const poster = document.createElement("img");
    poster.src = pelicula.Poster;
    poster.alt = pelicula.Title;

    const titulo = document.createElement("h3");
    titulo.textContent = pelicula.Title;

    const anio = document.createElement("p");
    anio.textContent = `Año: ${pelicula.Year}`;

    const idPelicula = pelicula.imdbID;
    card.id = idPelicula; // Asigna el ID de la película al div

    card.addEventListener("click", () => {
      window.location.href = `datosPelicula.html?id=${idPelicula}`; // Redirige a la página de detalles de la película
    });

    // AGREGAR ELEMENTOS
    card.appendChild(poster);
    card.appendChild(titulo);
    card.appendChild(anio);

    divDatosPelicula.appendChild(card); // Agrega la tarjeta al contenedor
  });
}
