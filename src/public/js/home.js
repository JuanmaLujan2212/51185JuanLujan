const socket = io();

const container = document.getElementById('products');

const titleInput = document.getElementById('titleProd');
const DescInput = document.getElementById('descProd');
const codeInput = document.getElementById('codeProd');
const priceInput = document.getElementById('priceProd');
const statInput = document.getElementById('statusProd');
const stockInput = document.getElementById('stockProd');
const catInput = document.getElementById('catProd');
const thumbInput = document.getElementById('thumbnailProd');

const submitBtn = document.getElementById('submitProd');

const deleteInput = document.getElementById('deleteProd');

const deleteBtn = document.getElementById('deleteProdBtn');

const formulario = document.getElementById('formulario');

const elementos = formulario.querySelectorAll('input, select, textarea');





ShowProds = (productos)=>{
    console.log(productos)
        container.innerHTML=""

         productos.forEach((prod)=>{
        container.innerHTML+=`
        <h3>${prod.title}</h3>
        <p>Descripcion: ${prod.description} </p>
        <p>Categoria: ${prod.category} </p>
        <p>Precio: ${prod.price}$</p>
        `  
    }) 
      
    
}

VerificarCompleto = ()=>{
    for (let i = 0; i < elementos.length; i++) {
        const elemento = elementos[i];
        if (elemento.value === '' || elemento.value === null) {
          return false;
        }
      }
      return true
}






submitBtn.addEventListener('click', ()=>{  

    const EstaLleno = VerificarCompleto();
    if(EstaLleno){
        const prod = {}
        prod.title = titleInput.value;
        prod.description = DescInput.value;
        prod.code  = codeInput.value;
        prod.price = priceInput.value;
        prod.status = statInput.value;
        prod.stock = stockInput.value;
        prod.category = catInput.value;
        prod.thumbnail = thumbInput.value;
        socket.emit('addProduct',prod)

        titleInput.value = ''
        DescInput.value = ''
        codeInput.value = ''
        priceInput.value = ''
        statInput.value = ''
        stockInput.value = ''
        catInput.value = ''
        thumbInput.value = ''

    }else{
        alert("Por favor, complete todos los campos")
    }    
})

deleteBtn.addEventListener('click', ()=>{  
    socket.emit('deleteProduct', deleteInput.value)
    deleteInput.value = ''
})



socket.on('product',data=>{
    console.log(data)
    ShowProds(data);
})



