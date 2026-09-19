import express from "express"; 

const app = express(); 
app.use(express.json()); 

const HOST = "localhost"; 
const PORT = 3000; 

let users = [ 
    { 
        id: 1, 
        name: "Artyom", 
        password: "112233qwe", 
    }, 
]; 

let products = [];

async function createUser(user) { 
    return new Promise((resolve, reject) => { 
        setTimeout(() => { 
            users = [...users, user] 
            resolve(user); 
        }) 
    }) 
} 

async function addProduct(newProduct, fail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fail === "true") {
                reject();
            } else {
                products = [...products, newProduct]
                resolve(newProduct);
            }
        })
    })
}

app.get("/users", (req, res) => { 
    res.status(200).json(users); 
}); 

app.post('/register', async (req, res) => { 
    console.log(req.body) 
    const { name, password } = req.body; 
    if (typeof name !== "string" || !name.trim() || typeof password !== "string" || !password.trim()){ 
        return res.status(422).json({ 
            message: "Invalid product data" 
        }) 
    } 
    const newUser = { 
        id: users.length + 1, 
        name: name, 
        password: password 
    }; 
    try { 
        const result = await createUser(newUser); 
        res.status(201).json(result) 
    } catch (error) { 
        console.log(error) 
        res.status(500).json({ 
            message: "Internal server error" 
        }) 
    } 
}) 

app.get('/products', (req, res) => {
    res.status(200).json(products);
});

app.post('/products', async (req, res) => {
    console.log(req.body)
    const { name, price, category, image } = req.body;
    if (typeof name !== "string" || !name.trim() || typeof price !== "number" || price <= 0 || typeof category !== "string" || !category.trim()){
        return res.status(422).json({
            message: "Invalid product data"
        })
    }
    const isDuplicate = products.find((product) => product.name === name);
    if (isDuplicate){
        return res.status(409).json({
            message: "Conflict"
        })
    }
    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        category: category,
        image: image ? image : ""
    };
    try {
        const result = await addProduct(newProduct, req.query.fail);
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.listen(PORT, HOST, () => { 
    console.log(`Server is running on http://${HOST}:${PORT}`); 
});