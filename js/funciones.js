export const bodyTablaCursos = document.querySelector('#body-tabla-cursos')
const menuResponsive = document.querySelector('#menu-responsive')
const enlacesMenu = document.querySelector('#enlaces-menu')
const header = document.querySelector('#header')

const topHeader = header.offsetTop + 120
export let carrito = []

// Limpia elementos existentes en el html
export function limpiarHTML(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild)
    }
}

// Llena el array del carrito con los objetos almacenados en localstorage
function leerLocalStorage() {
    for(let i = 0; i < localStorage.length; i++){
        let clave = localStorage.key(i)
        let valor = localStorage.getItem(clave)
        carrito.push(JSON.parse(valor))
    }
}

// Al recargar la pagina agrega el html al carrito
export function cargarCursos() {
    leerLocalStorage()

    agregarCursoHtml(carrito, bodyTablaCursos)
}

// Agrega el html a la ventana del carrito de compras
export function agregarCursoHtml(cursos, bodyTabla) {

    limpiarHTML(bodyTabla)

    cursos.forEach(curso => {

        // Destructuring del curso a agregar
        const {
            imagen,
            titulo,
            precio,
            cantidad,
            id
        } = curso

        bodyTabla.innerHTML += `
            <tr>
                <td class="imagen"><img src="${imagen}" alt="imagen" width="100px"/></td>
                <td class="titulo-curso">${titulo}</td>
                <td class="precio-curso">${precio}</td>
                <td class="cantidad-curso">${cantidad}</td>
                <td class="acciones">
                    <a href="#" description="Eliminar" class="btn btn-eliminar eliminar-curso" data-id="${id}">X</a>
                </td>
            </tr>`
    });
}

// Limpia el html de la ventana del carrito y reinicia el array del carrito
function vaciarCarrito() {

    limpiarHTML(bodyTablaCursos)

    carrito = []
    localStorage.clear()
}

// Ejecuta las acciones de eliminar cursos o vaciar el carrito
export function accionesCarrito(e) {
    e.preventDefault()

    if (e.target.classList.contains('btn-eliminar')) {
        const id = e.target.dataset.id

        carrito = carrito.filter(curso => curso.id !== id)

        agregarCursoHtml(carrito, bodyTablaCursos)

        localStorage.removeItem(id)
    } else if (e.target.classList.contains('btn-vaciar')) {
        vaciarCarrito()
    }
}

// Esconde o muestra el menu responsive
function toggleMenu() {
    const existeClaseEsconder = enlacesMenu.classList.contains('esconder')
    
    if (existeClaseEsconder) {
        gsap.to(enlacesMenu, {duration: .5, x: '0%'})
        enlacesMenu.classList.remove('esconder')
        menuResponsive.innerHTML = '<i class="fas fa-times"></i>'
    } else {
        gsap.to(enlacesMenu, {duration: .5, x: '100%'})
        enlacesMenu.classList.add('esconder')
        menuResponsive.innerHTML = '<i class="fas fa-bars"></i>'
    }
}

// Al hacer click fuera del menu se esconde
export function esconderElementos(e) {
    if (e.target.parentElement === menuResponsive) {
        toggleMenu()
    } else if (e.target !== enlacesMenu) {
        enlacesMenu.classList.add('esconder')
        gsap.to(enlacesMenu, {duration: .5, x: '100%'})
        menuResponsive.innerHTML = '<i class="fas fa-bars"></i>'
    }
}

// Cuando se hace scroll se cambia el color de fondo de la barra de navegacion
export function navBlack() {
    if (window.pageYOffset > topHeader) {
        header.classList.add("fixed")
    }else if (window.pageYOffset <= topHeader) {
        header.classList.remove("fixed");
    }
}