window.productosCatalogo = [
    {
        id: "desert-eagle",
        name: "Desert Eagle",
        category: "Pistola",
        price: 12500,
        rp: 150,
        image: "assets-img/static_wikia_nocookie_net-latest.webp",
        images: [
            "assets-img/static_wikia_nocookie_net-latest.webp",
            "assets-img/pistola2.jpg"
        ],
        description: "Pistolita pium pium, perfecta para cuando quieres verte peligroso sin gastar todo el botin.\nEn Los Santos sirve para negociar descuentos, saludar rivales y salir corriendo con estilo.",
        stats: { damage: 85, accuracy: 70, range: 65 },
        badge: "NUEVO"
    },
    {
        id: "micro-smg",
        name: "Micro SMG",
        category: "Subfusil",
        price: 8900,
        rp: 90,
        image: "assets-img/MicroSMG-GTAVC.webp",
        images: ["assets-img/MicroSMG-GTAVC.webp"],
        description: "Subfusil compacto pensado para una jugabilidad rapida. Ligero, veloz y con buen control a corta distancia.",
        stats: { damage: 50, accuracy: 62, range: 45 },
        badge: "POPULAR"
    },
    {
        id: "ba-sniper-rifle",
        name: "Bolt Action Sniper Rifle",
        category: "Rifle",
        price: 18600,
        rp: 210,
        image: "assets-img/gtwfilesie_grandtheftwiki_com-SniperRifle-GTAIV.webp",
        images: ["assets-img/gtwfilesie_grandtheftwiki_com-SniperRifle-GTAIV.webp"],
        description: "Rifle virtual de potencia alta y alcance largo. Una opcion equilibrada dentro del catalogo del simulador.",
        stats: { damage: 98, accuracy: 78, range: 82 },
        badge: "DROP"
    },
    {
        id: "combat-shotgun",
        name: "Combat Shotgun",
        category: "Escopeta",
        price: 16200,
        rp: 185,
        image: "assets-img/gtwfilesie_grandtheftwiki_com-StubbyShotgun-GTAVC.webp",
        images: ["assets-img/gtwfilesie_grandtheftwiki_com-StubbyShotgun-GTAVC.webp"],
        description: "Utiliza perdigones de tortas de cumpleanos, pero no trae velitas ni perdon.\nIdeal para entrar a una tienda, preguntar el precio y que todos entiendan que vas apurado.",
        stats: { damage: 92, accuracy: 55, range: 38 },
        badge: "HOT"
    }
];

const SALDO_INICIAL = 100000;

function statRow(label, value) {
    return `
        <div class="stat">
            <span>${label}</span>
            <div class="stat-bar"><div class="stat-value" style="width:${value}%"></div></div>
            <b>${value}</b>
        </div>`;
}

function crearCardProducto(product) {
    return `
        <article class="product-card" data-category="${product.category}" data-product-id="${product.id}">
            <span class="product-badge">${product.badge}</span>
            <button class="favorite-btn" aria-label="Agregar ${product.name} a favoritos" title="Favorito">♡</button>
            <a class="product-image" href="?page=product&id=${product.id}" data-product-id="${product.id}" aria-label="Ver ${product.name}">
                <img src="${product.image}" alt="${product.name}">
            </a>
            <div class="product-content">
                <span class="product-category">${product.category}</span>
                <a class="product-title-link" href="?page=product&id=${product.id}" data-product-id="${product.id}" aria-label="Ver ${product.name}">
                    <h3 class="name-product">${product.name}</h3>
                </a>
                <div class="weapon-stats compact">
                    ${statRow("Dano", product.stats.damage)}
                    ${statRow("Precision", product.stats.accuracy)}
                    ${statRow("Alcance", product.stats.range)}
                </div>
                <div class="product-footer">
                    <div>
                        <span class="product-price">$${product.price.toLocaleString("es-CL")}</span>
                        <span class="respect-points">+${product.rp} RP</span>
                    </div>
                    <button class="btn-agregar-item" data-id="${product.id}">AGREGAR</button>
                </div>
            </div>
        </article>`;
}

function renderHome() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    grid.innerHTML = window.productosCatalogo.map(crearCardProducto).join("");

    grid.addEventListener("click", function(event) {
        const productLink = event.target.closest("[data-product-id]");
        if (productLink) {
            event.preventDefault();
            cargarProducto(productLink.dataset.productId);
            return;
        }

        const addButton = event.target.closest(".btn-agregar-item");
        if (addButton) {
            agregarAlCarrito(addButton.dataset.id);
            return;
        }

        const fav = event.target.closest(".favorite-btn");
        if (fav) {
            fav.classList.toggle("selected");
            fav.textContent = fav.classList.contains("selected") ? "♥" : "♡";
        }
    });

    const filtros = document.querySelectorAll("[data-filtro]");
    filtros.forEach(function(filtro) {
        filtro.addEventListener("click", function(event) {
            event.preventDefault();
            filtrarProductos(this.dataset.filtro);
        });
    });
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function calcularTotalCarrito() {
    const carrito = obtenerCarrito();

    return carrito.reduce(function(total, producto) {
        return total + producto.precio * producto.cantidad;
    }, 0);
}

function obtenerSaldoDisponible() {
    return SALDO_INICIAL - calcularTotalCarrito();
}

function actualizarSaldo() {
    const balance = document.getElementById("balance");
    if (!balance) return;

    const saldo = obtenerSaldoDisponible();
    balance.innerText = "$" + saldo.toLocaleString("es-CL");
}

function saldoDisponiblePara(precio) {
    return obtenerSaldoDisponible() >= precio;
}

function agregarAlCarrito(idProducto) {
    const producto = window.productosCatalogo.find(item => item.id === idProducto);
    if (!producto) return;

    if (!saldoDisponiblePara(producto.price)) {
        mensajeSaldoAcabado();
        return;
    }

    const carrito = obtenerCarrito();
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.name,
            precio: producto.price,
            cantidad: 1,
            imagen: producto.image
        });
    }

    guardarCarrito(carrito);
    actualizarContador();
    mensajeSpan(producto.name);
}

function actualizarContador() {
    const contadorCarrito = document.getElementById("cont-carrito");
    if (!contadorCarrito) return;

    const totalProductos = obtenerCarrito().reduce((total, item) => total + item.cantidad, 0);
    contadorCarrito.innerText = totalProductos;
    actualizarSaldo();
}

function mensajeEmergente(texto) {
    const mensaje = document.getElementById("mensaje-alerta");
    const mensajeContainer = document.querySelector(".mensaje-alerta-container");

    if (!mensaje || !mensajeContainer) return;

    mensaje.innerText = texto;
    mensajeContainer.style.display = "block";

    setTimeout(() => {
        mensajeContainer.style.display = "none";
    }, 3000);
}

function mensajeSpan(text) {
    mensajeEmergente("Agregaste " + text + " al carrito!");
}

function mensajeSaldoAcabado() {
    mensajeEmergente("Saldo acabado");
}

function filtrarProductos(categoria) {
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(function(card) {
        const categoriaProducto = card.dataset.category;
        card.style.display = categoria === "Todos" || categoriaProducto === categoria ? "block" : "none";
    });
}

