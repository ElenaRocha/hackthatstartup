const express = require("express");
const jwt = require("jsonwebtoken");

const candidateController = require("../controllers/candidatesController");

//para mayor seguridad, una opción es guardar el secret en variables de entorno
let secret = process.env.SECRET;
secret = 123

const router = express.Router();

function authenticate(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      res.status(200).json({
        message: "Debes incluir un token válido en tu petición",
      });
      return;
    }
    const decodedToken = jwt.verify(token, secret);
  
    next();
}

router.get("/:id", authenticate, candidateController.getCandidateById);
router.post("/alta", candidateController.createCandidate);
router.put("/:id", authenticate, candidateController.updateCandidate);
router.delete("/:id", authenticate, candidateController.deleteCandidate);

module.exports = router;