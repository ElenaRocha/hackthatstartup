const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../src/controllers/candidatesController");

describe("POST /candidatos/alta", () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    })

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    })

    it("OK, se puede registrar un nuevo usuario", (done) => {
        request(app).post("/candidatos/alta")
            .send({name: "Candidate", surname: "One", email: "candidateone@gmail.com", password: "CandidatoUno123"})
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("_id");
                expect(body).to.contain.property("name");
                expect(body).to.contain.property("surname");
                expect(body).to.contain.property("email");
                expect(body).to.contain.property("password");
                done();
            })
            .catch((err) => done(err));
    })
})