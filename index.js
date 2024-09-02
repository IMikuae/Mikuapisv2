const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk user authentication sederhana
app.use((req, res, next) => {
    const authToken = req.header('Authorization');
    if (authToken === 'Bearer your-secret-token') {
        next();
    } else {
        res.status(403).json({ error: 'Unauthorized' });
    }
});

// Contoh endpoint untuk scraping data
app.get('/scrape', async (req, res) => {
    try {
        const response = await axios.get('https://example.com');
        const data = response.data;
        // Contoh sederhana pengambilan title dari halaman web
        const title = data.match(/<title>(.*?)<\/title>/)[1];
        res.json({ title });
    } catch (error) {
        res.status(500).json({ error: 'Error scraping data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
