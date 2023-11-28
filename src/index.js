import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";
import mysql from "mysql";
import { error, log } from "console";

//const { default: morgan } = await import("morgan");


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


//SETTINGS
const PORT = process.env.PORT || 3000;
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(indexRoutes);
app.use(express.static(join(__dirname, "public")));

//Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "camilacote",
});

//Establecer conexión
connection.connect((error) => {
  if (error) {
    console.log("error al conectar a la base de datos", error);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

app.get('/colaboradores', (req, res) => {
    connection.query('SELECT * FROM colaboradores', (err, rows) => {
       if (err) throw err;
   
       res.render('colaboradores', { colaboradores: rows });
    });
   });


   //Insertar datos en la tabla colaboradores
   app.post('/colaboradores', (req, res) => {
    const { name, position } = req.body;
   
    connection.query('INSERT INTO Colaboradores SET ?',
       {
         name: name,
         position: position
       },
       (err, rows) => {
         if (err) throw err;
   
         res.render('colaboradores', { colaboradores: rows, title:'Colaboradores'});
       }
    );
   });
   

app.listen(PORT, () => console.log("Servidor escuchando en puerto {PORT}"));
