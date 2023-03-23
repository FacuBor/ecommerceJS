//cards 
let divCards = document.getElementById('sectionProductos'); //Display grid - contenedor
let carritoArray = []; //carrito vacio
//

document.addEventListener('DOMContentLoaded', ()=>{
    carritoArray = JSON.parse(localStorage.getItem("arrayCart",)) || []; 
    
    mostrarCarrito()
    spanQuantity()
}) 

const paintCard = async ()=>{
    const respuesta = await fetch('js/productos.json');
    const data = await respuesta.json();
    console.log(data)
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

//agregar a carrito
function agregarCarrito(id){
    const existe = carritoArray.some(producto => producto.id === id )
    if(existe){
        const producto = carritoArray.map(prod => {
            if(prod.id === id){
                prod.cantidad++
            }
        })
    }else{
        const item = stockProducts.find((producto) => producto.id === id)
        carritoArray.push(item)
    }
    mostrarCarrito()
    spanQuantity()
}

//set item localStorage
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
let closedModal = document.querySelector('.close-icon-modal');
let modal = document.querySelector('.modal-2-buy');
let modalContainer = document.querySelector('.modal-2-container');

closedModal.addEventListener('click', ()=>{
    modal.classList.toggle('modal-2-close')
    modalContainer.style.visibility = 'hidden';
    modalContainer.style.opacity = '0'; 
})
window.addEventListener('click', (e)=>{
    if(e.target == modalContainer){
        modal.classList.toggle('modal-2-close')
    modalContainer.style.visibility = 'hidden';
    modalContainer.style.opacity = '0'; 
    }
})

//procesar pedido cart button
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
    }
})



// Profe Lu, ante todo, muchas gracias por el curso, nose los demas, pero ami me fue bien, escuchando, estudiando y siendo autodidacta!
//dejo comentado productos de js! ya que obviamente el liveserver no funciona con fetch! por cualq cosa!



// paint cards
/* stockProducts.forEach ((producto)=>{
        let card = document.createElement ("div")
        card.className = "cardItem card p-0 m-0  d-flex flex-column align-items-center justify-content-evenly"
        card.innerHTML =   `<img src="${producto.imagen}" class="imgCard" >
                            <div>
                                <div class="cardTitleProduct d-flex flex-column align-items-center justify-content-center mt-2 p-1">
                                    <div class="nameProduct d-flex flex-row justify-content-between align-items-center">  
                                        <h5 class=" fw-light m-0 nameShoe">${producto.nombre}</h5>
                                        <p class="fs-6 m-0 price-Card">$${producto.precio}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex flex-row justify-content-between align-items-center ">
                            <i onclick="agregarCarrito(${producto.id})" class="bx bx-cart-add add-to-cart" id="btnComprar"></i>
                            <p class="fs-6 m-0 price-Card">Talle: ${producto.talle}</p>
                            </div>`;
        divCards.append(card);
    }) */
