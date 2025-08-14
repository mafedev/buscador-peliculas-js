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
  divDetalles.innerHTML = "";

  const {
    Title: movie,
    Poster: poster,
    Released: released,
    Actors: actors,
    Plot: plot,
    Genre: genre,
    Director: director,
    Country: country,
    Language: language,
    Runtime: runtime,
    imdbRating: rating,
    Awards: awards,
    Rated: rated,
    Type: type,
    totalSeasons: seasons,
    Ratings: ratingsArr,
    Writer: writers,
    Production: production,
    BoxOffice: boxOffice,
    Metascore: metascore,
  } = data;

  // Contenedor
  const infoDiv = document.createElement("div");
  infoDiv.className = "pelicula-info";

  // Título
  const movieTitle = document.createElement("h2");
  movieTitle.className = "pelicula-titulo";
  movieTitle.textContent = movie;

  // Subinfo (runtime y director)
  const subInfo = document.createElement("div");
  subInfo.className = "pelicula-subinfo";
  subInfo.innerHTML = `${runtime ? `⏱ ${runtime}` : ""} ${
    director ? `· Director: ${director}` : ""
  }`;

  // Año y temporadas
  const yearDiv = document.createElement("div");
  yearDiv.className = "pelicula-anio";
  yearDiv.textContent = `${released} ${
    type === "series" && seasons ? `· ${seasons} temporadas` : ""
  }`;

  // Badges extra
  const extraDiv = document.createElement("div");
  extraDiv.className = "pelicula-extra";
  extraDiv.innerHTML = `
    ${rated !== "N/A" ? `<span>🔞 ${rated}</span>` : ""}
    <span>🌍 ${country}</span>
    <span>🗣 ${language}</span>
    <span>⭐ ${rating !== "N/A" ? rating : "?"}/10</span>
    ${awards && awards !== "N/A" ? `<span>🏆 ${awards}</span>` : ""}
  `;

  // Sinopsis
  const descriptionCard = document.createElement("div");
  descriptionCard.className = "pelicula-card";
  descriptionCard.innerHTML = `<h3>📝 Sinopsis</h3><p>${plot}</p>`;

  // Accordion: Reparto y Ratings
  const accordionDiv = document.createElement("div");
  accordionDiv.className = "accordion";

  // Lista de actores
  const actorList = actors
    .split(",")
    .map((a) => `<li>${a.trim()}</li>`)
    .join("");

  // Lista de ratings
  const ratingsList =
    ratingsArr && ratingsArr.length
      ? ratingsArr
          .map((r) => `<li><strong>${r.Source}:</strong> ${r.Value}</li>`)
          .join("")
      : "";

  accordionDiv.innerHTML = `
    <button class="accordion-btn">🎭 Reparto</button>
    <div class="panel"><ul class="actor-list">${actorList}</ul></div>

    ${
      ratingsList
        ? `<button class="accordion-btn">📊 Ratings</button>
           <div class="panel"><ul class="ratings-list">${ratingsList}</ul></div>`
        : ""
    }
  `;

  // Tabla de guionistas y producción/box office/metascore
  const tableDiv = document.createElement("div");
  tableDiv.className = "pelicula-tabla";
  tableDiv.innerHTML = `
    <table>
      <tr>
        <th>Guionistas</th>
        <th>Producción / Extras</th>
      </tr>
      <tr>
        <td>${writers
          .split(",")
          .map((w) => w.trim())
          .join("<br>")}</td>
        <td>
          ${production && production !== "N/A" ? `🎬 ${production}<br>` : ""}
          ${boxOffice && boxOffice !== "N/A" ? `💰 ${boxOffice}<br>` : ""}
          ${
            metascore && metascore !== "N/A" ? `🟢 Metascore: ${metascore}` : ""
          }
        </td>
      </tr>
    </table>
  `;

  // Poster
  const posterImg = document.createElement("img");
  posterImg.className = "pelicula-poster";
  posterImg.src = poster;
  posterImg.alt = movie;

  // Append
  infoDiv.appendChild(movieTitle);
  infoDiv.appendChild(subInfo);
  infoDiv.appendChild(yearDiv);
  infoDiv.appendChild(extraDiv);
  infoDiv.appendChild(descriptionCard);
  infoDiv.appendChild(accordionDiv);
  infoDiv.appendChild(tableDiv);

  divDetalles.appendChild(infoDiv);
  divDetalles.appendChild(posterImg);

  // Lógica accordion
  const accBtns = accordionDiv.querySelectorAll(".accordion-btn");
  accBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const panel = btn.nextElementSibling;
      panel.style.maxHeight = panel.style.maxHeight
        ? null
        : panel.scrollHeight + "px";
    });
  });
}

