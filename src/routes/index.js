import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>
  res.render("index", { title: "Pagina principal" })
);

router.get("/about", (req, res) => res.render("about", { title: "About" }));

router.get("/contact", (req, res) => res.render("contact"));

router.get("public/css", (req, res) => res.sendFile("style.css"));


export default router;

/*
router.get("/colaboradores", (req, res) => {
  connection.query("SELECT *FROM Colaboradores", (error, results) => {
    if (error) {
      console.log("Error al consultar los datos de la tabla Colaboradores",error);
      return;
    }

    res.render("colaboradores", { colaboradores: results });
  });
});


*/
