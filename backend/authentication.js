const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const jwtkey = '';

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        // Check if rows is empty for the user
        if (result.rows.length === 0) {
            return res.status(401).send('Invalid credentials');
        }
        const user = result.rows[0];
        const foundmatch = await bcrypt.compare(password, user.password);
        //check for any mismartch 

        if (!foundmatch) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send(' Internal Server error');
    } finally {
        // Release the client details to save on memory allocation 
        client.release();
    }
});