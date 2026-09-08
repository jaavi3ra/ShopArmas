function inyectarFooter(){
    document.getElementById("footer").innerHTML = "<p>Tienda de Armas Grand Theft Auto</p>";
}

function inyectarHeader(){
    document.getElementById("header").innerHTML = 
    '<section>'+
    '<a class="brand" href="index.html">GROVE MARKET</a>'+
    '</section>'+
    '<section class="main-nav">'+
    '<a class="active" href="index.html">SHOP</a>'+
    '<a href="#DROPS">DROPS</a>'+
    '<a href="#ABOUT">ABOUT</a>'+
    '</section>'+
    '<div class="header-actions">'+
      '<div class="balance-box">'+
        '<span class="balance-label">SALDO</span>'+
        '<strong id="balance">$0</strong>'+
      '</div>'+
    '</div>'+
    '<section>'+
    '<a class="cart-link" href="cart.html" aria-label="Ver carrito">'+
    '<span class="cart-icon">🛒</span>'+
    ' <span>YOUR STASH</span>'+
    '<span class="cart-count" id="cont-carrito"> 0</span>'+
    '</a>'+
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

