import {
    limpiarHTML,
    cargarCursos,
    agregarCursoHtml,
    accionesCarrito,
    esconderElementos,
    navBlack,
    carrito,
    bodyTablaCursos
} from './funciones.js'

const botonesAgregar = document.querySelectorAll('.curso .btn-agregar')
const ventanaCarrito = document.querySelector('#ventana-carrito')
const botonesVerMas = document.querySelectorAll('.btn-ver-mas')
const modal = document.querySelector('#modal')

// Agregar listeners
cargarEventListeners()

function cargarEventListeners() {
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', leerCurso)
    });

    botonesVerMas.forEach(boton => {
        boton.addEventListener('click', mostrarModal)
    });

    ventanaCarrito.addEventListener('click', accionesCarrito)
    document.addEventListener('click', esconderElementos)
    window.addEventListener('load', cargarCursos)
    window.addEventListener('scroll', navBlack)
}

// Al hacer click en el boton añadir se crea un objeto con la info del articulo y se agrega al carrito
function leerCurso(e) {
    e.preventDefault()

    const curso = e.target.parentElement.parentElement

    const cursoObj = {
        id: e.target.dataset.id,
        titulo: curso.querySelector('h3').textContent,
        precio: curso.querySelector('.precio').textContent,
        imagen: curso.querySelector('.img').src,
        cantidad: 1
    }

    // Se verifica que no exista ese curso agregado a la ventana, si existe, se aumenta la cantidad, sino se agrega el curso
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

    agregarCursoHtml(carrito, bodyTablaCursos)
}

// Se muestra una ventana modal con la info del curso seleccionado
function mostrarModal(e) {
    e.preventDefault()

    let existeClaseEsconder = modal.classList.contains('esconder')

    if (existeClaseEsconder) {
        gsap.set(modal, {display: 'flex'})
        gsap.to(modal, .5, {opacity: 1})

        const curso = e.target.parentElement.parentElement

        const cursoObj = {
            id: e.target.dataset.id,
            titulo: curso.querySelector('h3').textContent,
            precio: curso.querySelector('.precio').textContent,
            imagen: curso.querySelector('.img').src,
            descripcion: curso.querySelector('.descripcion').textContent
        }

        const infoModal = document.createElement('div')
        infoModal.classList.add('infoModal')

        infoModal.innerHTML = `
            <div id="cabeceraModal">
                <img src="${cursoObj.imagen}" id="imgModal">
                <h3 id="tituloModal">${cursoObj.titulo}</h3>
            </div>
            <hr>
            <p id="descripcionModal">${cursoObj.descripcion}</p>
            <div id="precioModal">
                <p>${cursoObj.precio}</p>
            </div>`

        const btnCerrarModal = document.createElement('a')
        btnCerrarModal.href = '#'
        btnCerrarModal.classList.add('cerrarModal')
        btnCerrarModal.textContent = 'X'
        btnCerrarModal.addEventListener('click', cerrarModal)

        limpiarHTML(modal)
        infoModal.appendChild(btnCerrarModal)
        modal.appendChild(infoModal)
        modal.classList.remove('esconder')
    }
}

function cerrarModal(e) {
    e.preventDefault()

    let existeClaseEsconder = modal.classList.contains('esconder')

    if (!existeClaseEsconder) {
        gsap.to(modal, .5, {opacity: 0})
        setTimeout(() => {
            gsap.set(modal, {display: 'none'})
        }, 500)
        modal.classList.add('esconder')
    }
}