const botonesAgregar = document.querySelectorAll('.articulo button')
const tablaArticulos = document.querySelector('#tabla-articulos')

botonesAgregar.forEach(boton => {
    boton.dataset.id = Date.now()
    boton.addEventListener('click', leerArticulo)
});

// console.log(articulos)

function leerArticulo(e) {
    e.preventDefault()

    const articulo = e.target.parentElement.parentElement

    const articuloObj = {
        id: e.target.dataset.id,
        titulo: articulo.querySelector('h3').textContent,
        precio: articulo.querySelector('.precio').textContent,
        imagen: articulo.querySelector('img').src
    }

    // console.log(articuloObj)
    agregarArticulo(articuloObj)
}

function agregarArticulo(articulo) {

    // console.log(articulo.imagen)

    const tbody = document.querySelector('#body-tabla-cursos')
    tbody.innerHTML += `
        <tr>
            <td class="imagen"><img src="${articulo.imagen}" alt="imagen" width="100px"/></td>
            <td class="titulo">${articulo.titulo}</td>
            <td class="precioTabla">${articulo.precio}</td>
        </tr>`

    tablaArticulos.appendChild(tbody)
}