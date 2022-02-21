var assert = require("assert");
const { query } = require("../server"); // import to server.js

describe("MOCHA // CRUD // Customer", () => {
  let customer = {};
  let id = 0;

  // Loop for create Customer before 'it'
  beforeEach(async () => {
    let values = ["123","BRUNO", "Bru@nu.fr", "0606060606"];
    let sql = `INSERT INTO user (avatar_url,pseudo,email,password) values(?)`;
    const user = await db.query(sql, [values]);

    // console.log("Before EACH: ", user);
    assert.ok(user.insertId);

    const userID = await db.query(`SELECT * FROM user where id_user = ${ user.insertId }`)
    customer = userID[0]
    assert.strictEqual(userID[0].avatar_url, "123");
    assert.strictEqual(userID[0].pseudo, "BRUNO")
    assert.strictEqual(userID[0].email, "Bru@nu.fr");
    assert.strictEqual(userID[0].password, "0606060606");

  });

  // Test
  it("TEST // Customer", (done) => {
    console.log("TEST: ", id)
    done();
  });

  // Create Customer

  it("POST // Customer", async () => {
    let values = ["12345", "Node", "no@de.fr", "0404040404"];
    let sql = `INSERT INTO user (avatar_url,pseudo,email,password) values(?)`;
    const user = await db.query(sql, [values]);

    // console.log("POST: ", user.insertId)

    assert.ok(user);

    const userID = await db.query(
      `SELECT * FROM user where id_user = ${user.insertId}`
    );
    assert.strictEqual(userID[0].avatar_url, "12345");
    assert.strictEqual(userID[0].pseudo, "Node")
    assert.strictEqual(userID[0].email, "no@de.fr");
    assert.strictEqual(userID[0].password, "0404040404");
  });

//   // Get ALL Customer
//   it("GET ALL // Customer", async () => {
//     let sql = `SELECT * FROM customers`;
//     const listUser = await query(sql);

//     // console.log('GET ALL: ', listUser)

//     assert.ok(listUser);

//     const users = await query(`SELECT * FROM customers`);
//     assert.strictEqual(users.length > 0, true);
//   });

//   // Get ID Customer
//   it("GET ID // Customer", async () => {
//     // Récupère l'id du BeforeEach
//     let sql = `SELECT * FROM customers WHERE id = ${customer.id}`;
//     const userID = await query(sql);

//     // console.log('GETID: ', userID)

//     assert.ok(userID);
//   });

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