export const generateProductErrorParam = (prodId) => {
    return `
    Product ID no es valido, debe ser un numero entero, pero se recibio: ${prodId}
    `
}