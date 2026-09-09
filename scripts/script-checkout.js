function renderCheckout() {
    mostrarResumenCompra();
}

function mostrarResumenCompra() {
    const contenedor = document.getElementById("productos-checkout");
    const compra = obtenerCarrito();

    if (!contenedor) return;

    if (compra.length === 0) {
        contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
        calcularTotalCompra();
        return;
    }

    contenedor.innerHTML = "";

    compra.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto-checkout">
                <span>${producto.nombre} x${producto.cantidad}</span>
                <span>$${(producto.precio * producto.cantidad).toLocaleString("es-CL")}</span>
            </div>`;
    });

    calcularTotalCompra();
}

function calcularTotalCompra() {
    const compra = obtenerCarrito();
    let subtotal = 0;

    compra.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
    });

    document.getElementById("subtotal-checkout").innerText = "$" + subtotal.toLocaleString("es-CL");
    document.getElementById("envio-checkout").innerText = "$0";
    document.getElementById("total-checkout").innerText = "$" + subtotal.toLocaleString("es-CL");
}

function confirmarCompra() {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;

    if (nombre === "") {
        alert("Debe ingresar su nombre");
        return;
    }

    if (correo === "") {
        alert("Debe ingresar su correo");
        return;
    }

    alert("Compra realizada con exito!");
    guardarCarrito([]);
    actualizarContador();
    cargarHome();
}
