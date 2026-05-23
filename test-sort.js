const productsService = require('./src/services/productsService');

// Test 1: Get all products and verify sorting
console.log('=== TEST 1: Sorting Products ===\n');

const allProducts = productsService.getAllProducts();
console.log(`Total products: ${allProducts.length}`);
console.log('\nFirst 5 products by ID and price:');
allProducts.slice(0, 5).forEach(p => {
  console.log(`  - ${p.id}: ${p.title} (Price: $${p.price})`);
});

// Test 2: Sort ascending
console.log('\n=== TEST 2: Ascending Sort (asc) ===\n');
const sortedAsc = productsService.sortByPrice(allProducts, 'asc');
console.log('First 5 products (cheapest):');
sortedAsc.slice(0, 5).forEach(p => {
  console.log(`  - ${p.title}: $${p.price}`);
});

// Test 3: Sort descending
console.log('\n=== TEST 3: Descending Sort (desc) ===\n');
const sortedDesc = productsService.sortByPrice(allProducts, 'desc');
console.log('First 5 products (most expensive):');
sortedDesc.slice(0, 5).forEach(p => {
  console.log(`  - ${p.title}: $${p.price}`);
});

// Test 4: Verify ascending order correctness
console.log('\n=== TEST 4: Verify Ascending Order ===\n');
let isAscCorrect = true;
for (let i = 1; i < sortedAsc.length; i++) {
  if (sortedAsc[i].price < sortedAsc[i-1].price) {
    isAscCorrect = false;
    break;
  }
}
console.log(`Ascending order correct: ${isAscCorrect ? '✓ PASS' : '✗ FAIL'}`);

// Test 5: Verify descending order correctness
console.log('\n=== TEST 5: Verify Descending Order ===\n');
let isDescCorrect = true;
for (let i = 1; i < sortedDesc.length; i++) {
  if (sortedDesc[i].price > sortedDesc[i-1].price) {
    isDescCorrect = false;
    break;
  }
}
console.log(`Descending order correct: ${isDescCorrect ? '✓ PASS' : '✗ FAIL'}`);

// Test 6: Filter and sort combined
console.log('\n=== TEST 6: Filter + Sort Combined ===\n');
const filteredProducts = productsService.getFilteredProducts({ category: 'bebidas' });
console.log(`Bebidas products: ${filteredProducts.length}`);
const filteredAndSorted = productsService.sortByPrice(filteredProducts, 'asc');
console.log('Bebidas sorted by price (ascending):');
filteredAndSorted.forEach(p => {
  console.log(`  - ${p.title}: $${p.price}`);
});

// Test 7: Edge cases
console.log('\n=== TEST 7: Edge Cases ===\n');
const emptySort = productsService.sortByPrice([], 'asc');
console.log(`Empty array sort: ${emptySort.length === 0 ? '✓ PASS' : '✗ FAIL'}`);

const nullSort = productsService.sortByPrice(null, 'asc');
console.log(`Null input sort: ${nullSort === null ? '✓ PASS' : '✗ FAIL'}`);

const invalidDirectionSort = productsService.sortByPrice(allProducts, 'invalid');
console.log(`Invalid direction defaults to asc: ${invalidDirectionSort[0].price <= invalidDirectionSort[1].price ? '✓ PASS' : '✗ FAIL'}`);

console.log('\n=== ALL TESTS COMPLETED ===');
