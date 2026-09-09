function inyectarFooter() {
    document.getElementById("footer").innerHTML =
        "<p>Tienda de Armas Grand Theft Auto</p>";
}

function inyectarHeader() {
    document.getElementById("header").innerHTML =
        '<section>' +
            '<a class="brand" id="btn-home" href="#">GROVE MARKET</a>' +
        '</section>' +
        '<section class="main-nav">' +
            '<a class="active" id="btn-shop" href="#">SHOP</a>' +
            '<a href="#DROPS">DROPS</a>' +
            '<a href="#ABOUT">ABOUT</a>' +
        '</section>' +
        '<div class="header-actions">' +
            '<div class="balance-box">' +
                '<span class="balance-label">SALDO</span>' +
                '<strong id="balance">$0</strong>' +
            '</div>' +
            '<a class="cart-link" id="btn-carrito" href="#" aria-label="Ver carrito">' +
                '<span class="cart-icon">🛒</span>' +
                '<span>YOUR STASH</span>' +
                '<span class="cart-count" id="cont-carrito">0</span>' +
            '</a>' +
        '</div>';
}

function cargarContenido(pagina, tipoPagina) {
    fetch(pagina)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar " + pagina);
            }

            return response.text();
        })
        .then(data => {
            const content = document.getElementById("content");

            if (!content) return;

            content.innerHTML = data;

            if (tipoPagina === "home") renderHome();
            if (tipoPagina === "product") renderProductPage();
            if (tipoPagina === "cart") renderCart();
            if (tipoPagina === "checkout") renderCheckout();
        })
        .catch(error => {
            console.error("Error cargando contenido:", error);
        });
}

function cambiarRuta(url) {
    history.pushState(null, "", url);
}

function cargarHome(actualizarRuta = true) {
    if (actualizarRuta) cambiarRuta("index.html");
    cargarContenido("paginas/home.html", "home");
}

function cargarProducto(idProducto, actualizarRuta = true) {
    const id = idProducto || "desert-eagle";

    if (actualizarRuta) {
        cambiarRuta("?page=product&id=" + encodeURIComponent(id));
    }

    cargarContenido("paginas/product.html", "product");
}

function cargarCarrito(actualizarRuta = true) {
    if (actualizarRuta) cambiarRuta("?page=cart");
    cargarContenido("paginas/cart.html", "cart");
}

function cargarCheckout(actualizarRuta = true) {
    if (actualizarRuta) cambiarRuta("?page=checkout");
    cargarContenido("paginas/checkout.html", "checkout");
}

function iniciarEventosHeader() {
    const btnHome = document.getElementById("btn-home");
    const btnShop = document.getElementById("btn-shop");
    const btnCarrito = document.getElementById("btn-carrito");

    btnHome.addEventListener("click", function(event) {
        event.preventDefault();
        cargarHome();
    });

    btnShop.addEventListener("click", function(event) {
        event.preventDefault();
        cargarHome();
    });

    btnCarrito.addEventListener("click", function(event) {
        event.preventDefault();
        cargarCarrito();
    });
}

function cargarPaginaInicial() {
    const params = new URLSearchParams(window.location.search);
    const pagina = params.get("page");

    if (pagina === "product") {
        cargarProducto(params.get("id"), false);
        return;
    }

    if (pagina === "cart") {
        cargarCarrito(false);
        return;
    }

    if (pagina === "checkout") {
        cargarCheckout(false);
        return;
    }

    cargarHome(false);
}

document.addEventListener("DOMContentLoaded", function() {
    inyectarHeader();
    inyectarFooter();
    iniciarEventosHeader();
    actualizarContador();
    cargarPaginaInicial();
});

