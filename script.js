let url = "https://www.omdbapi.com/";
let api_key = API_KEY;

const input = document.getElementById("input").value

// Obtiene el valor del input
document.getElementById("btn-busqueda").addEventListener("click", () => {
    console.log(input);
});

// Evitar q se recargue la página
document.getElementById("btn-busqueda").addEventListener("click", (event) => {
  event.preventDefault(); // Evita que el formulario se envíe y recargue la página
  const value = document.getElementById("input").value;
  fetchPelicula(value);
});

// FETCH
function fetchPelicula(pelicula){
  fetch(`${url}?t=${pelicula}&apikey=${api_key}`)
    .then(response => response.json())
    .then(response => mostrarDatosPelicula(response))
}

function mostrarDatosPelicula(data){
  console.log(data);
  const divDatosPelicula = document.getElementById('result');

  const nombre = data.Title;
  const anio = data.Year;
  const director = data.Director
  const poster = data.Poster;


  // -------------- CREACIÓN DE ELEMENTOS
  const tituloPelicula = document.createElement("h1");
  tituloPelicula.textContent = nombre;

  const anioPelicula = document.createElement("p");
  anioPelicula.textContent = `Año: ${anio}`;

  const posterElement = document.createElement("img");
  posterElement.src = poster;

  divDatosPelicula.appendChild(tituloPelicula);
  divDatosPelicula.appendChild(anioPelicula);
  divDatosPelicula.appendChild(posterElement);

}