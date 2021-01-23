const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
    name: {
        type: String,
        required: [true, "Este campo es obligatorio"],
    },
    surname: {
        type: String,
        required: [true, "Este campo es obligatorio"],
    },
    email: {
        type: String,
        required: [true, "Este campo es obligatorio"],
        unique: true,
        lowercase: true, 
        match: [/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/, "Formato no válido"],
    },
    password: {
        type: String,
        required: [true, "Este campo es obligatorio"],
    },
    bio: {type: String},
    academics: [{dateBegin: Date, dateFinish: Date, currently: Boolean, title: String, institution: String, description: String}],
    experience: [{dateStart: Date, dateEnd: Date, currently: Boolean, position: String, company: String, tasks: String}],
    skills: [String],
    media: {
        web: String,
        blog: String,
        github: String,
        linkedin: String,
        twitter: String,
        youtube: String,
    }
});

module.exports = mongoose.model("Candidate", CandidateSchema);