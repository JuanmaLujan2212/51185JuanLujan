const addToCart = (productId)=> {
    try {
        const response = fetch(`/cart/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cartId: '{{user.cart}}' }) 
        });
      } catch (error) {
        console.log('Error al agregar el producto al carrito:', error);
      }

    console.log('El dato recibido es:', productId);

    
};