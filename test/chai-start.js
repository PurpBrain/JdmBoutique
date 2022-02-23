// Config Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should();
const expect = chai.expect;
const { app } = require("../server"); // import to server.js
const path = require("path");

chai.use(chaiHttp);

describe("CHAI // CONTROLLER // MESSAGE", () => {
  // Test
  it("TEST // Message", (done) => {
    done();
  })
  // Test Post /message 
  it("ChaiRouter // Post Message", (done) => {
    const body = { name: "Léo", email: "leo@leo", service: "SAV", message: "salut :)" };

    chai
      .request(app)
      .post("/api/send/message")
      .set("Accept", "application/json")
      .send(body)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        // res.body.dbArticle.should.be.a("array");
        // res.body.dbArticle[0].should.be.a("object");
        done();
      });
  });
});


describe("CHAI // CONTROLLER // BLOG", () => {

  // Exemple
  it("Exemple", (done) => {
    done();
  });

  // Test get /blog
  it(" ChaiRouter // Get Blog", (done) => {
    // test route Get
    chai
      .request(app)
      .get("/api/blog")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        done();
      });
  });
});
//   // Test Post
//   // (name,email,mobile)
//   it(" ChaiRouter // Post Article", (done) => {
//     const body = {
//       name: "Bruno Chai",
//       email: "brchai@no.fr",
//       mobile: "0909090909",
//     };

//     chai
//       .request(app)
//       .post("/api/v1/article")
//       .set("Accept", "application/json")
//       .send(body)
//       .end((err, res) => {
//         if (err) return done(err);
//         res.should.have.status(200);
//         res.body.dbArticle.should.be.a("array");
//         res.body.dbArticle[0].should.be.a("object");
//         done();
//       });
//   });

// let articles = {};
//   // Test get /fev
//   it(" ChaiRouter // Get ID Article", (done) => {
//     // test route Get
//     chai
//       .request(app)
//       .get(`/api/v1/article/${customer.id}`)
//       .set("Accept", "application/json")
//       .end((err, res) => {
//         if (err) return done(err);
//         // console.log(res.body)
//         res.should.have.status(200);
//         res.body.dbArticle.should.be.a("array");
//         res.body.dbArticle[0].should.be.a("object");
//         done();
//       });
//   });


//   // Test Put /path:id
//   // (name,email,mobile)
//   it(" ChaiRouter // Put Article", (done) => {
//     const body = {
//       name: "Bruno Edit Chai",
//       email: "brchai@no.fr",
//       mobile: "0909090909",
//     };

//     // Test route Put
//     chai
//       .request(app)
//       .put(`/api/v1/article/${customer.id}`)
//       .set("Accept", "application/json")
//       .send(body)
//       .end((err, res) => {
//         if (err) return done(err);
//         res.should.have.status(200);
//         res.body.dbArticle.should.be.a("array");
//         res.body.dbArticle[0].should.be.a("object");
//         done();
//       });
//   });

//   // Delete ID
//   it(" ChaiRouter // Delete ID Article", (done) => {
//     // Test route Delete
//     chai
//       .request(app)
//       .delete(`/api/v1/article/${customer.id}`)
//       .set("Accept", "application/json")
//       .end((err, res) => {
//         if (err) return done(err);
//         res.should.have.status(200);
//         res.body.dbArticle.should.be.a("array");
//         res.body.dbArticle[0].should.be.a("object");
//         done();
//       });
//   });

//   // Delete All
//   it(" ChaiRouter // Delete Article", (done) => {
//     // Test route Delete
//     chai
//       .request(app)
//       .delete("/api/v1/article")
//       .set("Accept", "application/json")
//       .end((err, res) => {
//         if (err) return done(err);
//         res.should.have.status(200);
//         res.body.dbArticle.should.be.a("array");
//         done();
//       });
//   });
