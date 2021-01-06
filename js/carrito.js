import {
    cargarCursos,
    accionesCarrito,
    esconderElementos
} from './funciones.js'

const tablaCursos = document.querySelector('#container')

cargarEventListeners()

function cargarEventListeners() {
    window.addEventListener('load', cargarCursos)
    document.addEventListener('click', esconderElementos)
    tablaCursos.addEventListener('click', accionesCarrito)
}

// LISTA DE TAREAS PENDIENTES
// Modificar responsive carrito.html