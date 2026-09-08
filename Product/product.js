// Lista de productos disponibles para mostrar en la pagina de detalle.
const productos = [
    {
        id: 1,
        nombre: "Pistola",
        descripcion: "Pistolita pium pium, perfecta para cuando quieres verte peligroso sin gastar todo el botin.\nEn Los Santos sirve para negociar descuentos, saludar rivales y salir corriendo con estilo.",
        precio: 305000,
        rp: 200,
        imagen: "../assets-img/Pistola.jpg",
        estadisticas: {
            dano: 65,
            precision: 75,
            alcance: 55
        }
    },
    {
        id: 2,
        nombre: "Escopeta de combate",
        descripcion: "Utiliza perdigones de tortas de cumpleanos, pero no trae velitas ni perdon.\nIdeal para entrar a una tienda, preguntar el precio y que todos entiendan que vas apurado.",
        precio: 600000,
        rp: 350,
        imagen: "../assets-img/escopeta.png",
        estadisticas: {
            dano: 85,
            precision: 50,
            alcance: 45
        }
    },
    {
        id: 3,
        nombre: "RPG",
        descripcion: "Arma de destruccion masiva para resolver problemas que claramente podian hablarse.\nEn GTA es el boton de borrar autos, helicopteros y malas decisiones en una sola explosion.",
        precio: 100000,
        rp: 500,
        imagen: "../assets-img/rpg.jpg",
        estadisticas: {
            dano: 100,
            precision: 40,
            alcance: 90
        }
    },
    {
        id: 4,
        nombre: "Puño americano",
        descripcion: "Saca muelas del juicio, cordura y cualquier plan de pelear limpio.\nPerfecto para cuando no tienes balas, pero si muchas ganas de hacer una mision secundaria con las manos.",
        precio: 500000,
        rp: 150,
        imagen: "../assets-img/puño.jpg",
        estadisticas: {
            dano: 45,
            precision: 85,
            alcance: 15
        }
    },
    {
        id: 5,
        nombre: "Baston",
        descripcion: "Palito de madera para abrir nueces, puertas y discusiones en el barrio.\nNo parece gran cosa, hasta que alguien en Los Santos decide usarlo como argumento legal.",
        precio: 100000,
        rp: 120,
        imagen: "../assets-img/palito.jpg",
        estadisticas: {
            dano: 35,
            precision: 65,
            alcance: 40
        }
    }
];

// Arreglo para recorrer las imagenes miniatura.
const imagenes = [
    "../assets-img/Pistola.jpg",
    "../assets-img/pistola2.jpg"

];

// let sirve para crear una variable que puede cambiar después.
let indiceActual = 0;

function mostrarImagen(rutaImagen) {
    document.getElementById("imagenProducto").src = rutaImagen;
}

function mostrarImagenPorIndice(indiceImagen) {
    indiceActual = indiceImagen;
    mostrarImagen(imagenes[indiceActual]);
}

// Avanza o retrocede el índice de la imagen actual y actualiza la imagen mostrada,
//  volviendo al inicio o al final si es necesario.
function siguiente() {
    indiceActual = (indiceActual + 1) % imagenes.length;
    mostrarImagen(imagenes[indiceActual]);
}

function anterior() {
    indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
    mostrarImagen(imagenes[indiceActual]);
}


// Lee el id enviado en la URL, por ejemplo: product.html?id=2.
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
document.getElementById("precioProducto").textContent = `$${producto.precio.toLocaleString("es-CL")}`;
document.getElementById("rpProducto").textContent = `+${producto.rp} RP`;
document.getElementById("breadcrumbProducto").textContent = producto.nombre;

// Muestra las estadisticas del arma seleccionada.
const estadisticasProducto = document.getElementById("estadisticasProducto");
const estadisticas = [
    ["Daño", producto.estadisticas.dano],
    ["Precisión", producto.estadisticas.precision],
    ["Alcance", producto.estadisticas.alcance]
];

estadisticasProducto.innerHTML = estadisticas.map(([nombre, valor]) => `
    <div class="stat">
        <span>${nombre}</span>
        <div class="stat-bar">
            <div class="stat-value" style="width: ${valor}%;"></div>
        </div>
    </div>
`).join("");

// Genera los productos relacionados excluyendo el producto actual.
const productosRelacionados = document.getElementById("productosRelacionados");

productos.forEach((item) => {
    if (item.id !== producto.id) {
        productosRelacionados.innerHTML += `
            <article>
                <a href="./product.html?id=${item.id}">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <h4>${item.nombre}</h4>
                </a>
            </article>
        `;
    }
});
