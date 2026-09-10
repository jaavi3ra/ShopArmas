function inyectarFooter() {
    document.getElementById("footer").innerHTML =
        "<p>Tienda de Armas Grand Theft Auto</p>";
}

function inyectarHeader() {
    const usuario =
        JSON.parse(localStorage.getItem("usuarioActual") );
    let textoUsuario = "LOGIN";

    if (usuario) {

        textoUsuario ="👤 " + usuario.nombre.toUpperCase();
    }

    document.getElementById("header").innerHTML =
        '<section>' +
            '<a class="brand" id="btn-home" href="#">GROVE MARKET</a>' +
        '</section>' +
        '<section class="main-nav">' +
            '<a class="active" id="btn-shop" href="#">SHOP</a>' +
            '<a href="#DROPS">DROPS</a>' +
            '<a href="#ABOUT">ABOUT</a>' +
            '<a href="#Login" id="btn-login"> ' + textoUsuario + ' </a>' +
            '<button class="logout-btn" id="btn-logout" aria-label="Cerrar sesión" title="Cerrar sesión">' +
                     '⎋' +
            '</button>' +
        '</section>' +
        '<div class="header-actions">' +
            '<div class="balance-box">' +
                '<span class="balance-label">SALDO</span>' +
                '<strong id="balance">$0</strong>' +
            '</div>' +
            '<a class="cart-link" id="btn-carrito" href="#" aria-label="Ver carrito">' +
                '<span class="cart-icon">🛒</span>' +
                '<span>YOUR STASH</span>' +
                '<span class="cart-count" id="cont-carrito">0</span>' +
            '</a>' +
        '</div>';
}

function actualizarHeaderActivo(tipoPagina) {
    const enlaces = document.querySelectorAll(".main-nav a");
    enlaces.forEach(function(enlace) {
        enlace.classList.remove("active");
    });

    const btnShop = document.getElementById("btn-shop");
    const btnLogin = document.getElementById("btn-login");

    if (tipoPagina === "admin") {
        if (btnLogin) btnLogin.classList.add("active");
        return;
    }

    if (tipoPagina === "home" || tipoPagina === "product") {
        if (btnShop) btnShop.classList.add("active");
    }
}

function cargarContenido(pagina, tipoPagina) {
    fetch(pagina)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar " + pagina);
            }

            return response.text();
        })
        .then(data => {
            const content = document.getElementById("content");

            if (!content) return;

            content.innerHTML = data;

            if (tipoPagina === "home") renderHome();
            if (tipoPagina === "product") renderProductPage();
            if (tipoPagina === "cart") renderCart();
            if (tipoPagina === "checkout") renderCheckout();
            if (tipoPagina === "login") iniciarAuth();
            if (tipoPagina === "admin") iniciarAdmin();
            actualizarHeaderActivo(tipoPagina);

        })
        .catch(error => {
            console.error("Error cargando contenido:", error);
        });
}

//cargar paginas dentro de index.html 
function cambiarRuta(url) {
    history.pushState(null, "", url);
}

function cargarHome(actualizarRuta = true) {
    if (actualizarRuta) cambiarRuta("index.html");
    cargarContenido("paginas/home.html", "home");
}

function cargarProducto(idProducto, actualizarRuta = true) {
    const id = idProducto || "desert-eagle";

    if (actualizarRuta) {
        cambiarRuta("?page=product&id=" + encodeURIComponent(id));
    }

    cargarContenido("paginas/product.html", "product");
}

function cargarCarrito(actualizarRuta = true) {
    if (actualizarRuta) cambiarRuta("?page=cart");
    cargarContenido("paginas/cart.html", "cart");
}

function cargarCheckout(actualizarRuta = true) {
    if (actualizarRuta) cambiarRuta("?page=checkout");
    cargarContenido("paginas/checkout.html", "checkout");
}

function cargarLogin(actualizarRuta = true) {
    if (actualizarRuta) cambiarRuta("index.html");
    cargarContenido("paginas/login.html", "login");
}

function cargarAdmin(actualizarRuta = true) {
    if (actualizarRuta) cambiarRuta("?page=admin");
    cargarContenido("paginas/admin.html", "admin");
}

//********************************************** */
/// iniciar eventos de los botones del header
//********************************************** */

function iniciarEventosHeader() {
    const btnHome = document.getElementById("btn-home");
    const btnShop = document.getElementById("btn-shop");
    const btnCarrito = document.getElementById("btn-carrito");
    const btnLogin = document.getElementById("btn-login");
    const btnlogout = document.getElementById("btn-logout");

    //home
    btnHome.addEventListener("click", function(event) {
        event.preventDefault();
        cargarHome();
    });
      //home desde shop
    btnShop.addEventListener("click", function(event) {
        event.preventDefault();
        cargarHome();
    });
//carrito
    btnCarrito.addEventListener("click", function(event) {
        event.preventDefault();
        cargarCarrito();
    });

//login
 if(btnLogin){

     btnLogin.addEventListener("click",function(event) {

       event.preventDefault();
        const usuario = JSON.parse(  localStorage.getItem( "usuarioActual" ) );

 // NO HAY SESIÓN
        if (!usuario) {
            cargarLogin();
            return;
        }

// ES ADMINISTRADOR
        if (usuario.rol === "admin") {
            cargarAdmin();
            return;
         }
 // USUARIO NORMAL
    console.log( "Usuario normal:", usuario.nombre );


        });

    }    

//cerrar sesion boton
    if (btnlogout) {
    btnlogout.addEventListener( "click", function() {
            cerrarSesion();
        });
        
    }
}    
     
    

function cargarPaginaInicial() {
    const params = new URLSearchParams(window.location.search);
    const pagina = params.get("page");

    if (pagina === "product") {
        cargarProducto(params.get("id"), false);
        return;
    }

    if (pagina === "cart") {
        cargarCarrito(false);
        return;
    }

    if (pagina === "checkout") {
        cargarCheckout(false);
        return;
    }

    if (pagina === "admin") {
        cargarAdmin(false);
        return;
    }

    cargarHome(false);
}

function cargarAdmin() {

    const usuario = JSON.parse(
        localStorage.getItem("usuarioActual")
    );

    // Protección básica
    if (!usuario || usuario.rol !== "admin") {
        console.log("Acceso no autorizado");
        cargarHome();
        return;
    }

    cargarContenido(
        "paginas/admin.html",
        "admin"
    );
}

document.addEventListener("DOMContentLoaded", function() {
    inyectarHeader();
    inyectarFooter();
    iniciarEventosHeader();
    actualizarHeaderUsuario();
    actualizarContador();
    cargarPaginaInicial();
   
});

function actualizarHeaderUsuario() {

    const btnLogin = document.getElementById("btn-login");
    const btnLogout = document.getElementById("btn-logout");

    if (!btnLogin) {
        return;
    }

    const usuario = JSON.parse( localStorage.getItem("usuarioActual") );
   
    // SIN SESIÓN
    if (!usuario) {
        btnLogin.innerText = "LOGIN";
        btnLogout.style.display = "none";
        return;
    }
           
    // ADMIN
    if (usuario.rol === "admin") {
        btnLogin.innerText = "ADMINISTRADOR";
        return;
    }

    // USUARIO
    if (usuario) {

        btnLogin.innerText =
            "👤 " + usuario.nombre.toUpperCase();
        btnLogout.style.display = "inline-flex";

    } 
}
function cerrarSesion() {

    localStorage.removeItem(
        "usuarioActual"
    );

    actualizarHeaderUsuario();

    cargarHome();
}