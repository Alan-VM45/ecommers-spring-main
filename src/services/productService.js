const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const productService = {
    findAll: () => {
        const productsJSON = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(productsJSON);
    },
    findById: (id) => {
        const products = productService.findAll();
        return products.find(p => p.id === id);
    }
};

module.exports = productService;
