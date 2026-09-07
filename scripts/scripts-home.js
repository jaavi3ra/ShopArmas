//carrito
   let contador = 0;
   
   function agregaritemAlCarrito(boton) {
        const valor = document.getElementById("cont-carrito");
        const card = boton.closest(".product-card");
        const nombreobjeto = card.querySelector(".name-product").textContent;
        
        contador++;
        
        valor.innerText = contador; 
        mensajeSpan(nombreobjeto);   
}

function mensajeSpan(text) {
    const mensaje = document.getElementById("mensaje-alerta");

    setTimeout(() => {
        mensaje.innerText = "Agregaste "+text+" al carrito!.";

    }, 100);    
}