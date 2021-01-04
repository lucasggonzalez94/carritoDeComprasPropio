const botonesAgregar = document.querySelectorAll('.curso .btn-agregar')
const ventanaCarrito = document.querySelector('#ventana-carrito')
const tablaCursos = document.querySelector('#body-tabla-cursos')
const menuResponsive = document.querySelector('.icon-menu')
const enlacesMenu = document.querySelector('#enlaces-menu')
const header = document.querySelector('#header')

const topHeader = header.offsetTop
let carrito = []

window.addEventListener('load', leerLocalStorage)

// Agregar listeners
cargarEventListeners()

function cargarEventListeners() {
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', leerCurso)
    });

    ventanaCarrito.addEventListener('click', accionesCarrito)
    document.addEventListener('click', esconderMenuResponsive)
    window.addEventListener('scroll', navBlack)
}

function leerLocalStorage() {
    for(let i = 0; i < localStorage.length; i++){
        let clave = localStorage.key(i)
        let valor = localStorage.getItem(clave)
        carrito.push(JSON.parse(valor))
    }

    agregarCursoHtml(carrito)
}

// Al hacer click en el boton añadir se crea un objeto con la info del articulo y se agrega al carrito
function leerCurso(e) {
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
                localStorage.removeItem(curso.id)
                localStorage.setItem(curso.id, JSON.stringify(curso))
                return curso // Retorna el objeto actualizado
            } else {
                return curso // Retorna los objetos que no son duplicados
            }
        })
        carrito = [...cursos]
    } else {
        carrito.push(cursoObj)
        localStorage.setItem(cursoObj.id, JSON.stringify(cursoObj))
    }

    agregarCursoHtml(carrito)
}

// Agrega el html a la ventana del carrito de compras
function agregarCursoHtml(cursos) {

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

        agregarCursoHtml(carrito)

        localStorage.removeItem(id)
    } else if (e.target.classList.contains('btn-vaciar')) {
        vaciarCarrito()
    }
}

// Limpia el html de la ventana del carrito y reinicia el array del carrito
function vaciarCarrito() {

    limpiarHTML(tablaCursos)

    carrito = []
    localStorage.clear()
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
// Guardar cursos en localstorage