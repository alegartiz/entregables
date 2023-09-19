class ProductManager {

    constructor() {
      this.products = [];
      this.productIdCounter = 1;

    }
  
    addProduct(product) {

      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.error('Todos los campos son obligaorios.');
        return;
        
      }
  
      if (this.products.some((existingProduct) => existingProduct.code === product.code)) {
        console.error(`El producto con el código ${product.code} ya existe.`);
        return;
      }
  
      product.id = this.productIdCounter++;
      this.products.push(product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        console.error('Producto no encontrado.');
        return null;
      }
      return product;
    }
  }
  
  /// por ej:
  const productManager = new ProductManager();
  productManager.addProduct({
    title: 'Producto 1',
    description: 'Este es el producto 1',
    price: 299.99,
    thumbnail: 'imagen1.jpg',
    code: 'codigo1',
    stock: 10,
  });
  productManager.addProduct({
    title: 'Producto 2',
    description: 'Descripción del Producto 2',
    price: 299.99,
    thumbnail: 'imagen2.jpg',
    code: 'codigo2',
    stock: 5,
  });
  
  console.log('Todos los productos:');
  console.log(productManager.getProducts());
  
  const productIdToFind = 2;
  const foundProduct = productManager.getProductById(productIdToFind);
  if (foundProduct) {
    console.log(`Producto encontrado con ID ${productIdToFind}:`);
    console.log(foundProduct);
  }
  