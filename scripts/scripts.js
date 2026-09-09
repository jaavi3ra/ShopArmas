function inyectarFooter() {

    document.getElementById("footer").innerHTML =
        "<p>Tienda de Armas Grand Theft Auto</p>";
}


function inyectarHeader() {

    document.getElementById("header").innerHTML =
        '<section>' +
            '<a class="brand" id="btn-home" href="#">' +
                'GROVE MARKET' +
            '</a>' +
        '</section>' +


        '<section class="main-nav">' +
            '<a class="active" id="btn-shop" href="#">' +
                'SHOP' +
            '</a>' +
            '<a href="#DROPS">DROPS</a>' +
            '<a href="#ABOUT">ABOUT</a>' +
        '</section>' +

        '<div class="header-actions">' +
            '<div class="balance-box">' +
                '<span class="balance-label">' +
                    'SALDO' +
                '</span>' +
                '<strong id="balance">$0</strong>' +
            '</div>' +
        '</div>' +

        '<section>' +
            '<a class="cart-link" id="btn-carrito" href="#" aria-label="Ver carrito">' +
                '<span class="cart-icon">🛒</span>' +
                '<span>YOUR STASH</span>' +
                '<span class="cart-count" id="cont-carrito">0</span>' +
            '</a>' +
        '</section>';
}
function cargarContenido(pagina, tipoPagina) {

    fetch(pagina)

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "No se pudo cargar " + pagina
                );
            }

            return response.text();
        })

        .then(data => {

            const content =
                document.getElementById("content");

            if (!content)
                return;

            content.innerHTML = data;

            if (tipoPagina === "home") {
                renderHome();
            }

            if (tipoPagina === "carrito") {
                renderCart();
            }


            if (tipoPagina === "product") {
                renderProductPage();
            }

        })

        .catch(error => {

            console.error(
                "Error cargando contenido:",
                error
            );

        });
}
function cargarHome() {

    cargarContenido(
        "paginas/home.html",
        "home"
    );
}


function cargarCarrito() {

    cargarContenido(
        "paginas/carrito.html",
        "carrito"
    );
}


function cargarProducto() {

    cargarContenido(
        "paginas/product.html",
        "product"
    );
}
function iniciarEventosHeader() {

    const btnHome = document.getElementById("btn-home");
    const btnShop = document.getElementById("btn-shop");
    const btnCarrito = document.getElementById("btn-carrito");


    btnHome.addEventListener(
        "click",
        function(event) {event.preventDefault();
            cargarHome();
        }
    );


    btnShop.addEventListener(
        "click",
        function(event) {event.preventDefault();
            cargarHome();
        }
    );


    btnCarrito.addEventListener(
        "click",
        function(event) {event.preventDefault();
            cargarCarrito();
        }
    );
}
document.addEventListener(
    "DOMContentLoaded",
    function() {

        inyectarHeader();

        inyectarFooter();

        iniciarEventosHeader();

        cargarHome();

    }
);