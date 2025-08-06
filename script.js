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

  // Mapea los resultados y crea el HTML
  divDatosPelicula.innerHTML = data.Search.map((pelicula) => `
    <div class="pelicula">
    <h1>${pelicula.Title}</h1>
      <img src="${pelicula.Poster}" alt="${pelicula.Title}">
    </div>
  `
  ).join(""); // Une los elementos del array en un string HTML
}
