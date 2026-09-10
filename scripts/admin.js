function obtenerProductosAdmin() {
    return JSON.parse(localStorage.getItem("productosAdmin")) || [];
}

function guardarProductosAdmin(productos) {
    localStorage.setItem("productosAdmin", JSON.stringify(productos));
}

function crearIdProducto(nombre) {
    return nombre
        .toLowerCase()
        .trim()
        .replaceAll(" ", "-") + "-" + Date.now();
}

function numeroEntreCeroYCien(valor) {
    const numero = Number(valor) || 0;
    return Math.max(0, Math.min(100, numero));
}

function obtenerProductosParaAdmin() {
    return [...window.productosCatalogo, ...obtenerProductosAdmin()];
}

function prepararRutasProductos(productos) {
    const estaEnCarpetaPaginas = window.location.pathname.includes("/paginas/") || window.location.pathname.includes("\\paginas\\");

    return productos.map(function (producto) {
        if (!estaEnCarpetaPaginas) return producto;

        return {
            ...producto,
            image: "../" + producto.image
        };
    });
}

function renderAdmin() {
    const grid = document.getElementById("admin-product-grid");
    if (!grid || !window.productosCatalogo) return;

    const productos = obtenerProductosParaAdmin();
    const productosConRutas = prepararRutasProductos(productos);

    grid.innerHTML = productosConRutas.map(crearCardProducto).join("");

    const adminStock = document.getElementById("adminStock");
    if (adminStock) {
        adminStock.textContent = productos.length + " articulos cargados";
    }
}

function mostrarVistaAdmin(nombreVista) {
    const vistas = document.querySelectorAll(".admin-vista");
    vistas.forEach(function (vista) {
        vista.hidden = !vista.classList.contains("admin-vista-" + nombreVista);
    });

    const enlaces = document.querySelectorAll("[data-admin-vista]");
    enlaces.forEach(function (enlace) {
        enlace.classList.toggle("activo", enlace.dataset.adminVista === nombreVista);
    });
}

function iniciarMenuAdmin() {
    const enlaces = document.querySelectorAll("[data-admin-vista]");

    enlaces.forEach(function (enlace) {
        enlace.addEventListener("click", function (event) {
            event.preventDefault();
            mostrarVistaAdmin(enlace.dataset.adminVista);
        });
    });
}

function iniciarFormularioAdmin() {
    const formulario = document.getElementById("formAgregarProducto");
    if (!formulario || formulario.dataset.iniciado === "true") return;

    formulario.dataset.iniciado = "true";

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("adminNombre").value.trim();
        const categoria = document.getElementById("adminCategoria").value;
        const precio = Number(document.getElementById("adminPrecio").value) || 0;
        const dano = numeroEntreCeroYCien(document.getElementById("adminDano").value);
        const precision = numeroEntreCeroYCien(document.getElementById("adminPrecision").value);
        const alcance = numeroEntreCeroYCien(document.getElementById("adminAlcance").value);
        const imagen = document.getElementById("adminImagen").value.trim() || "assets-img/Pistola.jpg";
        const rp = Number(document.getElementById("adminRp").value) || 0;

        if (!nombre || !categoria) return;

        const nuevoProducto = {
            id: crearIdProducto(nombre),
            name: nombre,
            category: categoria,
            price: precio,
            rp: rp,
            image: imagen,
            images: [imagen],
            description: "Producto agregado desde el administrador.",
            stats: {
                damage: dano,
                accuracy: precision,
                range: alcance
            },
            badge: "ADMIN"
        };

        const productosAdmin = obtenerProductosAdmin();
        productosAdmin.push(nuevoProducto);
        guardarProductosAdmin(productosAdmin);

        formulario.reset();
        renderAdmin();
        mostrarVistaAdmin("productos");
    });
}


function cerrarSesionAdmin() {
    localStorage.removeItem("usuarioActual");

    if (typeof cargarHome === "function") {
        inyectarHeader();
        iniciarEventosHeader();
        cargarHome();
        return;
    }

    window.location.href = "../index.html";
}

function iniciarLogoutAdmin() {
    const enlaceLogout = document.querySelector("[data-admin-logout]");
    if (!enlaceLogout || enlaceLogout.dataset.iniciado === "true") return;

    enlaceLogout.dataset.iniciado = "true";

    enlaceLogout.addEventListener("click", function (event) {
        event.preventDefault();
        cerrarSesionAdmin();
    });
}
function iniciarAdmin() {
    iniciarMenuAdmin();
    iniciarLogoutAdmin();
    iniciarFormularioAdmin();
    renderAdmin();
    mostrarVistaAdmin("productos");
}

document.addEventListener("DOMContentLoaded", iniciarAdmin);