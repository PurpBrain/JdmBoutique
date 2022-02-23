exports.addMessage = async (req, res) => {
    // SQL pour creer un msg

    const { name, email, service, message } = req.body;

    await db.query(`INSERT INTO message SET name='${name}', email='${email}', service='${service}', message="${message}"`);

    res.json({msg:"Succes"})
} 