const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

/**
 * Normaliza y valida un ID de producto
 * @param {*} id - ID a normalizar
 * @returns {object} { isValid: boolean, id: number|null, error: string|null }
 */
function normalizeId(id) {
  const numId = Number(id);
  
  if (isNaN(numId) || !Number.isInteger(numId) || numId <= 0) {
    return {
      isValid: false,
      id: null,
      error: 'El ID debe ser un número válido y positivo.'
    };
  }
  
  return {
    isValid: true,
    id: numId,
    error: null
  };
}

/**
 * Lee todos los productos del archivo JSON
 */
function getAllProducts() {
  const productsJSON = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(productsJSON);
}

/**
 * Obtiene un producto por ID
 * @param {number} id - ID del producto
 */
function getProductById(id) {
  const products = getAllProducts();
  return products.find((product) => product.id === id);
}

/**
 * Busca productos por término
 * @param {string} term - Término de búsqueda
 */
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

/**
 * Obtiene productos por categoría
 * @param {string} category - Nombre de la categoría
 */
function getProductsByCategory(category) {
  const products = getAllProducts();
  const normalized = String(category || '').trim().toLowerCase();
  
  if (!normalized) {
    return products;
  }
  
  return products.filter((product) => product.category.toLowerCase() === normalized);
}

/**
 * Obtiene los top 10 productos
 */
function getTopProducts() {
  const products = getAllProducts();
  const topProducts = products.filter((product) => product.top);
  
  if (topProducts.length >= 10) {
    return topProducts.slice(0, 10);
  }
  
  const otherProducts = products.filter((product) => !product.top);
  const shuffledOthers = otherProducts.sort(() => 0.5 - Math.random());
  
  return [...topProducts, ...shuffledOthers].slice(0, 10);
}

/**
 * Obtiene productos sugeridos
 * @param {object} product - Producto del cual obtener sugerencias
 */
function getSuggestedProducts(product) {
  const products = getAllProducts();
  
  if (!product || !product.suggestions) {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }
  
  return products.filter((item) => product.suggestions.includes(item.id));
}

/**
 * Obtiene productos relacionados por categoría
 * @param {object} product - Producto del cual obtener relacionados
 * @param {number} limit - Límite de productos (default 4)
 */
function getRelatedProducts(product, limit = 4) {
  if (!product || !product.category) {
    return [];
  }
  
  const related = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id);
  
  if (related.length > limit) {
    return related.sort(() => 0.5 - Math.random()).slice(0, limit);
  }
  
  return related;
}

module.exports = {
  normalizeId,
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  getTopProducts,
  getSuggestedProducts,
  getRelatedProducts
};
