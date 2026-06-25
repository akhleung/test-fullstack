const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3800;

app.use(cors());
app.use(express.json()); // Allows parsing of JSON request bodies

// Sample API Route
app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from the Express backend!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
