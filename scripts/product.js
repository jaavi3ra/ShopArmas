let productoActual = null;

function buscarProductoActual() {
    const params = new URLSearchParams(window.location.search);
    const idProducto = params.get("id") || "desert-eagle";

    return window.productosCatalogo.find(item => item.id === idProducto) || window.productosCatalogo[0];
}

function renderProductPage() {
    productoActual = buscarProductoActual();

    document.getElementById("imagenProducto").src = productoActual.image;
    document.getElementById("imagenProducto").alt = productoActual.name;
    document.getElementById("nombreProducto").textContent = productoActual.name;
    document.getElementById("descripcionProducto").textContent = productoActual.description;
    document.getElementById("precioProducto").textContent = "$" + productoActual.price.toLocaleString("es-CL");
    document.getElementById("rpProducto").textContent = "+" + productoActual.rp + " RP";
    document.getElementById("breadcrumbProducto").textContent = productoActual.name;

    const estadisticasProducto = document.getElementById("estadisticasProducto");
    const estadisticas = [
        ["Dano", productoActual.stats.damage],
        ["Precision", productoActual.stats.accuracy],
        ["Alcance", productoActual.stats.range]
    ];

    estadisticasProducto.innerHTML = estadisticas.map(([nombre, valor]) => `
        <div class="stat">
            <span>${nombre}</span>
            <div class="stat-bar">
                <div class="stat-value" style="width: ${valor}%;"></div>
            </div>
        </div>
    `).join("");

    const productosRelacionados = document.getElementById("productosRelacionados");
    productosRelacionados.innerHTML = "";

    window.productosCatalogo.forEach((item) => {
        if (item.id !== productoActual.id) {
            productosRelacionados.innerHTML += `
                <article>
                    <a href="?page=product&id=${item.id}" onclick="event.preventDefault(); cargarProducto('${item.id}')">
                        <img src="${item.image}" alt="${item.name}">
                        <h4>${item.name}</h4>
                    </a>
                </article>`;
        }
    });
}

function agregarProductoDetalleAlCarrito() {
    if (!productoActual) return;

    const cantidad = Number(document.getElementById("cantidadProducto").value) || 1;

    for (let i = 0; i < cantidad; i++) {
        agregarAlCarrito(productoActual.id);
    }
}

function comprarProductoDetalle() {
    agregarProductoDetalleAlCarrito();
    cargarCarrito();
}
