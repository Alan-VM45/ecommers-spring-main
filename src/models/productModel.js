const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

function getAllProducts() {
  const productsJSON = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(productsJSON);
}

function getProductById(id) {
  const products = getAllProducts();
  const productId = Number(id);
  return products.find((product) => product.id === productId);
}

function searchProducts(term) {
  const products = getAllProducts();
  const searchTerm = String(term || '').trim().toLowerCase();
  if (searchTerm === '') {
    return products;
  }
  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  });
}

function getProductsByCategory(category) {
  const products = getAllProducts();
  const normalized = String(category || '').trim().toLowerCase();
  if (!normalized) {
    return products;
  }
  return products.filter((product) => product.category.toLowerCase() === normalized);
}

function getTopProducts() {
  const products = getAllProducts();
  return products.filter((product) => product.top);
}

function getSuggestedProducts(product) {
  const products = getAllProducts();
  if (!product || !product.suggestions) {
    // US #6: Retornar 5 productos aleatorios
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }
  return products.filter((item) => product.suggestions.includes(item.id));
}

module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  getTopProducts,
  getSuggestedProducts
};
