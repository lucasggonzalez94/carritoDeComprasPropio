const botonesAgregar = document.querySelectorAll('.articulo button')
const tablaArticulos = document.querySelector('#tabla-articulos')

const carrito = []

// Agrego el id del articulo y pongo a la escucha del evento click
botonesAgregar.forEach(boton => {
    boton.dataset.id = Date.now()
    boton.addEventListener('click', leerArticulo)
});

// console.log(articulos)

// Al hacer click en el boton añadir se crea un objeto con la info del articulo y se agrega al carrito
function leerArticulo(e) {
    e.preventDefault()

    const articulo = e.target.parentElement.parentElement

    const articuloObj = {
        id: e.target.dataset.id,
        titulo: articulo.querySelector('h3').textContent,
        precio: articulo.querySelector('.precio').textContent,
        imagen: articulo.querySelector('img').src
    }

    carrito.push(articuloObj)

    // console.log(articuloObj)
    agregarArticuloHtml(articuloObj)
}

// Agrega el html a la ventana del carrito de compras
function agregarArticuloHtml(articulo) {

    // console.log(articulo.imagen)

    const tbody = document.querySelector('#body-tabla-cursos')
    tbody.innerHTML += `
        <tr>
            <td class="imagen"><img src="${articulo.imagen}" alt="imagen" width="100px"/></td>
            <td class="titulo">${articulo.titulo}</td>
            <td class="precioTabla">${articulo.precio}</td>
            <td class="acciones">
                <button class="btn btn-eliminar" data-id="${articulo.id}">Quitar</button>
            </td>
        </tr>`

    tablaArticulos.appendChild(tbody)
}