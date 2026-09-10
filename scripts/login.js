const ADMIN_EMAIL = "admin@grovemarket.com";
const ADMIN_PASSWORD = "Grove1234";


// ================================
// TIPO DE USUARIO
// ================================

function identificarTipoUsuario(email) {

    const correo = email.trim().toLowerCase();

    if (correo === ADMIN_EMAIL.toLowerCase()) {
        return "admin";
    }

    return "usuario";
}


// ================================
// VALIDACIONES
// ================================

function validarCorreo(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}


function validarPassword(password) {

    const largoCorrecto =
        password.length >= 8;

    const tieneMayuscula =
        /[A-Z]/.test(password);

    const tieneMinuscula =
        /[a-z]/.test(password);

    const tieneNumero =
        /[0-9]/.test(password);


    return (
        largoCorrecto &&
        tieneMayuscula &&
        tieneMinuscula &&
        tieneNumero
    );
}


// ================================
// USUARIOS
// ================================

function obtenerUsuarios() {

    const usuarios =
        localStorage.getItem("usuarios");

    if (!usuarios) {
        return [];
    }

    return JSON.parse(usuarios);
}


function guardarSesion(usuario) {

    localStorage.setItem(
        "usuarioActual",
        JSON.stringify(usuario)
    );
}


function obtenerUsuarioActual() {

    const usuario =
        localStorage.getItem(
            "usuarioActual"
        );

    if (!usuario) {
        return null;
    }

    return JSON.parse(usuario);
}


// ================================
// INICIAR LOGIN / REGISTRO
// ================================

function iniciarAuth() {

    const tabLogin =
        document.getElementById("tab-login");

    const tabRegister =
        document.getElementById("tab-register");

    const loginForm =
        document.getElementById("login-form");

    const registerForm =
        document.getElementById("register-form");

    const title =
        document.getElementById("auth-title");


    if (
        !tabLogin ||
        !tabRegister ||
        !loginForm ||
        !registerForm
    ) {
        return;
    }


    // LOGIN
    tabLogin.addEventListener(
        "click",
        function() {

            loginForm.classList.remove(
                "hidden"
            );

            registerForm.classList.add(
                "hidden"
            );

            tabLogin.classList.add(
                "active"
            );

            tabRegister.classList.remove(
                "active"
            );

            title.innerText =
                "INICIAR SESIÓN";
        }
    );


    // REGISTRO
    tabRegister.addEventListener(
        "click",
        function() {

            registerForm.classList.remove(
                "hidden"
            );

            loginForm.classList.add(
                "hidden"
            );

            tabRegister.classList.add(
                "active"
            );

            tabLogin.classList.remove(
                "active"
            );

            title.innerText =
                "CREAR CUENTA";
        }
    );


    iniciarRegistro();
    iniciarLogin();
    iniciarMostrarPasswords();
}


// ================================
// REGISTRO
// ================================

function iniciarRegistro() {

    const form =
        document.getElementById(
            "register-form"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nombre =
                document
                    .getElementById(
                        "register-name"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "register-email"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "register-password"
                    )
                    .value;


            const confirmar =
                document
                    .getElementById(
                        "register-password-confirm"
                    )
                    .value;


            limpiarErroresRegistro();

            let valido = true;


            // NOMBRE

            if (nombre.length < 3) {

                mostrarError(
                    "register-name",
                    "register-name-error",
                    "Ingresa al menos 3 caracteres."
                );

                valido = false;
            }


            // CORREO

            if (!validarCorreo(email)) {

                mostrarError(
                    "register-email",
                    "register-email-error",
                    "Ingresa un correo válido."
                );

                valido = false;
            }


            // ADMIN RESERVADO

            if (
                identificarTipoUsuario(email)
                === "admin"
            ) {

                mostrarError(
                    "register-email",
                    "register-email-error",
                    "Este correo está reservado."
                );

                valido = false;
            }


            // CONTRASEÑA

            if (!validarPassword(password)) {

                mostrarError(
                    "register-password",
                    "register-password-error",
                    "Mínimo 8 caracteres, mayúscula, minúscula y número."
                );

                valido = false;
            }


            // CONFIRMACIÓN

            if (password !== confirmar) {

                mostrarError(
                    "register-password-confirm",
                    "register-confirm-error",
                    "Las contraseñas no coinciden."
                );

                valido = false;
            }


            if (!valido) return;


            const usuarios =
                obtenerUsuarios();


            const existe =
                usuarios.some(
                    usuario =>
                        usuario.email === email
                );


            if (existe) {

                mostrarMensajeRegistro(
                    "Ese correo ya está registrado.",
                    "error"
                );

                return;
            }


            const nuevoUsuario = {

                id: Date.now(),

                nombre: nombre,

                email: email,

                password: password,

                rol: "usuario"

            };


            usuarios.push(nuevoUsuario);


            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuarios)
            );


            mostrarMensajeRegistro(
                "Cuenta creada correctamente.",
                "success"
            );


            form.reset();
        }
    );
}


// ================================
// LOGIN
// ================================

function iniciarLogin() {

    const form =
        document.getElementById(
            "login-form"
        );

    if (!form) return;


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "login-email"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "login-password"
                    )
                    .value;


            limpiarErroresLogin();

            let valido = true;


            if (!validarCorreo(email)) {

                mostrarError(
                    "login-email",
                    "login-email-error",
                    "Ingresa un correo válido."
                );

                valido = false;
            }


            if (password.length === 0) {

                mostrarError(
                    "login-password",
                    "login-password-error",
                    "Ingresa tu contraseña."
                );

                valido = false;
            }


            if (!valido) return;


            const tipoUsuario =
                identificarTipoUsuario(email);


            // ===================
            // ADMIN
            // ===================

            if (tipoUsuario === "admin") {

                if (
                    password !==
                    ADMIN_PASSWORD
                ) {

                    mostrarMensajeLogin(
                        "Contraseña incorrecta.",
                        "error"
                    );

                    return;
                }


                guardarSesion({

                    nombre:
                        "Administrador",

                    email:
                        ADMIN_EMAIL,

                    rol:
                        "admin"

                });


                mostrarMensajeLogin(
                    "Bienvenido, administrador.",
                    "success"
                );


                actualizarHeaderUsuario();


                setTimeout(
                    function() {

                        cargarHome();

                    },
                    1000
                );


                return;
            }


            // ===================
            // USUARIO NORMAL
            // ===================

            const usuarios =
                obtenerUsuarios();


            const usuario =
                usuarios.find(
                    usuario =>
                        usuario.email === email &&
                        usuario.password === password
                );


            if (!usuario) {

                mostrarMensajeLogin(
                    "Correo o contraseña incorrectos.",
                    "error"
                );

                return;
            }


            guardarSesion({

                id: usuario.id,

                nombre:
                    usuario.nombre,

                email:
                    usuario.email,

                rol:
                    "usuario"

            });


            mostrarMensajeLogin(
                "Bienvenido " +
                usuario.nombre +
                ".",
                "success"
            );


            actualizarHeaderUsuario();


            setTimeout(
                function() {

                    cargarHome();

                },
                1000
            );
        }
    );
}


// ================================
// ERRORES
// ================================

function mostrarError(
    inputId,
    errorId,
    mensaje
) {

    const input =
        document.getElementById(
            inputId
        );

    const error =
        document.getElementById(
            errorId
        );


    if (input) {

        input.classList.add(
            "input-invalid"
        );

    }


    if (error) {

        error.innerText =
            mensaje;

    }
}


function limpiarErroresRegistro() {

    const inputs = [

        "register-name",
        "register-email",
        "register-password",
        "register-password-confirm"

    ];


    const errores = [

        "register-name-error",
        "register-email-error",
        "register-password-error",
        "register-confirm-error"

    ];


    inputs.forEach(
        function(id) {

            const input =
                document.getElementById(id);

            if (input) {

                input.classList.remove(
                    "input-invalid"
                );

            }

        }
    );


    errores.forEach(
        function(id) {

            const error =
                document.getElementById(id);

            if (error) {

                error.innerText = "";

            }

        }
    );
}


function limpiarErroresLogin() {

    const email =
        document.getElementById(
            "login-email"
        );

    const password =
        document.getElementById(
            "login-password"
        );


    if (email) {

        email.classList.remove(
            "input-invalid"
        );

    }


    if (password) {

        password.classList.remove(
            "input-invalid"
        );

    }


    const emailError =
        document.getElementById(
            "login-email-error"
        );


    const passwordError =
        document.getElementById(
            "login-password-error"
        );


    if (emailError) {
        emailError.innerText = "";
    }


    if (passwordError) {
        passwordError.innerText = "";
    }
}


// ================================
// MENSAJES
// ================================

function mostrarMensajeLogin(
    texto,
    tipo
) {

    const mensaje =
        document.getElementById(
            "login-message"
        );

    if (!mensaje) return;


    mensaje.innerText =
        texto;

    mensaje.className =
        "auth-message " + tipo;
}


function mostrarMensajeRegistro(
    texto,
    tipo
) {

    const mensaje =
        document.getElementById(
            "register-message"
        );

    if (!mensaje) return;


    mensaje.innerText =
        texto;

    mensaje.className =
        "auth-message " + tipo;
}


// ================================
// MOSTRAR CONTRASEÑA
// ================================

function iniciarMostrarPasswords() {

    const botones =
        document.querySelectorAll(
            ".show-password"
        );


    botones.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                function() {

                    const target =
                        this.dataset.target;


                    const input =
                        document.getElementById(
                            target
                        );


                    if (!input) return;


                    if (
                        input.type ===
                        "password"
                    ) {

                        input.type =
                            "text";

                        this.innerText =
                            "🙈";

                    } else {

                        input.type =
                            "password";

                        this.innerText =
                            "👁";

                    }

                }
            );

        }
    );
}