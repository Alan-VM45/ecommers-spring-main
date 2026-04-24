const products = [
  {
    id: 1,
    title: 'Coca-Cola Lata 220ml Pack x6',
    image: '/images/imagenes/coca cola.webp',
    description: 'Pack de 6 latas de Coca-Cola 220ml. Ideal para reuniones y picadas.',
    price: 760,
    category: 'bebidas',
    stock: 8,
    top: true,
    suggestions: [2, 3, 4]
  },
  {
    id: 2,
    title: 'Blue Label 750ml',
    image: '/images/imagenes/thumb_70661_default_big.jpeg',
    description: 'Whisky premium Johnnie Walker Blue Label, elegante y suave.',
    price: 19900,
    category: 'bebidas',
    stock: 5,
    top: true,
    suggestions: [1, 3, 5]
  },
  {
    id: 3,
    title: 'Combo Fernet + Coca-Cola',
    image: '/images/imagenes/Combo-fernet-jpg.webp',
    description: 'Combo de Fernet con 2 Coca-Cola 1.75L. Perfecto para compartir.',
    price: 40800,
    category: 'bebidas',
    stock: 2,
    top: true,
    suggestions: [1, 2, 4]
  },
  {
    id: 4,
    title: 'Audífonos Bluetooth',
    image: '/images/imagenes/OIP.webp',
    description: 'Audífonos inalámbricos con cancelación de ruido y gran batería.',
    price: 15900,
    category: 'electronica',
    stock: 0,
    top: false,
    suggestions: [2, 5]
  },
  {
    id: 5,
    title: 'Remera Casual',
    image: '/images/imagenes/OIP.webp',
    description: 'Remera cómoda para uso diario con diseño clásico.',
    price: 8200,
    category: 'indumentaria',
    stock: 12,
    top: false,
    suggestions: [2, 4]
  }
];

function getAllProducts() {
  return products;
}

function getProductById(id) {
  const productId = Number(id);
  return products.find((product) => product.id === productId);
}

function searchProducts(term) {
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
  const normalized = String(category || '').trim().toLowerCase();
  if (!normalized) {
    return products;
  }
  return products.filter((product) => product.category.toLowerCase() === normalized);
}

function getTopProducts() {
  return products.filter((product) => product.top);
}

function getSuggestedProducts(product) {
  if (!product || !product.suggestions) {
    return products.filter((item) => item.top).slice(0, 4);
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
