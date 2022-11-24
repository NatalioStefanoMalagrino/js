const changuito = JSON.parse(localStorage.getItem('changuito')) || []

let precioFinal = JSON.parse(localStorage.getItem('precioFinal')) || 0

var inputs = JSON.parse(localStorage.getItem('nputs')) || document.querySelectorAll('input[type="checkbox"]')

for (let omega of inputs) {
    document.getElementById(omega.id).checked = omega.checked
}

changuitoCargado()

document.addEventListener('DOMContentLoaded', ()=>{

    const mercaderia = document.querySelectorAll('.inputb input')
    for (let merc of mercaderia) {
        merc.addEventListener('change', (evento)=> {
            if (evento.currentTarget.checked) {
                let nombre = evento.currentTarget.parentElement.dataset.title
                let precio = evento.currentTarget.parentElement.dataset.price
                changuito.push(nombre + " - $" + precio)
                precioFinal += Number(precio)
            } else {
                let nombre = evento.currentTarget.parentElement.dataset.title
                let precio = evento.currentTarget.parentElement.dataset.price

                let index = changuito.indexOf(nombre + " - $" + precio);
                if (index >= 0) {
                    changuito.splice( index, 1 );
                }

                precioFinal -= Number(precio)
            }
            changuitoCargado()

            inputs = document.querySelectorAll('input[type="checkbox"]')
            var inputsss = []
            for (let inp of inputs) {
                inputsss.push({id:inp.id, checked:inp.checked})
            }
            localStorage.setItem('nputs', JSON.stringify(inputsss))
        })
    }



})

function changuitoCargado () {
    localStorage.setItem('changuito', JSON.stringify(changuito))
    localStorage.setItem('precioFinal', JSON.stringify(precioFinal))
    let escribir = ""
    for (let chango of changuito) {
        if (nombre =! null) {
            escribir +=`
            <li>
            ${chango}
            </li>
            `
        }
    }
    let ul = document.querySelector('#carrito ul')
    let h4 = document.querySelector('#carrito h4')
    h4.innerHTML = "$" + precioFinal

    ul.innerHTML = escribir
}

const btn = document.getElementById("btnPagar")
btn.onclick = (evento)=> {
    localStorage.removeItem ('changuito')
    localStorage.removeItem ('precioFinal')
    localStorage.removeItem ('nputs')
    if (precioFinal != 0) {
        evento.preventDefault ()
        let pagado = `
        <div class="d-flex justify-content-between">
            <h4>El pago fue de $${precioFinal}</h4>
            <button class="btnn m-2" id="btnReiniciar">Reiniciar compra</button>
            </div>
        `
        let changoPagado = document.querySelector('#carrito')
        changoPagado.innerHTML = pagado
    }
    else {
        evento.preventDefault ()
        let pagado = `
        <div class="d-flex justify-content-between">
        <h4>Changuito sin nada</h4>
        <button class="btnn m-2" id="btnReiniciar">Reiniciar compra</button>
        </div>
        `
        let changoPagado = document.querySelector('#carrito')
        changoPagado.innerHTML = pagado
    }
    const btnReiniciar = document.getElementById("btnReiniciar")
    btnReiniciar.onclick = (evento)=> {
        evento.preventDefault ()
        window.location.reload ()
    }
}

