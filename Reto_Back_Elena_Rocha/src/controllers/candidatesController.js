const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Candidate = require("../models/candidateModel.js");

mongoose.set("useFindAndModify", false);

mongoose
    .connect("mongodb://localhost:27017/pruebas", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

mongoose.connection.on("error", (err) => {
  console.log("Database error: ", err);
});

const candidateController = {
    createCandidate: async function (req, res) {
        const candidateInfo = req.body;

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(candidateInfo.password, salt);

        const candidate = new Candidate();
        candidate.name = candidateInfo.name;
        candidate.surname = candidateInfo.surname;
        candidate.email = candidateInfo.email;
        candidate.password = encryptedPassword;
        candidate.bio = candidateInfo.bio;
        candidate.academics = candidateInfo.academics;
        candidate.experience = candidateInfo.experience;
        candidate.skills = candidateInfo.skills;
        candidate.media = candidateInfo.media;

        candidate.save((err, savedInfo) => {
            if (err)
              throw new Error("Ha habido un error al registrar al usuario", err);
      
            res.status(200).json({
              message: "Se ha resgistrado correctamente",
              savedInfo,
            });
          });
    },

    getCandidateById: async function (req, res) {
        try {
          const getId = req.params.id;
    
          const getCandidate = await Candidate.findById(getId);
    
          res.status(200).json(getCandidate);
        } catch (err) {
          res.send("Error al obtener datos");
        }
      },
    
    updateCandidate: async function (req, res) {
        const newCandidateInfo = req.body;
        const candidateId = req.params.id;
    
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(newCandidateInfo.password, salt);
    
        candidate.findByIdAndUpdate(
          candidateId,
          {
            name: newcandidateInfo.name,
            surname: newcandidateInfo.surname,
            email: newcandidateInfo.email,
            password: encryptedPassword,
            bio: newCandidateInfo.bio,
            academics: newCandidateInfo.academics,
            experience: newCandidateInfo.experience,
            skills: newCandidateInfo.skills,
            media: newCandidateInfo.media,
          },
          { new: true },
          (err, savedInfo) => {
            if (err)
              throw new Error(
                "Ha habido un error al actualizar los datos del usuario",
                err
              );
    
            res.status(200).json({
              message: "Usuario actualizado correctamente",
              response: savedInfo,
            });
          }
        );
      },
    
    deleteCandidate: async function (req, res) {
        const candidateId = req.params.id;
        const candidateUnsuscribed = await candidate.findByIdAndDelete(
          candidateId,
          (err, savedInfo) => {
            if (err) throw new Error("Ha habido un error al dar de baja", err);
    
            res.status(200).json({
              message: "Usuario dado de baja correctamente",
              savedInfo,
            });
          }
        );
      },
    
    candidateLogin: async function (req, res) {
        const candidateInfo = req.body;
    
        const candidateData = await candidate.findOne({ email: candidateInfo.email });
    
        if (!candidateData) {
          res.status(200).json({
            message: "Usuario o contraseña incorrectos",
          });
          return;
        }
    
        const passwordIsCorrect = await bcrypt.compare(
          candidateInfo.password,
          candidateData.password
        );
    
        if (!passwordIsCorrect) {
          res.status(200).json({
            message: "Usuario o contraseña incorrectos",
          });
          return;
        }
    
        const token = jwt.sign({ _id: candidateData._id }, secret, {
          expiresIn: 60 * 60 * 24,
        });
    
        const candidateId = candidateData._id;
    
        const role = candidateData.role;
    
        res.status(200).json({
          message: "Login correcto",
          token,
          candidateId,
        });
      },
};

module.exports = candidateController;