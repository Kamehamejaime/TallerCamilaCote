import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";
import mysql from "mysql";
import { error, log } from "console";
import bodyParser from "body-parser";


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//SETTINGS
const PORT = process.env.PORT || 3000;
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(indexRoutes);
app.use(express.static(join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

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

//Mostrar la tabla colaboradores
app.get("/colaboradores", (req, res) => {
  connection.query("SELECT * FROM colaboradores", (err, rows) => {
    if (err) throw err;

    res.render("colaboradores", {
      colaboradores: rows,
      title: "colaboradores",
    });
  });
});

//Insertar datos en la tabla colaboradores
app.post("/nuevoColaborador", (req, res) => {
  const { Rut, Nombre, Telefono, NumeroCuenta, TipoCuenta, Banco } = req.body;

  connection.query(
    "INSERT INTO colaboradores SET ?",
    {
      Rut: Rut,
      Nombre: Nombre,
      Telefono: Telefono,
      NumeroCuenta: NumeroCuenta,
      TipoCuenta: TipoCuenta,
      Banco: Banco,
    },
    (err, rows) => {
      if (err) throw err;

      res.redirect("/colaboradores");
    }
  );
});

//Eliminar un registro
app.post("/eliminarColaborador", (req, res) => {
  const { ColaboradoresId } = req.body;
  connection.query(
    "DELETE FROM colaboradores WHERE ColaboradoresId = ?",
    [ColaboradoresId],
    (err, rows) => {
      if (err) throw err;
      res.redirect("/colaboradores");
    }
  );
});


// Mostrar el formulario de edición
app.get("/colaboradores/:id/editar", (req, res) => {
  const colaboradorId = req.params.id;
  connection.query(
    "SELECT * FROM colaboradores WHERE ColaboradoresId = ?",
    [colaboradorId],
    (err, rows) => {
      if (err) throw err;
      res.render("editarColaborador", {
        colaborador: rows[0],
        title: "Editar Colaborador",
      });
    }
  );
});

// Actualizar los datos del colaborador
app.post("/colaboradores/:id/editar", (req, res) => {
  const colaboradorId = req.params.id;
  const { Rut, Nombre, Telefono, NumeroCuenta, TipoCuenta, Banco } = req.body;
  connection.query(
    "UPDATE colaboradores SET Rut = ?, Nombre = ?, Telefono = ?, NumeroCuenta = ?, TipoCuenta = ?, Banco = ? WHERE ColaboradoresId = ?",
    [Rut, Nombre, Telefono, NumeroCuenta, TipoCuenta, Banco, colaboradorId],
    (err, rows) => {
      if (err) throw err;
      res.redirect("/colaboradores");
    }
  );
});


//Mostrar nombres de los colaboradores en un dropdown menú
app.get("/pagoColaboradores", (req, res) => {
  connection.query("SELECT Nombre,Rut FROM colaboradores", (err, rows) => {
    if (err) throw err;

    res.render("pagoColaboradores", {
      colaboradores: rows,
      title: "Pagos Colaboradores",
    });
  });
});


app.listen(PORT, () => console.log("Servidor escuchando en puerto {PORT}"));
