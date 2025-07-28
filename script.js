const input = document.getElementById("input").value

// Obtiene el valor del input
document.getElementById("btn-busqueda").addEventListener("click", () => {
    console.log(input);
});

// Evitar q se recargue la página
document.getElementById("btn-busqueda").addEventListener("click", (event) => {
  event.preventDefault(); // Evita que el formulario se envíe y recargue la página
  const value = document.getElementById("input").value;
  console.log(value);
});