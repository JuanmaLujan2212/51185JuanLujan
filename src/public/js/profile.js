const submitButton = document.getElementById('submitProd');
const deleteButton = document.getElementById('deleteProdBtn');
    submitButton.addEventListener('click', function(e) {
      e.preventDefault(); 
  
      const title = document.getElementById('titleProd').value;
      const description = document.getElementById('descProd').value;
      const code = document.getElementById('codeProd').value;
      const price = document.getElementById('priceProd').value;
      const status = document.getElementById('statusProd').value;
      const stock = document.getElementById('stockProd').value;
      const category = document.getElementById('catProd').value;
      const thumbnail = document.getElementById('thumbnailProd').value;

      if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) {
        alert('Por favor, complete todos los campos');
        return;
      }
  
      const newProduct = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category,
        thumbnail: thumbnail
      };
  
      console.log(newProduct)

      fetch('http://localhost:8080/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    });

    deleteButton.addEventListener('click', function() {

      const productId = document.getElementById('deleteProd').value;

      fetch(`http://localhost:8080/api/products/${productId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error); 
        });

       
    });


