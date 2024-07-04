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
    res.render("index", {
      wrongName: req.query.wrongName === "true" ? true : false,
    });
  });

  app.get("/game", (req, res) => {
    console.log(req.query);
    if (!/^[a-zA-Z0-9_.-]*$/.test(req.query.username)) {
      return res.redirect("/?wrongName=true");
      // return res.render("index", { wrongName: true });
    }

    res.render("game");
  });

  app.get("/how-to-play", (req, res) => {
    res.render("how-to-play");
  });

  app.use(function (req, res, next) {
    res.status(404);

    if (req.accepts("json")) {
      return res.json({ error: "Not found" });
    }

    res.type("txt").send("Not found");
  });
}

export default { init };
