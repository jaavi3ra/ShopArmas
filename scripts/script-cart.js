function renderCart() {
    mostrarCarrito();
}

function mostrarCarrito() {
    const contenedor = document.getElementById("productos-carrito");
    const carrito = obtenerCarrito();

    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito esta vacio.</p>";
        calcularTotal();
        return;
    }

    contenedor.innerHTML = "";

    carrito.forEach((producto, indice) => {
        contenedor.innerHTML += `
            <div class="producto-carrito">
                <div class="info-producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">

                    <div>
                        <span class="product-category">Arma</span>
                        <h3 class="name-product">${producto.nombre}</h3>
                    </div>
                </div>

                <span class="product-price">
                    $${producto.precio.toLocaleString("es-CL")}
                </span>

                <div class="controles-cantidad">
                    <button onclick="restarCantidad(${indice})">-</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="sumarCantidad(${indice})">+</button>
                </div>
            </div>`;
    });

    calcularTotal();
}

function sumarCantidad(indice) {
    const carrito = obtenerCarrito();

    if (!saldoDisponiblePara(carrito[indice].precio)) {
        mensajeSaldoAcabado();
        return;
    }

    carrito[indice].cantidad++;
    guardarCarrito(carrito);
    actualizarContador();
    mostrarCarrito();
}

function restarCantidad(indice) {
    const carrito = obtenerCarrito();

    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
    } else {
        carrito.splice(indice, 1);
    }

    guardarCarrito(carrito);
    actualizarContador();
    mostrarCarrito();
}

function calcularTotal() {
    const carrito = obtenerCarrito();
    let subtotal = 0;

    carrito.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;
    });

    const subtotalElemento = document.getElementById("subtotal");
    const totalElemento = document.getElementById("total");

    if (subtotalElemento) subtotalElemento.innerText = "$" + subtotal.toLocaleString("es-CL");
    if (totalElemento) totalElemento.innerText = "$" + subtotal.toLocaleString("es-CL");
}
