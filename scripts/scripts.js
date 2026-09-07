function inyectarFooter(){
    document.getElementById("footer").innerHTML = "<p>Tienda de Armas Grand Theft Auto</p>";
}

function inyectarHeader(){
    document.getElementById("header").innerHTML = 
    '<section>'+
    '<h1 class="prevent-select">GROVE MARKET</h1>'+
    '</section>'+
    '<section>'+
    '<a href="#Catalogo">SHOP</a>'+
    '<a href="#Categorias">DROPS</a>'+
    '<a href="#Categorias">ABOUT</a>'+
    '</section>'+
    '<section>'+
    '<p class="prevent-select">YOUR STASH<span class="logo">LOGO</span> <span id="cont-carrito"></span></p>'+
    '</section>';
}

inyectarHeader();
inyectarFooter();

//
function cargarContenido(pagina) {
fetch(pagina)
            .then(response => response.text())
            .then(data => {
                document.getElementById("content").innerHTML = data;
})};

cargarContenido("paginas/home.html");

