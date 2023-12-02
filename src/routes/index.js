import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>
  res.render("index", { title: "Pagina principal" })
);

router.get("/", (req,res) => res.render("index", { title: "Página principal"}))

router.get("./colaboradores", (req, res) => res.render("colaboradores", { title: "Colaboradores" }));

router.get("/nuevoColaborador", (req, res) => res.render("nuevoColaborador",{title: "Nuevo Colaborador"}));

//router.get("/editarColaborador", (req, res) => res.render("editarColaborador",{title: "Editar Colaborador"}));
//router.get('/actualizarColaborador',(req,res)=> res.render("/colaboradores"));

router.get("/eliminarColaborador", (req, res) => res.render("eliminarColaborador",{title: "Borrar Colaborador"}));

router.get("public/css", (req, res) => res.sendFile("style.css"));


export default router;