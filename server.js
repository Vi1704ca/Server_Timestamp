import express from 'express';

const app = express()

const HOST = '127.0.0.1'
const PORT = 3001

app.get('/timestamp', (req, res) => {
  const now = moment();
  res.json({
    timestamp: now.format('YYYY-MM-DD HH:mm:ss')
  });
});

const products = [
    { 
        id: 1, 
        name: 'Cheetos', 
        price: 10.99, 
        category: 'Corn snack' 
    },
    { 
        id: 2, 
        name: 'Chupa Chups', 
        price: 19.99, 
        category: 'Confectionery' 
    },
    { 
        id: 3, 
        name: 'Mountain Dew', 
        price: 5.99, 
        category: 'Carbonated drink' 
    },
    { 
        id: 4, 
        name: 'Doritos', 
        price: 12.99, 
        category: 'Corn snack' 
    },
    { 
        id: 5, 
        name: 'Snickers', 
        price: 15.99, 
        category: 'Confectionery' 
    },
];

app.get('/products', (req, res) => {
  const { take, category } = req.query;
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category === category);
  }
  if (!take) {
    return res.status(200).json(filteredProducts);
  }
  const takeNum = Number(take);

  if (!Number.isInteger(takeNum) || takeNum < 0) {
    return res.status(400).json({ message: "take must be a non-negative integer" });
  }
  filteredProducts = filteredProducts.slice(0, takeNum);
  return res.status(200).json(filteredProducts);
});     

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const idNum = Number(id);
  const product = products.find((product) => product.id === idNum);

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }
  return res.status(200).json(product);
});

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})
