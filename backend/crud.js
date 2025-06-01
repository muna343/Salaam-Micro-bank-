app.get('/customers', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM customers');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    } finally {
        client.release();
    }
});

app.post('/customers', async (req, res) => {
    const { name, contact_details, account_status } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query(
            'INSERT INTO customers (name, contact_details, account_status) VALUES ($1, $2, $3) RETURNING *',
            [name, contact_details, account_status]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    } finally {
        client.release();
    }
});

app.put('/customers/:id', async (req, res) => {
    const { id } = req.params;
    const { name, contact_details, account_status } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query(
            'UPDATE customers SET name = $1, contact_details = $2, account_status = $3 WHERE id = $4 RETURNING *',
            [name, contact_details, account_status, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    } finally {
        client.release();
    }
});

app.delete('/customers/:id', async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM customers WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    } finally {
        client.release();
    }
});