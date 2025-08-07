let url = "https://www.omdbapi.com/";
let api_key = API_KEY;

// Obtener el parámetro "id" de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Ejecutar la función solo si hay un ID válido
if (id) {
  fetchDetallesPelicula(id);
} else {
  console.error("No se encontró el ID en la URL");
}

function fetchDetallesPelicula(id) {
  fetch(`${url}?i=${id}&apikey=${api_key}`) // Realiza la petición a la API para obtener detalles de la película
    .then((response) => response.json()) // Convierte la respuesta a JSON
    .then((data) => detallesPelicula(data)); // Muestra los detalles de la película
}

function detallesPelicula(data) {
  console.log(data);
  const divDetalles = document.getElementById("divDatosPelicula");

  // CREAR ELEMENTOS
  const movie = data.Title;
  const poster = data.Poster;
  const released = data.Released;
  const actors = data.Actors;
  const plot = data.Plot;
  const genre = data.Genre;

  const movieTitle = document.createElement("h2");
  movieTitle.textContent = movie;

  const description = document.createElement("p");
  description.innerHTML = `Año: ${released}<br>${genre}`;

  const posterImg = document.createElement("img");
  posterImg.src = poster;
  posterImg.alt = movie;

  const plotText = document.createElement("p");
  plotText.textContent = `${plot} \n Reparto: ${actors}`;

  divDetalles.appendChild(movieTitle);
  divDetalles.appendChild(description);
  divDetalles.appendChild(posterImg);
  divDetalles.appendChild(plotText);

}
