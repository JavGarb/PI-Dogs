require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
//Aqui trae todas las constantes con datos sensibles requeridas para la db
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

//crea la conexion a la base de datos de postgre
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, User, Temperament } = sequelize.models;
// Aca vendrian las relaciones

//Relaciono las tablas Perro con temperamento, de M:N dado que varias razas 
//tienen varios temperamentos
Dog.belongsToMany(Temperament, {through: 'dogsTemperaments'});
Temperament.belongsToMany(Dog, {through:'dogsTemperaments'})

//Relaciono la tabla user con la tabla dog de muchos a muchos
//dado que a un usuario le pueden gustar varios perros y los perros
// pueden tener varios usuarios que los pusieron de favoritos
Dog.belongsToMany(User, {through: 'userDog'});
User.belongsToMany(Dog, {through: 'userDog'});



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
