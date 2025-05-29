const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'trouve-ton-artisan'

});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
  } else {
    console.log('Connecté à MySQL');
  }
});

module.exports = connection;
