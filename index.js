const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = 'c50ded683cf455d559363b00bb2ec63b';
const baseUrl = `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.')
});

// GET product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (err) {
        res.json(err);
        console.log(err);
    }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));