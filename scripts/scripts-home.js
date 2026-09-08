//productos
   const productos = [
    {
      id: "desert-eagle",
      name: "Desert Eagle",
      category: "Pistola",
      price: 12500,
      rp: 150,
      image: "assets/desert-eagle.webp",
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
    image: null,
    description: "Subfusil compacto pensado para una jugabilidad rápida. Ligero, veloz y con buen control a corta distancia.",
    stats: { damage: 50, accuracy: 62, range: 45 },
    badge: "POPULAR"
  }
]

//carrito
   let contador = 0;
   
   function agregaritemAlCarrito(boton) {
        const valor = document.getElementById("cont-carrito");
        const card = boton.closest(".product-card");
        const nombreobjeto = card.querySelector(".name-product").textContent;
        
        contador++;
        
        valor.innerText = contador; 
        mensajeSpan(nombreobjeto);   
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
function getCart() {
  return JSON.parse(localStorage.getItem(STORAGE.cart) || "[]");
}
function saveCart(cart) {
  localStorage.setItem(STORAGE.cart, JSON.stringify(cart));
  refreshHeader();
}
function getBalance() {
  const saved = localStorage.getItem(STORAGE.balance);
  if (saved === null) {
    localStorage.setItem(STORAGE.balance, "60000");
    return 60000;
  }
  return Number(saved);
}
function setBalance(value) {
  localStorage.setItem(STORAGE.balance, String(value));
  refreshHeader();
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

    const productos = document.querySelectorAll(".product-card");

    productos.forEach(producto => {

        const categoriaProducto = producto.dataset.categoria;

        if (categoria === "Todos" || categoriaProducto === categoria) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }

    });
}