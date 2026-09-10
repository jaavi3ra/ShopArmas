
//DATOS ADMINISTRADOR
const ADMIN_EMAIL = "admin@grovemarket.com";
const ADMIN_PASSWORD = "Grove1234";

//IDENTIFICAR USUARIO ADMINISTRADOR
function isAdminUser(email, password) {
    const email = email.toLowerCase();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return "admin";
    }
    return "usuario";
}

// validar inputs de login
function validarLogin(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
}