// Lista de productos disponibles para mostrar en la pagina de detalle.
const productos = [
    {
        id: 1,
        nombre: "Pistola",
        descripcion: "pistolita pium",
        precio: 305000,
        imagen: "../assets/img/Pistola.jpg"
    },
    {
        id: 2,
        nombre: "Escopeta de combate",
        descripcion: "Utilza perdigones de tortas de cumpleanos",
        precio: 600000,
        imagen: "../assets/img/escopeta.png"
    },
    {
        id: 3,
        nombre: "RPG",
        descripcion: "Arma desctruccion masiva",
        precio: 100000,
        imagen: "../assets/img/rpg.jpg"
    },
    {
        id: 4,
        nombre: "Puño americano",
        descripcion: "saca muelas del juicio",
        precio: 500000,
        imagen: "../assets/img/puño.jpg"
    },
    {
        id: 5,
        nombre: "Baston",
        descripcion: "Palito de madera para abrir nueces ",
        precio: 100000,
        imagen: "../assets/img/palito.jpg"
    }
];
// Lee el id enviado en la URL, por ejemplo: cart.html?id=2.
const params = new URLSearchParams(window.location.search);

// Convierte el id a numero; si no existe, muestra el producto 1.
const idProducto = Number(params.get("id")) || 1;

// Busca el producto que coincide con el id de la URL.
const producto = productos.find((item) => item.id === idProducto);

// Inserta los datos del producto en la plantilla HTML.
document.getElementById("imagenProducto").src = producto.imagen;
document.getElementById("imagenProducto").alt = producto.nombre;
document.getElementById("nombreProducto").textContent = producto.nombre;
document.getElementById("descripcionProducto").textContent = producto.descripcion;
document.getElementById("precioProducto").textContent = producto.precio;
document.getElementById("breadcrumbProducto").textContent = producto.nombre;

// Genera los productos relacionados excluyendo el producto actual.
const productosRelacionados = document.getElementById("productosRelacionados");

productos.forEach((item) => {
    if (item.id !== producto.id) {
        productosRelacionados.innerHTML += `
            <article>
                <a href="./cart.html?id=${item.id}">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <h4>${item.nombre}</h4>
                </a>
            </article>
        `;
    }
});
