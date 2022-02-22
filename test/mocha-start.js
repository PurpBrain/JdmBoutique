var assert = require("assert");
const { query } = require("../server"); // import to server.js

describe("MOCHA // CRUD // User", () => {
  let users = {};
  let id = 0;

  // Boucle pour prendre tout les users
  beforeEach(async () => {
    let sql = `SELECT * FROM user`;
    const user = await db.query(sql);
  });

  // Test
  it("TEST // User", (done) => {
    done();
  });

  // Create USER

  // it("POST // User", async () => {
  //   // let values = ["12345", "Node", "no@de.fr", "0404040404"];
  //   let sql = `INSERT INTO user SET avatar_url="12345", pseudo="Node", email="node.fr", password="0404040404"`;
  //   const user = await db.query(sql);

  //   assert.ok(user);

  //   const userID = await db.query(`SELECT * FROM user where id_user = ${user.insertId}`);

  //   assert.strictEqual(userID[0].avatar_url, "12345");
  //   assert.strictEqual(userID[0].pseudo, "Node")
  //   assert.strictEqual(userID[0].email, "node.fr");
  //   assert.strictEqual(userID[0].password, "0404040404");
  // });

  // Get ALL Customer
  it("GET ALL // Customer", async () => {
    let sql = `SELECT * FROM user`;
    const listUser = await db.query(sql);

    // console.log('GET ALL: ', listUser)

    assert.ok(listUser);

    const users = await db.query(`SELECT * FROM user`);
    assert.strictEqual(users.length > 0, true);
  });

  // Get ID Customer
  it("GET ID // Customer", async () => {
    // Récupère l'id du BeforeEach
    let sql = `SELECT * FROM user WHERE id_user = "${users.id_user}"`;
    const userID = await db.query(sql);

    // console.log('GETID: ', userID)

    assert.ok(userID);
  });

//   // Edit Customers
//   it("PUT ID // Customer", async () => {
//     // console.log("EDITT: ", customer);
//     let sql = `UPDATE customers
//                  SET name   = 'Test Edit',
//                      mobile = '0909090909',
//                      email  = 'te@st.com'
//                  WHERE  id  = '${customer.id}';`;

//     const user = await query(sql);
//     const userID = await query(
//       `SELECT * FROM customers WHERE id = ${customer.id}`
//     );

//     // console.log('PUT: ', userID)

//     assert.ok(userID);

//     assert.strictEqual(userID[0].name, "Test Edit");
//     assert.strictEqual(userID[0].mobile, "0909090909");
//     assert.strictEqual(userID[0].email, "te@st.com");
//   });

//   // Delete ID
//   it("DELETE ID // Customer", async () => {
//     let sql = `DELETE FROM customers WHERE id = ${customer.id}`;
//     await query(sql);

//     // console.log("DELETE ID: ", userID);

//     const userID = await query(
//       `SELECT * FROM customers where id = ${customer.id}`
//     );
//     assert.ok(userID);
//     assert.strictEqual(userID.length, 0);
//   });

//   // à décommenter pour tout supprimer
//   // Delete ALL
//   it("DELETE ALL // Customer", async () => {
//     let sql = `DELETE FROM customers`;
//     const user = await query(sql);

//     // console.log('DELETE ALL: ', listUser.length)

//     const listUser = await query("SELECT * FROM customers");
//     assert.strictEqual(listUser.length, 0);
//   });

});