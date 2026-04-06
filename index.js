const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Backend TaskWeaver berjalan!');
});

app.listen(port, () => {
    console.log(`Server jalan di port ${port}`);
});