const changuito = JSON.parse(localStorage.getItem('changuito')) || []

let precioFinal = JSON.parse(localStorage.getItem('precioFinal')) || 0

changuitoCargado()

document.addEventListener('DOMContentLoaded', () => {

    const mercaderia = document.getElementsByClassName('btnI')
    const qmercaderia = document.getElementsByClassName('btnR')
    for (let merc of mercaderia) {
        merc.addEventListener('click', (evento) => {
            let productoId = evento.currentTarget.parentElement.dataset.id
            fetch('../productosApi.json')
                .then((respuesta) => respuesta.json())
                .then((productosjson) => {
                    for (let p of productosjson) {
                        if (p.id == productoId) {
                            let nombre = p.nombre
                            let precio = p.precio
                            let id = p.id
                            changuito.push({
                                nombre: nombre,
                                precio: precio,
                                id: id
                            })
                            precioFinal += Number(precio)
                        }
                    }
                })
                .finally(() => { changuitoCargado() })
        })
    }

    for (let qmerc of qmercaderia) {
        qmerc.addEventListener('click', (evento) => {
            let productoId = evento.currentTarget.parentElement.dataset.id
            const index = changuito.findIndex(obj => {
                return obj.id === productoId
            })
            if (index >= 0) {
                let precio = changuito[index].precio
                let nombre = changuito[index].nombre
                precioFinal -= Number(precio)

                changuito.splice(index, 1)
                changuitoCargado()
            }
        })
    }

})

function changuitoCargado() {
    localStorage.setItem('changuito', JSON.stringify(changuito))
    localStorage.setItem('precioFinal', JSON.stringify(precioFinal))
    let escribir = ""
    for (let chango of changuito) {
        if (nombre = ! null) {
            escribir += `
            <li>
            ${chango.nombre + " - $" + chango.precio}
            </li>
            `
        }
    }
    let ul = document.querySelector('#carrito ul')
    let h4 = document.querySelector('#carrito h4')
    h4.innerHTML = "$" + precioFinal
    ul.innerHTML = escribir
}

const btn = document.querySelector("#btnPagar")
btn.onclick = (evento) => {
    if (precioFinal != 0) {
        evento.preventDefault()

        Swal.fire({
            title: `El pago de ${precioFinal} fue realizado con éxito`,
            icon: `success`
        }).then((res) => {
            if (res.isConfirmed || res.isDismissed) {
                window.location.reload()
            }
        })

    } else {
        evento.preventDefault()


        Swal.fire({
            title: `El carrito esta vacío`,
            icon: `error`
        })
    }

    localStorage.removeItem(`changuito`)
    localStorage.removeItem(`precioFinal`)
}

