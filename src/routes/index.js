import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>
  res.render("index", { title: "Pagina principal" })
);

router.get("./colaboradores", (req, res) => res.render("colaboradores", { title: "Colaboradores" }));

router.get("/nuevoColaborador", (req, res) => res.render("nuevoColaborador",{title: "Nuevo Colaborador"}));

router.get("public/css", (req, res) => res.sendFile("style.css"));


export default router;