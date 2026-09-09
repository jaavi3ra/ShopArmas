//productos
   const productos = [
    {
      id: "desert-eagle",
      name: "Desert Eagle",
      category: "Pistola",
      price: 12500,
      rp: 150,
      image: "assets-img/static_wikia_nocookie_net-latest.webp",
    description: "Pistola pesada del catálogo virtual de Grove Market. Alto daño, buena precisión y un diseño clásico para el simulador.",
    stats: { damage: 85, accuracy: 70, range: 65 },
    badge: "NUEVO"
   },
    {
    id: "micro-smg",
    name: "Micro SMG",
    category: "Subfusil",
    price: 8900,
    rp: 90,
    image: "assets-img/MicroSMG-GTAVC.webp",
    description: "Subfusil compacto pensado para una jugabilidad rápida. Ligero, veloz y con buen control a corta distancia.",
    stats: { damage: 50, accuracy: 62, range: 45 },
    badge: "POPULAR"
  },
   {
    id: "BA-Sniper-Rifle",
    name: "	Bolt Action Sniper Rifle",
    category: "Rifle",
    price: 18600,
    rp: 210,
    image: "assets-img/gtwfilesie_grandtheftwiki_com-SniperRifle-GTAIV.webp",
    description: "Rifle virtual de potencia alta y alcance largo. Una opción equilibrada dentro del catálogo del simulador.",
    stats: { damage: 98, accuracy: 78, range: 82 },
    badge: "DROP"
  },
  {
    id: "combat-shotgun",
    name: "Combat Shotgun",
    category: "Escopeta",
    price: 16200,
    rp: 185,
    image: "assets-img/gtwfilesie_grandtheftwiki_com-StubbyShotgun-GTAVC.webp",
    description: "Escopeta virtual con gran impacto a corta distancia y menor alcance. Destaca por su potencia en el simulador.",
    stats: { damage: 92, accuracy: 55, range: 38 },
    badge: "HOT"
  }
]

/* barra de estadísticas del producto*/
function statRow(label, value) {
  return `
    <div class="stat">
      <span>${label}</span>
      <div class="stat-bar"><div class="stat-value" style="width:${value}%"></div></div>
      <b>${value}</b>
    </div>`;
}
/*card - producto*/
function crearCardProducto(product) {
    return `
    <article class="product-card" data-category="${product.category}">
      <span class="product-badge">${product.badge}</span>
      <button class="favorite-btn" aria-label="Agregar ${product.name} a favoritos" title="Favorito">♡</button>
      <a class="product-image" href="paginas/product.html" aria-label="Ver ${product.name}">
        <img src="${product.image}"alt="${product.name}">
      </a>
      <div class="product-content">
        <span class="product-category">${product.category}</span>
        <a class="product-title-link" href="paginas/product.html" aria-label="Ver ${product.name}">
          <h3 class="name-product">${product.name}</h3>
        </a>
        <div class="weapon-stats compact">
          ${statRow("Daño", product.stats.damage)}
          ${statRow("Precisión", product.stats.accuracy)}
          ${statRow("Alcance", product.stats.range)}
        </div>
        <div class="product-footer">
          <div>
            <span class="product-price">${product.price}</span>
            <span class="respect-points">+${product.rp} RP</span>
          </div>
          <button class="btn-agregar-item" data-id="${product.id}">AGREGAR</button>
        </div>
      </div>
    </article>
      `
}
function renderHome() {

    const grid = document.getElementById("product-grid");
    if (!grid) return;
    // Crear todas las cards
    grid.innerHTML = productos.map(crearCardProducto).join("");

    // Botones de las cards
    grid.addEventListener("click", function(event) {
        // AGREGAR AL CARRITO
        const addButton = event.target.closest(".btn-agregar-item");
        if (addButton) {
            const idProducto = addButton.dataset.id;
            agregarAlCarrito(idProducto);
        }
        // FAVORITOS
        const fav = event.target.closest(".favorite-btn");
        if (fav) {
            fav.classList.toggle("selected");
            fav.textContent =
                fav.classList.contains("selected")? "♥": "♡";
        }

    });

    // FILTROS
    const filtros = document.querySelectorAll("[data-filtro]");
    filtros.forEach(function(filtro) {
        filtro.addEventListener("click", function(event) {
            event.preventDefault();
            const categoria = this.dataset.filtro;
            filtrarProductos(categoria);

        });

    });

}

function init() {
 
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "product") renderProductPage();
  if (page === "cart") renderCart();
}

document.addEventListener("DOMContentLoaded", init);





//carrito
let contador = 0;

function agregarAlCarrito(idProducto) {
    // Buscar producto por ID
    const producto = productos.find(producto => producto.id === idProducto);

    if (!producto) 
        return;

    // Aumentar contador
    contador++;
    // Mostrar contador en el header
    actualizarContador();

    // Mostrar alerta
    mensajeSpan(producto.name);
}


function actualizarContador() {

    const contadorCarrito =
        document.getElementById("cont-carrito");

    if (!contadorCarrito) return;

    contadorCarrito.innerText = contador;
}

function mensajeSpan(text) {
    const mensaje = document.getElementById("mensaje-alerta");

    const mensajeContainer =
        document.querySelector(".mensaje-alerta-container");

    // Cambiar el texto
    mensaje.innerText = "¡Agregaste " + text + " al carrito!";

    // Mostrar mensaje
    mensajeContainer.style.display = "block";

    // Ocultarlo después de 3 segundos
    setTimeout(() => {

        mensajeContainer.style.display = "none";

    }, 3000);
  

  
}


//filtros
const filtros = document.querySelectorAll("[data-filtro]");

filtros.forEach(filtro => {

    filtro.addEventListener("click", function(event) {

        event.preventDefault();

        const categoriaSeleccionada = this.dataset.filtro;

        filtrarProductos(categoriaSeleccionada);

    });

});

function filtrarProductos(categoria) {

    const cards =
        document.querySelectorAll(".product-card");


    cards.forEach(function(card) {

        const categoriaProducto =
            card.dataset.category;


        if (
            categoria === "Todos" ||
            categoriaProducto === categoria
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}