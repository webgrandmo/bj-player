const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.get('/', function(req, res) {
    res.render('index.html');
 });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
