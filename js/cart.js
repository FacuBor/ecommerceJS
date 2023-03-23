let cartIcon = document.querySelector('#cart-icon'); 
let cart = document.querySelector('#cart');          
let cartClosed = document.querySelector ('#closed-cart') ;
let cantidadCarrito = document.getElementById('spanCantidad');
let cartContent = document.getElementById('cartContent');
//evento open cart
cartIcon.onclick = () => {
    cart.classList.add('active')
}
//evento close cart
cartClosed.onclick = () => {
    cart.classList.remove('active')
}
//paint cart
const mostrarCarrito = () => {
    if(cartContent){
    cartContent.innerHTML= '';
    carritoArray.forEach((producto) => {
        cartItem = document.createElement('div')
        cartItem.className = 'cartItem-deleteItem d-flex flex-row align-items-center justify-content-between'
        cartItem.innerHTML =
                    `<div class="cart-box justify-content-center">
                        <div class="d-flex flex-row justify-content-center align-items-center">
                            <img src="${producto.imagen}"  class="cart-imgg ">
                        </div>
                        <div class="detail-box">
                            <div>
                                <div class="cart-producto-title text-start">${producto.nombre}</div>
                                <div class="cart-producto-price text-start">$${producto.precio}</div>
                                <div class="resta-suma d-flex flex-row align-items-center justify-content-start">
                                    <p class="text-start m-0">Cantidad:</p>
                                    <div class="resta-suma-cartItem ms-4 d-flex flex-row align-items-center justify-content-evenly">
                                        <span class="restaSpan fs-5"> - </span>
                                        ${producto.cantidad}
                                        <span class="sumaSpan fs-5"> + </span>
                                    </div>
                                </div>
                                <p class="text-start text-success m-0">Total: ${producto.cantidad * producto.precio}</p>
                            </div>
                            <i onclick="deleteItemCart(${producto.id})" class="bx bx-x btnDeleteItem"></i>
                        </div>
                    </div>`;
        cartContent.append(cartItem);
         //restar span
        let restar = cartItem.querySelector('.restaSpan');
        restar.addEventListener("click", ()=>{
            if(producto.cantidad !== 1){
                producto.cantidad --;
            }
            mostrarCarrito()
            saveLocalS()
        });
        //sumar span
        let sumar = cartItem.querySelector('.sumaSpan')
        sumar.addEventListener('click', ()=>{
            producto.cantidad ++;
            mostrarCarrito()
            saveLocalS()
        }) 
        })
    }
        //total buy
        const total = carritoArray.reduce((acc, el)=> acc + el.precio * el.cantidad, 0)
        let totalCompra = document.createElement('div');
        totalCompra.className = ('cart-total');
        totalCompra.innerHTML = `<h6>Compra Total $${total}</h6>`;
        cartContent.append(totalCompra);
        //empty cart
        if(carritoArray.length === 0){
            cartContent.innerHTML = ` <p class="text-center text-primary parrafo m-0 ">Empty Cart, add Product!</p>`
            carritoArray.length === 0 && console.log("Empty cart")
        } else{
            console.log('Productos en carrito',carritoArray.length)
        }
        
    saveLocalS()
}
//detele item cart
function deleteItemCart(id){
    const itemCart = id
    carritoArray = carritoArray.filter((element)=> element.id !== itemCart)
    mostrarCarrito()
    spanQuantity()
    saveLocalS()
}