import { Router } from "express";

const router = Router();

router.get("/", (req, res) =>
  res.render("index", { title: "Pagina principal" })
);

router.get("/about", (req, res) => res.render("about"));

router.get("/contact", (req, res) => res.render("contact"));

router.get("public/css", (req, res) => res.sendFile("style.css"));

export default router;
