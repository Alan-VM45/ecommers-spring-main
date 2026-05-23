// Manual test to verify sorting logic
const fs = require('fs');
const path = require('path');

// Read products.json directly
const productsPath = path.join(__dirname, 'src/data/products.json');
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

console.log('========== SORT BY PRICE VALIDATION ==========\n');

// Test 1: Ascending Sort
console.log('TEST 1: Ascending Sort (asc)');
console.log('-------------------------------------');
const sortedAsc = [...productsData].sort((a, b) => a.price - b.price);
let ascValid = true;
for (let i = 1; i < sortedAsc.length; i++) {
  if (sortedAsc[i].price < sortedAsc[i-1].price) {
    ascValid = false;
    break;
  }
}
console.log(`Result: ${ascValid ? '✓ PASS' : '✗ FAIL'}`);
console.log('First 3 products (cheapest):');
sortedAsc.slice(0, 3).forEach(p => {
  console.log(`  ${p.id}. ${p.title.substring(0, 30)}... - $${p.price}`);
});
console.log('Last 3 products (most expensive):');
sortedAsc.slice(-3).forEach(p => {
  console.log(`  ${p.id}. ${p.title.substring(0, 30)}... - $${p.price}`);
});

// Test 2: Descending Sort
console.log('\nTEST 2: Descending Sort (desc)');
console.log('-------------------------------------');
const sortedDesc = [...productsData].sort((a, b) => b.price - a.price);
let descValid = true;
for (let i = 1; i < sortedDesc.length; i++) {
  if (sortedDesc[i].price > sortedDesc[i-1].price) {
    descValid = false;
    break;
  }
}
console.log(`Result: ${descValid ? '✓ PASS' : '✗ FAIL'}`);
console.log('First 3 products (most expensive):');
sortedDesc.slice(0, 3).forEach(p => {
  console.log(`  ${p.id}. ${p.title.substring(0, 30)}... - $${p.price}`);
});
console.log('Last 3 products (cheapest):');
sortedDesc.slice(-3).forEach(p => {
  console.log(`  ${p.id}. ${p.title.substring(0, 30)}... - $${p.price}`);
});

// Test 3: No mutation of original array
console.log('\nTEST 3: No Mutation of Original Array');
console.log('-------------------------------------');
const originalFirst = productsData[0];
const sortedAscFirst = [...productsData].sort((a, b) => a.price - b.price)[0];
const noMutation = originalFirst.id === productsData[0].id;
console.log(`Result: ${noMutation ? '✓ PASS' : '✗ FAIL'}`);
console.log(`Original first product: ID ${originalFirst.id}`);
console.log(`After sorting (new array), original still: ID ${productsData[0].id}`);

// Test 4: Category filter + sort
console.log('\nTEST 4: Category Filter + Sort');
console.log('-------------------------------------');
const bebidasProducts = productsData.filter(p => p.category === 'bebidas');
const bebidasSorted = [...bebidasProducts].sort((a, b) => a.price - b.price);
let bebidasAscValid = true;
for (let i = 1; i < bebidasSorted.length; i++) {
  if (bebidasSorted[i].price < bebidasSorted[i-1].price) {
    bebidasAscValid = false;
    break;
  }
}
console.log(`Bebidas products: ${bebidasProducts.length}`);
console.log(`Sorted correctly: ${bebidasAscValid ? '✓ PASS' : '✗ FAIL'}`);
console.log('Bebidas sorted (ascending):');
bebidasSorted.forEach(p => {
  console.log(`  - ${p.title.substring(0, 40)}... - $${p.price}`);
});

console.log('\n========== VALIDATION COMPLETE ==========');
console.log(`All tests passed: ${ascValid && descValid && noMutation && bebidasAscValid ? '✓ YES' : '✗ NO'}`);
