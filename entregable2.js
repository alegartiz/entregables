const fs = require('fs');

class ProductManager {

  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();

  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8'); //<--- para que use utf-8 :)
      this.products = JSON.parse(data);
    } catch (error) {
      // si no existe o crashea al hacer el read, inicializa con un array vacío 
      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  addProduct(productData) {
    const newProduct = {
      id: this.products.length + 1,
      ...productData,
    };
    this.products.push(newProduct);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  updateProduct(id, fieldToUpdate, updatedValue) {
    const productToUpdate = this.getProductById(id);
    if (productToUpdate) {
      productToUpdate[fieldToUpdate] = updatedValue;
      this.saveProducts();
    }
  }

  deleteProduct(id) {
    const indexToDelete = this.products.findIndex((product) => product.id === id);
    if (indexToDelete !== -1) {
      this.products.splice(indexToDelete, 1);
      this.saveProducts();
    }
  }
}




// por ej: 
const productManager = new ProductManager('productos.json');

console.log('Todos los productos:');
console.log(productManager.getProducts());

productManager.addProduct({
  title: 'Producto 1',
  description: 'Descripción del Producto 1',
  price: 19.99,
  thumbnail: 'imagen1.jpg',
  code: 'P1',
  stock: 10,
});

console.log('Productos después de agregar uno:');
console.log(productManager.getProducts());

productManager.updateProduct(1, 'price', 29.99);

console.log('Productos después de actualizar el precio del producto 1:');
console.log(productManager.getProducts());

productManager.deleteProduct(1);

console.log('Productos después de eliminar el producto 1:');
console.log(productManager.getProducts());
