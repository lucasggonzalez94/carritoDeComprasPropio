const botonesAgregar = document.querySelectorAll('.curso .btn-agregar')
const ventanaCarrito = document.querySelector('#ventana-carrito')
const tablaCursos = document.querySelector('#body-tabla-cursos')
const menuResponsive = document.querySelector('.icon-menu')
const enlacesMenu = document.querySelector('#enlaces-menu')
const header = document.querySelector('#header')

const topHeader = header.offsetTop
let carrito = []

// Agregar listeners
cargarEventListeners()

function cargarEventListeners() {
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', leerArticulo)
    });

    ventanaCarrito.addEventListener('click', accionesCarrito)
    document.addEventListener('click', esconderMenuResponsive)
    window.addEventListener('scroll', navBlack)
}

// Al hacer click en el boton añadir se crea un objeto con la info del articulo y se agrega al carrito
function leerArticulo(e) {
    e.preventDefault()

    const curso = e.target.parentElement.parentElement.parentElement

    const cursoObj = {
        id: e.target.dataset.id,
        titulo: curso.querySelector('h3').textContent,
        precio: curso.querySelector('.precio').textContent,
        imagen: curso.querySelector('.img').src,
        cantidad: 1
    }

    // Se verifica que no exista ese curso agregado a la ventana, si existe, se aumenta la cantidad
    const existe = carrito.some(curso => curso.id === cursoObj.id)

    if (existe) {
        const cursos = carrito.map(curso => {
            if (curso.id === cursoObj.id) {
                curso.cantidad++
                return curso // Retorna el objeto actualizado
            } else {
                return curso // Retorna los objetos que no son duplicados
            }
        })
        carrito = [...cursos]
    } else {
        carrito.push(cursoObj)
    }

    agregarArticuloHtml(carrito)
}

// Agrega el html a la ventana del carrito de compras
function agregarArticuloHtml(cursos) {

    limpiarHTML(tablaCursos)

    cursos.forEach(curso => {

        // Destructuring del curso a agregar
        const {
            imagen,
            titulo,
            precio,
            cantidad,
            id
        } = curso

        tablaCursos.innerHTML += `
            <tr>
                <td class="imagen"><img src="${imagen}" alt="imagen" width="100px"/></td>
                <td class="titulo-curso">${titulo}</td>
                <td class="precio-curso">${precio}</td>
                <td class="cantidad-curso">${cantidad}</td>
                <td class="acciones">
                    <a href="#" description="Eliminar" class="btn btn-eliminar eliminar-curso" data-id="${id}">X</a>
                </td>
            </tr>`

        ventanaCarrito.querySelector('#tabla-cursos').appendChild(tablaCursos)
    });
}

// Limpia elementos existentes en el html
function limpiarHTML(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild)
    }
}

// Ejecuta las acciones de eliminar cursos o vaciar el carrito
function accionesCarrito(e) {
    e.preventDefault()

    if (e.target.classList.contains('btn-eliminar')) {
        const id = e.target.dataset.id

        carrito = carrito.filter(curso => curso.id !== id)

        agregarArticuloHtml(carrito)
    } else if (e.target.classList.contains('btn-vaciar')) {
        vaciarCarrito()
    }
}

// Limpia el html de la ventana del carrito y reinicia el array del carrito
function vaciarCarrito() {

    limpiarHTML(tablaCursos)

    carrito = []
}

// MENU RESPONSIVE

// Esconde o muestra el menu responsive
function toggleMenu() {
    existeClaseEsconder = enlacesMenu.classList.contains('esconder')

    if (existeClaseEsconder) {
        enlacesMenu.classList.remove('esconder')
    } else {
        enlacesMenu.classList.add('esconder')
    }
}

// Al hacer click fuera del menu se esconde
function esconderMenuResponsive(e) {
    if (e.target === menuResponsive) {
        toggleMenu()
    } else if (e.target !== enlacesMenu) {
        enlacesMenu.classList.add('esconder')
    }
}

// Cuando se hace scroll se cambia el color de fondo de la barra de navegacion
function navBlack() {
    if (window.pageYOffset > topHeader) {
        header.classList.add("fixed")
    }else if (window.pageYOffset === topHeader) {
        header.classList.remove("fixed");
    }
}

// LISTA DE TAREAS
// Guardar articulos en indexedDB