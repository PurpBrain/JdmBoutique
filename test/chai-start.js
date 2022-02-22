// Config Chai
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = require("chai").should();
const expect = chai.expect;
const { app, query } = require("../server"); // import to server.js
const path = require("path");

chai.use(chaiHttp);

describe("CHAI // CONTROLLER // ARTICLE", () => {
  let articles = {};

  // Loop for create Customer before 'it'
  beforeEach(async () => {
    
    let sql = `INSERT INTO article SET make= "audi", model= "rs3", price= "1000", author_id= "1", img_id= "1", description= "123"`;
    const article = await db.query(sql);

    const articleID = await db.query(`SELECT * FROM article where id_Article = "${ article.insertId }"`)
    console.log(articleID)

    articles = articleID[0];
   
    articleID[0].id_Article.should.be.a("string");
    articleID[0].make.should.be.a("string");
    articleID[0].model.should.be.a("string");
    articleID[0].price.should.be.a("string");
    articleID[0].author_id.should.be.a("string");
    articleID[0].img_id.should.be.a("string");
    articleID[0].description_id.should.be.a("string");
  });

  // Exemple
  it("Exemple", (done) => {
    done();
  });

  // Test get /fev
  it(" ChaiRouter // Get Article", async (done) => {
    // test route Get
    chai
      .request(app)
      .get("/api/v1/account")
      .set("Accept", "application/json")
      .end((err, res) => {
        if (err) return done(err);
        // res.should.have.status(200);
        res.body.myArticle.should.be.a("array");
        res.body.myArticle[0].should.be.a("object");
        done();
      });
  });

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
});