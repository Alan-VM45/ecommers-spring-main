const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(path.join(__dirname, '../db/database.sqlite'), (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    process.exit(1);
    }
});

fs.readFile('./src/data/products.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo JSON:', err.message);
    db.close();
    process.exit(1);
  }
 

  try {
    const products = JSON.parse(data);
    if (!Array.isArray(products)|| products.length === 0) {
      console.error('El archivo JSON no contiene un array de productos válido.');
      db.close();
      process.exit(1);
    }
 

  const sql = 'INSERT INTO products (id, title, price, description, category, image, stock, top, suggestions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.serialize(() => {
    const stmt = db.prepare(sql);
    products.forEach((product) => {
      stmt.run(
        product.id,
        product.title,
        product.price,
        product.description,
        product.category,
        product.image,
        product.stock || 0,
        product.top ? 1 : 0,
        JSON.stringify(product.suggestions || []),
        (err) => {
          if (err) {
            console.error(`Error al insertar producto ${product.id}:`, err.message);
          }
        }
      );
    });
    stmt.finalize();

    db.close((err) => {
      if (err) {
        console.error('Error al cerrar la base de datos:', err.message);
      } else {
        console.log('Productos insertados correctamente con todos sus campos.');
        console.log('Puedes eliminar el archivo JSON manualmente una vez verifiques los datos.');
        // fs.unlink('./src/data/products.json', (err) => { ... });
      }
    });
  });
  } catch (parseError) {
    console.error('Error al parsear el archivo JSON:', parseError.message);
    db.close();
    }
});





