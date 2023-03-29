//cards 
let divCards = document.getElementById('sectionProductos'); //Display grid - container
let carritoArray = []; //carrito vacio
//
document.addEventListener('DOMContentLoaded', ()=>{
    carritoArray = JSON.parse(localStorage.getItem("arrayCart",)) || []; 
    
    mostrarCarrito()
    spanQuantity()
}) 
//paint cards from json
const paintCard = async ()=>{
    const respuesta = await fetch('js/productos.json');
    const data = await respuesta.json();
    console.log("productos Fetch - PaintCards",data)

    localStorage.setItem('ProductsJson', JSON.stringify(data)) // almaceno array en LS para luego llamarlo y trabajarlo
    
        data.forEach ((producto)=>{
            let card = document.createElement ("div")
            card.className = "cardItem card p-0 m-0  d-flex flex-column align-items-center justify-content-evenly"
            card.innerHTML =   `<img src="${producto.imagen}" class="imgCard" >
                                <div>
                                    <div class="cardTitleProduct d-flex flex-column align-items-center justify-content-center mt-2 p-1">
                                        <div class="nameProduct d-flex flex-row justify-content-around align-items-center text-center">  
                                            <h5 class="  m-0 nameShoe">${producto.nombre}</h5>
                                            <p class="m-0 price-Card">$${producto.precio}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-between align-items-center ">
                                <i onclick="agregarCarrito(${producto.id})" class="bx bx-cart-add add-to-cart" id="btnComprar"></i> 
                                <p class=" m-0 ">Talle: ${producto.talle}</p>
                                </div>`;
            divCards.append(card);
        })
}
paintCard() 

//Recupero array de productos almacenado del fetch con LS(data) para poder desarrollar la funcion agregar carrito,
let productosLS = JSON.parse(localStorage.getItem('ProductsJson'))
console.log("Productos en Local Storage", productosLS)

function agregarCarrito(id){
    const existe = carritoArray.some(producto => producto.id === id )
    if(existe){
        const producto = carritoArray.map(prod => {
            if(prod.id === id){
                prod.cantidad++
            }
        })
    }else{
        const item = productosLS.find((producto) => producto.id === id)    //llamo productosLS para aplicar en .find
        carritoArray.push(item)
        Toastify({
            text: "Added Product",
            duration: 4000,
            gravity:"bottom",
            position:"right",
            style: {
                background: "#fb9440",
            },
            }).showToast();
    }
    
    mostrarCarrito()
    spanQuantity()
} 

//set item localStorage carrito
function saveLocalS(){
    localStorage.setItem("arrayCart", JSON.stringify(carritoArray));
}

//span cart- quantity
const spanQuantity = () =>{
    cantidadCarrito.style.display = "block";
    const carritoLength = carritoArray.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}

//modal post-buy
let modal = document.querySelector('.modal-2-buy');
let modalContainer = document.querySelector('.modal-2-container');

//process order cart button
let procesarCompra = document.querySelector('#buttonBuy');
procesarCompra.addEventListener('click', ()=>{
    if(carritoArray.length === 0){
        Swal.fire({
            title: 'Empty Cart',
            text: 'Insert product',
            icon: 'error',
            confirmButtonText: 'Ok!'
        })
    }else{
        modalContainer.style.visibility = 'visible';
        modalContainer.style.opacity = '1';
        modal.classList.toggle('modal-2-close');
        cart.classList.remove('active')

        procesarPedido()
        cartIcon.classList.add('d.none')
        cartIcon.classList.remove ('iconBagNav')
        cantidadCarrito.classList.add('d.none')
        cantidadCarrito.classList.remove('cantidad-carrito')
    }
})
//process order
function procesarPedido(){
    carritoArray.forEach((producto) =>{
        const listaCompra = document.querySelector('#lista-compra tbody')
        const row = document.createElement('tr')
        row.className = "itemPedido"
        row.innerHTML +=`
        <td>
        <img class="cart-imgg" src="${producto.imagen}"/>
        </td>
        <td class="cart-producto-title text-start">${producto.nombre}</td>
        <td class="cart-producto-price text-start">${producto.precio}</td>
        <td class="text-start cart-producto-cantidad m-0">${producto.cantidad}</td>
        <td class="text-start text-success cart-producto-total m-0">${producto.precio * producto.cantidad}</td>`;
        listaCompra.appendChild(row)
    })
    const totalProcesoCont = document.querySelector('#totalProceso')
    const totalSumaPedido = carritoArray.reduce((acc, el)=> acc + el.precio * el.cantidad, 0);
    let compraTotal = document.createElement('div');
    compraTotal.className = ('cart-total');
    compraTotal.innerHTML = `<h6 class= "total-compra-suma">Total buy $${totalSumaPedido}</h6>`;
    totalProcesoCont.append(compraTotal)
    
}

//send form
let sendForm = document.querySelector('#procesar-pago')
sendForm.addEventListener('submit', submitPedido)

function submitPedido(e){
    e.preventDefault()
    console.log("checking...")
    const clientUser = document.querySelector('#client').value
    const mailUser = document.querySelector("#mail").value
    
    if(mailUser === ''|| clientUser === ''){
        Swal.fire({
            title: 'Stop',
            text: 'Complete client and mail',
            icon: 'error',
            confirmButtonText: 'Ok!'
        })
        console.log('Incomplete data')
    } else{
        const spinner = document.querySelector("#spinner")
        spinner.classList.add('d-flex')
        spinner.classList.remove('d-none')
        setTimeout( () =>{
            spinner.classList.add('d-none')
            spinner.classList.remove('d-flex')
            sendForm.reset()
            toastify ()
            console.log('Submitted Form')
        },3000,);
        carritoArray = [];
    }
    mostrarCarrito()
    saveLocalS
}

function toastify (){
    Toastify({
        text: "Sent Buys",
        duration: 4000,
        gravity:"bottom",
        position:"center",
        style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        }).showToast();
}



// Profe Lu, ante todo, muchas gracias por el curso, nose a los demas,ami me gusto (tuve mis bloqueos de muchas horas jaja)pero escuchando, estudiando y siendo autodidacta pude salir de cositas!
//espero que entienda mi condigo, trato de ser lo mas ordenado y descriptivo, ya que ami tambien me ayuda a cuando retomo un proyecto!
//Que tenga un buen anio, Mucha suerte!!
//pd: puse bastantes console.log, lo hice para ayudar a seguir un error o un paso!