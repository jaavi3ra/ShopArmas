function inyectarFooter(){
    document.getElementById("footer").innerHTML = "<p>Tienda de Armas Grand Theft Auto</p>";
}

function inyectarHeader(){
    document.getElementById("header").innerHTML = '<section><h1 class="prevent-select">SHOP</h1></section><section><a href="#Catalogo">Catalogo</a><a href="#Categorias">Categorias</a></section><section><p class="prevent-select">Grand Theft  Auto <span>LOGO</span></p></section>';
}

inyectarHeader();
inyectarFooter();