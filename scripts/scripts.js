function inyectarFooter() {
    document.getElementById("footer").innerHTML = "<p>Tienda de Armas Grand Theft Auto</p>";
}

function inyectarHeader() {
    document.getElementById("header").innerHTML =
        '<section>' +
        '<h1 class="prevent-select">GROVE MARKET</h1>' +
        '</section>' +
        '<section>' +
        '<a href="#Catalogo">SHOP</a>' +
        '<a href="#Categorias">DROPS</a>' +
        '<a href="#Categorias">ABOUT</a>' +
        '</section>' +
        '<section>' +
        '<p class="prevent-select">YOUR STASH  🛒 <span id="cont-carrito"></span></p>' +
        '</section>';
}

inyectarHeader();
inyectarFooter();

// Carga el contenido del home dentro del contenedor principal.
function cargarContenido(pagina) {
    const content = document.getElementById("content");

    if (!content) {
        return;
    }

    fetch(pagina)
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
        });
}

if (document.getElementById("content")) {
    cargarContenido("paginas/home-content.html");
}
