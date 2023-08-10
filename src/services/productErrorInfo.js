export const generateProductErrorInfo = (prod) =>{
    return `
    Alguno de los campos para crear el producto no es valido:
    Lista de campos requeridos:
    title: Debe ser un campo string, pero recibio ${prod.title}
    description: Debe ser un campo string, pero recibio ${prod.description}
    code: Debe ser un campo string, pero recibio ${prod.code}
    price: Debe ser un campo string, pero recibio ${prod.price}
    stock: Debe ser un campo string, pero recibio ${prod.stock}
    category: Debe ser un campo string, pero recibio ${prod.category}
    thumbnail: Debe ser un campo string, pero recibio ${prod.thumbnail}
    status: Debe ser un campo string, pero recibio ${prod.status}
    `
}