const productsService = require('./src/services/productsService');

console.log('=== TEST BUSCADOR DE PRODUCTOS ===\n');

// Test 1: Búsqueda por término "camisa"
console.log('Test 1: Buscando "camisa"');
const resultsCamisa = productsService.searchProducts('camisa');
console.log(`Resultados encontrados: ${resultsCamisa.length}`);
if (resultsCamisa.length > 0) {
  resultsCamisa.forEach(p => {
    console.log(`  - ${p.title} (${p.category})`);
  });
}
console.log('');

// Test 2: Búsqueda por término "bebidas"
console.log('Test 2: Buscando "bebidas"');
const resultsBebidas = productsService.searchProducts('bebidas');
console.log(`Resultados encontrados: ${resultsBebidas.length}`);
if (resultsBebidas.length > 0) {
  console.log('Primeros 3 resultados:');
  resultsBebidas.slice(0, 3).forEach(p => {
    console.log(`  - ${p.title} (${p.category})`);
  });
}
console.log('');

// Test 3: Búsqueda por término vacío
console.log('Test 3: Buscando "" (vacío)');
const resultsEmpty = productsService.searchProducts('');
console.log(`Resultados encontrados: ${resultsEmpty.length}`);
console.log('');

// Test 4: Búsqueda sin resultados
console.log('Test 4: Buscando "xyz123notexist"');
const resultsNoMatch = productsService.searchProducts('xyz123notexist');
console.log(`Resultados encontrados: ${resultsNoMatch.length}`);
if (resultsNoMatch.length === 0) {
  console.log('✓ PASS - No se encontraron resultados');
}
console.log('');

// Test 5: Búsqueda por descripción
console.log('Test 5: Buscando "inalámbricos"');
const resultsDesc = productsService.searchProducts('inalámbricos');
console.log(`Resultados encontrados: ${resultsDesc.length}`);
if (resultsDesc.length > 0) {
  resultsDesc.forEach(p => {
    console.log(`  - ${p.title} (${p.category})`);
  });
}
console.log('');

// Test 6: Búsqueda case-insensitive
console.log('Test 6: Buscando "COCA" (mayúsculas)');
const resultsCaseSensitive = productsService.searchProducts('COCA');
console.log(`Resultados encontrados: ${resultsCaseSensitive.length}`);
if (resultsCaseSensitive.length > 0) {
  console.log('✓ PASS - La búsqueda es case-insensitive');
  resultsCaseSensitive.forEach(p => {
    console.log(`  - ${p.title}`);
  });
}
console.log('');

// Test 7: Búsqueda con espacios
console.log('Test 7: Buscando "  coca  " (con espacios)');
const resultsSpaces = productsService.searchProducts('  coca  ');
console.log(`Resultados encontrados: ${resultsSpaces.length}`);
if (resultsSpaces.length > 0) {
  console.log('✓ PASS - Los espacios se trimean correctamente');
}

console.log('\n=== PRUEBAS COMPLETADAS ===');
