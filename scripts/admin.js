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
    if (!grid) return;
    const productos = obtenerProductosAdmin();
    const productosConRutas = prepararRutasProductos(productos);
    grid.innerHTML = productosConRutas.map(crearCardProducto).join("");
    const adminStock = document.getElementById("adminStock");
    if (adminStock) {
        adminStock.textContent = productos.length + " productos creados por administrador";
    }
    agregarBotonesAdmin();
}

function agregarBotonesAdmin() {
    const grid =document.getElementById("admin-product-grid");
    const tarjetas =grid.querySelectorAll(".product-card");
    tarjetas.forEach(function (tarjeta) {
        const idProducto = tarjeta.dataset.productId;
        tarjeta.insertAdjacentHTML(
            "beforeend",
            `
            <div class="admin-producto-acciones">
                <button type="button" class="btn-editar-producto" data-id="${idProducto}">
                    EDITAR
                </button>
                <button type="button" class="btn-eliminar-producto" data-id="${idProducto}">
                    ELIMINAR
                </button>
            </div>
            `
        );
    });
}

function cargarProductoParaEditar(idProducto) {
    const productos = obtenerProductosAdmin();
    const producto = productos.find(function (item) {
        return item.id === idProducto;
    });
    if (!producto) return;
    document.getElementById("editarId").value =
        producto.id;
    document.getElementById("editarNombre").value =
        producto.name;
    document.getElementById("editarCategoria").value =
        producto.category;
    document.getElementById("editarPrecio").value =
        producto.price;
    document.getElementById("editarImagen").value =
        producto.image;
    document.getElementById("editarRp").value =
        producto.rp;
    document.getElementById("editarDano").value =
        producto.stats.damage;
    document.getElementById("editarPrecision").value =
        producto.stats.accuracy;
    document.getElementById("editarAlcance").value =
        producto.stats.range;
    mostrarVistaAdmin("editar");
}

function iniciarEventosProductosAdmin() {
    const grid = document.getElementById("admin-product-grid");
    if (!grid) return;
    grid.addEventListener("click", function (event) {
        const botonEditar = event.target.closest(".btn-editar-producto");
        if (botonEditar) {
            cargarProductoParaEditar(
                botonEditar.dataset.id
            );
            return;
        }
        const botonEliminar = event.target.closest(".btn-eliminar-producto");
        if (botonEliminar) {
            eliminarProducto(botonEliminar.dataset.id);
        }
    });
}

function guardarEdicionProducto(event) {
    event.preventDefault();
    const id = document.getElementById("editarId").value;
    const productos = obtenerProductosAdmin();
    const indice = productos.findIndex(function (producto) {
            return producto.id === id;
        });
    if (indice === -1) return;
    productos[indice] = {
        id: id,
        name:document.getElementById("editarNombre").value.trim(),
        category:document.getElementById("editarCategoria").value,
        price:Number(document.getElementById("editarPrecio").value) || 0,
        rp:Number(document.getElementById("editarRp").value) || 0,
        image:document.getElementById("editarImagen").value.trim(),
        images: [document.getElementById("editarImagen").value.trim()],
        description:productos[indice].description,
        stats: {
            damage:numeroEntreCeroYCien(document.getElementById("editarDano").value),
            accuracy:numeroEntreCeroYCien(document.getElementById("editarPrecision").value),
            range:numeroEntreCeroYCien(document.getElementById("editarAlcance").value)
        },
        badge: "ADMIN"
    };
    guardarProductosAdmin(productos);
    alert("Producto actualizado correctamente.");
    document.getElementById("formEditarProducto").reset();
    renderAdmin();
    mostrarVistaAdmin("productos");
}

function iniciarFormularioEdicion() {const formulario = document.getElementById("formEditarProducto");
    if (!formulario) return;
    formulario.addEventListener("submit", guardarEdicionProducto);
    document.getElementById("cancelarEdicion").addEventListener("click", function () {formulario.reset();
            mostrarVistaAdmin("productos");
        });
}

function eliminarProducto(idProducto) {
    const productos = obtenerProductosAdmin();
    const producto = productos.find(function (item) {return item.id === idProducto;
        });
    if (!producto) return;
    const confirmar = confirm("¿Deseas eliminar " + producto.name + "?");
    if (!confirmar) return;
    const nuevosProductos = productos.filter(function (item) {
            return item.id !== idProducto;
        });
    guardarProductosAdmin(nuevosProductos);
    renderAdmin();
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
    iniciarFormularioEdicion();
    iniciarEventosProductosAdmin();
    renderAdmin();
    mostrarVistaAdmin("productos");
}

document.addEventListener("DOMContentLoaded", iniciarAdmin);