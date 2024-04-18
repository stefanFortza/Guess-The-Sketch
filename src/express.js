import express from "express";
import { rootdir } from "./exports.js";
import { app } from "./index.js";
import path from "path";
import cors from "cors";

function init() {
  app.set("view engine", "ejs");
  app.set("views", path.join(rootdir, "views"));

  app.use(cors());
  // app.use();
  app.use(express.static(path.join(rootdir, "public")));

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/game", (req, res) => {
    res.render("game");
  });

  app.get("/how-to-play", (req, res) => {
    res.render("how-to-play");
  });
}

export default { init };
