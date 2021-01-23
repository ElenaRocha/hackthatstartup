const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const candidatesRouter = require("./routes/candidatesRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("combined"));

app.use("/candidatos", candidatesRouter);

app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500);
    res.render("error", { error: err });
  });
  
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
  
  app.get("/", (req, res) => res.send("Welcome"));
  
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500);
    res.render("error", { error: err });
  });
  
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
  
  app.get("/", (req, res) => res.send("Welcome"));
  
  app.listen(process.env.PORT || 3000, () =>
    console.log("Running on port ", process.env.PORT || 3000)
  );