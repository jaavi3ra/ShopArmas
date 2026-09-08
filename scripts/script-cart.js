alert("Carrito funcionando");

let carrito = [
    {
        nombre: "Desert Eagle",
        precio: 12500,
        cantidad: 1,
        imagen: "/assets-img/static_wikia_nocookie_net-latest.webp"
    },
    {
        nombre: "AK-47",
        precio: 25000,
        cantidad: 1,
        imagen: "/assets-img/AK-47-GTASA.webp"
    },
    {
        nombre: "Shotgun",
        precio: 8500,
        cantidad: 1,
        imagen: "/assets-img/PumpShotgun-GTASA.webp"
    }
];


function mostrarCarrito() {

    let contenedor = document.getElementById("productos-carrito");

    contenedor.innerHTML = "";

    carrito.forEach((producto, indice) => {

        contenedor.innerHTML += `
            <div class="producto-carrito">

                <div class="info-producto">

                    <img 
                        src="${producto.imagen}" 
                        alt="${producto.nombre}"
                    >

                    <div>
                        <span class="product-category">
                            Arma
                        </span>

                        <h3 class="name-product">
                            ${producto.nombre}
                        </h3>
                    </div>

                </div>

                <span class="product-price">
                    $${producto.precio.toLocaleString("es-CL")}
                </span>

                <div class="controles-cantidad">

                    <button onclick="restarCantidad(${indice})">
                        -
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button onclick="sumarCantidad(${indice})">
                        +
                    </button>

                </div>

            </div>
        `;
    });

    calcularTotal();
}


function sumarCantidad(indice) {

    carrito[indice].cantidad++;

    mostrarCarrito();
}


function restarCantidad(indice) {

    if (carrito[indice].cantidad > 1) {

        carrito[indice].cantidad--;

    }

    mostrarCarrito();
}


function calcularTotal() {

    let subtotal = 0;

    carrito.forEach(producto => {

        subtotal += producto.precio * producto.cantidad;

    });

    document.getElementById("subtotal").innerText =
        "$" + subtotal.toLocaleString("es-CL");

    document.getElementById("total").innerText =
        "$" + subtotal.toLocaleString("es-CL");
}


mostrarCarrito();