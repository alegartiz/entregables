const express = require('express');
const app = express();
const ProductManager = require('./ProductManager'); 




const productManager = new ProductManager('productos.json'); 



app.get('/products', (req, res) => {
  const { limit } = req.query;
  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  res.json({ products });
});




app.get('/products/:pid', (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductById(parseInt(pid));

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'No se encontró el producto' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
