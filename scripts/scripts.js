function inyectarFooter(){
    document.getElementById("footer").innerHTML = "<p>Tienda de Armas Grand Theft Auto</p>";
}

function inyectarHeader(){
    document.getElementById("header").innerHTML = '<section><h1 class="prevent-select">SHOP</h1></section><section><a href="#Catalogo">Catalogo</a><a href="#Categorias">Categorias</a></section><section><p class="prevent-select">Grand Theft  Auto <span>LOGO</span></p></section>';
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

cargarContenido("home.html");

//carrito
   let contador = 0;
   
   function agregaritemAlCarrito(boton) {
        const valor = document.getElementById("cont-carrito");
        
        const nombreobjeto = boton.parentElement.querySelector('span').textContent;
        
        contador++;
        
        valor.innerText = contador; 
        mensajeSpan(nombreobjeto);   
}

function mensajeSpan(text) {
    const mensaje = document.getElementById("mensaje-alerta");

    setTimeout(() => {
        mensaje.innerText = "Agregaste "+text+" al carrito!.";

    }, 1000);    
}