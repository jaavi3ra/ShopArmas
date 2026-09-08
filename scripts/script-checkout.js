let compra=[
    {
        nombre: "Desert Eagle",
        precio: 12500,
        cantidad: 1
    },
    {
        nombre: "AK-47",
        precio: 25000,
        cantidad: 1
    },
    {
        nombre: "Shotgun",
        precio: 8500,
        cantidad: 1
    }
];

function mostrarResumenCompra(){
    let contenedor = document.getElementById("productos-checkout");
    contenedor.innerHTML = "";
    compra.forEach(producto =>{
        contenedor.innerHTML += `
            <div class="producto-checkout">
                <span>
                    ${producto.nombre} x${producto.cantidad}
                </span>
                <span>
                    $${(producto.precio * producto.cantidad)
                        .toLocaleString("es-CL")}
                </span>
            </div>
        `;
    });

    calcularTotalCompra();
}

function calcularTotalCompra(){
    let subtotal = 0;
    compra.forEach(producto => {
        subtotal +=producto.precio * producto.cantidad;
    });

    document.getElementById("subtotal-checkout").innerText =
        "$" + subtotal.toLocaleString("es-CL");

    document.getElementById("envio-checkout").innerText =
        "$0";

    document.getElementById("total-checkout").innerText =
        "$" + subtotal.toLocaleString("es-CL");
}

function confirmarCompra(){
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;

    if(nombre == ""){
        alert("Debe ingresar su nombre");
        return;
    }
    if(correo == ""){
        alert("Debe ingresar su correo");
        return;
    }
        alert("¡Compra realizada con éxito!");
    }

mostrarResumenCompra();